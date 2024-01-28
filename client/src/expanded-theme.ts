// eslint-disable-next-line

declare module "@mui/material/styles/createPalette"{
    interface PaletteColor {
        [key: number]: string;
    }

    interface Palette {
        tertiary: PaletteColor;
    }
}