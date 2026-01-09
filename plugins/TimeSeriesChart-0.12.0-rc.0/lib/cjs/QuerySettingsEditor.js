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
Object.defineProperty(exports, "QuerySettingsEditor", {
    enumerable: true,
    get: function() {
        return QuerySettingsEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _react = /*#__PURE__*/ _interop_require_wildcard(require("react"));
const _DeleteOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/DeleteOutline"));
const _Plus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Plus"));
const _Close = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Close"));
const _immer = require("immer");
const _pluginsystem = require("@perses-dev/plugin-system");
const _timeserieschartmodel = require("./time-series-chart-model");
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
const DEFAULT_COLOR_VALUE = '#555';
const NO_INDEX_AVAILABLE = -1; // invalid array index value used to represent the fact that no query index is available
function QuerySettingsEditor(props) {
    const { onChange, value } = props;
    const querySettingsList = value.querySettings;
    const handleQuerySettingsChange = (newQuerySettings)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.querySettings = newQuerySettings;
        }));
    };
    // Every time a new query settings input is added, we want to focus the recently added input
    const recentlyAddedInputRef = (0, _react.useRef)(null);
    const focusRef = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        if (!recentlyAddedInputRef.current || !focusRef.current) return;
        recentlyAddedInputRef.current?.focus();
        focusRef.current = false;
    }, [
        querySettingsList?.length
    ]);
    const handleQueryIndexChange = (e, i)=>{
        if (querySettingsList !== undefined) {
            handleQuerySettingsChange((0, _immer.produce)(querySettingsList, (draft)=>{
                const querySettings = draft?.[i];
                if (querySettings) {
                    querySettings.queryIndex = parseInt(e.target.value);
                }
            }));
        }
    };
    const handleColorModeChange = (e, i)=>{
        if (querySettingsList !== undefined) {
            handleQuerySettingsChange((0, _immer.produce)(querySettingsList, (draft)=>{
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
            handleQuerySettingsChange((0, _immer.produce)(querySettingsList, (draft)=>{
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
            handleQuerySettingsChange((0, _immer.produce)(querySettingsList, (draft)=>{
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
            handleQuerySettingsChange((0, _immer.produce)(querySettingsList, (draft)=>{
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
            handleQuerySettingsChange((0, _immer.produce)(querySettingsList, (draft)=>{
                const qs = draft[i];
                if (qs) {
                    updater(qs);
                }
            }));
        }
    };
    const deleteQuerySettingsInput = (i)=>{
        if (querySettingsList !== undefined) {
            const updatedQuerySettingsList = (0, _immer.produce)(querySettingsList, (draft)=>{
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
            qs.areaOpacity = _timeserieschartmodel.DEFAULT_AREA_OPACITY;
        });
    };
    const removeAreaOpacity = (i)=>{
        updateQuerySettings(i, (qs)=>{
            qs.areaOpacity = undefined;
        });
    };
    const queryCount = (0, _pluginsystem.useQueryCountContext)();
    // Compute the list of query indexes for which query settings are not already defined.
    // This is to avoid already-booked indexes to still be selectable in the dropdown(s)
    const availableQueryIndexes = (0, _react.useMemo)(()=>{
        const bookedQueryIndexes = querySettingsList?.map((querySettings)=>querySettings.queryIndex) ?? [];
        const allQueryIndexes = Array.from({
            length: queryCount
        }, (_, i)=>i);
        return allQueryIndexes.filter((_, queryIndex)=>!bookedQueryIndexes.includes(queryIndex));
    }, [
        querySettingsList,
        queryCount
    ]);
    const firstAvailableQueryIndex = (0, _react.useMemo)(()=>{
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
            handleQuerySettingsChange((0, _immer.produce)(querySettingsList, (draft)=>{
                draft.push(defaultQuerySettings);
            }));
        }
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        children: [
            queryCount === 0 ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                mb: 2,
                fontStyle: "italic",
                children: "No query defined"
            }) : querySettingsList?.length && querySettingsList.map((querySettings, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(QuerySettingsInput, {
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
            queryCount > 0 && firstAvailableQueryIndex !== NO_INDEX_AVAILABLE && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                variant: "contained",
                startIcon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {}),
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
    const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
    // Calculate available options
    const availableOptions = (0, _react.useMemo)(()=>{
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
        spacing: 2,
        sx: {
            borderBottom: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 2
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
            direction: "row",
            alignItems: "center",
            spacing: 1,
            sx: {
                flexWrap: 'wrap',
                gap: 1
            },
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                    select: true,
                    inputRef: inputRef,
                    value: queryIndex,
                    label: "Query",
                    onChange: onQueryIndexChange,
                    sx: {
                        minWidth: '75px'
                    },
                    children: selectableQueryIndexes.map((qi)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                            value: qi,
                            children: [
                                "#",
                                qi + 1
                            ]
                        }, `query-${qi}`))
                }),
                colorMode && /*#__PURE__*/ (0, _jsxruntime.jsxs)(SettingsSection, {
                    label: "Color",
                    onRemove: onRemoveColor,
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TextField, {
                            select: true,
                            value: colorMode,
                            onChange: onColorModeChange,
                            size: "small",
                            sx: {
                                flexGrow: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                    value: "fixed-single",
                                    children: "Fixed (single)"
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                    value: "fixed",
                                    children: "Fixed"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsColorPicker, {
                            label: `Query n°${queryIndex + 1}`,
                            color: colorValue || DEFAULT_COLOR_VALUE,
                            onColorChange: onColorValueChange
                        })
                    ]
                }),
                lineStyle && /*#__PURE__*/ (0, _jsxruntime.jsxs)(SettingsSection, {
                    label: "Line Style",
                    onRemove: onRemoveLineStyle,
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ToggleButtonGroup, {
                            color: "primary",
                            exclusive: true,
                            value: lineStyle,
                            onChange: (__, newValue)=>{
                                if (newValue !== null) {
                                    onLineStyleChange(newValue);
                                }
                            },
                            size: "small",
                            children: Object.entries(_timeserieschartmodel.LINE_STYLE_CONFIG).map(([styleValue, config])=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ToggleButton, {
                                    value: styleValue,
                                    "aria-label": `${styleValue} line style`,
                                    children: config.label
                                }, styleValue))
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                            sx: {
                                flexGrow: 1
                            }
                        })
                    ]
                }),
                areaOpacity !== undefined && /*#__PURE__*/ (0, _jsxruntime.jsxs)(SettingsSection, {
                    label: "Opacity",
                    onRemove: onRemoveAreaOpacity,
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {}),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Slider, {
                            value: areaOpacity,
                            valueLabelDisplay: "auto",
                            step: _timeserieschartmodel.OPACITY_CONFIG.step,
                            marks: true,
                            min: _timeserieschartmodel.OPACITY_CONFIG.min,
                            max: _timeserieschartmodel.OPACITY_CONFIG.max,
                            onChange: onAreaOpacityChange,
                            sx: {
                                flexGrow: 1
                            }
                        })
                    ]
                }),
                availableOptions.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                            onClick: handleAddMenuClick,
                            "aria-label": "Add option",
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {})
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Menu, {
                            anchorEl: anchorEl,
                            open: Boolean(anchorEl),
                            onClose: handleMenuClose,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                            },
                            children: availableOptions.map((option)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                                    onClick: ()=>handleMenuItemClick(option.action),
                                    sx: {
                                        minWidth: '120px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {
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
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    sx: {
                        flexGrow: 1
                    }
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                    "aria-label": `delete settings for query n°${queryIndex + 1}`,
                    onClick: onDelete,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_DeleteOutline.default, {})
                })
            ]
        })
    });
}
// Reusable section component
function SettingsSection(props) {
    const { label, children, onRemove } = props;
    const theme = (0, _material.useTheme)();
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        sx: {
            position: 'relative',
            minWidth: '250px'
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
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
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
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
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                        size: "small",
                        onClick: onRemove,
                        "aria-label": `Remove ${label}`,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Close.default, {})
                    })
                ]
            })
        ]
    });
}
