import { Box, useMediaQuery } from "@mui/material";
import '@/index.css';
import Profile from "./profile"
import BalanceSheet from "./balanceSheet";
import Ratings from "./ratings";
import Holders from "./holders";
import PriceGraph from "./priceGraph"
import IncomeStatement from "./incomeStatement";
import Footer from "@/scenes/footer"; // Import the Footer component
import Navbar from "@/scenes/navbar";
import {useState} from 'react'


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

  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

    // Lifted state and handler function
  const [searchQuery, setSearchQuery] = useState('');
  const [ticker, setTicker] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleTickerChange = (query) => {
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

