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
import { Box, Button, IconButton, Menu, MenuItem, Slider, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material';
import { OptionsColorPicker } from '@perses-dev/components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import DeleteIcon from 'mdi-material-ui/DeleteOutline';
import AddIcon from 'mdi-material-ui/Plus';
import CloseIcon from 'mdi-material-ui/Close';
import { produce } from 'immer';
import { useQueryCountContext } from '@perses-dev/plugin-system';
import { DEFAULT_AREA_OPACITY, OPACITY_CONFIG, LINE_STYLE_CONFIG } from './time-series-chart-model';
const DEFAULT_COLOR_VALUE = '#555';
const NO_INDEX_AVAILABLE = -1; // invalid array index value used to represent the fact that no query index is available
export function QuerySettingsEditor(props) {
    const { onChange, value } = props;
    const querySettingsList = value.querySettings;
    const handleQuerySettingsChange = (newQuerySettings)=>{
        onChange(produce(value, (draft)=>{
            draft.querySettings = newQuerySettings;
        }));
    };
    // Every time a new query settings input is added, we want to focus the recently added input
    const recentlyAddedInputRef = useRef(null);
    const focusRef = useRef(false);
    useEffect(()=>{
        if (!recentlyAddedInputRef.current || !focusRef.current) return;
        recentlyAddedInputRef.current?.focus();
        focusRef.current = false;
    }, [
        querySettingsList?.length
    ]);
    const handleQueryIndexChange = (e, i)=>{
        if (querySettingsList !== undefined) {
            handleQuerySettingsChange(produce(querySettingsList, (draft)=>{
                const querySettings = draft?.[i];
                if (querySettings) {
                    querySettings.queryIndex = parseInt(e.target.value);
                }
            }));
        }
    };
    const handleColorModeChange = (e, i)=>{
        if (querySettingsList !== undefined) {
            handleQuerySettingsChange(produce(querySettingsList, (draft)=>{
                if (draft !== undefined) {
                    const querySettings = draft[i];
                    if (querySettings) {
                        const newColorMode = e.target.value;
                        if (!newColorMode) {
                            querySettings.colorMode = undefined;
                            querySettings.colorValue = undefined;
                        } else {
                            querySettings.colorMode = newColorMode;
                        }
                    }
                }
            }));
        }
    };
    const handleColorValueChange = (colorValue, i)=>{
        if (querySettingsList !== undefined) {
            handleQuerySettingsChange(produce(querySettingsList, (draft)=>{
                if (draft !== undefined) {
                    const querySettings = draft[i];
                    if (querySettings) {
                        querySettings.colorValue = colorValue;
                    }
                }
            }));
        }
    };
    const handleLineStyleChange = (lineStyle, i)=>{
        if (querySettingsList !== undefined) {
            handleQuerySettingsChange(produce(querySettingsList, (draft)=>{
                if (draft !== undefined) {
                    const querySettings = draft[i];
                    if (querySettings) {
                        querySettings.lineStyle = lineStyle;
                    }
                }
            }));
        }
    };
    const handleAreaOpacityChange = (_, sliderValue, i)=>{
        const newValue = Array.isArray(sliderValue) ? sliderValue[0] : sliderValue;
        if (querySettingsList !== undefined) {
            handleQuerySettingsChange(produce(querySettingsList, (draft)=>{
                if (draft !== undefined) {
                    const querySettings = draft[i];
                    if (querySettings) {
                        querySettings.areaOpacity = newValue;
                    }
                }
            }));
        }
    };
    // Helper function to update query settings at a specific index
    const updateQuerySettings = (i, updater)=>{
        if (querySettingsList !== undefined) {
            handleQuerySettingsChange(produce(querySettingsList, (draft)=>{
                const qs = draft[i];
                if (qs) {
                    updater(qs);
                }
            }));
        }
    };
    const deleteQuerySettingsInput = (i)=>{
        if (querySettingsList !== undefined) {
            const updatedQuerySettingsList = produce(querySettingsList, (draft)=>{
                draft.splice(i, 1);
            });
            handleQuerySettingsChange(updatedQuerySettingsList);
        }
    };
    const addColor = (i)=>{
        updateQuerySettings(i, (qs)=>{
            qs.colorMode = 'fixed-single';
            qs.colorValue = DEFAULT_COLOR_VALUE;
        });
    };
    const removeColor = (i)=>{
        updateQuerySettings(i, (qs)=>{
            qs.colorMode = undefined;
            qs.colorValue = undefined;
        });
    };
    const addLineStyle = (i)=>{
        updateQuerySettings(i, (qs)=>{
            qs.lineStyle = 'solid';
        });
    };
    const removeLineStyle = (i)=>{
        updateQuerySettings(i, (qs)=>{
            qs.lineStyle = undefined;
        });
    };
    const addAreaOpacity = (i)=>{
        updateQuerySettings(i, (qs)=>{
            qs.areaOpacity = DEFAULT_AREA_OPACITY;
        });
    };
    const removeAreaOpacity = (i)=>{
        updateQuerySettings(i, (qs)=>{
            qs.areaOpacity = undefined;
        });
    };
    const queryCount = useQueryCountContext();
    // Compute the list of query indexes for which query settings are not already defined.
    // This is to avoid already-booked indexes to still be selectable in the dropdown(s)
    const availableQueryIndexes = useMemo(()=>{
        const bookedQueryIndexes = querySettingsList?.map((querySettings)=>querySettings.queryIndex) ?? [];
        const allQueryIndexes = Array.from({
            length: queryCount
        }, (_, i)=>i);
        return allQueryIndexes.filter((_, queryIndex)=>!bookedQueryIndexes.includes(queryIndex));
    }, [
        querySettingsList,
        queryCount
    ]);
    const firstAvailableQueryIndex = useMemo(()=>{
        return availableQueryIndexes[0] ?? NO_INDEX_AVAILABLE;
    }, [
        availableQueryIndexes
    ]);
    const defaultQuerySettings = {
        queryIndex: firstAvailableQueryIndex
    };
    const addQuerySettingsInput = ()=>{
        focusRef.current = true;
        if (querySettingsList === undefined) {
            handleQuerySettingsChange([
                defaultQuerySettings
            ]);
        } else {
            handleQuerySettingsChange(produce(querySettingsList, (draft)=>{
                draft.push(defaultQuerySettings);
            }));
        }
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        children: [
            queryCount === 0 ? /*#__PURE__*/ _jsx(Typography, {
                mb: 2,
                fontStyle: "italic",
                children: "No query defined"
            }) : querySettingsList?.length && querySettingsList.map((querySettings, i)=>/*#__PURE__*/ _jsx(QuerySettingsInput, {
                    inputRef: i === querySettingsList.length - 1 ? recentlyAddedInputRef : undefined,
                    querySettings: querySettings,
                    availableQueryIndexes: availableQueryIndexes,
                    onQueryIndexChange: (e)=>{
                        handleQueryIndexChange(e, i);
                    },
                    onColorModeChange: (e)=>handleColorModeChange(e, i),
                    onColorValueChange: (color)=>handleColorValueChange(color, i),
                    onLineStyleChange: (lineStyle)=>handleLineStyleChange(lineStyle, i),
                    onAreaOpacityChange: (event, value)=>handleAreaOpacityChange(event, value, i),
                    onDelete: ()=>{
                        deleteQuerySettingsInput(i);
                    },
                    onAddColor: ()=>addColor(i),
                    onRemoveColor: ()=>removeColor(i),
                    onAddLineStyle: ()=>addLineStyle(i),
                    onRemoveLineStyle: ()=>removeLineStyle(i),
                    onAddAreaOpacity: ()=>addAreaOpacity(i),
                    onRemoveAreaOpacity: ()=>removeAreaOpacity(i)
                }, i)),
            queryCount > 0 && firstAvailableQueryIndex !== NO_INDEX_AVAILABLE && /*#__PURE__*/ _jsx(Button, {
                variant: "contained",
                startIcon: /*#__PURE__*/ _jsx(AddIcon, {}),
                sx: {
                    marginTop: 1
                },
                onClick: addQuerySettingsInput,
                children: "Add Query Settings"
            })
        ]
    });
}
function QuerySettingsInput({ querySettings: { queryIndex, colorMode, colorValue, lineStyle, areaOpacity }, availableQueryIndexes, onQueryIndexChange, onColorModeChange, onColorValueChange, onLineStyleChange, onAreaOpacityChange, onDelete, inputRef, onAddColor: onAddColor, onRemoveColor: onRemoveColor, onAddLineStyle, onRemoveLineStyle, onAddAreaOpacity, onRemoveAreaOpacity }) {
    // current query index should also be selectable
    const selectableQueryIndexes = availableQueryIndexes.concat(queryIndex).sort((a, b)=>a - b);
    // State for dropdown menu
    const [anchorEl, setAnchorEl] = useState(null);
    // Calculate available options
    const availableOptions = useMemo(()=>{
        const options = [];
        if (!colorMode) options.push({
            key: 'color',
            label: 'Color',
            action: onAddColor
        });
        if (!lineStyle) options.push({
            key: 'lineStyle',
            label: 'Line Style',
            action: onAddLineStyle
        });
        if (areaOpacity === undefined) options.push({
            key: 'opacity',
            label: 'Opacity',
            action: onAddAreaOpacity
        });
        return options;
    }, [
        colorMode,
        lineStyle,
        areaOpacity,
        onAddColor,
        onAddLineStyle,
        onAddAreaOpacity
    ]);
    const handleAddMenuClick = (event)=>{
        if (availableOptions.length === 1 && availableOptions[0]) {
            // If only one option left, add it directly
            availableOptions[0].action();
        } else {
            // Show dropdown
            setAnchorEl(event.currentTarget);
        }
    };
    const handleMenuClose = ()=>{
        setAnchorEl(null);
    };
    const handleMenuItemClick = (action)=>{
        action();
        handleMenuClose();
    };
    return /*#__PURE__*/ _jsx(Stack, {
        spacing: 2,
        sx: {
            borderBottom: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 2
        },
        children: /*#__PURE__*/ _jsxs(Stack, {
            direction: "row",
            alignItems: "center",
            spacing: 1,
            sx: {
                flexWrap: 'wrap',
                gap: 1
            },
            children: [
                /*#__PURE__*/ _jsx(TextField, {
                    select: true,
                    inputRef: inputRef,
                    value: queryIndex,
                    label: "Query",
                    onChange: onQueryIndexChange,
                    sx: {
                        minWidth: '75px'
                    },
                    children: selectableQueryIndexes.map((qi)=>/*#__PURE__*/ _jsxs(MenuItem, {
                            value: qi,
                            children: [
                                "#",
                                qi + 1
                            ]
                        }, `query-${qi}`))
                }),
                colorMode && /*#__PURE__*/ _jsxs(SettingsSection, {
                    label: "Color",
                    onRemove: onRemoveColor,
                    children: [
                        /*#__PURE__*/ _jsxs(TextField, {
                            select: true,
                            value: colorMode,
                            onChange: onColorModeChange,
                            size: "small",
                            sx: {
                                flexGrow: 1
                            },
                            children: [
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "fixed-single",
                                    children: "Fixed (single)"
                                }),
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "fixed",
                                    children: "Fixed"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx(OptionsColorPicker, {
                            label: `Query n°${queryIndex + 1}`,
                            color: colorValue || DEFAULT_COLOR_VALUE,
                            onColorChange: onColorValueChange
                        })
                    ]
                }),
                lineStyle && /*#__PURE__*/ _jsxs(SettingsSection, {
                    label: "Line Style",
                    onRemove: onRemoveLineStyle,
                    children: [
                        /*#__PURE__*/ _jsx(ToggleButtonGroup, {
                            color: "primary",
                            exclusive: true,
                            value: lineStyle,
                            onChange: (__, newValue)=>{
                                if (newValue !== null) {
                                    onLineStyleChange(newValue);
                                }
                            },
                            size: "small",
                            children: Object.entries(LINE_STYLE_CONFIG).map(([styleValue, config])=>/*#__PURE__*/ _jsx(ToggleButton, {
                                    value: styleValue,
                                    "aria-label": `${styleValue} line style`,
                                    children: config.label
                                }, styleValue))
                        }),
                        /*#__PURE__*/ _jsx(Box, {
                            sx: {
                                flexGrow: 1
                            }
                        })
                    ]
                }),
                areaOpacity !== undefined && /*#__PURE__*/ _jsxs(SettingsSection, {
                    label: "Opacity",
                    onRemove: onRemoveAreaOpacity,
                    children: [
                        /*#__PURE__*/ _jsx(Box, {}),
                        /*#__PURE__*/ _jsx(Slider, {
                            value: areaOpacity,
                            valueLabelDisplay: "auto",
                            step: OPACITY_CONFIG.step,
                            marks: true,
                            min: OPACITY_CONFIG.min,
                            max: OPACITY_CONFIG.max,
                            onChange: onAreaOpacityChange,
                            sx: {
                                flexGrow: 1
                            }
                        })
                    ]
                }),
                availableOptions.length > 0 && /*#__PURE__*/ _jsxs(_Fragment, {
                    children: [
                        /*#__PURE__*/ _jsx(IconButton, {
                            onClick: handleAddMenuClick,
                            "aria-label": "Add option",
                            children: /*#__PURE__*/ _jsx(AddIcon, {})
                        }),
                        /*#__PURE__*/ _jsx(Menu, {
                            anchorEl: anchorEl,
                            open: Boolean(anchorEl),
                            onClose: handleMenuClose,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                            },
                            children: availableOptions.map((option)=>/*#__PURE__*/ _jsxs(MenuItem, {
                                    onClick: ()=>handleMenuItemClick(option.action),
                                    sx: {
                                        minWidth: '120px'
                                    },
                                    children: [
                                        /*#__PURE__*/ _jsx(AddIcon, {
                                            sx: {
                                                mr: 1,
                                                fontSize: '1rem'
                                            }
                                        }),
                                        option.label
                                    ]
                                }, option.key))
                        })
                    ]
                }),
                /*#__PURE__*/ _jsx(Box, {
                    sx: {
                        flexGrow: 1
                    }
                }),
                /*#__PURE__*/ _jsx(IconButton, {
                    "aria-label": `delete settings for query n°${queryIndex + 1}`,
                    onClick: onDelete,
                    children: /*#__PURE__*/ _jsx(DeleteIcon, {})
                })
            ]
        })
    });
}
// Reusable section component
function SettingsSection(props) {
    const { label, children, onRemove } = props;
    const theme = useTheme();
    return /*#__PURE__*/ _jsxs(Box, {
        sx: {
            position: 'relative',
            minWidth: '250px'
        },
        children: [
            /*#__PURE__*/ _jsx(Typography, {
                variant: "caption",
                sx: {
                    position: 'absolute',
                    top: -8,
                    left: 12,
                    backgroundColor: theme.palette.background.code,
                    px: 0.5,
                    color: 'text.secondary',
                    zIndex: 1
                },
                children: label
            }),
            /*#__PURE__*/ _jsxs(Stack, {
                direction: "row",
                alignItems: "center",
                spacing: 1,
                sx: {
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1
                },
                children: [
                    children,
                    /*#__PURE__*/ _jsx(IconButton, {
                        size: "small",
                        onClick: onRemove,
                        "aria-label": `Remove ${label}`,
                        children: /*#__PURE__*/ _jsx(CloseIcon, {})
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=QuerySettingsEditor.js.map