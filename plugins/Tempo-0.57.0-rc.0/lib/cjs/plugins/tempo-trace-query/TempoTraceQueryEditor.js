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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get LimitSelect () {
        return LimitSelect;
    },
    get TempoTraceQueryEditor () {
        return TempoTraceQueryEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _pluginsystem = require("@perses-dev/plugin-system");
const _immer = require("immer");
const _react = require("react");
const _model = require("../../model");
const _AttributeFilters = require("../../components/AttributeFilters");
const _components1 = require("../../components");
const _queryeditormodel = require("./query-editor-model");
function TempoTraceQueryEditor(props) {
    const { onChange, value, value: { datasource, limit } } = props;
    const datasourceSelectValue = datasource ?? _model.DEFAULT_TEMPO;
    const selectedDatasource = (0, _pluginsystem.useDatasourceSelectValueToSelector)(datasourceSelectValue, _model.TEMPO_DATASOURCE_KIND);
    const datasourceSelectLabelID = (0, _components.useId)('tempo-datasource-label'); // for panels with multiple queries, this component is rendered multiple times on the same page
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(selectedDatasource);
    const { query, handleQueryChange, handleQueryBlur } = (0, _queryeditormodel.useQueryState)(props);
    const [showAttributeFilters, setShowAttributeFilters] = (0, _react.useState)(()=>isSimpleTraceQLQuery(query));
    const handleDatasourceChange = (next)=>{
        if ((0, _model.isTempoDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                const nextDatasource = (0, _model.isDefaultTempoSelector)(next) ? undefined : next;
                draft.datasource = nextDatasource;
            }));
            return;
        }
        throw new Error('Got unexpected non-Tempo datasource selector');
    };
    const runQuery = (newQuery)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.query = newQuery;
        }));
    };
    const handleTraceQueryChange = (0, _react.useCallback)((e)=>{
        handleQueryChange(e);
    }, [
        handleQueryChange
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.FormControl, {
                margin: "dense",
                fullWidth: false,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                    datasourcePluginKind: _model.TEMPO_DATASOURCE_KIND,
                    value: datasourceSelectValue,
                    onChange: handleDatasourceChange,
                    labelId: datasourceSelectLabelID,
                    label: "Tempo Datasource",
                    notched: true
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                direction: "row",
                spacing: 2,
                sx: {
                    alignItems: 'flex-start'
                },
                children: [
                    showAttributeFilters ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_AttributeFilters.AttributeFilters, {
                        client: client,
                        query: query,
                        setQuery: runQuery
                    }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.TraceQLEditor, {
                        client: client,
                        value: query,
                        onChange: handleTraceQueryChange,
                        onBlur: handleQueryBlur
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                        onClick: ()=>setShowAttributeFilters(!showAttributeFilters),
                        children: showAttributeFilters ? 'Show query' : 'Hide query'
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(LimitSelect, {
                        value: limit ?? 20,
                        setValue: (newLimit)=>onChange((0, _immer.produce)(value, (draft)=>{
                                draft.limit = newLimit;
                            }))
                    })
                ]
            })
        ]
    });
}
function isSimpleTraceQLQuery(query) {
    // if a query can be transformed to a filter and back to the original query, we can show the attribute filter toolbar
    return query == '' || (0, _components1.filterToTraceQL)((0, _components1.traceQLToFilter)(query)) === query;
}
const limitOptions = [
    20,
    50,
    100,
    500,
    1000,
    5000
];
function LimitSelect(props) {
    const { value, setValue } = props;
    // the outer <Box> is required, because <FormControl> has display: inline-flex, which doesn't work with the parent <Stack> of the query editor
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.FormControl, {
            size: "small",
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                    id: "max-traces-label",
                    children: "Max Traces"
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Select, {
                    labelId: "max-traces-label",
                    id: "max-traces-select",
                    value: value,
                    label: "Max Traces",
                    onChange: (e)=>setValue(typeof e.target.value === 'number' ? e.target.value : parseInt(e.target.value)),
                    sx: {
                        width: 110
                    },
                    children: limitOptions.map((option)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                            value: option,
                            children: option
                        }, option))
                })
            ]
        })
    });
}
