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
    get ConditionalPanel () {
        return ConditionalPanel;
    },
    get ConditionalRule () {
        return ConditionalRule;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _material = require("@mui/material");
const _DeleteOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/DeleteOutline"));
const _Plus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Plus"));
const _components = require("@perses-dev/components");
const _models = require("../models");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function ConditionalRule({ cell, onChange, onDelete, ...props }) {
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Grid2, {
        container: true,
        spacing: 2,
        ...props,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                size: {
                    xs: 5
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                    direction: "row",
                    gap: 1,
                    width: "100%",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TextField, {
                            select: true,
                            label: "Type",
                            value: cell.condition.kind,
                            onChange: (e)=>onChange({
                                    ...cell,
                                    condition: {
                                        kind: e.target.value
                                    }
                                }),
                            required: true,
                            sx: {
                                width: '120px'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                    value: "Value",
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                                children: "Value"
                                            }),
                                            cell.condition.kind !== 'Value' && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                                variant: "caption",
                                                children: "Matches an exact text value"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                    value: "Range",
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                                children: "Range"
                                            }),
                                            cell.condition.kind !== 'Range' && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                                variant: "caption",
                                                children: "Matches against a numerical range"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                    value: "Regex",
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                                children: "Regex"
                                            }),
                                            cell.condition.kind !== 'Regex' && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                                variant: "caption",
                                                children: "Matches against a regular expression"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                    value: "Misc",
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                                children: "Misc"
                                            }),
                                            cell.condition.kind !== 'Misc' && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                                variant: "caption",
                                                children: "Matches against empty, null and NaN values"
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        (0, _models.renderConditionEditor)(cell.condition, (updatedCondition)=>onChange({
                                ...cell,
                                condition: updatedCondition
                            }), 'small')
                    ]
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                size: {
                    xs: 4
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                    spacing: 1,
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                            label: "Display text",
                            value: cell.text,
                            onChange: (e)=>onChange({
                                    ...cell,
                                    text: e.target.value
                                }),
                            fullWidth: true,
                            size: "small"
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                            direction: "row",
                            spacing: 1,
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                                    label: "Prefix",
                                    placeholder: "$",
                                    value: cell.prefix ?? '',
                                    onChange: (e)=>onChange({
                                            ...cell,
                                            prefix: e.target.value
                                        }),
                                    size: "small"
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                                    label: "Suffix",
                                    placeholder: "%",
                                    value: cell.suffix ?? '',
                                    onChange: (e)=>onChange({
                                            ...cell,
                                            suffix: e.target.value
                                        }),
                                    size: "small"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                size: {
                    xs: 1
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                    direction: "row",
                    justifyContent: "center",
                    gap: 1,
                    children: cell.textColor ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsColorPicker, {
                        label: "Text Color",
                        color: cell.textColor ?? '#000',
                        onColorChange: (color)=>onChange({
                                ...cell,
                                textColor: color
                            }),
                        onClear: ()=>onChange({
                                ...cell,
                                textColor: undefined
                            })
                    }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                        onClick: ()=>onChange({
                                ...cell,
                                textColor: '#000'
                            }),
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {})
                    })
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                size: {
                    xs: 1
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                    direction: "row",
                    justifyContent: "center",
                    children: cell.backgroundColor ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsColorPicker, {
                        label: "Background Color",
                        color: cell.backgroundColor ?? '#fff',
                        onColorChange: (color)=>onChange({
                                ...cell,
                                backgroundColor: color
                            }),
                        onClear: ()=>onChange({
                                ...cell,
                                backgroundColor: undefined
                            })
                    }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                        onClick: ()=>onChange({
                                ...cell,
                                backgroundColor: '#000'
                            }),
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {})
                    })
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                size: {
                    xs: 1
                },
                textAlign: "end",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                    title: "Remove cell settings",
                    placement: "top",
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                        size: "small",
                        sx: {
                            marginLeft: 'auto'
                        },
                        onClick: onDelete,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_DeleteOutline.default, {})
                    }, "delete-cell-button")
                })
            })
        ]
    });
}
function ConditionalPanel({ cellSettings = [], onChange, addButtonText = 'Add Conditional Format' }) {
    const handleCellChange = (index, updatedCell)=>{
        const updatedCells = [
            ...cellSettings
        ];
        updatedCells[index] = updatedCell;
        onChange(updatedCells);
    };
    const handleCellDelete = (index)=>{
        const updatedCells = [
            ...cellSettings
        ];
        updatedCells.splice(index, 1);
        onChange(updatedCells.length > 0 ? updatedCells : undefined);
    };
    const handleAddCell = ()=>{
        const updatedCells = [
            ...cellSettings
        ];
        updatedCells.push({
            condition: {
                kind: 'Value',
                spec: {
                    value: ''
                }
            }
        });
        onChange(updatedCells);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 3,
        sx: {
            mt: 2
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Grid2, {
                container: true,
                spacing: 3,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 5
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "subtitle1",
                            children: "Condition"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 4
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "subtitle1",
                            children: "Display Text"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 1
                        },
                        textAlign: "center",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "subtitle1",
                            children: "Color"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 1
                        },
                        textAlign: "center",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "subtitle1",
                            children: "Background"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 1
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                gap: 1.5,
                divider: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {
                    flexItem: true,
                    orientation: "horizontal"
                }),
                children: cellSettings.map((cell, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(ConditionalRule, {
                        cell: cell,
                        onChange: (updatedCell)=>handleCellChange(i, updatedCell),
                        onDelete: ()=>handleCellDelete(i)
                    }, i))
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                variant: "outlined",
                startIcon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {}),
                sx: {
                    marginTop: 1
                },
                onClick: handleAddCell,
                children: addButtonText
            })
        ]
    });
}
