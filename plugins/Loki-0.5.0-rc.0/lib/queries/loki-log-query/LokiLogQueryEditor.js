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
import { DatasourceSelect, isVariableDatasource, useDatasourceSelectValueToSelector, useDatasourceClient, useTimeRange } from '@perses-dev/plugin-system';
import { InputLabel, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { produce } from 'immer';
import { OptionsEditorControl } from '@perses-dev/components';
import { LogQLEditor } from '../../components';
import { isDefaultLokiSelector, LOKI_DATASOURCE_KIND } from '../../model';
import { DATASOURCE_KIND, DEFAULT_DATASOURCE } from '../constants';
import { useQueryState } from '../query-editor-model';
export function LokiLogQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const datasourceSelectValue = datasource ?? DEFAULT_DATASOURCE;
    const selectedDatasource = useDatasourceSelectValueToSelector(datasourceSelectValue, LOKI_DATASOURCE_KIND);
    const { query, handleQueryChange, handleQueryBlur } = useQueryState(props);
    // Get client and time range for autocompletion
    const { data: client } = useDatasourceClient(selectedDatasource);
    const { absoluteTimeRange } = useTimeRange();
    // Create completion config for autocompletion
    const completionConfig = useMemo(()=>{
        if (!client) return undefined;
        return {
            client,
            timeRange: absoluteTimeRange
        };
    }, [
        client,
        absoluteTimeRange
    ]);
    const handleDatasourceChange = (newDatasourceSelection)=>{
        if (!isVariableDatasource(newDatasourceSelection) && newDatasourceSelection.kind === DATASOURCE_KIND) {
            onChange(produce(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                const nextDatasource = isDefaultLokiSelector(newDatasourceSelection) ? undefined : newDatasourceSelection;
                draft.datasource = nextDatasource;
            }));
            return;
        }
        throw new Error('Got unexpected non LokiQuery datasource selection');
    };
    const handleLogsDirection = (_, v)=>onChange(produce(value, (draft)=>{
            draft.direction = v;
        }));
    // Immediate query execution on Enter or blur
    const handleQueryExecute = (query)=>{
        onChange(produce(value, (draft)=>{
            draft.query = query;
        }));
    };
    const handleLogsQueryChange = useCallback((e)=>{
        handleQueryChange(e);
    }, [
        handleQueryChange
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
                        label: "Loki Datasource",
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
                        children: "LogQL Query"
                    }),
                    /*#__PURE__*/ _jsx(LogQLEditor, {
                        value: query,
                        onChange: handleLogsQueryChange,
                        onBlur: handleQueryBlur,
                        onKeyDown: (event)=>{
                            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                                event.preventDefault();
                                handleQueryExecute(query);
                            }
                        },
                        placeholder: 'Enter LogQL query (e.g. {job="mysql"} |= "error")',
                        completionConfig: completionConfig
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                children: /*#__PURE__*/ _jsx(OptionsEditorControl, {
                    label: "Order",
                    // description="Percentage means thresholds relative to min & max"
                    control: /*#__PURE__*/ _jsxs(ToggleButtonGroup, {
                        exclusive: true,
                        value: value?.direction ?? 'backward',
                        onChange: handleLogsDirection,
                        sx: {
                            height: '36px',
                            marginLeft: '10px',
                            width: 'max-content'
                        },
                        children: [
                            /*#__PURE__*/ _jsx(ToggleButton, {
                                "aria-label": "backward",
                                value: "backward",
                                sx: {
                                    fontWeight: 500
                                },
                                children: "Newest first"
                            }),
                            /*#__PURE__*/ _jsx(ToggleButton, {
                                "aria-label": "forward",
                                value: "forward",
                                sx: {
                                    fontWeight: 500
                                },
                                children: "Oldest first"
                            })
                        ]
                    })
                })
            })
        ]
    });
}

//# sourceMappingURL=LokiLogQueryEditor.js.map