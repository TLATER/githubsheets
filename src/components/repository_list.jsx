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
 * @file The RepositoryList component
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Map } from "immutable";

import Repository from "./repository.jsx";
import AddRepositoryButton from "./add_repository_button.jsx";
import { getRepositories } from "../redux";

function RepositoryList(props) {
    return (
        <div id="repository-list-container"
            className="collapse show d-flex flex-column py-3">
            <a data-toggle="collapse" data-target="#repository-list-container"
                aria-expanded="true" aria-controls="repositories"
                className="sidebar-link" title="Show repositories">
                Repositories
            </a>

            <ul className="nav mb-auto overflow-auto py-3">
                {
                    props.repositories.map((repo, key) => (
                        <Repository repository={repo} key={key} />
                    )).valueSeq().toArray()
                }
            </ul>
            <AddRepositoryButton />
        </div>
    );
}

RepositoryList.propTypes = {
    repositories: PropTypes.instanceOf(Map)
};

export default connect(state => ({
    repositories: getRepositories(state)
}))(RepositoryList);
