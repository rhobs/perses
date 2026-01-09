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
Object.defineProperty(exports, "DataLinkEditor", {
    enumerable: true,
    get: function() {
        return DataLinkEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _material = require("@mui/material");
const _Plus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Plus"));
const _Minus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Minus"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const DataLinkEditor = (props)=>{
    const { onChange, column, column: { dataLink } } = props;
    if (!dataLink) {
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
            sx: {
                width: '100%',
                alignItems: 'center'
            },
            direction: "row",
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                    flex: 1,
                    variant: "subtitle1",
                    mb: 2,
                    fontStyle: "italic",
                    children: "No link defined"
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                    style: {
                        width: 'fit-content',
                        height: 'fit-content'
                    },
                    onClick: ()=>onChange({
                            ...column,
                            dataLink: {
                                url: '',
                                openNewTab: true,
                                title: ''
                            }
                        }),
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {})
                })
            ]
        });
    }
    const { url, openNewTab, title } = dataLink;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        sx: {
            width: '100%',
            alignItems: 'center'
        },
        direction: "row",
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.LinkEditorForm, {
                mode: "inline",
                url: {
                    label: 'Url',
                    onChange: (url)=>{
                        onChange({
                            ...column,
                            dataLink: {
                                ...dataLink,
                                url
                            }
                        });
                    },
                    value: url,
                    placeholder: 'URL',
                    error: {
                        hasError: false,
                        helperText: ''
                    }
                },
                name: {
                    label: 'Name',
                    onChange: (title)=>{
                        onChange({
                            ...column,
                            dataLink: {
                                ...dataLink,
                                title
                            }
                        });
                    },
                    value: title ?? '',
                    placeholder: 'Name'
                },
                newTabOpen: {
                    label: 'Open in new tab',
                    onChange: (openNewTab)=>{
                        onChange({
                            ...column,
                            dataLink: {
                                ...dataLink,
                                openNewTab
                            }
                        });
                    },
                    value: openNewTab
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                style: {
                    width: 'fit-content',
                    height: 'fit-content'
                },
                onClick: ()=>{
                    onChange({
                        ...column,
                        dataLink: undefined
                    });
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Minus.default, {})
            })
        ]
    });
};
