/**
 * The code is a TypeScript React component that sets up the main structure of an application with
 * client-side routing and a custom theme.
 * @returns The App component is being returned.
 **/


import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Dashboard from "@/scenes/dashboard";
import Options from "@/scenes/options";
import Predictions from "@/scenes/predictions";

function App() {

  // Create theme using useMemo to prevent unnecessary re-renders
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app custom-scrollbar">
      {/* BrowserRouter for client-side routing */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Main content container */}
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem" flex="1" className="custom-scrollbar">
            <Routes>
              {/* Dashboard route */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Predictions route */}
              <Route path="/predictions" element={<Predictions />} />
              {/* Options route */}
              <Route path="/options" element={<Options />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
