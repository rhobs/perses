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
    get resetSettings () {
        return resetSettings;
    },
    get usePaletteState () {
        return usePaletteState;
    },
    get useShowFlameGraphState () {
        return useShowFlameGraphState;
    },
    get useShowSeriesState () {
        return useShowSeriesState;
    },
    get useShowSettingsState () {
        return useShowSettingsState;
    },
    get useShowTableState () {
        return useShowTableState;
    },
    get useTraceHeightState () {
        return useTraceHeightState;
    }
});
const _immer = require("immer");
function usePaletteState(props) {
    const { onChange, value } = props;
    const handlePaletteChange = (newPalette)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.palette = newPalette;
        }));
    };
    return {
        handlePaletteChange
    };
}
function useTraceHeightState(props) {
    const { onChange, value } = props;
    const handleTraceHeightChange = (event)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.traceHeight = event.target.value ? Number(event.target.value) : undefined;
        }));
    };
    return {
        handleTraceHeightChange
    };
}
function useShowSettingsState(props) {
    const { onChange, value } = props;
    const handleShowSettingsChange = (newValue)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.showSettings = newValue;
        }));
    };
    return {
        handleShowSettingsChange
    };
}
function useShowSeriesState(props) {
    const { onChange, value } = props;
    const handleShowSeriesChange = (newValue)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.showSeries = newValue;
        }));
    };
    return {
        handleShowSeriesChange
    };
}
function useShowTableState(props) {
    const { onChange, value } = props;
    const handleShowTableChange = (newValue)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.showTable = newValue;
        }));
    };
    return {
        handleShowTableChange
    };
}
function useShowFlameGraphState(props) {
    const { onChange, value } = props;
    const handleShowFlameGraphChange = (newValue)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.showFlameGraph = newValue;
        }));
    };
    return {
        handleShowFlameGraphChange
    };
}
function resetSettings(props) {
    const { onChange, value } = props;
    onChange((0, _immer.produce)(value, (draft)=>{
        draft.palette = 'package-name';
        draft.showSettings = true;
        draft.showSeries = false;
        draft.showTable = true;
        draft.showFlameGraph = true;
    }));
}
