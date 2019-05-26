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
 * @file Redux file reducer
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import { createReducer } from "redux-act";
import { Map, Set } from "immutable";

import * as actions from "../actions";

/**
 * This module defines the reducers for the files namespace.
 *
 * The repository namespace is filled with file objects, that look as
 * follows:
 *
 * ```json
 * {
 *     "github/tim/elvenkings/<sha>/<oid>": {
 *         repository: <id>,
 *         commit: <id>,
 *         name: "kent.toml",
 *         oid: "<oid>",
 *         files: [],
 *         text: "Kent, the mighty elven king!"
 *     }
 * }
 * ````
 *
 * @module redux/reducers/repositories
 */

export default createReducer({
    [actions.completeFetchingRepository]: (files, commit) => {
        const preID = `${commit.get("repoID")}/${commit.get("commitOID")}/`;

        return commit.get("files").reduce((files, file) => {
            return files.set(preID + file.oid, Map({
                repository: commit.get("repoID"),
                commit: commit.get("commitOID"),
                name: file.name,
                oid: file.oid,
                files: Set(),
                text: null
            }));
        }, files);
    },
    [actions.completeFetchingFile]: (files, file) => {
        const current = files.get(file.get("id"));
        return files.set(file.get("id"),
            current.set("text", file.get("text")));
    }
}, Map());
