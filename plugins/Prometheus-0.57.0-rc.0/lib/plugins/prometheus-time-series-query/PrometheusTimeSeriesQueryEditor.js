import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2023 The Perses Authors
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
import { produce } from 'immer';
import { DatasourceSelect, replaceVariables, useAllVariableValues, useDatasource, useDatasourceClient, useDatasourceSelectValueToSelector, useSuggestedStepMs, useTimeRange } from '@perses-dev/plugin-system';
import { useId } from '@perses-dev/components';
import { FormControl, Stack, TextField } from '@mui/material';
import { useContext, useMemo } from 'react';
import { PanelEditorContext } from '@perses-dev/dashboards';
import { DEFAULT_PROM, getDurationStringSeconds, getPrometheusTimeRange, getRangeStep, isDefaultPromSelector, isPrometheusDatasourceSelector, PROM_DATASOURCE_KIND } from '../../model';
import { DEFAULT_SCRAPE_INTERVAL } from '../types';
import { PromQLEditor } from '../../components';
import { useQueryState, useFormatState, useMinStepState } from './query-editor-model';
/**
 * The options editor component for editing a PrometheusTimeSeriesQuery's spec.
 */ export function PrometheusTimeSeriesQueryEditor(props) {
    const { onChange, value, value: { query, datasource }, isReadonly } = props;
    const datasourceSelectValue = datasource ?? DEFAULT_PROM;
    const datasourceSelectLabelID = useId('prom-datasource-label'); // for panels with multiple queries, this component is rendered multiple times on the same page
    const selectedDatasource = useDatasourceSelectValueToSelector(datasourceSelectValue, PROM_DATASOURCE_KIND);
    const { data: client } = useDatasourceClient(selectedDatasource);
    const promURL = client?.options.datasourceUrl;
    const { data: datasourceResource } = useDatasource(selectedDatasource);
    const { handleQueryChange, handleQueryBlur } = useQueryState(props);
    const { format, handleFormatChange, handleFormatBlur } = useFormatState(props);
    const { minStep, handleMinStepChange, handleMinStepBlur } = useMinStepState(props);
    const minStepPlaceholder = minStep ?? (datasourceResource && (datasourceResource?.plugin.spec).scrapeInterval) ?? DEFAULT_SCRAPE_INTERVAL;
    const handleDatasourceChange = (next)=>{
        if (isPrometheusDatasourceSelector(next)) {
            /* Good to know: The usage of onchange here causes an immediate spec update which eventually updates the panel
         This was probably intentional to allow for quick switching between datasources.
         Could have been triggered only with Run Query button as well.
      */ onChange(produce(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                const nextDatasource = isDefaultPromSelector(next) ? undefined : next;
                draft.datasource = nextDatasource;
            }));
            return;
        }
        throw new Error('Got unexpected non-Prometheus datasource selector');
    };
    const variableState = useAllVariableValues();
    const { absoluteTimeRange } = useTimeRange();
    const panelEditorContext = useContext(PanelEditorContext);
    const suggestedStepMs = useSuggestedStepMs(panelEditorContext?.preview.previewPanelWidth);
    const minStepMs = useMemo(()=>{
        /* Try catch is necessary, because when the minStep value is being typed, it will be valid when the duration unit is added. Example: 2m = 2 + m */ try {
            const durationsSeconds = getDurationStringSeconds(replaceVariables(minStepPlaceholder, variableState));
            return durationsSeconds !== undefined ? durationsSeconds * 1000 : undefined;
        } catch  {
            return undefined;
        }
    }, [
        variableState,
        minStepPlaceholder
    ]);
    const intervalMs = useMemo(()=>{
        const minStepSeconds = (minStepMs ?? 0) / 1000;
        return getRangeStep(getPrometheusTimeRange(absoluteTimeRange), minStepSeconds, undefined, suggestedStepMs) * 1000;
    }, [
        absoluteTimeRange,
        minStepMs,
        suggestedStepMs
    ]);
    const treeViewMetadata = useMemo(()=>{
        return minStepMs && intervalMs ? {
            minStepMs,
            intervalMs
        } : undefined;
    }, [
        minStepMs,
        intervalMs
    ]);
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ _jsx(FormControl, {
                margin: "dense",
                fullWidth: false,
                children: /*#__PURE__*/ _jsx(DatasourceSelect, {
                    datasourcePluginKind: PROM_DATASOURCE_KIND,
                    value: datasourceSelectValue,
                    onChange: handleDatasourceChange,
                    labelId: datasourceSelectLabelID,
                    label: "Prometheus Datasource",
                    notched: true,
                    readOnly: isReadonly
                })
            }),
            /*#__PURE__*/ _jsx(PromQLEditor, {
                completeConfig: {
                    remote: {
                        url: promURL
                    }
                },
                value: query,
                datasource: selectedDatasource,
                onChange: handleQueryChange,
                onBlur: handleQueryBlur,
                isReadOnly: isReadonly,
                treeViewMetadata: treeViewMetadata
            }),
            /*#__PURE__*/ _jsxs(Stack, {
                direction: "row",
                spacing: 2,
                children: [
                    /*#__PURE__*/ _jsx(TextField, {
                        fullWidth: true,
                        label: "Legend",
                        placeholder: "Example: '{{instance}}' will generate series names like 'webserver-123', 'webserver-456'...",
                        helperText: "Text to be displayed in the legend and the tooltip. Use {{label_name}} to interpolate label values.",
                        value: format ?? '',
                        onChange: (e)=>handleFormatChange(e.target.value),
                        onBlur: handleFormatBlur,
                        slotProps: {
                            inputLabel: {
                                shrink: isReadonly ? true : undefined
                            },
                            input: {
                                readOnly: isReadonly
                            }
                        }
                    }),
                    /*#__PURE__*/ _jsx(TextField, {
                        label: "Min Step",
                        placeholder: minStepPlaceholder,
                        helperText: "Lower bound for the step. If not provided, the scrape interval of the datasource is used.",
                        value: minStep ?? '',
                        onChange: (e)=>handleMinStepChange(e.target.value ? e.target.value : undefined),
                        onBlur: handleMinStepBlur,
                        sx: {
                            width: '250px'
                        },
                        slotProps: {
                            inputLabel: {
                                shrink: isReadonly ? true : undefined
                            },
                            input: {
                                readOnly: isReadonly
                            }
                        }
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=PrometheusTimeSeriesQueryEditor.js.map