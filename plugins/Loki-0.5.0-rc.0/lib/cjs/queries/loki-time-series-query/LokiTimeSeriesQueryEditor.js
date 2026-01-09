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
Object.defineProperty(exports, "LokiQueryEditor", {
    enumerable: true,
    get: function() {
        return LokiQueryEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _material = require("@mui/material");
const _react = require("react");
const _immer = require("immer");
const _components = require("../../components");
const _model = require("../../model");
const _constants = require("../constants");
const _queryeditormodel = require("../query-editor-model");
function LokiQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const datasourceSelectValue = datasource ?? _constants.DEFAULT_DATASOURCE;
    const selectedDatasource = (0, _pluginsystem.useDatasourceSelectValueToSelector)(datasourceSelectValue, _model.LOKI_DATASOURCE_KIND);
    const { query, handleQueryChange, handleQueryBlur } = (0, _queryeditormodel.useQueryState)(props);
    const handleDatasourceChange = (newDatasourceSelection)=>{
        if (!(0, _pluginsystem.isVariableDatasource)(newDatasourceSelection) && newDatasourceSelection.kind === _constants.DATASOURCE_KIND) {
            onChange((0, _immer.produce)(value, (draft)=>{
                draft.datasource = newDatasourceSelection;
            }));
            return;
        }
        throw new Error('Got unexpected non LokiQuery datasource selection');
    };
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
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.LogQLEditor, {
                        value: query,
                        onChange: handleLogsQueryChange,
                        onBlur: handleQueryBlur,
                        onKeyDown: (event)=>{
                            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                                event.preventDefault();
                                handleQueryExecute(query);
                            }
                        },
                        placeholder: 'Enter LogQL query (e.g. {job="mysql"} |= "error")'
                    })
                ]
            })
        ]
    });
}
