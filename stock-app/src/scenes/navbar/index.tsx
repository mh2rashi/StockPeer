// eslint

 import { useState } from "react";

 import { Link } from "react-router-dom";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {  Box, Typography, useTheme } from "@mui/material";

import FlexBetween from "@/components/FlexBetween";

//type Props = {};

const Navbar = () => {

    const { palette } = useTheme();
    const [selected, setSelected] = useState("Dashboard");

  return (

  <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
    
    {/* LEFT SIDE */}
    <FlexBetween gap="0.75rem">
      <QueryStatsIcon sx={{fontSize:"44px"}} />
      <Typography variant="h4" fontSize="32px">StockPeer</Typography>
    </FlexBetween>

    {/* RIGHT SIDE */}
    <FlexBetween gap="2rem">
      <Box sx={{ "&:hover": { color: palette.primary[100]} }}>
        <Link to="/dashboard" onClick={() => setSelected("Dashboard")}
              style={{color: selected === "Dashboard"? "inherit" : palette.grey[700],
                    textDecoration: "inherit"}}>
          <Typography variant="h2" fontSize="18px">Dashboard</Typography>
        </Link>
      </Box>

      <Box>
        <Link to="/predictions" onClick={() => setSelected("Predictions")}
              style={{color: selected === "Predictions"? "inherit" : palette.grey[700],
                    textDecoration: "inherit"}}>
          <Typography variant="h2" fontSize="18px">Predictions</Typography>
        </Link>
      </Box>

      <Box>
      <Link to="/options" onClick={() => setSelected("Options")}
              style={{color: selected === "Options"? "inherit" : palette.grey[700],
                    textDecoration: "inherit"}}>
          <Typography variant="h2" fontSize="18px">Option Builder</Typography>
        </Link>
      </Box>

    </FlexBetween>


  </FlexBetween>
  
    );
  };

export default Navbar;