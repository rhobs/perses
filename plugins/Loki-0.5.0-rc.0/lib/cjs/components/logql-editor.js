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
Object.defineProperty(exports, "LogQLEditor", {
    enumerable: true,
    get: function() {
        return LogQLEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _reactcodemirror = /*#__PURE__*/ _interop_require_wildcard(require("@uiw/react-codemirror"));
const _logqlextension = require("./logql-extension");
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
function LogQLEditor(props) {
    const { completionConfig, ...codemirrorProps } = props;
    const theme = (0, _material.useTheme)();
    const isDarkMode = theme.palette.mode === 'dark';
    const logqlExtension = (0, _react.useMemo)(()=>{
        return (0, _logqlextension.LogQLExtension)(completionConfig);
    }, [
        completionConfig
    ]);
    const codemirrorTheme = (0, _react.useMemo)(()=>{
        const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
        return _reactcodemirror.EditorView.theme({
            '&': {
                backgroundColor: 'transparent !important',
                border: `1px solid ${borderColor}`,
                borderRadius: `${theme.shape.borderRadius}px`
            },
            '&.cm-focused.cm-editor': {
                outline: 'none'
            },
            '.cm-content': {
                padding: '8px'
            }
        });
    }, [
        theme
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactcodemirror.default, {
        ...codemirrorProps,
        theme: isDarkMode ? 'dark' : 'light',
        basicSetup: {
            lineNumbers: false,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
            foldGutter: false,
            syntaxHighlighting: true
        },
        extensions: [
            _reactcodemirror.EditorView.lineWrapping,
            logqlExtension,
            codemirrorTheme
        ],
        placeholder: 'Example: {job="my-service"} |= "error"'
    });
}
