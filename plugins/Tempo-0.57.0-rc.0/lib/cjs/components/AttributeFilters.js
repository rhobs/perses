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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AttributeFilters", {
    enumerable: true,
    get: function() {
        return AttributeFilters;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _pluginsystem = require("@perses-dev/plugin-system");
const _reactquery = require("@tanstack/react-query");
const _gettracedata = require("../plugins/tempo-trace-query/get-trace-data");
const _filter_to_traceql = require("./filter/filter_to_traceql");
const _traceql_to_filter = require("./filter/traceql_to_filter");
const _filter = require("./filter/filter");
const statusOptions = [
    'unset',
    'ok',
    'error'
];
function AttributeFilters(props) {
    const { client, query, setQuery } = props;
    const filter = (0, _traceql_to_filter.traceQLToFilter)(query);
    const setFilter = (filter)=>{
        setQuery((0, _filter_to_traceql.filterToTraceQL)(filter));
    };
    const { absoluteTimeRange } = (0, _pluginsystem.useTimeRange)();
    const { start, end } = (0, _gettracedata.getUnixTimeRange)(absoluteTimeRange);
    const { data: serviceNameOptions } = useTagValues(client, 'resource.service.name', (0, _filter_to_traceql.filterToTraceQL)({
        ...filter,
        serviceName: []
    }), start, end);
    const { data: spanNameOptions } = useTagValues(client, 'name', (0, _filter_to_traceql.filterToTraceQL)({
        ...filter,
        spanName: []
    }), start, end);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(StringAttributeFilter, {
                label: "Service Name",
                options: serviceNameOptions ?? [],
                value: filter.serviceName,
                setValue: (x)=>setFilter({
                        ...filter,
                        serviceName: x
                    })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(StringAttributeFilter, {
                label: "Span Name",
                options: spanNameOptions ?? [],
                value: filter.spanName,
                setValue: (x)=>setFilter({
                        ...filter,
                        spanName: x
                    })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(StringAttributeFilter, {
                label: "Status",
                width: 210,
                options: statusOptions ?? [],
                value: filter.status,
                setValue: (x)=>setFilter({
                        ...filter,
                        status: x
                    })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(DurationAttributeFilter, {
                label: "Trace Duration",
                value: filter.traceDuration,
                setValue: (value)=>setFilter({
                        ...filter,
                        traceDuration: value
                    })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(CustomAttributesFilter, {
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Autocomplete, {
        multiple: true,
        size: "small",
        limitTags: 1,
        disableCloseOnSelect: true,
        value: value,
        onChange: (_event, newValue)=>setValue(newValue),
        options: options,
        renderOption: (props, option, { selected })=>{
            const { key, ...optionProps } = props;
            return /*#__PURE__*/ (0, _jsxruntime.jsxs)("li", {
                ...optionProps,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Checkbox, {
                        style: {
                            marginRight: 8
                        },
                        checked: selected
                    }),
                    option
                ]
            }, key);
        },
        renderInput: (params)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        direction: "row",
        gap: 0.5,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(DurationTextInput, {
                label: `Min ${label}`,
                value: min ?? '',
                setValue: (min)=>setValue({
                        min,
                        max
                    })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(DurationTextInput, {
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LazyTextInput, {
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LazyTextInput, {
        label: label,
        size: "small",
        placeholder: 'span.http.status_code=200 span.http.method="GET"',
        value: value.join(' '),
        setValue: (x)=>setValue((0, _filter.splitByUnquotedWhitespace)(x)),
        sx: {
            flexGrow: 1
        }
    });
}
/** A <TextField> which calls props.setValue when the input field is blurred and the validation passes. */ function LazyTextInput(props) {
    const { validationRegex, validationFailedMessage, value, setValue, ...otherProps } = props;
    const [draftValue, setDraftValue] = (0, _react.useState)(value);
    const isValidInput = draftValue == '' || validationRegex == undefined || validationRegex.test(draftValue);
    (0, _react.useEffect)(()=>{
        setDraftValue(value);
    }, [
        value,
        setDraftValue
    ]);
    const handleChange = (0, _react.useCallback)((event)=>{
        setDraftValue(event.target.value);
    }, []);
    const handleBlur = (0, _react.useCallback)(()=>{
        if (isValidInput) {
            setValue(draftValue);
        }
    }, [
        isValidInput,
        setValue,
        draftValue
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
        ...otherProps,
        error: !isValidInput,
        helperText: isValidInput ? undefined : validationFailedMessage,
        value: draftValue,
        onChange: handleChange,
        onBlur: handleBlur
    });
}
function useTagValues(client, tag, query, start, end) {
    return (0, _reactquery.useQuery)({
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
