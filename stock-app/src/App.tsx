import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Options from "@/scenes/options";
import Predictions from "@/scenes/predictions"


function App() {
  
  const theme = useMemo(() => createTheme(themeSettings), []);

  // Lifted state and handler function
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app custom-scrollbar" >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem" flex="1" className="custom-scrollbar">
            <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            <Routes>
              <Route path="/" element={<Dashboard searchQuery={searchQuery} />} />
              <Route path="/dashboard" element={<Dashboard searchQuery={searchQuery} />} />
              <Route path="/predictions" element={<Predictions searchQuery={searchQuery}/>}/>
              <Route path="/options" element={<Options searchQuery={searchQuery} />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
