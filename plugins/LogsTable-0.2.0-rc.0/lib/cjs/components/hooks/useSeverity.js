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
Object.defineProperty(exports, "useSeverityColor", {
    enumerable: true,
    get: function() {
        return useSeverityColor;
    }
});
const _material = require("@mui/material");
const _utils = require("../utils");
const useSeverityColor = (log)=>{
    const theme = (0, _material.useTheme)();
    if (!log) {
        return theme.palette.text.secondary;
    }
    const severity = (0, _utils.getSeverity)(log);
    switch(severity){
        case 'critical':
            return theme.palette.error.dark;
        case 'error':
            return theme.palette.error.main;
        case 'warning':
            return theme.palette.warning.main;
        case 'info':
            return theme.palette.info.main;
        case 'debug':
            return theme.palette.primary.main;
        case 'trace':
            return theme.palette.grey[500];
        default:
            return theme.palette.text.secondary;
    }
};
