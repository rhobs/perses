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
import { DatasourceSelect } from '@perses-dev/plugin-system';
import { useId } from '@perses-dev/components';
import { produce } from 'immer';
import { FormControl, InputLabel, Stack, TextField, useTheme } from '@mui/material';
import { DEFAULT_PYROSCOPE, isDefaultPyroscopeSelector, isPyroscopeDatasourceSelector, PYROSCOPE_DATASOURCE_KIND } from '../../model';
import { ProfileTypeSelector, Service, Filters } from '../../components';
import { useMaxNodesState, useProfileTypeState, useServiceState, useFiltersState } from './query-editor-model';
export function PyroscopeProfileQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? DEFAULT_PYROSCOPE;
    const datasourceSelectLabelID = useId('pyroscope-datasource-label');
    const { maxNodes, handleMaxNodesChange, maxNodesHasError } = useMaxNodesState(props);
    const { profileType, handleProfileTypeChange } = useProfileTypeState(props);
    const { service, handleServiceChange } = useServiceState(props);
    const { filters, handleFiltersChange } = useFiltersState(props);
    const handleDatasourceChange = (next)=>{
        // Check if the next value is a DatasourceSelector
        if (typeof next === 'object' && 'kind' in next && 'name' in next) {
            if (isPyroscopeDatasourceSelector(next)) {
                onChange(produce(value, (draft)=>{
                    // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                    draft.datasource = isDefaultPyroscopeSelector(next) ? undefined : next;
                }));
                return;
            }
        }
        throw new Error('Got unexpected non-Pyroscope datasource selector');
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ _jsxs(FormControl, {
                margin: "dense",
                fullWidth: false,
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        id: datasourceSelectLabelID,
                        shrink: true,
                        children: "Pyroscope Datasource"
                    }),
                    /*#__PURE__*/ _jsx(DatasourceSelect, {
                        datasourcePluginKind: PYROSCOPE_DATASOURCE_KIND,
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        labelId: datasourceSelectLabelID,
                        label: "Pyroscope Datasource",
                        notched: true
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs(Stack, {
                direction: "row",
                sx: {
                    [useTheme().breakpoints.down('sm')]: {
                        flexWrap: 'wrap'
                    },
                    gap: 2,
                    rowGap: 1
                },
                children: [
                    /*#__PURE__*/ _jsx(Service, {
                        datasource: selectedDatasource,
                        value: service,
                        onChange: handleServiceChange
                    }),
                    /*#__PURE__*/ _jsx(ProfileTypeSelector, {
                        datasource: selectedDatasource,
                        value: profileType,
                        onChange: handleProfileTypeChange
                    }),
                    /*#__PURE__*/ _jsx(TextField, {
                        type: "number",
                        size: "small",
                        label: "Max Nodes",
                        value: maxNodes,
                        error: maxNodesHasError,
                        onChange: (e)=>handleMaxNodesChange(e.target.value),
                        sx: (theme)=>({
                                width: 250,
                                [theme.breakpoints.down('sm')]: {
                                    width: '100%'
                                }
                            }),
                        slotProps: {
                            htmlInput: {
                                step: 1
                            }
                        }
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Filters, {
                datasource: selectedDatasource,
                value: filters,
                onChange: handleFiltersChange
            })
        ]
    });
}

//# sourceMappingURL=PyroscopeProfileQueryEditor.js.map