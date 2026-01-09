import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Copyright 2025 The Perses Authors
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
import { useCallback, useEffect, useState } from 'react';
import { Autocomplete, Checkbox, Stack, TextField } from '@mui/material';
import { useTimeRange } from '@perses-dev/plugin-system';
import { useQuery } from '@tanstack/react-query';
import { getUnixTimeRange } from '../plugins/tempo-trace-query/get-trace-data';
import { filterToTraceQL } from './filter/filter_to_traceql';
import { traceQLToFilter } from './filter/traceql_to_filter';
import { splitByUnquotedWhitespace } from './filter/filter';
const statusOptions = [
    'unset',
    'ok',
    'error'
];
export function AttributeFilters(props) {
    const { client, query, setQuery } = props;
    const filter = traceQLToFilter(query);
    const setFilter = (filter)=>{
        setQuery(filterToTraceQL(filter));
    };
    const { absoluteTimeRange } = useTimeRange();
    const { start, end } = getUnixTimeRange(absoluteTimeRange);
    const { data: serviceNameOptions } = useTagValues(client, 'resource.service.name', filterToTraceQL({
        ...filter,
        serviceName: []
    }), start, end);
    const { data: spanNameOptions } = useTagValues(client, 'name', filterToTraceQL({
        ...filter,
        spanName: []
    }), start, end);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(StringAttributeFilter, {
                label: "Service Name",
                options: serviceNameOptions ?? [],
                value: filter.serviceName,
                setValue: (x)=>setFilter({
                        ...filter,
                        serviceName: x
                    })
            }),
            /*#__PURE__*/ _jsx(StringAttributeFilter, {
                label: "Span Name",
                options: spanNameOptions ?? [],
                value: filter.spanName,
                setValue: (x)=>setFilter({
                        ...filter,
                        spanName: x
                    })
            }),
            /*#__PURE__*/ _jsx(StringAttributeFilter, {
                label: "Status",
                width: 210,
                options: statusOptions ?? [],
                value: filter.status,
                setValue: (x)=>setFilter({
                        ...filter,
                        status: x
                    })
            }),
            /*#__PURE__*/ _jsx(DurationAttributeFilter, {
                label: "Trace Duration",
                value: filter.traceDuration,
                setValue: (value)=>setFilter({
                        ...filter,
                        traceDuration: value
                    })
            }),
            /*#__PURE__*/ _jsx(CustomAttributesFilter, {
                label: "Custom Attributes",
                value: filter.customMatchers,
                setValue: (value)=>setFilter({
                        ...filter,
                        customMatchers: value
                    })
            })
        ]
    });
}
function StringAttributeFilter(props) {
    const { label, width, options, value, setValue } = props;
    return /*#__PURE__*/ _jsx(Autocomplete, {
        multiple: true,
        size: "small",
        limitTags: 1,
        disableCloseOnSelect: true,
        value: value,
        onChange: (_event, newValue)=>setValue(newValue),
        options: options,
        renderOption: (props, option, { selected })=>{
            const { key, ...optionProps } = props;
            return /*#__PURE__*/ _jsxs("li", {
                ...optionProps,
                children: [
                    /*#__PURE__*/ _jsx(Checkbox, {
                        style: {
                            marginRight: 8
                        },
                        checked: selected
                    }),
                    option
                ]
            }, key);
        },
        renderInput: (params)=>/*#__PURE__*/ _jsx(TextField, {
                ...params,
                label: label
            }),
        // Reduce the size of the chips to make space for the <input> element, the +X text and the X button to avoid a line break.
        // See https://github.com/mui/material-ui/issues/38835 for more details.
        slotProps: {
            chip: {
                sx: {
                    maxWidth: 'calc(100% - 45px) !important'
                }
            }
        },
        // Reduce the size of the <input> field
        sx: {
            width: width ?? 250,
            '& input': {
                minWidth: '5px !important'
            }
        }
    });
}
function DurationAttributeFilter(props) {
    const { label, value, setValue } = props;
    const { min, max } = value;
    return /*#__PURE__*/ _jsxs(Stack, {
        direction: "row",
        gap: 0.5,
        children: [
            /*#__PURE__*/ _jsx(DurationTextInput, {
                label: `Min ${label}`,
                value: min ?? '',
                setValue: (min)=>setValue({
                        min,
                        max
                    })
            }),
            /*#__PURE__*/ _jsx(DurationTextInput, {
                label: `Max ${label}`,
                value: max ?? '',
                setValue: (max)=>setValue({
                        min,
                        max
                    })
            })
        ]
    });
}
const durationFormatRegex = /^([0-9]+\.)?[0-9]+(ns|ms|s|m|h)$/;
function DurationTextInput(props) {
    const { label, value, setValue } = props;
    return /*#__PURE__*/ _jsx(LazyTextInput, {
        label: label,
        size: "small",
        value: value,
        setValue: setValue,
        validationRegex: durationFormatRegex,
        validationFailedMessage: "Invalid format. Accepted format e.g. 100ms, accepted units: ns, ms, s, m, h",
        sx: {
            width: 150
        }
    });
}
function CustomAttributesFilter(props) {
    const { label, value, setValue } = props;
    return /*#__PURE__*/ _jsx(LazyTextInput, {
        label: label,
        size: "small",
        placeholder: 'span.http.status_code=200 span.http.method="GET"',
        value: value.join(' '),
        setValue: (x)=>setValue(splitByUnquotedWhitespace(x)),
        sx: {
            flexGrow: 1
        }
    });
}
/** A <TextField> which calls props.setValue when the input field is blurred and the validation passes. */ function LazyTextInput(props) {
    const { validationRegex, validationFailedMessage, value, setValue, ...otherProps } = props;
    const [draftValue, setDraftValue] = useState(value);
    const isValidInput = draftValue == '' || validationRegex == undefined || validationRegex.test(draftValue);
    useEffect(()=>{
        setDraftValue(value);
    }, [
        value,
        setDraftValue
    ]);
    const handleChange = useCallback((event)=>{
        setDraftValue(event.target.value);
    }, []);
    const handleBlur = useCallback(()=>{
        if (isValidInput) {
            setValue(draftValue);
        }
    }, [
        isValidInput,
        setValue,
        draftValue
    ]);
    return /*#__PURE__*/ _jsx(TextField, {
        ...otherProps,
        error: !isValidInput,
        helperText: isValidInput ? undefined : validationFailedMessage,
        value: draftValue,
        onChange: handleChange,
        onBlur: handleBlur
    });
}
function useTagValues(client, tag, query, start, end) {
    return useQuery({
        queryKey: [
            'useTagValues',
            client,
            tag,
            query,
            start,
            end
        ],
        enabled: !!client,
        queryFn: async function() {
            if (!client) return;
            const values = await client.searchTagValues({
                tag,
                q: query,
                start,
                end
            });
            return values.tagValues.map((tagValue)=>tagValue.value ?? '').sort();
        },
        staleTime: 60 * 1000
    });
}

//# sourceMappingURL=AttributeFilters.js.map