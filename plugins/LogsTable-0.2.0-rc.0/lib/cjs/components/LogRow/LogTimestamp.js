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
Object.defineProperty(exports, "LogTimestamp", {
    enumerable: true,
    get: function() {
        return LogTimestamp;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const dateFromStr = (timestamp)=>{
    return /^\d+$/.test(timestamp) ? new Date(parseInt(timestamp) * 1000) : new Date(Date.parse(timestamp));
};
const LogTimestamp = ({ timestamp })=>{
    const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : dateFromStr(timestamp);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("time", {
        style: {
            fontSize: '12px',
            whiteSpace: 'nowrap',
            minWidth: 'max-content'
        },
        dateTime: date.toISOString(),
        children: date.toISOString()
    });
};
