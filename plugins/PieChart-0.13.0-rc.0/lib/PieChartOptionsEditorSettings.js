import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import merge from 'lodash/merge';
import { CalculationSelector, LegendOptionsEditor } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import { FormatControls, OptionsColorPicker, OptionsEditorGroup, OptionsEditorGrid, OptionsEditorColumn, SortSelector, ModeSelector, OptionsEditorControl, useChartsTheme } from '@perses-dev/components';
import { isPercentUnit } from '@perses-dev/core';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Switch, Typography } from '@mui/material';
import { useMemo } from 'react';
import { DEFAULT_FORMAT } from './pie-chart-model';
export function PieChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleCalculationChange = (newCalculation)=>{
        onChange(produce(value, (draft)=>{
            draft.calculation = newCalculation;
        }));
    };
    const handleLegendChange = (newLegend)=>{
        onChange(produce(value, (draft)=>{
            draft.legend = newLegend;
        }));
    };
    const handleUnitChange = (newFormat)=>{
        onChange(produce(value, (draft)=>{
            draft.format = newFormat;
        }));
    };
    const handleSortChange = (newSort)=>{
        onChange(produce(value, (draft)=>{
            draft.sort = newSort;
        }));
    };
    const handleModeChange = (newMode)=>{
        onChange(produce(value, (draft)=>{
            draft.mode = newMode;
        }));
    };
    const handleShowLabelsChange = (_, checked)=>{
        onChange(produce(value, (draft)=>{
            draft.showLabels = checked;
        }));
    };
    const chartsTheme = useChartsTheme();
    const themePalette = chartsTheme.echartsTheme.color;
    const colorPalette = useMemo(()=>{
        return value.colorPalette || undefined;
    }, [
        value.colorPalette
    ]);
    const handleColorChange = (color)=>{
        onChange(produce(value, (draft)=>{
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
    const format = merge({}, DEFAULT_FORMAT, value.format);
    const colorScheme = useMemo(()=>{
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
    const colorHelpText = useMemo(()=>{
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
    return /*#__PURE__*/ _jsxs(OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ _jsxs(OptionsEditorColumn, {
                children: [
                    /*#__PURE__*/ _jsx(LegendOptionsEditor, {
                        calculation: "comparison",
                        value: value.legend,
                        onChange: handleLegendChange
                    }),
                    /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
                        title: "Misc",
                        children: [
                            /*#__PURE__*/ _jsx(OptionsEditorControl, {
                                label: "Show Labels",
                                control: /*#__PURE__*/ _jsx(Switch, {
                                    checked: Boolean(value.showLabels),
                                    onChange: handleShowLabelsChange
                                })
                            }),
                            /*#__PURE__*/ _jsx(FormatControls, {
                                value: format,
                                onChange: handleUnitChange,
                                disabled: value.mode === 'percentage'
                            }),
                            /*#__PURE__*/ _jsx(CalculationSelector, {
                                value: value.calculation,
                                onChange: handleCalculationChange
                            }),
                            /*#__PURE__*/ _jsx(SortSelector, {
                                value: value.sort,
                                onChange: handleSortChange
                            }),
                            /*#__PURE__*/ _jsx(ModeSelector, {
                                value: value.mode,
                                onChange: handleModeChange,
                                disablePercentageMode: isPercentUnit(format)
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs(OptionsEditorColumn, {
                children: [
                    /*#__PURE__*/ _jsx(OptionsEditorGroup, {
                        title: "Colors",
                        children: /*#__PURE__*/ _jsxs(Stack, {
                            spacing: 2,
                            children: [
                                /*#__PURE__*/ _jsxs(Stack, {
                                    direction: "row",
                                    spacing: 2,
                                    alignItems: "center",
                                    children: [
                                        /*#__PURE__*/ _jsxs(FormControl, {
                                            size: "small",
                                            sx: {
                                                minWidth: 150
                                            },
                                            children: [
                                                /*#__PURE__*/ _jsx(InputLabel, {
                                                    children: "Color Scheme"
                                                }),
                                                /*#__PURE__*/ _jsxs(Select, {
                                                    value: colorScheme,
                                                    label: "Color Scheme",
                                                    onChange: (e)=>handleColorSchemeChange(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ _jsx(MenuItem, {
                                                            value: "default",
                                                            children: "Default"
                                                        }),
                                                        /*#__PURE__*/ _jsx(MenuItem, {
                                                            value: "theme",
                                                            children: "Theme"
                                                        }),
                                                        /*#__PURE__*/ _jsx(MenuItem, {
                                                            value: "gradient",
                                                            children: "Gradient"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        Array.isArray(colorPalette) && colorPalette.length === 1 && /*#__PURE__*/ _jsx(OptionsColorPicker, {
                                            label: "Color",
                                            color: colorPalette?.[0] ?? themePalette[0] ?? '#ff0000',
                                            onColorChange: (c)=>handleColorChange([
                                                    c
                                                ])
                                        })
                                    ]
                                }),
                                colorHelpText && /*#__PURE__*/ _jsx(Typography, {
                                    variant: "body2",
                                    color: "text.secondary",
                                    children: colorHelpText
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ _jsx(OptionsEditorGroup, {
                        title: "Reset Settings",
                        children: /*#__PURE__*/ _jsx(Button, {
                            variant: "outlined",
                            color: "secondary",
                            onClick: ()=>{
                                onChange(produce(value, (draft)=>{
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

//# sourceMappingURL=PieChartOptionsEditorSettings.js.map