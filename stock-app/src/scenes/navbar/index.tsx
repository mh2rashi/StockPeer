// eslint

 import { useState } from "react";
 import { Link } from "react-router-dom";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography, useTheme, InputBase, IconButton } from '@mui/material';
import FlexBetween from "@/components/FlexBetween";

//type Props = {};

const Navbar = ({ searchQuery, onSearchChange }) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("Dashboard");

  const handleSearch = (eve) => {
    onSearchChange(eve.target.value);
    // Implement your search logic here (if needed)
  };

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" gap="2rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <QueryStatsIcon sx={{fontSize:"44px"}} />
        <Typography variant="h4" fontSize="32px">StockPeer</Typography>
      </FlexBetween>

      {/* SEARCH INPUT (Takes entire space) */}
      <Box flex="1">
        <Box sx={{ position: 'relative' }}>
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              color: palette.grey[700],
              border: `1px solid ${palette.grey[500]}`,
              borderRadius: '8px',
              padding: '12px 36px 12px 12px',
              width: '100%', // Adjust width to take entire space
            }}
          />
          <IconButton sx={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

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