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
Object.defineProperty(exports, "ClickHouseLogQueryEditor", {
    enumerable: true,
    get: function() {
        return ClickHouseLogQueryEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _react = require("react");
const _immer = require("immer");
const _material = require("@mui/material");
const _constants = require("../constants");
const _components = require("../../components");
const _constants1 = require("../../components/constants");
const _queryeditormodel = require("../query-editor-model");
function ClickHouseLogQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? _constants.DEFAULT_DATASOURCE;
    const { query, handleQueryChange, handleQueryBlur } = (0, _queryeditormodel.useQueryState)(props);
    const handleDatasourceChange = (newDatasourceSelection)=>{
        if (!(0, _pluginsystem.isVariableDatasource)(newDatasourceSelection) && newDatasourceSelection.kind === _constants.DATASOURCE_KIND) {
            onChange((0, _immer.produce)(value, (draft)=>{
                draft.datasource = newDatasourceSelection;
            }));
            return;
        }
        throw new Error('Got unexpected non ClickHouse datasource selection');
    };
    // Immediate query execution on Enter or blur
    const handleQueryExecute = (query)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.query = query;
        }));
    };
    const handleClickHouseQueryChange = (0, _react.useCallback)((e)=>{
        handleQueryChange(e);
    }, [
        handleQueryChange
    ]);
    const examplesStyle = {
        fontSize: '11px',
        color: '#777',
        backgroundColor: '#f5f5f5',
        padding: '8px',
        borderRadius: '4px',
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.3'
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 1.5,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                datasourcePluginKind: _constants.DATASOURCE_KIND,
                value: selectedDatasource,
                onChange: handleDatasourceChange,
                label: "ClickHouse Datasource",
                notched: true
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ClickQLEditor, {
                value: query,
                onChange: handleClickHouseQueryChange,
                onBlur: handleQueryBlur,
                onKeyDown: (event)=>{
                    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                        event.preventDefault();
                        handleQueryExecute(query);
                    }
                },
                placeholder: "Enter ClickHouse SQL query"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("details", {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("summary", {
                        style: {
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: '#666',
                            marginBottom: '8px'
                        },
                        children: "Query Examples"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        style: examplesStyle,
                        children: _constants1.queryExample
                    })
                ]
            })
        ]
    });
}
