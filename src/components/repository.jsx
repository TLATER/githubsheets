/**
 * Copyright (C) 2019 Tristan Daniël Maat
 *
 * This file is part of gitsheets.
 *
 * gitsheets is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * gitsheets is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gitsheets.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @file The Repository component
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Map, Set } from "immutable";
import { connect } from "react-redux";

import File from "./file.jsx";
import { fetchRepository, getCommit, toggleExpandRepository } from "../redux";

const REPO_REFRESH_TIME = 3600000;

class Repository extends React.Component {
    constructor(props) {
        super(props);
        this._id = this.props.repository.get("forge") + "/" +
                   this.props.repository.get("user") + "/" +
                   this.props.repository.get("name");
        this.handleExpandRepository = this.handleExpandRepository.bind(this);
    }

    handleExpandRepository() {
        const repo = this.props.repository;

        if (!repo.getIn(["ui", "expanded"]) &&
            Date.now() - repo.getIn(["meta", "lastUpdate"]) > REPO_REFRESH_TIME)
            this.props.fetchRepository(
                repo.get("forge"),
                repo.get("user"),
                repo.get("name")
            );

        this.props.toggleExpandRepository(this._id);
    }

    render() {
        const repo = this.props.repository;
        const displayName = `${repo.get("user")}/${repo.get("name")}`;

        let files = Set();
        if (this.props.commit)
            files = this.props.commit.get("files");

        const fileListClasses = classNames({
            "collapse": true,
            "show": repo.getIn(["ui", "expanded"])
        });

        return (
            <li className="nav-item" onClick={this.handleExpandRepository}
                onMouseDown={e => e.preventDefault()}>
                <a className="nav-link">{displayName}</a>
                <ul className={fileListClasses}>
                    {
                        files.map((id) => (
                            <File id={id} key={id}/>
                        )).valueSeq().toArray()
                    }
                </ul>
            </li>
        );
    }
}

Repository.propTypes = {
    repository: PropTypes.instanceOf(Map).isRequired,
    commit: PropTypes.instanceOf(Map),
    toggleExpandRepository: PropTypes.func.isRequired,
    fetchRepository: PropTypes.func.isRequired
};

export default connect((state, ownProps) => ({
    commit: getCommit(state, ownProps.repository.get("currentCommit"))
}), {
    fetchRepository,
    toggleExpandRepository
})(Repository);
