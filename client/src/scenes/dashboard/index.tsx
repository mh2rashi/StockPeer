/*
This code defines a React component called "Dashboard". It imports various components related to
financial information and components for a stock company, such as Profile, BalanceSheet, Ratings,
Holders, PriceGraph, and IncomeStatement. It also imports the Navbar and Footer components. 
*/

// React imports
import { useState } from 'react';

// Reusable component imports
import { Box, useMediaQuery } from "@mui/material";
import '@/index.css'; // Import custom CSS

// Dashboard components imports
import Profile from "./profile";
import BalanceSheet from "./balanceSheet";
import Ratings from "./ratings";
import Holders from "./holders";
import PriceGraph from "./priceGraph";
import IncomeStatement from "./incomeStatement";

// Navbar and Footer iport
import Footer from "@/scenes/footer"; // Import Footer component
import Navbar from "@/scenes/navbar"; // Import Navbar component

// Define grid template for large screens
const gridTemplateLargeScreens = `
    "i i i i i i i i i i i i"
    "a a a a e e e g g g g g"
    "a a a a e e e g g g g g"
    "a a a a e e e g g g g g"
    "a a a a e e e h h h h h"
    "a a a a e e e h h h h h"
    "a a a a e e e h h h h h"
    "b b b b f f f h h h h h"
    "b b b b f f f h h h h h"
    "b b b b f f f h h h h h"
    "c c c c f f f h h h h h"
    "c c c c f f f h h h h h"
    "c c c c f f f h h h h h"
    "z z z z z z z z z z z z"
`
// Define grid template for small screens
const gridTemplateSmallScreens = `
    "i"
    "a"
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "e"
    "e"
    "e"
    "e"
    "f"
    "f"
    "f"
    "f"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "h"
    "h"
    "z"
`

const Dashboard = () => {

  // Media query for screen size responsiveness
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  // State and handler functions for search query and ticker symbol
  const [searchQuery, setSearchQuery] = useState('');
  const [ticker, setTicker] = useState('');

  const handleSearchChange = (query : string) => {
    setSearchQuery(query);
  };

  const handleTickerChange = () => {
    setTicker(searchQuery);
  };
  
    return (
      <>
        <Box
          className="custom-scrollbar"
          width="100%"
          height="100%"
          display="grid"
          gap="1rem"
          sx={
            isAboveMediumScreens
              ? {
                  gridTemplateColumns: "repeat(12, minmax(185px, 1fr))",
                  gridTemplateRows: "repeat(14, minmax(60px, 1fr))",
                  gridTemplateAreas: gridTemplateLargeScreens,
                }
              : {
                  gridAutoColumns: "1fr",
                  gridAutoRows: "100px",
                  gridTemplateAreas: gridTemplateSmallScreens,
                }
          }
        >
          <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchTicker={handleTickerChange} selectedPage={"Dashboard"}  />
          <Profile ticker={ticker}></Profile>
          <BalanceSheet ticker={ticker}></BalanceSheet>
          <Ratings ticker={ticker}></Ratings>
          <Holders  ticker={ticker}></Holders>
          <PriceGraph ticker={ticker}></PriceGraph>
          <IncomeStatement ticker={ticker}></IncomeStatement>
          <Footer />
        
        </Box>
      </>
    );
  };
  
export default Dashboard;
