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
 * @file Redux repository reducer
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import { createReducer } from "redux-act";
import { Map } from "immutable";

import * as actions from "../actions";

/**
 * This module defines the reducers for the repository namespace.
 *
 * The repository namespace is filled with repository objects, that
 * look as follows:
 *
 * ```json
 * {
 *     "github/tim/elvenkings": {
 *         forge: "gihhub",         // The forge this repository belongs to
 *         user: "tim",             // The user who owns the repository
 *         name: "elvenkings",      // The name of the repository
 *         currentCommit: "<sha>",  // The current master commit sha
 *         meta: {
 *             lastUpdate: 0,       // When we last successfully fetched a sha
 *             error: null          // An error message for the last fetch
 *         },
 *         ui: {
 *             fetching: false,     // Whether we are fetching a new sha
 *             expanded: true,      // Whether the repository is expanded
 *             exists: true         // Whether the repository exists
 *         }
 *     }
 * }
 * ````
 *
 * @module redux/reducers/repositories
 */

export default createReducer({
    /**
     * The addRepository reducer.
     *
     * We expect an immutable.js Map that contains the forge, user and
     * name. All other details are set to default values.
     */
    [actions.addRepository]: (repositories, repository) => {
        const id = repository.get("forge") + "/" +
              repository.get("user") + "/" +
              repository.get("name");

        return repositories.set(id, Map({
            forge: repository.get("forge"),
            user: repository.get("user"),
            name: repository.get("name"),
            currentCommit: null,
            meta: Map({
                lastUpdate: null,
                error: null
            }),
            ui: Map({
                fetching: false,
                expanded: false,
                exists: true
            })
        }));
    },
    /**
     * The startFetchingRepository reducer.
     */
    [actions.startFetchingRepository]: (repositories, id) => repositories.setIn(
        [id, "ui", "fetching"], true
    ),
    /**
     * The completeFetchingRepository reducer.
     */
    [actions.completeFetchingRepository]: (repositories, commit) => {
        const repository = commit.get("repoID");

        let repos = repositories.setIn(
            [repository, "currentCommit"],
            `${commit.get("repoID")}/${commit.get("commitOID")}`
        );
        repos = repos.setIn(
            [repository, "meta", "lastUpdate"],
            commit.get("time")
        );
        repos = repos.setIn(
            [repository, "ui", "fetching"],
            false
        );
        repos = repos.setIn(
            [repository, "ui", "exists"],
            true
        );
        repos = repos.setIn(
            [repository, "meta", "error"],
            null
        );

        return repos;
    },
    [actions.failFetchingRepository]: (repositories, error) => {
        const repository = error.get("repoID");

        let repos = repositories.setIn(
            [repository, "meta", "error"],
            error.get("error").message
        );
        repos = repos.setIn(
            [repository, "meta", "lastUpdate"],
            error.get("time")
        );
        repos = repos.setIn(
            [repository, "ui", "fetching"],
            false
        );
        repos = repos.setIn(
            [repository, "ui", "exists"],
            false
        );

        return repos;
    },
    [actions.toggleExpandRepository]: (repos, id) => repos.updateIn(
        [id, "ui", "expanded"], expanded => !expanded
    )
}, Map());
