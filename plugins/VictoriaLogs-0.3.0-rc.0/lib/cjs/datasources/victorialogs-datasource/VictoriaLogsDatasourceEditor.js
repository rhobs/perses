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
Object.defineProperty(exports, "VictoriaLogsDatasourceEditor", {
    enumerable: true,
    get: function() {
        return VictoriaLogsDatasourceEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
function VictoriaLogsDatasourceEditor(props) {
    const { value, onChange, isReadonly } = props;
    const initialSpecDirect = {
        directUrl: ''
    };
    const initialSpecProxy = {
        proxy: {
            kind: 'HTTPProxy',
            spec: {
                allowedEndpoints: [
                    {
                        endpointPattern: '/select/logsql/stats_query',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/stats_query_range',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/field_names',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/field_values',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/tail',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/query',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/hits',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/facets',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/stream_ids',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/streams',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/stream_field_names',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/select/logsql/stream_field_values',
                        method: 'POST'
                    }
                ],
                url: ''
            }
        }
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.HTTPSettingsEditor, {
        value: value,
        onChange: onChange,
        isReadonly: isReadonly,
        initialSpecDirect: initialSpecDirect,
        initialSpecProxy: initialSpecProxy
    });
}
