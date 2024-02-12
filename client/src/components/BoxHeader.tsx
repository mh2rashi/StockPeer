/**
 * The `BoxHeader` component is a reusable component in TypeScript React that displays an icon, title,
 * subtitle, and side text in a flexbox layout.
 * @param {Props}  - - `icon` (optional): A React node representing an icon to be displayed in the
 * header.
 * @returns The `BoxHeader` component is returning a JSX element.
 **/

import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, Typography, useTheme } from '@mui/material'

type Props = {

    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    sideText: string;
}

const BoxHeader = ({icon, title, subtitle, sideText}: Props) => {

  const {palette} = useTheme();

  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0rem 1rem">
        <FlexBetween>
            {icon}
            <Box width="100%">
                <Typography variant="h3" mb="-0.1rem">
                    {title}         
                </Typography>
                <Typography variant="h4">
                    {subtitle}
                </Typography>
            </Box>
        </FlexBetween>
        <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
            {sideText}
        </Typography>
    </FlexBetween>
  )
}

export default BoxHeader;
