import React from 'react';
import { LogEntry } from '@perses-dev/core';
import { LogsTableOptions } from '../model';
interface VirtualizedLogsListProps {
    logs: LogEntry[];
    spec: LogsTableOptions;
    expandedRows: Set<number>;
    onToggleExpand: (index: number) => void;
}
export declare const VirtualizedLogsList: React.FC<VirtualizedLogsListProps>;
export {};
//# sourceMappingURL=VirtualizedLogsList.d.ts.map