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
 * @file Redux commit reducer
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import { createReducer } from "redux-act";
import { Map, Set } from "immutable";

import * as actions from "../actions";

/**
 * This module defines the reducers for the commit namespace.
 *
 * The commit namespace is filled with commit objects, that look as
 * follows:
 *
 * ```json
 * {
 *     "<repo-id>/<sha>": {
 *         author: {
 *             name: "tim",                 // The name of the commit author
 *             email: "tim@hotmail.com",    // The email of the commit author
 *             date: "<timestamp>"          // The commit time and date
 *         },
 *         message: "Set new level stats",  // The first commit message line
 *         messageBody: "",                 // Remaining message lines
 *         files: [
 *             "<id>", "<id>", "<id>"       // IDs of top-level files
 *         ]
 *     }
 * }
 * ````
 *
 * @module redux/reducers/commits
 */

export default createReducer({
    [actions.completeFetchingRepository]: (commits, commit) => {
        const id = `${commit.get("repoID")}/${commit.get("commitOID")}`;

        return commits.set(id, Map({
            author: commit.get("commitAuthor"),
            message: commit.get("commitMessage"),
            messageBody: commit.get("commitBody"),
            files: commit.get("files").reduce(
                (files, file) => files.add(`${id}/${file.oid}`),
                Set()
            )
        }));
    }
}, Map());
