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
 * @file Redux async action collection
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import { GitHub } from "../forges";
import * as actions from "./actions";

export function fetchRepository(forge, user, name) {
    return function(dispatch, getState) {
        forge = "github"; // hardcoded for now

        const id = `${forge}/${user}/${name}`;
        const token = getState().forges.get(forge).get("token");

        dispatch(actions.startFetchingRepository(id));

        return GitHub.getCommit(token, user, name, "master")
            .then(result => {
                const commit = result.data.repository.object;
                dispatch(actions.completeFetchingRepository(id, commit));
            });
    };
}

/*
 * export function fetchRepositoryFiles(user, name, commit) {
 *     return function(_dispatch, getState) {
 *         const forge = "github";
 *
 *         actions.fetchFiles();
 *
 *         const token = getState().forges.get(forge).get("token");
 *
 *         return GitHub.getTree(token, user, name, commit)
 *             .then(result => {
 *                 const files = result.data.repository.object.tree.entries;
 *                 for (const file of files) {
 *                     actions.addFile(Map({
 *                         oid: file.oid,
 *                         name: file.name
 *                     }));
 *                 }
 *             });
 *     };
 * } */
