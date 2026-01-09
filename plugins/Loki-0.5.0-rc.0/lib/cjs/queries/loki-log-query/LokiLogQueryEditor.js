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
Object.defineProperty(exports, "LokiLogQueryEditor", {
    enumerable: true,
    get: function() {
        return LokiLogQueryEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _material = require("@mui/material");
const _react = require("react");
const _immer = require("immer");
const _components = require("@perses-dev/components");
const _components1 = require("../../components");
const _model = require("../../model");
const _constants = require("../constants");
const _queryeditormodel = require("../query-editor-model");
function LokiLogQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const datasourceSelectValue = datasource ?? _constants.DEFAULT_DATASOURCE;
    const selectedDatasource = (0, _pluginsystem.useDatasourceSelectValueToSelector)(datasourceSelectValue, _model.LOKI_DATASOURCE_KIND);
    const { query, handleQueryChange, handleQueryBlur } = (0, _queryeditormodel.useQueryState)(props);
    // Get client and time range for autocompletion
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(selectedDatasource);
    const { absoluteTimeRange } = (0, _pluginsystem.useTimeRange)();
    // Create completion config for autocompletion
    const completionConfig = (0, _react.useMemo)(()=>{
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
        if (!(0, _pluginsystem.isVariableDatasource)(newDatasourceSelection) && newDatasourceSelection.kind === _constants.DATASOURCE_KIND) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                const nextDatasource = (0, _model.isDefaultLokiSelector)(newDatasourceSelection) ? undefined : newDatasourceSelection;
                draft.datasource = nextDatasource;
            }));
            return;
        }
        throw new Error('Got unexpected non LokiQuery datasource selection');
    };
    const handleLogsDirection = (_, v)=>onChange((0, _immer.produce)(value, (draft)=>{
            draft.direction = v;
        }));
    // Immediate query execution on Enter or blur
    const handleQueryExecute = (query)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.query = query;
        }));
    };
    const handleLogsQueryChange = (0, _react.useCallback)((e)=>{
        handleQueryChange(e);
    }, [
        handleQueryChange
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 1.5,
        paddingBottom: 1,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                        sx: {
                            display: 'block',
                            marginBottom: '4px',
                            fontWeight: 500
                        },
                        children: "Datasource"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                        datasourcePluginKind: _constants.DATASOURCE_KIND,
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        label: "Loki Datasource",
                        notched: true
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                        sx: {
                            display: 'block',
                            marginBottom: '4px',
                            fontWeight: 500
                        },
                        children: "LogQL Query"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.LogQLEditor, {
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
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                    label: "Order",
                    // description="Percentage means thresholds relative to min & max"
                    control: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.ToggleButtonGroup, {
                        exclusive: true,
                        value: value?.direction ?? 'backward',
                        onChange: handleLogsDirection,
                        sx: {
                            height: '36px',
                            marginLeft: '10px',
                            width: 'max-content'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ToggleButton, {
                                "aria-label": "backward",
                                value: "backward",
                                sx: {
                                    fontWeight: 500
                                },
                                children: "Newest first"
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ToggleButton, {
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
