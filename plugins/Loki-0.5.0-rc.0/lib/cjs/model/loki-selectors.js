// Copyright 2025 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get DEFAULT_LOKI () {
        return DEFAULT_LOKI;
    },
    get LOKI_DATASOURCE_KIND () {
        return LOKI_DATASOURCE_KIND;
    },
    get isDefaultLokiSelector () {
        return isDefaultLokiSelector;
    },
    get isLokiDatasourceSelector () {
        return isLokiDatasourceSelector;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const LOKI_DATASOURCE_KIND = 'LokiDatasource';
const DEFAULT_LOKI = {
    kind: LOKI_DATASOURCE_KIND
};
function isDefaultLokiSelector(datasourceSelectValue) {
    return !(0, _pluginsystem.isVariableDatasource)(datasourceSelectValue) && datasourceSelectValue.name === undefined;
}
function isLokiDatasourceSelector(datasourceSelectValue) {
    return (0, _pluginsystem.isVariableDatasource)(datasourceSelectValue) || datasourceSelectValue.kind === LOKI_DATASOURCE_KIND;
}
