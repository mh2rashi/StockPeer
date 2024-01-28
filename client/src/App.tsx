import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "@/scenes/dashboard";
import Options from "@/scenes/options";
import Predictions from "@/scenes/predictions"



function App() {
  
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app custom-scrollbar" >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem" flex="1" className="custom-scrollbar">
            <Routes>
              <Route path="/" element= {<Dashboard/>} />
              <Route path="/dashboard" element= {<Dashboard/>} />
              <Route path="/predictions" element= {<Predictions/>}/>
              <Route path="/options" element= {<Options/>} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
