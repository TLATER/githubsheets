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
 * @file Redux action collection
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import { Map, Set } from "immutable";
import { createAction } from "redux-act";

/**
 * Add a repository to the state.
 *
 * The repository will simply be added, none of its state is
 * validated, and its current commit is not fetched.
 *
 * @arg forge - The forge who we should fetch from.
 * @arg user - The forge user who we should fetch from.
 * @arg name - The name of the repository that we should fetch.
 */
export const addRepository = createAction("ADD_REPOSITORY",
    (forge, user, name) => Map({
        forge: forge,
        user: user,
        name: name
    })
);

/**
 * Start fetching a repository.
 *
 * This indicates that we started fetching a repository's latest
 * master commit.
 *
 * @arg id - The id of the repository that is being fetched.
 */
export const startFetchingRepository =
    createAction("START_FETCHING_REPOSITORY", id => id);

/**
 * Complete the repository fetch cycle.
 *
 * @arg id - The id of the repository that is being fetched.
 * @arg commit - The fetched commit
 */
export const completeFetchingRepository =
    createAction("COMPLETE_FETCHING_REPOSITORY", (id, commit) => {
        return Map({
            repoID: id,
            time: Date.now(),
            commitOID: commit.oid,
            commitMessage: commit.message,
            commitBody: commit.messageBody,
            commitAuthor: Map(commit.author),
            files: Set(commit.tree.entries)
        });
    });

/**
 * Expand/retract the given repository.
 *
 * @arg id - The id of the repository to expand.
 */
export const toggleExpandRepository =
    createAction("TOGGLE_EXPAND_REPOSITORY", id => id);

export const fetchFiles = createAction("FETCH_FILES");
export const addFile = createAction("ADD_FILE", file => file);
