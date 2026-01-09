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
    get DownloadTraceAction () {
        return DownloadTraceAction;
    },
    get getFilename () {
        return getFilename;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _DownloadOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/DownloadOutline"));
const _react = require("react");
const _dashboards = require("@perses-dev/dashboards");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function DownloadTraceAction(props) {
    const { queryResults } = props;
    const trace = queryResults[0]?.data?.trace;
    const handleClick = (0, _react.useCallback)(()=>{
        if (!trace) return;
        const data = JSON.stringify(trace, null, 2);
        const filename = getFilename(trace);
        downloadFile(filename, 'application/json', data);
    }, [
        trace
    ]);
    if (!trace) {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.InfoTooltip, {
        description: "download OTLP/JSON trace",
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_dashboards.HeaderIconButton, {
            "aria-label": "download OTLP/JSON trace",
            size: "small",
            onClick: handleClick,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_DownloadOutline.default, {
                fontSize: "inherit"
            })
        })
    });
}
function getFilename(trace) {
    for (const resourceSpan of trace.resourceSpans){
        for (const scopeSpan of resourceSpan.scopeSpans){
            for (const span of scopeSpan.spans){
                return `${span.traceId}.json`;
            }
        }
    }
    return 'trace.json';
}
function downloadFile(filename, type, data) {
    const url = URL.createObjectURL(new Blob([
        data
    ], {
        type
    }));
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}
