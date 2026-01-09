import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { DatasourceSelect, isVariableDatasource, useDatasourceSelectValueToSelector } from '@perses-dev/plugin-system';
import { InputLabel, Stack } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { LogsQLEditor } from '../../components/logsql-editor';
import { VICTORIALOGS_DATASOURCE_KIND } from '../../model';
import { DATASOURCE_KIND, DEFAULT_DATASOURCE } from '../constants';
export function VictoriaLogsLogQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const datasourceSelectValue = datasource ?? DEFAULT_DATASOURCE;
    const selectedDatasource = useDatasourceSelectValueToSelector(datasourceSelectValue, VICTORIALOGS_DATASOURCE_KIND);
    // const { data: client } = useDatasourceClient<VictoriaLogsClient>(selectedDatasource);
    // const victorialogsURL = client?.options.datasourceUrl;
    // Local state for editor value to prevent query_range calls on every keystroke
    const [localQuery, setLocalQuery] = useState(value.query);
    // Update local state when prop changes
    useEffect(()=>{
        setLocalQuery(value.query);
    }, [
        value.query
    ]);
    const handleDatasourceChange = (newDatasourceSelection)=>{
        if (!isVariableDatasource(newDatasourceSelection) && newDatasourceSelection.kind === DATASOURCE_KIND) {
            onChange({
                ...value,
                datasource: newDatasourceSelection
            });
            return;
        }
        throw new Error('Got unexpected non VictoriaLogsQuery datasource selection');
    };
    // Debounced query change handler to prevent excessive query_range calls
    const handleQueryChange = useCallback((newQuery)=>{
        setLocalQuery(newQuery);
    }, []);
    // Immediate query execution on Enter or blur
    const handleQueryExecute = useCallback((query)=>{
        onChange({
            ...value,
            query
        });
    }, [
        onChange,
        value
    ]);
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 1.5,
        paddingBottom: 1,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        sx: {
                            display: 'block',
                            marginBottom: '4px',
                            fontWeight: 500
                        },
                        children: "Datasource"
                    }),
                    /*#__PURE__*/ _jsx(DatasourceSelect, {
                        datasourcePluginKind: DATASOURCE_KIND,
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        label: "VictoriaLogs Datasource",
                        notched: true
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        sx: {
                            display: 'block',
                            marginBottom: '4px',
                            fontWeight: 500
                        },
                        children: "LogsQL Query"
                    }),
                    /*#__PURE__*/ _jsx(LogsQLEditor, {
                        value: localQuery,
                        onChange: handleQueryChange,
                        onBlur: ()=>handleQueryExecute(localQuery),
                        onKeyDown: (event)=>{
                            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                                event.preventDefault();
                                handleQueryExecute(localQuery);
                            }
                        },
                        placeholder: 'Enter LogsQL query (e.g. {job="mysql"} |= "error")'
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=VictoriaLogsLogQueryEditor.js.map