/*
 This code applies custom styles to the `Box` component from the Material UI library.
*/

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
    display:"flex",
    justifyContent:"space-between",
    alignItems: "center",
})

export default FlexBetween;
