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
Object.defineProperty(exports, "Service", {
    enumerable: true,
    get: function() {
        return Service;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _usequery = require("../utils/use-query");
function Service(props) {
    const { datasource, value, onChange } = props;
    const { data: servicesOptions, isLoading: isServicesOptionsLoading } = (0, _usequery.useServices)(datasource);
    function handleServiceChange(_event, newValue) {
        if (newValue !== null) {
            onChange?.(newValue);
        }
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
        position: "relative",
        sx: {
            width: '100%'
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Autocomplete, {
            options: servicesOptions?.names ?? [],
            value: value,
            sx: {
                minWidth: 200
            },
            loading: isServicesOptionsLoading,
            renderInput: (params)=>{
                return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                    ...params,
                    label: "Service",
                    size: "small"
                });
            },
            onChange: handleServiceChange
        })
    });
}
