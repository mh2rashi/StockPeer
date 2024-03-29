/*
The code is creating a custom styled component called `DashboardBox` using the `styled` function
from the Material UI library. It applies custom styles to the `Box` component from the Material UI
library.
 */

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box) (({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    borderRadius: "1rem",
    boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,.8)",
}));

export default DashboardBox;
