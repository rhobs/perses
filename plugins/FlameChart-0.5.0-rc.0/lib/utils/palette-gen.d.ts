/**
 * Get span color, account for whether palette is 'package-name' or 'value'
 */
export declare function getSpanColor(palette: string, functionName: string, value: number): string;
/**
 * Generate a consistent color for displaying flame chart by total value
 */
export declare function getColorByValue(value: number): string;
/**
 * Generate a consistent span color for displaying flame chart by package-name
 * (if function name includes 'error', it will have a red hue).
 */
export declare function getColorByPackageName(functionName: string, value: number): string;
//# sourceMappingURL=palette-gen.d.ts.map