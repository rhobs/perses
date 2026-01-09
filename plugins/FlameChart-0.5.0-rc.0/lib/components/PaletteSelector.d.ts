import { ReactElement } from 'react';
export type PaletteOption = 'package-name' | 'value';
export interface PaletteSelectorProps {
    onChange: (palette: PaletteOption) => void;
    value?: PaletteOption;
}
export declare function PaletteSelector({ onChange, value }: PaletteSelectorProps): ReactElement;
//# sourceMappingURL=PaletteSelector.d.ts.map