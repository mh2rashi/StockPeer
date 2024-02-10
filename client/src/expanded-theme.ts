/*
 The code is extending the existing `Palette` interface in the `@mui/material/styles/createPalette`
 module.
 */

declare module "@mui/material/styles/createPalette" {
    // Define an interface for custom color variations
    interface PaletteColor {
      [key: number]: string; // Define a numerical index signature for custom color variations
    }
  
    // Extend the Palette interface with a new property for tertiary colors
    interface Palette {
      tertiary: PaletteColor; // Add a tertiary property of type PaletteColor
    }
  }
  