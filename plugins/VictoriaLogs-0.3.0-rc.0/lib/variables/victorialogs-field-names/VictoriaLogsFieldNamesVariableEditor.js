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
import { FormControl, Stack, TextField } from '@mui/material';
import { DatasourceSelect, isVariableDatasource, useDatasourceSelectValueToSelector } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import { useCallback } from 'react';
import { DEFAULT_VICTORIALOGS, isDefaultVictoriaLogsSelector, isVictoriaLogsDatasourceSelector, VICTORIALOGS_DATASOURCE_KIND } from '../../model';
export function VictoriaLogsFieldNamesVariableEditor(props) {
    const { onChange, value, value: { datasource, query } } = props;
    const datasourceSelectValue = datasource ?? DEFAULT_VICTORIALOGS;
    const selectedDatasource = useDatasourceSelectValueToSelector(datasourceSelectValue, VICTORIALOGS_DATASOURCE_KIND);
    const handleDatasourceChange = useCallback((next)=>{
        if (isVariableDatasource(next) || isVictoriaLogsDatasourceSelector(next)) {
            onChange(produce(value, (draft)=>{
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
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ _jsx(FormControl, {
                margin: "dense",
                children: /*#__PURE__*/ _jsx(DatasourceSelect, {
                    datasourcePluginKind: "VictoriaLogsDatasource",
                    value: selectedDatasource,
                    onChange: handleDatasourceChange,
                    disabled: props.isReadonly,
                    labelId: "victorialogs-datasource-field",
                    label: "VictoriaLogs Datasource"
                })
            }),
            /*#__PURE__*/ _jsx(TextField, {
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

//# sourceMappingURL=VictoriaLogsFieldNamesVariableEditor.js.map