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
Object.defineProperty(exports, "VictoriaLogsFieldValuesVariableEditor", {
    enumerable: true,
    get: function() {
        return VictoriaLogsFieldValuesVariableEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _pluginsystem = require("@perses-dev/plugin-system");
const _immer = require("immer");
const _react = require("react");
const _model = require("../../model");
const _utils = require("../utils");
function VictoriaLogsFieldValuesVariableEditor(props) {
    const { onChange, value, value: { datasource, query, field } } = props;
    const datasourceSelectValue = datasource ?? _model.DEFAULT_VICTORIALOGS;
    const selectedDatasource = (0, _pluginsystem.useDatasourceSelectValueToSelector)(datasourceSelectValue, _model.VICTORIALOGS_DATASOURCE_KIND);
    const { data: fieldNames, isLoading: isFieldNamesOptionsLoading } = (0, _utils.useFieldNames)(query, selectedDatasource);
    const handleDatasourceChange = (0, _react.useCallback)((next)=>{
        if ((0, _pluginsystem.isVariableDatasource)(next) || (0, _model.isVictoriaLogsDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = !(0, _pluginsystem.isVariableDatasource)(next) && (0, _model.isDefaultVictoriaLogsSelector)(next) ? undefined : next;
            }));
            return;
        }
        throw new Error('Got unexpected non-VictoriaLogs datasource selector');
    }, [
        onChange,
        value
    ]);
    const handleQueryChange = (0, _react.useCallback)((event)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.query = event.target.value;
        }));
    }, [
        onChange,
        value
    ]);
    const handleFieldChange = (0, _react.useCallback)((_, newValue)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.field = newValue || '';
        }));
    }, [
        onChange,
        value
    ]);
    const fieldNamesOptions = (0, _react.useMemo)(()=>{
        return fieldNames?.values.map((o)=>o.value) || [];
    }, [
        fieldNames
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.FormControl, {
                margin: "dense",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                    datasourcePluginKind: "VictoriaLogsDatasource",
                    value: datasourceSelectValue,
                    onChange: handleDatasourceChange,
                    readOnly: props.isReadonly,
                    labelId: "victorialogs-datasource-field",
                    label: "VictoriaLogs Datasource"
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Autocomplete, {
                freeSolo: true,
                disableClearable: true,
                value: field,
                loading: isFieldNamesOptionsLoading,
                options: fieldNamesOptions,
                renderInput: (params)=>{
                    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                        ...params,
                        required: true,
                        label: "Field Name",
                        variant: "outlined"
                    });
                },
                onChange: handleFieldChange
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                required: true,
                label: "Query",
                InputLabelProps: {
                    shrink: props.isReadonly ? true : undefined
                },
                InputProps: {
                    readOnly: props.isReadonly
                },
                value: query,
                onChange: handleQueryChange
            })
        ]
    });
}
