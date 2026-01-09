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
Object.defineProperty(exports, "VictoriaLogsQueryEditor", {
    enumerable: true,
    get: function() {
        return VictoriaLogsQueryEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _material = require("@mui/material");
const _react = require("react");
const _logsqleditor = require("../../components/logsql-editor");
const _model = require("../../model");
const _constants = require("../constants");
function VictoriaLogsQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const datasourceSelectValue = datasource ?? _constants.DEFAULT_DATASOURCE;
    const selectedDatasource = (0, _pluginsystem.useDatasourceSelectValueToSelector)(datasourceSelectValue, _model.VICTORIALOGS_DATASOURCE_KIND);
    // Local state for editor value to prevent query_range calls on every keystroke
    const [localQuery, setLocalQuery] = (0, _react.useState)(value.query);
    // Update local state when prop changes
    (0, _react.useEffect)(()=>{
        setLocalQuery(value.query);
    }, [
        value.query
    ]);
    const handleDatasourceChange = (newDatasourceSelection)=>{
        if (!(0, _pluginsystem.isVariableDatasource)(newDatasourceSelection) && newDatasourceSelection.kind === _constants.DATASOURCE_KIND) {
            onChange({
                ...value,
                datasource: newDatasourceSelection
            });
            return;
        }
        throw new Error('Got unexpected non VictoriaLogsQuery datasource selection');
    };
    // Debounced query change handler to prevent excessive query_range calls
    const handleQueryChange = (0, _react.useCallback)((newQuery)=>{
        setLocalQuery(newQuery);
    }, []);
    // Immediate query execution on Enter or blur
    const handleQueryExecute = (0, _react.useCallback)((query)=>{
        onChange({
            ...value,
            query
        });
    }, [
        onChange,
        value
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
                        label: "VictoriaLogs Datasource",
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
                        children: "LogsQL Query"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_logsqleditor.LogsQLEditor, {
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
