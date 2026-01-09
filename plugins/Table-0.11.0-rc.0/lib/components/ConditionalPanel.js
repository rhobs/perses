import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button, Divider, IconButton, MenuItem, Stack, TextField, Tooltip, Typography, Grid2 as Grid } from '@mui/material';
import DeleteIcon from 'mdi-material-ui/DeleteOutline';
import AddIcon from 'mdi-material-ui/Plus';
import { OptionsColorPicker } from '@perses-dev/components';
import { renderConditionEditor } from '../models';
export function ConditionalRule({ cell, onChange, onDelete, ...props }) {
    return /*#__PURE__*/ _jsxs(Grid, {
        container: true,
        spacing: 2,
        ...props,
        children: [
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 5
                },
                children: /*#__PURE__*/ _jsxs(Stack, {
                    direction: "row",
                    gap: 1,
                    width: "100%",
                    children: [
                        /*#__PURE__*/ _jsxs(TextField, {
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
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "Value",
                                    children: /*#__PURE__*/ _jsxs(Stack, {
                                        children: [
                                            /*#__PURE__*/ _jsx(Typography, {
                                                children: "Value"
                                            }),
                                            cell.condition.kind !== 'Value' && /*#__PURE__*/ _jsx(Typography, {
                                                variant: "caption",
                                                children: "Matches an exact text value"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "Range",
                                    children: /*#__PURE__*/ _jsxs(Stack, {
                                        children: [
                                            /*#__PURE__*/ _jsx(Typography, {
                                                children: "Range"
                                            }),
                                            cell.condition.kind !== 'Range' && /*#__PURE__*/ _jsx(Typography, {
                                                variant: "caption",
                                                children: "Matches against a numerical range"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "Regex",
                                    children: /*#__PURE__*/ _jsxs(Stack, {
                                        children: [
                                            /*#__PURE__*/ _jsx(Typography, {
                                                children: "Regex"
                                            }),
                                            cell.condition.kind !== 'Regex' && /*#__PURE__*/ _jsx(Typography, {
                                                variant: "caption",
                                                children: "Matches against a regular expression"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "Misc",
                                    children: /*#__PURE__*/ _jsxs(Stack, {
                                        children: [
                                            /*#__PURE__*/ _jsx(Typography, {
                                                children: "Misc"
                                            }),
                                            cell.condition.kind !== 'Misc' && /*#__PURE__*/ _jsx(Typography, {
                                                variant: "caption",
                                                children: "Matches against empty, null and NaN values"
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        renderConditionEditor(cell.condition, (updatedCondition)=>onChange({
                                ...cell,
                                condition: updatedCondition
                            }), 'small')
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 4
                },
                children: /*#__PURE__*/ _jsxs(Stack, {
                    spacing: 1,
                    children: [
                        /*#__PURE__*/ _jsx(TextField, {
                            label: "Display text",
                            value: cell.text,
                            onChange: (e)=>onChange({
                                    ...cell,
                                    text: e.target.value
                                }),
                            fullWidth: true,
                            size: "small"
                        }),
                        /*#__PURE__*/ _jsxs(Stack, {
                            direction: "row",
                            spacing: 1,
                            children: [
                                /*#__PURE__*/ _jsx(TextField, {
                                    label: "Prefix",
                                    placeholder: "$",
                                    value: cell.prefix ?? '',
                                    onChange: (e)=>onChange({
                                            ...cell,
                                            prefix: e.target.value
                                        }),
                                    size: "small"
                                }),
                                /*#__PURE__*/ _jsx(TextField, {
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
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 1
                },
                children: /*#__PURE__*/ _jsx(Stack, {
                    direction: "row",
                    justifyContent: "center",
                    gap: 1,
                    children: cell.textColor ? /*#__PURE__*/ _jsx(OptionsColorPicker, {
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
                    }) : /*#__PURE__*/ _jsx(IconButton, {
                        onClick: ()=>onChange({
                                ...cell,
                                textColor: '#000'
                            }),
                        children: /*#__PURE__*/ _jsx(AddIcon, {})
                    })
                })
            }),
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 1
                },
                children: /*#__PURE__*/ _jsx(Stack, {
                    direction: "row",
                    justifyContent: "center",
                    children: cell.backgroundColor ? /*#__PURE__*/ _jsx(OptionsColorPicker, {
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
                    }) : /*#__PURE__*/ _jsx(IconButton, {
                        onClick: ()=>onChange({
                                ...cell,
                                backgroundColor: '#000'
                            }),
                        children: /*#__PURE__*/ _jsx(AddIcon, {})
                    })
                })
            }),
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 1
                },
                textAlign: "end",
                children: /*#__PURE__*/ _jsx(Tooltip, {
                    title: "Remove cell settings",
                    placement: "top",
                    children: /*#__PURE__*/ _jsx(IconButton, {
                        size: "small",
                        sx: {
                            marginLeft: 'auto'
                        },
                        onClick: onDelete,
                        children: /*#__PURE__*/ _jsx(DeleteIcon, {})
                    }, "delete-cell-button")
                })
            })
        ]
    });
}
export function ConditionalPanel({ cellSettings = [], onChange, addButtonText = 'Add Conditional Format' }) {
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
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 3,
        sx: {
            mt: 2
        },
        children: [
            /*#__PURE__*/ _jsxs(Grid, {
                container: true,
                spacing: 3,
                children: [
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 5
                        },
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle1",
                            children: "Condition"
                        })
                    }),
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 4
                        },
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle1",
                            children: "Display Text"
                        })
                    }),
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 1
                        },
                        textAlign: "center",
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle1",
                            children: "Color"
                        })
                    }),
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 1
                        },
                        textAlign: "center",
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle1",
                            children: "Background"
                        })
                    }),
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 1
                        }
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Stack, {
                gap: 1.5,
                divider: /*#__PURE__*/ _jsx(Divider, {
                    flexItem: true,
                    orientation: "horizontal"
                }),
                children: cellSettings.map((cell, i)=>/*#__PURE__*/ _jsx(ConditionalRule, {
                        cell: cell,
                        onChange: (updatedCell)=>handleCellChange(i, updatedCell),
                        onDelete: ()=>handleCellDelete(i)
                    }, i))
            }),
            /*#__PURE__*/ _jsx(Button, {
                variant: "outlined",
                startIcon: /*#__PURE__*/ _jsx(AddIcon, {}),
                sx: {
                    marginTop: 1
                },
                onClick: handleAddCell,
                children: addButtonText
            })
        ]
    });
}

//# sourceMappingURL=ConditionalPanel.js.map