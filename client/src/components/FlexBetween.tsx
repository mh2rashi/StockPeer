/* 
The code is creating a custom styled component called `FlexBetween` using the `styled` function from
the Material UI library. It applies custom styles to the `Box` component from the Material UI
library. The styles include setting the display to flex, justifying the content to space-between,
and aligning the items to the center. The `FlexBetween` component can be used in a React application
to apply these styles to a `Box` component.
*/


import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
    display:"flex",
    justifyContent:"space-between",
    alignItems: "center",
})

export default FlexBetween;
