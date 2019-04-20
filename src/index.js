const GitHub = require("./github");
const Sheet = require("./sheet");

const bootstrap = require("bootstrap");

const repository_prompt = require("./templates/repository_prompt.handlebars");
const commit_template = require("./templates/commit.handlebars");


function show_file(user, repository, oid) {
    const gh = new GitHub("fake token");
    gh.get_file(user, repository, oid)
        .then(file => {
            const sheet = new Sheet(file.data.repository.object.text);
            document.body.innerHTML = sheet.render();
        });
}

function list_files(user, repository) {
    const gh = new GitHub("fake token");
    gh.get_commit(user, repository, "master")
        .then(commit => {
            document.body.innerHTML = commit_template(commit.data.repository);
            document.querySelectorAll("#commit li").forEach(node => {
                node.addEventListener("click", () => {
                    const oid = node.getAttribute("data-oid");
                    show_file(user, repository, oid);
                });
            });
        });
}

function main() {
    document.body.innerHTML = repository_prompt();
    let prompt = document.querySelector("#repository_prompt");

    prompt.addEventListener("submit", e => {
        if (e.preventDefault)
            e.preventDefault();

        list_files(prompt.username.value, prompt.repository.value);

        return false;
    });
}

window.onload = main;
