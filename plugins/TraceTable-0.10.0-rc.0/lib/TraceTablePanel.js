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
import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { NoDataOverlay, useChartsTheme } from '@perses-dev/components';
import { DataTable } from './DataTable';
export function TraceTablePanel(props) {
    const { spec, queryResults } = props;
    const chartsTheme = useChartsTheme();
    const contentPadding = chartsTheme.container.padding.default;
    const tracesFound = queryResults.some((traceData)=>(traceData.data?.searchResult ?? []).length > 0);
    if (!tracesFound) {
        return /*#__PURE__*/ _jsx(NoDataOverlay, {
            resource: "traces"
        });
    }
    return /*#__PURE__*/ _jsx(Box, {
        sx: {
            height: '100%',
            padding: `${contentPadding}px`,
            overflowY: 'auto'
        },
        children: /*#__PURE__*/ _jsx(DataTable, {
            options: spec,
            result: queryResults
        })
    });
}

//# sourceMappingURL=TraceTablePanel.js.map