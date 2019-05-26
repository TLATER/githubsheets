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
 * @file Main entry point
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

// Load React
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Load page CSS
import bootstrap_ from "bootstrap";
import styles_ from "./styles/main.scss";

// Load components
import RepositoryList from "./components/repository_list.jsx";
import Display from "./components/display.jsx";
import { store } from "./redux";

function main() {
    ReactDOM.render(
        <Provider store={store}>
            <RepositoryList />
        </Provider>,
        document.getElementById("repository-list-container")
    );

    ReactDOM.render(
        <Provider store={store}>
            <Display />
        </Provider>,
        document.getElementById("content")
    );
}

window.onload = main;
