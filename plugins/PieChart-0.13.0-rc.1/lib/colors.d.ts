export interface SeriesColorProps {
    categoricalPalette: string[];
    muiPrimaryColor: string;
    seriesName: string;
}
/**
 * Helper function to generate gradient colors for series within a query
 */
export declare function generateGradientColor(baseColor: string, factor: number): string;
/**
 * Generates a list of color strings for a given number of series using a categorical palette.
 * When the number of series exceeds the palette size, it cycles through the palette
 * and applies gradients to create visual distinction.
 * @param totalSeries - The total number of series that need colors
 * @param colorPalette - Array of color strings to use as the base palette
 * @returns Array of color strings, one for each series
 */
export declare function getSeriesColor(seriesNames: string[], colorPalette?: string[]): string[];
/**
 * Default classical qualitative palette that cycles through the colors array by index.
 * When colors start repeating (after exhausting the palette), applies gradients for distinction.
 */
export declare function getColor(palette: string[], seriesIndex: number): string;
/**
 * Return a consistent color for (name, error) tuple
 */
export declare function getConsistentColor(name: string, error: boolean): string;
export declare function getConsistentSeriesNameColor(inputString: string): string;
/**
 * Get line color as well as color for tooltip and legend, account for whether palette is 'categorical' or 'auto' aka generative
 */
export declare function getDefaultSeriesColor(props: SeriesColorProps): string;
/**
 * Get color from generative color palette, this approaches uses series name as the seed and
 * allows for consistent colors across panels (when all panels use this approach).
 */
export declare function getAutoPaletteColor(name: string, fallbackColor: string): string;
//# sourceMappingURL=colors.d.ts.map