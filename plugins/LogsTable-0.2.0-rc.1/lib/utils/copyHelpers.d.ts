import { LogEntry } from '@perses-dev/core';
/**
 * Formats a timestamp for display in copied text
 */
export declare function formatTimestamp(timestamp: number | string): string;
/**
 * Formats labels as key=value pairs
 */
export declare function formatLabels(labels: Record<string, string>): string;
/**
 * Formats a single log entry as plain text for copying
 * Format: {timestamp} {labels} {message}
 */
export declare function formatLogEntry(log: LogEntry): string;
/**
 * Formats just the log message text (no timestamp or labels)
 */
export declare function formatLogMessage(log: LogEntry): string;
/**
 * Formats a log entry as JSON
 */
export declare function formatLogAsJson(log: LogEntry): string;
/**
 * Formats multiple log entries as plain text for copying
 * Each log entry is on its own line
 */
export declare function formatLogEntries(logs: LogEntry[]): string;
//# sourceMappingURL=copyHelpers.d.ts.map