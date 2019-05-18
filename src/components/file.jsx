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
 * @file The File component
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import React from "react";
import PropTypes from "prop-types";
import { Map } from "immutable";
import { connect } from "react-redux";

import { getFile } from "../redux";

function File(props) {
    return (
        <li>{props.file.get("name")}</li>
    );
}

File.propTypes = {
    file: PropTypes.instanceOf(Map).isRequired,
    id: PropTypes.string.isRequired
};

export default connect((state, ownProps) => ({
    file: getFile(state, ownProps.id)
}))(File);
