const gql = require("graphql/language/printer");
const github_queries = require("./queries/github.gql");

const GH_API_ENDPOINT = "https://api.github.com/graphql";

class GitHub {
    constructor(token) {
        this._token = token;
    }

    request(query, variables) {
        return fetch(GH_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "bearer " + this._token
            },
            body: JSON.stringify({
                query: gql.print(query),
                variables: variables
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
                    .then(body => {
                        if (body.errors)
                            throw new Error(`GitHub API request failed:
                                             ${body.errors}`);
                        else
                            return body;
                    });

            } else
                throw new Error(`GitHub API request failed: ${response}`);
        }).catch(error => {
            throw new Error(`Github API request failed: ${error}`);
        });
    }

    get_commit(user, repository, sha) {
        const variables = {
            user: user,
            repository: repository,
            sha: sha
        };

        return this.request(github_queries.getCommitBySha, variables);
    }

    get_file(user, repository, oid) {
        const variables = {
            user: user,
            repository: repository,
            oid: oid
        };

        return this.request(github_queries.getFileByOid, variables);
    }
}

module.exports = GitHub;
