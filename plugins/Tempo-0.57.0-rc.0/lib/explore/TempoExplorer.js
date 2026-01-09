import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import { Alert, Box, Stack } from '@mui/material';
import { ErrorAlert, ErrorBoundary, LoadingOverlay, NoDataOverlay } from '@perses-dev/components';
import { isValidTraceId } from '@perses-dev/core';
import { Panel } from '@perses-dev/dashboards';
import { useExplorerManagerContext } from '@perses-dev/explore';
import { DataQueriesProvider, MultiQueryEditor, useDataQueries } from '@perses-dev/plugin-system';
import { useState } from 'react';
import { linkToSpan, linkToTrace } from './links';
function SearchResultsPanel({ queries }) {
    const { isFetching, isLoading, queryResults } = useDataQueries('TraceQuery');
    // no query executed, show empty panel
    if (queryResults.length === 0) {
        return /*#__PURE__*/ _jsx(_Fragment, {});
    }
    if (isLoading || isFetching) {
        return /*#__PURE__*/ _jsx(LoadingOverlay, {});
    }
    const queryError = queryResults.find((d)=>d.error);
    if (queryError) {
        throw queryError.error;
    }
    const tracesFound = queryResults.some((traceData)=>(traceData.data?.searchResult ?? []).length > 0);
    if (!tracesFound) {
        return /*#__PURE__*/ _jsx(NoDataOverlay, {
            resource: "traces"
        });
    }
    const hasMoreResults = queryResults.some((traceData)=>traceData.data?.metadata?.hasMoreResults);
    return /*#__PURE__*/ _jsxs(Stack, {
        sx: {
            height: '100%'
        },
        gap: 2,
        children: [
            /*#__PURE__*/ _jsx(Box, {
                sx: {
                    height: '35%',
                    flexShrink: 0
                },
                children: /*#__PURE__*/ _jsx(Panel, {
                    panelOptions: {
                        hideHeader: true
                    },
                    definition: {
                        kind: 'Panel',
                        spec: {
                            queries,
                            display: {
                                name: ''
                            },
                            plugin: {
                                kind: 'ScatterChart',
                                spec: {
                                    link: linkToTrace
                                }
                            }
                        }
                    }
                })
            }),
            /*#__PURE__*/ _jsx(Panel, {
                sx: {
                    flexGrow: 1
                },
                panelOptions: {
                    hideHeader: true
                },
                definition: {
                    kind: 'Panel',
                    spec: {
                        queries,
                        display: {
                            name: ''
                        },
                        plugin: {
                            kind: 'TraceTable',
                            spec: {
                                links: {
                                    trace: linkToTrace
                                }
                            }
                        }
                    }
                }
            }),
            hasMoreResults && /*#__PURE__*/ _jsx(Alert, {
                severity: "info",
                children: "Not all matching traces are currently displayed. Increase the result limit to view additional traces."
            })
        ]
    });
}
function TracingGanttChartPanel(props) {
    const { queries, selectedSpanId } = props;
    const firstQuery = queries[0]?.spec.plugin.spec?.query;
    return /*#__PURE__*/ _jsx(Panel, {
        panelOptions: {
            showIcons: 'always'
        },
        definition: {
            kind: 'Panel',
            spec: {
                queries,
                display: {
                    name: `Trace ${firstQuery}`
                },
                plugin: {
                    kind: 'TracingGanttChart',
                    spec: {
                        links: {
                            trace: linkToTrace,
                            span: linkToSpan
                        },
                        selectedSpanId
                    }
                }
            }
        }
    });
}
export function TempoExplorer() {
    const { data: { queries = [], spanId: selectedSpanId }, setData } = useExplorerManagerContext();
    const [queryDefinitions, setQueryDefinitions] = useState(queries);
    // map TraceQueryDefinition to Definition<UnknownSpec>
    const definitions = queries.length ? queries.map((query)=>{
        return {
            kind: query.spec.plugin.kind,
            spec: query.spec.plugin.spec
        };
    }) : [];
    const firstQuery = queries[0]?.spec.plugin.spec?.query;
    const isSingleTrace = isValidTraceId(firstQuery ?? '');
    return /*#__PURE__*/ _jsxs(Stack, {
        gap: 2,
        sx: {
            width: '100%'
        },
        children: [
            /*#__PURE__*/ _jsx(MultiQueryEditor, {
                queryTypes: [
                    'TraceQuery'
                ],
                onChange: (state)=>setQueryDefinitions(state),
                queries: queryDefinitions,
                onQueryRun: ()=>setData({
                        queries: queryDefinitions
                    })
            }),
            /*#__PURE__*/ _jsx(ErrorBoundary, {
                FallbackComponent: ErrorAlert,
                resetKeys: [
                    queries
                ],
                children: /*#__PURE__*/ _jsx(DataQueriesProvider, {
                    definitions: definitions,
                    children: /*#__PURE__*/ _jsx(Box, {
                        height: 700,
                        children: isSingleTrace ? /*#__PURE__*/ _jsx(TracingGanttChartPanel, {
                            queries: queries,
                            selectedSpanId: selectedSpanId
                        }) : /*#__PURE__*/ _jsx(SearchResultsPanel, {
                            queries: queries
                        })
                    })
                })
            })
        ]
    });
}

//# sourceMappingURL=TempoExplorer.js.map