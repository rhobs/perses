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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { HTTPSettingsEditor } from '@perses-dev/plugin-system';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import PlusIcon from 'mdi-material-ui/Plus';
import MinusIcon from 'mdi-material-ui/Minus';
import React, { useState, useRef } from 'react';
import { DEFAULT_SCRAPE_INTERVAL } from './types';
export function PrometheusDatasourceEditor(props) {
    const { value, onChange, isReadonly } = props;
    // Counter for generating unique IDs
    const nextIdRef = useRef(0);
    // Use local state to maintain an array of entries during editing, instead of
    // manipulating a map directly which causes weird UX.
    const [entries, setEntries] = useState(()=>{
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
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(Typography, {
                variant: "h4",
                mb: 2,
                children: "General Settings"
            }),
            /*#__PURE__*/ _jsx(TextField, {
                size: "small",
                fullWidth: true,
                label: "Scrape Interval",
                value: value.scrapeInterval || '',
                placeholder: `Default: ${DEFAULT_SCRAPE_INTERVAL}`,
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
            /*#__PURE__*/ _jsx(HTTPSettingsEditor, {
                value: value,
                onChange: onChange,
                isReadonly: isReadonly,
                initialSpecDirect: initialSpecDirect,
                initialSpecProxy: initialSpecProxy
            }),
            /*#__PURE__*/ _jsx(Typography, {
                variant: "h5",
                mt: 2,
                mb: 1,
                children: "Query Parameters"
            }),
            entries.length > 0 && /*#__PURE__*/ _jsx(_Fragment, {
                children: entries.map((entry)=>/*#__PURE__*/ _jsxs(Box, {
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                        children: [
                            /*#__PURE__*/ _jsx(TextField, {
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
                            /*#__PURE__*/ _jsx(TextField, {
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
                            !isReadonly && /*#__PURE__*/ _jsx(IconButton, {
                                onClick: ()=>removeQueryParam(entry.id),
                                children: /*#__PURE__*/ _jsx(MinusIcon, {})
                            })
                        ]
                    }, entry.id))
            }),
            hasDuplicates && /*#__PURE__*/ _jsx(Typography, {
                variant: "body2",
                color: "error",
                mb: 1,
                children: "Duplicate parameter keys detected. Each key must be unique."
            }),
            entries.length === 0 && /*#__PURE__*/ _jsx(Typography, {
                variant: "body2",
                color: "textSecondary",
                children: "No query parameters configured. Use query parameters to pass additional options to Prometheus (e.g., dedup=false for Thanos)."
            }),
            !isReadonly && /*#__PURE__*/ _jsx(IconButton, {
                onClick: addQueryParam,
                children: /*#__PURE__*/ _jsx(PlusIcon, {})
            })
        ]
    });
}

//# sourceMappingURL=PrometheusDatasourceEditor.js.map