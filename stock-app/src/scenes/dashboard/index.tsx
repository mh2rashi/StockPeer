import { Box, useMediaQuery } from "@mui/material";

import Profile from "./profile"
import BalanceSheet from "./balanceSheet";
import Ratings from "./ratings";
import Holders from "./holders";
import PriceGraph from "./priceGraph"
import IncomeStatement from "./incomeStatement";


const gridTemplateLargeScreens = `
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
    
`



const gridTemplateSmallScreens = `
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
`

type Props = {
    searchQuery: string;
}

const Dashboard = ({ searchQuery } : Props) => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  
    return (
      <>

      <Box
        width="100%"
        height="100%"
        display="grid"
        gap="1rem"
        sx={
          isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeat(12, minmax(185px, 1fr))",
                gridTemplateRows: "repeat(12, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreens,
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "100px",
                gridTemplateAreas: gridTemplateSmallScreens,
              }
        }
      >
        <Profile searchQuery={searchQuery}></Profile>
        <BalanceSheet searchQuery={searchQuery}></BalanceSheet>
        <Ratings searchQuery={searchQuery}></Ratings>
        <Holders searchQuery={searchQuery}></Holders>
        <PriceGraph searchQuery={searchQuery}></PriceGraph>
        <IncomeStatement searchQuery={searchQuery}></IncomeStatement>

      </Box>
      
      </>
    );
  };
  
export default Dashboard;

