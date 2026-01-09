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
import React from 'react';
import { TextField, Stack, MenuItem, Typography } from '@mui/material';
/**
 * Creates the initial/empty options for a Table panel.
 */ export function createInitialTableOptions() {
    return {
        density: 'standard',
        enableFiltering: true
    };
}
/**
 * Formats the display text and colors based on cell settings
 */ export function formatCellDisplay(value, setting, defaultText) {
    const baseText = setting.text || defaultText || String(value);
    const displayText = `${setting.prefix ?? ''}${baseText}${setting.suffix ?? ''}`;
    return {
        text: displayText,
        textColor: setting.textColor,
        backgroundColor: setting.backgroundColor
    };
}
/**
 * Evaluates if a condition matches the given value
 */ export function evaluateCondition(condition, value) {
    switch(condition.kind){
        case 'Value':
            return condition.spec?.value === String(value);
        case 'Range':
            {
                if (Number.isNaN(Number(value))) return false;
                const numericValue = Number(value);
                // Both min and max defined
                if (condition.spec?.min !== undefined && condition.spec?.max !== undefined) {
                    return numericValue >= +condition.spec.min && numericValue <= +condition.spec.max;
                }
                // Only min defined
                if (condition.spec?.min !== undefined) {
                    return numericValue >= +condition.spec.min;
                }
                // Only max defined
                if (condition.spec?.max !== undefined) {
                    return numericValue <= +condition.spec.max;
                }
                return false;
            }
        case 'Regex':
            if (!condition.spec?.expr) return false;
            try {
                const regex = new RegExp(condition.spec.expr);
                return regex.test(String(value));
            } catch  {
                return false; // Invalid regex
            }
        case 'Misc':
            switch(condition.spec?.value){
                case 'empty':
                    return value === '';
                case 'null':
                    return value === null || value === undefined;
                case 'NaN':
                    return Number.isNaN(value);
                case 'true':
                    return value === true;
                case 'false':
                    return value === false;
                default:
                    return false;
            }
        default:
            return false;
    }
}
/**
 * Evaluates all conditions and returns the cell config for the first matching condition
 */ export function evaluateConditionalFormatting(value, settings) {
    for (const setting of settings){
        if (evaluateCondition(setting.condition, value)) {
            // Handle special default text cases
            let defaultText;
            if (setting.condition.kind === 'Misc') {
                switch(setting.condition.spec?.value){
                    case 'null':
                        defaultText = 'null';
                        break;
                    case 'NaN':
                        defaultText = 'NaN';
                        break;
                }
            }
            return formatCellDisplay(value, setting, defaultText);
        }
    }
    return undefined; // No conditions matched
}
/**
 * Renders the condition editor component for a given condition
 * This function can be used by both CellEditor and ColumnEditor to maintain consistency
 */ export function renderConditionEditor(condition, onChange, size = 'small') {
    if (condition.kind === 'Value') {
        return React.createElement(TextField, {
            label: 'Value',
            placeholder: 'Exact value',
            value: condition.spec?.value ?? '',
            onChange: (e)=>onChange({
                    ...condition,
                    spec: {
                        value: e.target.value
                    }
                }),
            fullWidth: true,
            size: size
        });
    } else if (condition.kind === 'Range') {
        return React.createElement(Stack, {
            gap: 1,
            direction: 'row'
        }, [
            React.createElement(TextField, {
                key: 'min',
                label: 'From',
                placeholder: 'Start of range',
                value: condition.spec?.min ?? '',
                onChange: (e)=>onChange({
                        ...condition,
                        spec: {
                            ...condition.spec,
                            min: +e.target.value
                        }
                    }),
                fullWidth: true,
                size: size
            }),
            React.createElement(TextField, {
                key: 'max',
                label: 'To',
                placeholder: 'End of range (inclusive)',
                value: condition.spec?.max ?? '',
                onChange: (e)=>onChange({
                        ...condition,
                        spec: {
                            ...condition.spec,
                            max: +e.target.value
                        }
                    }),
                fullWidth: true,
                size: size
            })
        ]);
    } else if (condition.kind === 'Regex') {
        return React.createElement(TextField, {
            label: 'Regular Expression',
            placeholder: 'JavaScript regular expression',
            value: condition.spec?.expr ?? '',
            onChange: (e)=>onChange({
                    ...condition,
                    spec: {
                        expr: e.target.value
                    }
                }),
            fullWidth: true,
            size: size
        });
    } else if (condition.kind === 'Misc') {
        const options = [
            {
                value: 'empty',
                label: 'Empty',
                caption: 'Matches empty string'
            },
            {
                value: 'null',
                label: 'Null',
                caption: 'Matches null or undefined'
            },
            {
                value: 'NaN',
                label: 'NaN',
                caption: 'Matches Not a Number value'
            },
            {
                value: 'true',
                label: 'True',
                caption: 'Matches true boolean'
            },
            {
                value: 'false',
                label: 'False',
                caption: 'Matches false boolean'
            }
        ];
        return React.createElement(TextField, {
            select: true,
            label: 'Value',
            value: condition.spec?.value ?? '',
            onChange: (e)=>onChange({
                    ...condition,
                    spec: {
                        value: e.target.value
                    }
                }),
            fullWidth: true,
            size: size
        }, options.map((option)=>React.createElement(MenuItem, {
                key: option.value,
                value: option.value
            }, React.createElement(Stack, {
                key: 'stack'
            }, [
                React.createElement(Typography, {
                    key: 'title'
                }, option.label),
                React.createElement(Typography, {
                    key: 'caption',
                    variant: 'caption'
                }, option.caption)
            ]))));
    }
    return null;
}

//# sourceMappingURL=table-model.js.map