import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import { produce } from 'immer';
import { Slider, Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { OptionsEditorControl, OptionsEditorGroup, SettingsAutocomplete } from '@perses-dev/components';
import { DEFAULT_AREA_OPACITY, DEFAULT_CONNECT_NULLS, DEFAULT_LINE_WIDTH, DEFAULT_LINE_STYLE, DEFAULT_POINT_RADIUS, POINT_SIZE_OFFSET, STACK_CONFIG, STACK_OPTIONS, LINE_STYLE_CONFIG, VISUAL_CONFIG, DEFAULT_DISPLAY } from './time-series-chart-model';
export function VisualOptionsEditor({ value, onChange }) {
    const handleLineWidthChange = (_, sliderValue)=>{
        const newValue = Array.isArray(sliderValue) ? sliderValue[0] : sliderValue;
        const symbolSize = newValue !== undefined ? newValue + POINT_SIZE_OFFSET : DEFAULT_POINT_RADIUS;
        onChange(produce(value, (draft)=>{
            draft.lineWidth = newValue;
            draft.pointRadius = symbolSize;
        }));
    };
    const handleAreaOpacityChange = (_, sliderValue)=>{
        const newValue = Array.isArray(sliderValue) ? sliderValue[0] : sliderValue;
        onChange(produce(value, (draft)=>{
            draft.areaOpacity = newValue;
        }));
    };
    const currentStack = value.stack ?? 'none';
    const stackConfig = STACK_CONFIG[currentStack];
    return /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
        title: "Visual",
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorControl, {
                label: VISUAL_CONFIG.stack.label,
                control: /*#__PURE__*/ _jsx(SettingsAutocomplete, {
                    value: {
                        ...stackConfig,
                        id: currentStack
                    },
                    options: STACK_OPTIONS,
                    onChange: (__, newValue)=>{
                        const updatedValue = {
                            ...value,
                            stack: newValue.id === 'none' ? undefined : newValue.id
                        };
                        // stacked area chart preset to automatically set area under a curve shading
                        if (newValue.id === 'all' && !value.areaOpacity) {
                            updatedValue.areaOpacity = 0.3;
                        }
                        onChange(updatedValue);
                    },
                    disabled: value === undefined,
                    disableClearable: true
                })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorControl, {
                label: "Display",
                control: /*#__PURE__*/ _jsxs(ToggleButtonGroup, {
                    color: "primary",
                    exclusive: true,
                    value: value.display ?? DEFAULT_DISPLAY,
                    onChange: (__, newValue)=>{
                        onChange({
                            ...value,
                            display: newValue
                        });
                    },
                    children: [
                        /*#__PURE__*/ _jsx(ToggleButton, {
                            value: "line",
                            selected: value.display === undefined || value.display === 'line',
                            "aria-label": "display line series",
                            children: "Line"
                        }),
                        /*#__PURE__*/ _jsx(ToggleButton, {
                            value: "bar",
                            "aria-label": "display bar series",
                            children: "Bar"
                        })
                    ]
                })
            }),
            value.display === 'line' && /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(OptionsEditorControl, {
                        label: VISUAL_CONFIG.lineWidth.label,
                        control: /*#__PURE__*/ _jsx(Slider, {
                            "data-testid": VISUAL_CONFIG.lineWidth.testId,
                            value: value.lineWidth ?? DEFAULT_LINE_WIDTH,
                            valueLabelDisplay: "auto",
                            step: VISUAL_CONFIG.lineWidth.step,
                            marks: true,
                            min: VISUAL_CONFIG.lineWidth.min,
                            max: VISUAL_CONFIG.lineWidth.max,
                            onChange: handleLineWidthChange
                        })
                    }),
                    /*#__PURE__*/ _jsx(OptionsEditorControl, {
                        label: VISUAL_CONFIG.lineStyle.label,
                        control: /*#__PURE__*/ _jsx(ToggleButtonGroup, {
                            color: "primary",
                            exclusive: true,
                            value: value.lineStyle ?? DEFAULT_LINE_STYLE,
                            onChange: (__, newValue)=>{
                                onChange({
                                    ...value,
                                    lineStyle: newValue
                                });
                            },
                            children: Object.entries(LINE_STYLE_CONFIG).map(([styleValue, config])=>/*#__PURE__*/ _jsx(ToggleButton, {
                                    value: styleValue,
                                    "aria-label": `${styleValue} line style`,
                                    children: config.label
                                }, styleValue))
                        })
                    }),
                    /*#__PURE__*/ _jsx(OptionsEditorControl, {
                        label: VISUAL_CONFIG.areaOpacity.label,
                        control: /*#__PURE__*/ _jsx(Slider, {
                            "data-testid": VISUAL_CONFIG.areaOpacity.testId,
                            value: value.areaOpacity ?? DEFAULT_AREA_OPACITY,
                            valueLabelDisplay: "auto",
                            step: VISUAL_CONFIG.areaOpacity.step,
                            marks: true,
                            min: VISUAL_CONFIG.areaOpacity.min,
                            max: VISUAL_CONFIG.areaOpacity.max,
                            onChange: handleAreaOpacityChange
                        })
                    }),
                    /*#__PURE__*/ _jsx(OptionsEditorControl, {
                        label: VISUAL_CONFIG.connectNulls.label,
                        control: /*#__PURE__*/ _jsx(Switch, {
                            checked: value.connectNulls ?? DEFAULT_CONNECT_NULLS,
                            onChange: (e)=>{
                                onChange({
                                    ...value,
                                    connectNulls: e.target.checked
                                });
                            }
                        })
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=VisualOptionsEditor.js.map