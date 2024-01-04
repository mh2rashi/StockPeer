import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";


const gridTemplateLargeScreens = `
    "a a d d g g"
    "a a d d g g"
    "a a d d g g"
    "a a d d g g"
    "a a e h h h"
    "a a e h h h"
    "b b e h h h"
    "b b e h h h"
    "b b f h h h"
    "c c f h h h"
    "c c f h h h"
    "c c f h h h"
    
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

const Dashboard = () => {

    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (

    <Box width="100%" height="100%" display="grid" gap="1rem" padding="0rem 0rem 1rem 0rem"
        sx={
            isAboveMediumScreens ? {
            gridTemplateColumns: "repeat(6, minmax(370px, 1fr))",
            gridTemplateRows: "repeat(12, minmax(60px, 1fr))",
            gridTemplateAreas: gridTemplateLargeScreens,
        } : {
            gridAutoColumns: "1fr",
            gridAutoRows: "80px",
            gridTemplateAreas: gridTemplateSmallScreens,
        }
    
    }
    >
            <Row1></Row1>
            <Row2></Row2>
            <Row3></Row3>
    </Box>
        
  );

};

export default Dashboard;