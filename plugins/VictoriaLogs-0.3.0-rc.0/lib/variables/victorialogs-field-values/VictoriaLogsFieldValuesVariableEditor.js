import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { FormControl, Stack, TextField, Autocomplete } from '@mui/material';
import { DatasourceSelect, isVariableDatasource, useDatasourceSelectValueToSelector } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import { useCallback, useMemo } from 'react';
import { DEFAULT_VICTORIALOGS, isDefaultVictoriaLogsSelector, isVictoriaLogsDatasourceSelector, VICTORIALOGS_DATASOURCE_KIND } from '../../model';
import { useFieldNames } from '../utils';
export function VictoriaLogsFieldValuesVariableEditor(props) {
    const { onChange, value, value: { datasource, query, field } } = props;
    const datasourceSelectValue = datasource ?? DEFAULT_VICTORIALOGS;
    const selectedDatasource = useDatasourceSelectValueToSelector(datasourceSelectValue, VICTORIALOGS_DATASOURCE_KIND);
    const { data: fieldNames, isLoading: isFieldNamesOptionsLoading } = useFieldNames(query, selectedDatasource);
    const handleDatasourceChange = useCallback((next)=>{
        if (isVariableDatasource(next) || isVictoriaLogsDatasourceSelector(next)) {
            onChange(produce(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = !isVariableDatasource(next) && isDefaultVictoriaLogsSelector(next) ? undefined : next;
            }));
            return;
        }
        throw new Error('Got unexpected non-VictoriaLogs datasource selector');
    }, [
        onChange,
        value
    ]);
    const handleQueryChange = useCallback((event)=>{
        onChange(produce(value, (draft)=>{
            draft.query = event.target.value;
        }));
    }, [
        onChange,
        value
    ]);
    const handleFieldChange = useCallback((_, newValue)=>{
        onChange(produce(value, (draft)=>{
            draft.field = newValue || '';
        }));
    }, [
        onChange,
        value
    ]);
    const fieldNamesOptions = useMemo(()=>{
        return fieldNames?.values.map((o)=>o.value) || [];
    }, [
        fieldNames
    ]);
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ _jsx(FormControl, {
                margin: "dense",
                children: /*#__PURE__*/ _jsx(DatasourceSelect, {
                    datasourcePluginKind: "VictoriaLogsDatasource",
                    value: datasourceSelectValue,
                    onChange: handleDatasourceChange,
                    readOnly: props.isReadonly,
                    labelId: "victorialogs-datasource-field",
                    label: "VictoriaLogs Datasource"
                })
            }),
            /*#__PURE__*/ _jsx(Autocomplete, {
                freeSolo: true,
                disableClearable: true,
                value: field,
                loading: isFieldNamesOptionsLoading,
                options: fieldNamesOptions,
                renderInput: (params)=>{
                    return /*#__PURE__*/ _jsx(TextField, {
                        ...params,
                        required: true,
                        label: "Field Name",
                        variant: "outlined"
                    });
                },
                onChange: handleFieldChange
            }),
            /*#__PURE__*/ _jsx(TextField, {
                required: true,
                label: "Query",
                InputLabelProps: {
                    shrink: props.isReadonly ? true : undefined
                },
                InputProps: {
                    readOnly: props.isReadonly
                },
                value: query,
                onChange: handleQueryChange
            })
        ]
    });
}

//# sourceMappingURL=VictoriaLogsFieldValuesVariableEditor.js.map