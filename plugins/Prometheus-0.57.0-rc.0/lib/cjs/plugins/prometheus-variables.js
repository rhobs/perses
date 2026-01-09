// Copyright 2024 The Perses Authors
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
    get PrometheusLabelNamesVariableEditor () {
        return PrometheusLabelNamesVariableEditor;
    },
    get PrometheusLabelValuesVariableEditor () {
        return PrometheusLabelValuesVariableEditor;
    },
    get PrometheusPromQLVariableEditor () {
        return PrometheusPromQLVariableEditor;
    },
    get capturingMatrix () {
        return capturingMatrix;
    },
    get capturingVector () {
        return capturingVector;
    },
    get stringArrayToVariableOptions () {
        return stringArrayToVariableOptions;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _pluginsystem = require("@perses-dev/plugin-system");
const _immer = require("immer");
const _react = require("react");
const _components = require("../components");
const _model = require("../model");
const _MatcherEditor = require("./MatcherEditor");
function PrometheusLabelValuesVariableEditor(props) {
    const { onChange, value, value: { datasource } } = props;
    const selectedDatasource = datasource ?? _model.DEFAULT_PROM;
    const handleDatasourceChange = (0, _react.useCallback)((next)=>{
        if ((0, _pluginsystem.isVariableDatasource)(next) || (0, _model.isPrometheusDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = !(0, _pluginsystem.isVariableDatasource)(next) && (0, _model.isDefaultPromSelector)(next) ? undefined : next;
            }));
            return;
        }
        throw new Error('Got unexpected non-Prometheus datasource selector');
    }, [
        onChange,
        value
    ]);
    const handleLabelChange = (0, _react.useCallback)((e)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.labelName = e.target.value;
        }));
    }, [
        onChange,
        value
    ]);
    const handleMatchEditorsChange = (0, _react.useCallback)((matchers)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.matchers = matchers;
        }));
    }, [
        onChange,
        value
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.FormControl, {
                margin: "dense",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                    datasourcePluginKind: "PrometheusDatasource",
                    value: selectedDatasource,
                    onChange: handleDatasourceChange,
                    readOnly: props.isReadonly,
                    labelId: "prom-datasource-label",
                    label: "Prometheus Datasource"
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                label: "Label Name",
                required: true,
                value: props.value.labelName,
                onChange: handleLabelChange,
                slotProps: {
                    input: {
                        readOnly: props.isReadonly
                    }
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_MatcherEditor.MatcherEditor, {
                matchers: props.value.matchers ?? [],
                onChange: handleMatchEditorsChange,
                isReadonly: props.isReadonly
            })
        ]
    });
}
function PrometheusLabelNamesVariableEditor(props) {
    const { onChange, value, value: { datasource } } = props;
    const selectedDatasource = datasource ?? _model.DEFAULT_PROM;
    const handleDatasourceChange = (0, _react.useCallback)((next)=>{
        if ((0, _pluginsystem.isVariableDatasource)(next) || (0, _model.isPrometheusDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = !(0, _pluginsystem.isVariableDatasource)(next) && (0, _model.isDefaultPromSelector)(next) ? undefined : next;
            }));
            return;
        }
        throw new Error('Got unexpected non-Prometheus datasource selector');
    }, [
        onChange,
        value
    ]);
    const handleMatchEditorChange = (0, _react.useCallback)((matchers)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.matchers = matchers;
        }));
    }, [
        onChange,
        value
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.FormControl, {
                margin: "dense",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                    datasourcePluginKind: "PrometheusDatasource",
                    value: selectedDatasource,
                    onChange: handleDatasourceChange,
                    disabled: props.isReadonly,
                    labelId: "prom-datasource-label",
                    label: "Prometheus Datasource"
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_MatcherEditor.MatcherEditor, {
                matchers: props.value.matchers ?? [],
                isReadonly: props.isReadonly,
                onChange: handleMatchEditorChange
            })
        ]
    });
}
function PrometheusPromQLVariableEditor(props) {
    const { onChange, value, value: { datasource } } = props;
    const datasourceSelectValue = datasource ?? _model.DEFAULT_PROM;
    const selectedDatasource = (0, _pluginsystem.useDatasourceSelectValueToSelector)(datasourceSelectValue, _model.PROM_DATASOURCE_KIND);
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(selectedDatasource);
    const promURL = client?.options.datasourceUrl;
    const handleDatasourceChange = (0, _react.useCallback)((next)=>{
        if ((0, _pluginsystem.isVariableDatasource)(next) || (0, _model.isPrometheusDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = !(0, _pluginsystem.isVariableDatasource)(next) && (0, _model.isDefaultPromSelector)(next) ? undefined : next;
            }));
            return;
        }
        throw new Error('Got unexpected non-Prometheus datasource selector');
    }, [
        value,
        onChange
    ]);
    const handleOnBlurPromQlChange = (0, _react.useCallback)((e)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.expr = e.target.textContent ?? '';
        }));
    }, [
        onChange,
        value
    ]);
    const handleLabelNameChange = (0, _react.useCallback)((e)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.labelName = e.target.value;
        }));
    }, [
        onChange,
        value
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.FormControl, {
                margin: "dense",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                    datasourcePluginKind: _model.PROM_DATASOURCE_KIND,
                    value: datasourceSelectValue,
                    onChange: handleDatasourceChange,
                    labelId: "prom-datasource-label",
                    label: "Prometheus Datasource",
                    disabled: props.isReadonly
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.PromQLEditor, {
                completeConfig: {
                    remote: {
                        url: promURL
                    }
                },
                value: value.expr,
                datasource: selectedDatasource,
                onBlur: handleOnBlurPromQlChange,
                readOnly: props.isReadonly,
                width: "100%"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                label: "Label Name",
                required: true,
                value: props.value.labelName,
                slotProps: {
                    input: {
                        readOnly: props.isReadonly
                    }
                },
                onChange: handleLabelNameChange
            })
        ]
    });
}
function capturingMatrix(matrix, labelName) {
    const captured = new Set();
    for (const sample of matrix.result){
        const value = sample.metric[labelName];
        if (value !== undefined) {
            captured.add(value);
        }
    }
    return Array.from(captured.values());
}
function capturingVector(vector, labelName) {
    const captured = new Set();
    for (const sample of vector.result){
        const value = sample.metric[labelName];
        if (value !== undefined) {
            captured.add(value);
        }
    }
    return Array.from(captured.values());
}
const stringArrayToVariableOptions = (values)=>{
    if (!values) return [];
    return values.map((value)=>({
            value,
            label: value
        }));
};
