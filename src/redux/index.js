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
 * @file Redux configuration module
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import immutable from "redux-persist-transform-immutable";

import * as reducers from "./reducers";

const enhancers = [];
const middleware = [thunk];

if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "function")
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());

const reducer = persistReducer({
    transforms: [immutable()],
    key: "root",
    storage
}, combineReducers(reducers));

const store = createStore(
    reducer,
    {},
    compose(
        applyMiddleware(...middleware),
        ...enhancers
    )
);

const persistor = persistStore(store);

export { store };
export { persistor };
export * from "./actions";
export * from "./asyncActions";
export * from "./selectors";
