import { LogEntry } from '@perses-dev/core';
export type Severity = 'critical' | 'error' | 'warning' | 'info' | 'debug' | 'trace' | 'unknown' | 'other';
export declare const severityAbbreviations: Record<Severity, string[]>;
export declare const getSeverity: (log: LogEntry) => Severity;
//# sourceMappingURL=utils.d.ts.map