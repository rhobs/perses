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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get createInitialTableOptions () {
        return createInitialTableOptions;
    },
    get evaluateCondition () {
        return evaluateCondition;
    },
    get evaluateConditionalFormatting () {
        return evaluateConditionalFormatting;
    },
    get formatCellDisplay () {
        return formatCellDisplay;
    },
    get renderConditionEditor () {
        return renderConditionEditor;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _material = require("@mui/material");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createInitialTableOptions() {
    return {
        density: 'standard',
        enableFiltering: true
    };
}
function formatCellDisplay(value, setting, defaultText) {
    const baseText = setting.text || defaultText || String(value);
    const displayText = `${setting.prefix ?? ''}${baseText}${setting.suffix ?? ''}`;
    return {
        text: displayText,
        textColor: setting.textColor,
        backgroundColor: setting.backgroundColor
    };
}
function evaluateCondition(condition, value) {
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
function evaluateConditionalFormatting(value, settings) {
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
function renderConditionEditor(condition, onChange, size = 'small') {
    if (condition.kind === 'Value') {
        return _react.default.createElement(_material.TextField, {
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
        return _react.default.createElement(_material.Stack, {
            gap: 1,
            direction: 'row'
        }, [
            _react.default.createElement(_material.TextField, {
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
            _react.default.createElement(_material.TextField, {
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
        return _react.default.createElement(_material.TextField, {
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
        return _react.default.createElement(_material.TextField, {
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
        }, options.map((option)=>_react.default.createElement(_material.MenuItem, {
                key: option.value,
                value: option.value
            }, _react.default.createElement(_material.Stack, {
                key: 'stack'
            }, [
                _react.default.createElement(_material.Typography, {
                    key: 'title'
                }, option.label),
                _react.default.createElement(_material.Typography, {
                    key: 'caption',
                    variant: 'caption'
                }, option.caption)
            ]))));
    }
    return null;
}
