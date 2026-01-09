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
Object.defineProperty(exports, "TimeSeriesExportAction", {
    enumerable: true,
    get: function() {
        return TimeSeriesExportAction;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard(require("react"));
const _material = require("@mui/material");
const _Download = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Download"));
const _CSVExportUtils = require("./CSVExportUtils");
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
const TimeSeriesExportAction = ({ queryResults, definition })=>{
    const exportableData = (0, _react.useMemo)(()=>{
        return (0, _CSVExportUtils.extractExportableData)(queryResults);
    }, [
        queryResults
    ]);
    const canExport = (0, _react.useMemo)(()=>{
        return (0, _CSVExportUtils.isExportableData)(exportableData);
    }, [
        exportableData
    ]);
    const handleExport = (0, _react.useCallback)(()=>{
        if (!exportableData || !canExport) return;
        try {
            const title = definition?.spec?.display?.name || 'Time Series Data';
            const csvBlob = (0, _CSVExportUtils.exportDataAsCSV)({
                data: exportableData
            });
            const baseFilename = (0, _CSVExportUtils.sanitizeFilename)(title);
            const filename = `${baseFilename}_data.csv`;
            const link = document.createElement('a');
            link.href = URL.createObjectURL(csvBlob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Time series export failed:', error);
        }
    }, [
        exportableData,
        canExport,
        definition
    ]);
    if (!canExport) {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
        title: "Export as CSV",
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
            size: "small",
            onClick: handleExport,
            "aria-label": "Export time series data as CSV",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Download.default, {
                fontSize: "inherit"
            })
        })
    });
};
