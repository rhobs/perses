// Copyright 2023 The Perses Authors
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
Object.defineProperty(exports, "PrometheusDatasourceEditor", {
    enumerable: true,
    get: function() {
        return PrometheusDatasourceEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _material = require("@mui/material");
const _Plus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Plus"));
const _Minus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Minus"));
const _react = /*#__PURE__*/ _interop_require_wildcard(require("react"));
const _types = require("./types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function PrometheusDatasourceEditor(props) {
    const { value, onChange, isReadonly } = props;
    // Counter for generating unique IDs
    const nextIdRef = (0, _react.useRef)(0);
    // Use local state to maintain an array of entries during editing, instead of
    // manipulating a map directly which causes weird UX.
    const [entries, setEntries] = (0, _react.useState)(()=>{
        const queryParams = value.queryParams ?? {};
        return Object.entries(queryParams).map(([key, value])=>({
                id: String(nextIdRef.current++),
                key,
                value
            }));
    });
    // Check for duplicate keys
    const keyMap = new Map();
    const duplicateKeys = new Set();
    entries.forEach(({ key })=>{
        if (key !== '') {
            const count = (keyMap.get(key) || 0) + 1;
            keyMap.set(key, count);
            if (count > 1) {
                duplicateKeys.add(key);
            }
        }
    });
    const hasDuplicates = duplicateKeys.size > 0;
    // Convert entries array to object and trigger onChange
    const syncToParent = (newEntries)=>{
        const newParams = {};
        newEntries.forEach(({ key, value })=>{
            if (key !== '') {
                newParams[key] = value;
            }
        });
        onChange({
            ...value,
            queryParams: Object.keys(newParams).length > 0 ? newParams : undefined
        });
    };
    const handleQueryParamChange = (id, field, newValue)=>{
        const newEntries = entries.map((entry)=>{
            if (entry.id !== id) return entry;
            return field === 'key' ? {
                ...entry,
                key: newValue
            } : {
                ...entry,
                value: newValue
            };
        });
        setEntries(newEntries);
        syncToParent(newEntries);
    };
    const addQueryParam = ()=>{
        const newEntries = [
            ...entries,
            {
                id: String(nextIdRef.current++),
                key: '',
                value: ''
            }
        ];
        setEntries(newEntries);
        syncToParent(newEntries);
    };
    const removeQueryParam = (id)=>{
        const newEntries = entries.filter((entry)=>entry.id !== id);
        setEntries(newEntries);
        syncToParent(newEntries);
    };
    const initialSpecDirect = {
        directUrl: ''
    };
    const initialSpecProxy = {
        proxy: {
            kind: 'HTTPProxy',
            spec: {
                allowedEndpoints: [
                    // list of standard endpoints suggested by default
                    {
                        endpointPattern: '/api/v1/labels',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/api/v1/series',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/api/v1/metadata',
                        method: 'GET'
                    },
                    {
                        endpointPattern: '/api/v1/query',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/api/v1/query_range',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/api/v1/label/([a-zA-Z0-9_-]+)/values',
                        method: 'GET'
                    },
                    {
                        endpointPattern: '/api/v1/parse_query',
                        method: 'POST'
                    }
                ],
                url: ''
            }
        }
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                variant: "h4",
                mb: 2,
                children: "General Settings"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                size: "small",
                fullWidth: true,
                label: "Scrape Interval",
                value: value.scrapeInterval || '',
                placeholder: `Default: ${_types.DEFAULT_SCRAPE_INTERVAL}`,
                InputProps: {
                    readOnly: isReadonly
                },
                InputLabelProps: {
                    shrink: isReadonly ? true : undefined
                },
                onChange: (e)=>onChange({
                        ...value,
                        scrapeInterval: e.target.value
                    }),
                helperText: "Set it to match the typical scrape interval used in your Prometheus instance."
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.HTTPSettingsEditor, {
                value: value,
                onChange: onChange,
                isReadonly: isReadonly,
                initialSpecDirect: initialSpecDirect,
                initialSpecProxy: initialSpecProxy
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                variant: "h5",
                mt: 2,
                mb: 1,
                children: "Query Parameters"
            }),
            entries.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
                children: entries.map((entry)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                                size: "small",
                                label: "Key",
                                value: entry.key,
                                placeholder: "Parameter name",
                                disabled: isReadonly,
                                onChange: (e)=>handleQueryParamChange(entry.id, 'key', e.target.value),
                                error: duplicateKeys.has(entry.key),
                                sx: {
                                    minWidth: 150
                                }
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                                size: "small",
                                label: "Value",
                                value: entry.value,
                                placeholder: "Parameter value",
                                disabled: isReadonly,
                                onChange: (e)=>handleQueryParamChange(entry.id, 'value', e.target.value),
                                sx: {
                                    minWidth: 150,
                                    flexGrow: 1
                                }
                            }),
                            !isReadonly && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                onClick: ()=>removeQueryParam(entry.id),
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Minus.default, {})
                            })
                        ]
                    }, entry.id))
            }),
            hasDuplicates && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                variant: "body2",
                color: "error",
                mb: 1,
                children: "Duplicate parameter keys detected. Each key must be unique."
            }),
            entries.length === 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                variant: "body2",
                color: "textSecondary",
                children: "No query parameters configured. Use query parameters to pass additional options to Prometheus (e.g., dedup=false for Thanos)."
            }),
            !isReadonly && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                onClick: addQueryParam,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {})
            })
        ]
    });
}
