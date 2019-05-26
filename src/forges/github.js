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
 * @file GitHub API interaction module
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import { fromJS } from "immutable";
import { print } from "graphql/language/printer";
import githubQueries from "./github.gql";

const GH_API_ENDPOINT = "https://api.github.com/graphql";

async function request(token, query, variables) {
    const response = await fetch(GH_API_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "bearer " + token
        },
        body: JSON.stringify({
            query: print(query),
            variables: variables
        })
    });

    if (response.ok) {
        const body = await response.json();
        if (body.errors) {
            const errors = body.errors.map(e => e.message);
            throw new Error(`GitHub API request failed: ${errors}`);
        } else
            return body;
    } else {
        console.log(await response.json());
        throw new Error(`Github API request failed: ${response.statusText}`);
    }
}


export default {
    getCommit: function getCommit(token, user, repository, sha) {
        const variables = {
            user: user,
            repository: repository,
            sha: sha
        };

        return request(token, githubQueries.getCommit, variables);
    },
    getTree: function getTree(token, user, repository, oid) {
        const variables = {
            user: user,
            repository: repository,
            oid: oid
        };

        return request(token, githubQueries.getCommitFiles, variables);
    },
    getFile: function getFile(token, user, repository, oid) {
        const variables = {
            user: user,
            repository: repository,
            oid: oid
        };

        return request(token, githubQueries.getRepositoryFile, variables);
    }
};
