import { Definition, FormatOptions, Transform, UnknownSpec } from '@perses-dev/core';
import { TableDensity, TableCellConfig } from '@perses-dev/components';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
import React from 'react';
export interface ColumnSettings {
    name: string;
    header?: string;
    /**
     * Text to display when hovering over the header text. This can be useful for
     * providing additional information about the column when you want to keep the
     * header text relatively short to manage the column width.
     */
    headerDescription?: string;
    /**
     * Text to display when hovering over a cell. This can be useful for
     * providing additional information about the column when the content is
     * ellipsized to fit in the space.
     */
    cellDescription?: string;
    /**
     * Panel plugin to render.
     * By default, the cells are rendered as text.
     */
    plugin?: Definition<UnknownSpec>;
    /** Formatting options. Only applicable if plugin is unset. */
    format?: FormatOptions;
    align?: 'left' | 'center' | 'right';
    enableSorting?: boolean;
    sort?: 'asc' | 'desc';
    /**
     * Width of the column when rendered in a table. It should be a number in pixels
     * or "auto" to allow the table to automatically adjust the width to fill
     * space.
     */
    width?: number | 'auto';
    hide?: boolean;
    cellSettings?: CellSettings[];
    dataLink?: DataLink;
}
export interface DataLink {
    url: string;
    title?: string;
    openNewTab: boolean;
}
export interface ValueCondition {
    kind: 'Value';
    spec: {
        value: string;
    };
}
export interface RangeCondition {
    kind: 'Range';
    spec: {
        min?: number;
        max?: number;
    };
}
export interface RegexCondition {
    kind: 'Regex';
    spec: {
        expr: string;
    };
}
export interface MiscCondition {
    kind: 'Misc';
    spec: {
        value: 'empty' | 'null' | 'NaN' | 'true' | 'false';
    };
}
export type Condition = ValueCondition | RangeCondition | RegexCondition | MiscCondition;
export interface CellSettings {
    condition: Condition;
    text?: string;
    prefix?: string;
    suffix?: string;
    textColor?: `#${string}`;
    backgroundColor?: `#${string}`;
}
/**
 * The schema for a Table panel.
 */
export interface TableDefinition extends Definition<TableOptions> {
    kind: 'Table';
}
/**
 * The Options object type supported by the Table panel plugin.
 */
export interface TableOptions {
    density?: TableDensity;
    defaultColumnWidth?: 'auto' | number;
    defaultColumnHeight?: 'auto' | number;
    defaultColumnHidden?: boolean;
    pagination?: boolean;
    enableFiltering?: boolean;
    columnSettings?: ColumnSettings[];
    cellSettings?: CellSettings[];
    transforms?: Transform[];
}
/**
 * Creates the initial/empty options for a Table panel.
 */
export declare function createInitialTableOptions(): TableOptions;
export type TableSettingsEditorProps = OptionsEditorProps<TableOptions>;
/**
 * Formats the display text and colors based on cell settings
 */
export declare function formatCellDisplay(value: unknown, setting: CellSettings, defaultText?: string): TableCellConfig;
/**
 * Evaluates if a condition matches the given value
 */
export declare function evaluateCondition(condition: Condition, value: unknown): boolean;
/**
 * Evaluates all conditions and returns the cell config for the first matching condition
 */
export declare function evaluateConditionalFormatting(value: unknown, settings: CellSettings[]): TableCellConfig | undefined;
/**
 * Renders the condition editor component for a given condition
 * This function can be used by both CellEditor and ColumnEditor to maintain consistency
 */
export declare function renderConditionEditor(condition: Condition, onChange: (condition: Condition) => void, size?: 'small' | 'medium'): React.ReactElement | null;
//# sourceMappingURL=table-model.d.ts.map