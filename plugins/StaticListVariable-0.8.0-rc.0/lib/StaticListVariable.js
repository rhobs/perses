/* eslint-disable jsx-a11y/no-autofocus */ import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, Chip, IconButton, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import PlusCircleIcon from 'mdi-material-ui/PlusCircle';
function StaticListVariableOptionEditor(props) {
    const { value: { values: variables = [] }, onChange } = props;
    const [editModeOption, setEditModeOption] = useState('');
    const onChangeHandler = useCallback((_, value)=>{
        const newVariable = value.pop();
        const valueExists = variables.map((v)=>{
            return typeof v === 'string' ? v : v?.value || '';
        }).some((v)=>v === newVariable);
        if (valueExists) return;
        onChange({
            values: [
                ...variables,
                {
                    value: String(newVariable),
                    label: String(newVariable)
                }
            ]
        });
    }, [
        onChange,
        variables
    ]);
    const onPasteHandler = useCallback((e)=>{
        const v = e.clipboardData.getData('text/plain');
        if (v) {
            const items = v.split(',').filter((i)=>{
                const exists = variables.map((v)=>{
                    return v?.value || String(v);
                }).some((v)=>v === i);
                return !exists;
            }).map((item)=>({
                    value: item.trim(),
                    label: ''
                }));
            onChange({
                values: [
                    ...variables,
                    ...items
                ]
            });
            e.preventDefault();
        }
    }, [
        onChange,
        variables
    ]);
    const tagDeleteHandler = useCallback((option)=>{
        const filteredVariables = variables.filter((v)=>!(v === option || v?.value === option));
        onChange({
            values: [
                ...filteredVariables
            ]
        });
        setEditModeOption('');
    }, [
        variables,
        onChange
    ]);
    const renderTagsHandler = useCallback((tagValue)=>{
        const updateVariableWithLabel = (optionKey, label)=>{
            if (!optionKey || !label) return variables;
            /* Prevent duplicate label */ const labelAlreadyExists = variables.filter((v)=>typeof v !== 'string').some((v)=>v?.label === label);
            if (labelAlreadyExists) return variables;
            return variables.map((v)=>{
                if (typeof v === 'string') return v;
                const variableOption = v;
                if (variableOption.value !== optionKey) return variableOption;
                const updatedVariableOption = {
                    label,
                    value: variableOption.value
                };
                return updatedVariableOption;
            });
        };
        return tagValue.map((_, index)=>{
            const foundVariable = variables[index];
            if (!foundVariable) return null;
            const labelObject = {
                value: '',
                label: ''
            };
            if (typeof foundVariable === 'string') {
                /* value and label are identical */ labelObject.value = foundVariable;
                labelObject.label = foundVariable;
            } else {
                labelObject.value = foundVariable.value;
                labelObject.label = foundVariable.label || foundVariable.value;
            }
            /* The value and key are the same thing, they can be used interchangeably  */ const optionKey = foundVariable?.value || foundVariable;
            return /*#__PURE__*/ _jsx(Chip, {
                sx: {
                    margin: '4px'
                },
                label: editModeOption !== optionKey ? /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    },
                    children: [
                        /*#__PURE__*/ _jsx(Typography, {
                            variant: "body2",
                            children: labelObject.value
                        }),
                        labelObject?.value !== labelObject?.label && /*#__PURE__*/ _jsx(Typography, {
                            variant: "body2",
                            sx: {
                                backgroundColor: (theme)=>theme.palette.grey[200],
                                color: (theme)=>theme.palette.text.primary,
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontWeight: 500
                            },
                            children: labelObject.label
                        }),
                        typeof foundVariable !== 'string' && labelObject.value === labelObject.label && /*#__PURE__*/ _jsx(IconButton, {
                            size: "small",
                            onClick: (e)=>{
                                e.stopPropagation();
                                setEditModeOption(optionKey);
                            },
                            sx: {
                                color: (theme)=>theme.palette.action.disabled
                            },
                            children: /*#__PURE__*/ _jsx(PlusCircleIcon, {
                                fontSize: "small"
                            })
                        })
                    ]
                }) : /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    },
                    children: [
                        /*#__PURE__*/ _jsx("span", {
                            children: optionKey
                        }),
                        /*#__PURE__*/ _jsx(TextField, {
                            defaultValue: labelObject.label,
                            onBlur: (e)=>{
                                const { target: { value: input } } = e;
                                if (input) {
                                    const updatedVariables = updateVariableWithLabel(optionKey, input);
                                    onChange({
                                        values: updatedVariables
                                    });
                                }
                                setEditModeOption('');
                            },
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') {
                                    const { value: input } = e.target;
                                    const updatedVariables = updateVariableWithLabel(optionKey, input);
                                    onChange({
                                        values: updatedVariables
                                    });
                                    setEditModeOption('');
                                } else if (e.key === 'Escape') {
                                    setEditModeOption('');
                                }
                            },
                            size: "small",
                            autoFocus: true,
                            sx: {
                                width: '100%',
                                padding: 0,
                                margin: 0,
                                backgroundColor: (theme)=>theme.palette.background.default,
                                '& .MuiInputBase-root': {
                                    fontSize: '0.875rem',
                                    padding: 0
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                }
                            },
                            inputProps: {
                                style: {
                                    padding: 0
                                }
                            }
                        })
                    ]
                }),
                onDelete: ()=>{
                    tagDeleteHandler(optionKey);
                }
            }, optionKey);
        });
    }, [
        variables,
        tagDeleteHandler,
        editModeOption,
        onChange
    ]);
    return /*#__PURE__*/ _jsx("div", {
        children: /*#__PURE__*/ _jsx(Autocomplete, {
            onPaste: onPasteHandler,
            multiple: true,
            value: variables.map((vr)=>typeof vr === 'string' ? vr : vr.label || vr.value),
            onChange: onChangeHandler,
            options: [],
            freeSolo: true,
            clearOnBlur: true,
            readOnly: props.isReadonly,
            renderTags: renderTagsHandler,
            renderInput: (params)=>/*#__PURE__*/ _jsx(TextField, {
                    ...params,
                    label: "Values",
                    placeholder: "Values",
                    helperText: 'Type new value then press "Enter" to add. Optionally define a label by clicking on the "+" button.',
                    onKeyDown: (e)=>{
                        if (e.key === 'Backspace' && !params.inputProps.value) {
                            e.stopPropagation();
                        }
                    }
                })
        })
    });
}
export const StaticListVariable = {
    getVariableOptions: async (spec)=>{
        const values = spec.values?.map((v)=>{
            if (typeof v === 'string') {
                return {
                    label: v,
                    value: v
                };
            }
            return v;
        });
        return {
            data: values
        };
    },
    dependsOn: ()=>{
        return {
            variables: []
        };
    },
    OptionsEditorComponent: StaticListVariableOptionEditor,
    createInitialOptions: ()=>({
            values: []
        })
};

//# sourceMappingURL=StaticListVariable.js.map