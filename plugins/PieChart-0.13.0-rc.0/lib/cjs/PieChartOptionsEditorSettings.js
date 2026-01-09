// Copyright 2024 The Perses Authors
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
Object.defineProperty(exports, "PieChartOptionsEditorSettings", {
    enumerable: true,
    get: function() {
        return PieChartOptionsEditorSettings;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _pluginsystem = require("@perses-dev/plugin-system");
const _immer = require("immer");
const _components = require("@perses-dev/components");
const _core = require("@perses-dev/core");
const _material = require("@mui/material");
const _react = require("react");
const _piechartmodel = require("./pie-chart-model");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function PieChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleCalculationChange = (newCalculation)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.calculation = newCalculation;
        }));
    };
    const handleLegendChange = (newLegend)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.legend = newLegend;
        }));
    };
    const handleUnitChange = (newFormat)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.format = newFormat;
        }));
    };
    const handleSortChange = (newSort)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.sort = newSort;
        }));
    };
    const handleModeChange = (newMode)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.mode = newMode;
        }));
    };
    const handleShowLabelsChange = (_, checked)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.showLabels = checked;
        }));
    };
    const chartsTheme = (0, _components.useChartsTheme)();
    const themePalette = chartsTheme.echartsTheme.color;
    const colorPalette = (0, _react.useMemo)(()=>{
        return value.colorPalette || undefined;
    }, [
        value.colorPalette
    ]);
    const handleColorChange = (color)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            if (Array.isArray(color)) {
                draft.colorPalette = color;
            } else if (typeof color === 'string') {
                draft.colorPalette = [
                    color
                ];
            } else {
                draft.colorPalette = undefined;
            }
        }));
    };
    // ensures decimalPlaces defaults to correct value
    const format = (0, _merge.default)({}, _piechartmodel.DEFAULT_FORMAT, value.format);
    const colorScheme = (0, _react.useMemo)(()=>{
        return Array.isArray(colorPalette) ? colorPalette.length === 1 ? 'gradient' : 'theme' : 'default';
    }, [
        colorPalette
    ]);
    const handleColorSchemeChange = (scheme)=>{
        if (scheme === 'theme') {
            handleColorChange(themePalette);
        } else if (scheme === 'default') {
            handleColorChange();
        } else {
            // gradient: keep existing single color if present (user-chosen via OptionsColorPicker)
            if (Array.isArray(colorPalette) && colorPalette.length === 1) {
                return;
            }
            // initialize with a sensible default so the color picker shows a color
            handleColorChange([
                '#ff0000'
            ]);
        }
    };
    const colorHelpText = (0, _react.useMemo)(()=>{
        if (colorPalette === undefined) {
            return 'Colors will be automatically assigned using metrics name hash.';
        }
        if (Array.isArray(colorPalette) && colorPalette.length > 1) {
            return 'Colors will be automatically assigned using the current theme color palette.';
        }
        if (Array.isArray(colorPalette) && colorPalette.length === 1) {
            return 'All series will use a gradient based on the selected color.';
        }
        return undefined;
    }, [
        colorPalette
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorColumn, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.LegendOptionsEditor, {
                        calculation: "comparison",
                        value: value.legend,
                        onChange: handleLegendChange
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGroup, {
                        title: "Misc",
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                                label: "Show Labels",
                                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Switch, {
                                    checked: Boolean(value.showLabels),
                                    onChange: handleShowLabelsChange
                                })
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.FormatControls, {
                                value: format,
                                onChange: handleUnitChange,
                                disabled: value.mode === 'percentage'
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.CalculationSelector, {
                                value: value.calculation,
                                onChange: handleCalculationChange
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.SortSelector, {
                                value: value.sort,
                                onChange: handleSortChange
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ModeSelector, {
                                value: value.mode,
                                onChange: handleModeChange,
                                disablePercentageMode: (0, _core.isPercentUnit)(format)
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorColumn, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorGroup, {
                        title: "Colors",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                            spacing: 2,
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                                    direction: "row",
                                    spacing: 2,
                                    alignItems: "center",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.FormControl, {
                                            size: "small",
                                            sx: {
                                                minWidth: 150
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                                                    children: "Color Scheme"
                                                }),
                                                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Select, {
                                                    value: colorScheme,
                                                    label: "Color Scheme",
                                                    onChange: (e)=>handleColorSchemeChange(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                                            value: "default",
                                                            children: "Default"
                                                        }),
                                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                                            value: "theme",
                                                            children: "Theme"
                                                        }),
                                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                                            value: "gradient",
                                                            children: "Gradient"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        Array.isArray(colorPalette) && colorPalette.length === 1 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsColorPicker, {
                                            label: "Color",
                                            color: colorPalette?.[0] ?? themePalette[0] ?? '#ff0000',
                                            onColorChange: (c)=>handleColorChange([
                                                    c
                                                ])
                                        })
                                    ]
                                }),
                                colorHelpText && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                    variant: "body2",
                                    color: "text.secondary",
                                    children: colorHelpText
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorGroup, {
                        title: "Reset Settings",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                            variant: "outlined",
                            color: "secondary",
                            onClick: ()=>{
                                onChange((0, _immer.produce)(value, (draft)=>{
                                    // reset button removes all optional panel options
                                    draft.legend = undefined;
                                    draft.colorPalette = undefined;
                                }));
                            },
                            children: "Reset To Defaults"
                        })
                    })
                ]
            })
        ]
    });
}
