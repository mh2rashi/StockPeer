import { Box, useMediaQuery } from "@mui/material";

import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";


const gridTemplateLargeScreens = `
    "a a a a e e e g g g g g"
    "a a a a e e e g g g g g"
    "a a a a e e e g g g g g"
    "a a a a e e e g g g g g"
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
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "i"
    "i"
    "i"
    "i"
    "j"
    "j"
`

type Props = {
    searchQuery: string;
}

const Dashboard = ({ searchQuery } : Props) => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  
    return (
      <Box
        width="100%"
        height="100%"
        display="grid"
        gap="1rem"
        padding="0rem 0rem 1rem 0rem"
        sx={
          isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeat(12, minmax(185px, 1fr))",
                gridTemplateRows: "repeat(12, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreens,
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "80px",
                gridTemplateAreas: gridTemplateSmallScreens,
              }
        }
      >

        {/* Add other components/sections based on the searchQuery if needed */}
        <Row1 searchQuery={searchQuery}></Row1>
        <Row2 searchQuery={searchQuery}></Row2>
        <Row3 searchQuery={searchQuery}></Row3>
      </Box>
    );
  };
  
  export default Dashboard;