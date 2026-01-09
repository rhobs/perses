import React from 'react';
import { LogEntry } from '@perses-dev/core';
interface LogRowProps {
    log?: LogEntry;
    index: number;
    isExpanded: boolean;
    onToggle: (index: number) => void;
    isExpandable?: boolean;
    showTime?: boolean;
    allowWrap?: boolean;
}
export declare const LogRow: React.NamedExoticComponent<LogRowProps>;
export {};
//# sourceMappingURL=LogRow.d.ts.map