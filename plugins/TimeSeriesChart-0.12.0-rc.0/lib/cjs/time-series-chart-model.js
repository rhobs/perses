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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get DEFAULT_AREA_OPACITY () {
        return DEFAULT_AREA_OPACITY;
    },
    get DEFAULT_CONNECT_NULLS () {
        return DEFAULT_CONNECT_NULLS;
    },
    get DEFAULT_DISPLAY () {
        return DEFAULT_DISPLAY;
    },
    get DEFAULT_FORMAT () {
        return DEFAULT_FORMAT;
    },
    get DEFAULT_LINE_STYLE () {
        return DEFAULT_LINE_STYLE;
    },
    get DEFAULT_LINE_WIDTH () {
        return DEFAULT_LINE_WIDTH;
    },
    get DEFAULT_POINT_RADIUS () {
        return DEFAULT_POINT_RADIUS;
    },
    get DEFAULT_VISUAL () {
        return DEFAULT_VISUAL;
    },
    get DEFAULT_Y_AXIS () {
        return DEFAULT_Y_AXIS;
    },
    get LINE_STYLE_CONFIG () {
        return LINE_STYLE_CONFIG;
    },
    get LOG_BASE_CONFIG () {
        return LOG_BASE_CONFIG;
    },
    get LOG_BASE_OPTIONS () {
        return LOG_BASE_OPTIONS;
    },
    get LOG_VALID_BASES () {
        return LOG_VALID_BASES;
    },
    get NEGATIVE_MIN_VALUE_MULTIPLIER () {
        return NEGATIVE_MIN_VALUE_MULTIPLIER;
    },
    get OPACITY_CONFIG () {
        return OPACITY_CONFIG;
    },
    get POINT_SIZE_OFFSET () {
        return POINT_SIZE_OFFSET;
    },
    get POSITIVE_MIN_VALUE_MULTIPLIER () {
        return POSITIVE_MIN_VALUE_MULTIPLIER;
    },
    get STACK_CONFIG () {
        return STACK_CONFIG;
    },
    get STACK_OPTIONS () {
        return STACK_OPTIONS;
    },
    get THRESHOLD_PLOT_INTERVAL () {
        return THRESHOLD_PLOT_INTERVAL;
    },
    get VISUAL_CONFIG () {
        return VISUAL_CONFIG;
    },
    get Y_AXIS_CONFIG () {
        return Y_AXIS_CONFIG;
    },
    get createInitialTimeSeriesChartOptions () {
        return createInitialTimeSeriesChartOptions;
    }
});
const DEFAULT_FORMAT = {
    unit: 'decimal',
    shortValues: true
};
const DEFAULT_Y_AXIS = {
    show: true,
    label: '',
    format: DEFAULT_FORMAT,
    min: undefined,
    max: undefined,
    logBase: 'none'
};
const Y_AXIS_CONFIG = {
    show: {
        label: 'Show'
    },
    label: {
        label: 'Label'
    },
    unit: {
        label: 'Unit'
    },
    min: {
        label: 'Min'
    },
    max: {
        label: 'Max'
    },
    logBase: {
        label: 'Log Base'
    }
};
const DEFAULT_DISPLAY = 'line';
const DEFAULT_LINE_WIDTH = 1.25;
const DEFAULT_LINE_STYLE = 'solid';
const DEFAULT_AREA_OPACITY = 0;
const POINT_SIZE_OFFSET = 1.5;
const DEFAULT_POINT_RADIUS = DEFAULT_LINE_WIDTH + POINT_SIZE_OFFSET;
const DEFAULT_CONNECT_NULLS = false;
const DEFAULT_VISUAL = {
    display: DEFAULT_DISPLAY,
    lineWidth: DEFAULT_LINE_WIDTH,
    lineStyle: DEFAULT_LINE_STYLE,
    areaOpacity: DEFAULT_AREA_OPACITY,
    pointRadius: DEFAULT_POINT_RADIUS,
    connectNulls: DEFAULT_CONNECT_NULLS
};
const THRESHOLD_PLOT_INTERVAL = 15;
const VISUAL_CONFIG = {
    lineWidth: {
        label: 'Line Width',
        testId: 'slider-line-width',
        min: 0.25,
        max: 3,
        step: 0.25
    },
    lineStyle: {
        label: 'Line Style'
    },
    pointRadius: {
        label: 'Point Radius',
        testId: 'slider-point-radius',
        min: 0,
        max: 6,
        step: 0.25
    },
    areaOpacity: {
        label: 'Area Opacity',
        testId: 'slider-area-opacity',
        min: 0,
        max: 1,
        step: 0.05
    },
    stack: {
        label: 'Stack Series'
    },
    connectNulls: {
        label: 'Connect Nulls'
    }
};
const STACK_CONFIG = {
    none: {
        label: 'None'
    },
    all: {
        label: 'All'
    }
};
const STACK_OPTIONS = Object.entries(STACK_CONFIG).map(([id, config])=>{
    return {
        id: id,
        ...config
    };
});
const LINE_STYLE_CONFIG = {
    solid: {
        label: 'Solid'
    },
    dashed: {
        label: 'Dashes'
    },
    dotted: {
        label: 'Dots'
    }
};
const OPACITY_CONFIG = {
    label: 'Opacity',
    testId: 'slider-opacity',
    min: 0,
    max: 1,
    step: 0.05
};
const LOG_BASE_CONFIG = {
    none: {
        label: 'None',
        log: 'none'
    },
    log2: {
        label: '2',
        log: 2
    },
    log10: {
        label: '10',
        log: 10
    }
};
const LOG_BASE_OPTIONS = Object.entries(LOG_BASE_CONFIG).map(([id, config])=>({
        id: id,
        ...config
    }));
const LOG_VALID_BASES = Object.fromEntries(Object.entries(LOG_BASE_CONFIG).map(([label, config])=>[
        config.log,
        label
    ]));
const POSITIVE_MIN_VALUE_MULTIPLIER = 0.8;
const NEGATIVE_MIN_VALUE_MULTIPLIER = 1.2;
function createInitialTimeSeriesChartOptions() {
    return {};
}
