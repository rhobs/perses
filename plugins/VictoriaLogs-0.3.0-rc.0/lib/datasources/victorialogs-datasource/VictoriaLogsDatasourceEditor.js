import { jsx as _jsx } from "react/jsx-runtime";
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
import { HTTPSettingsEditor } from '@perses-dev/plugin-system';
export function VictoriaLogsDatasourceEditor(props) {
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
    return /*#__PURE__*/ _jsx(HTTPSettingsEditor, {
        value: value,
        onChange: onChange,
        isReadonly: isReadonly,
        initialSpecDirect: initialSpecDirect,
        initialSpecProxy: initialSpecProxy
    });
}

//# sourceMappingURL=VictoriaLogsDatasourceEditor.js.map