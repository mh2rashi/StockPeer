/*
  This code displays a rectangle representing the controversy level of a stock company within the Dashboard page's Ratings component.
  The 'ticker' property is a string representing the stock ticker symbol and is used to fetch data from the API.
*/

// React imports
import { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from "@mui/material";

// API imports
import { useGetSustainabilityQuery } from "@/state/yahooAPI";

// Type definitions
type Props = {
  ticker: string;
};

const RectangleCustom = ({ ticker }: Props) => {
  // Fetch data from API
  const { data, isLoading, error } = useGetSustainabilityQuery(ticker);
  
  // Custom theme colors
  const theme = useTheme();
  
  // Media query for responsiveness
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  // State for key and to force re-rendering
  const [key, setKey] = useState(0);

  // useEffect to force re-render when ticker changes
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [ticker]);

  // Loading state
  if (isLoading) {
    return <div style={{ alignItems: 'center', justifyContent: 'center', color: theme.palette.grey[300] }} key={key} >Loading...</div>;
  }

  // Error or no data state
  if (error || !data) {
    return <div style={{ alignItems: 'center', justifyContent: 'center', color: theme.palette.grey[300] }} key={key}>Please enter or re-enter your stock ticker</div>;
  }

  // Calculate left position of the dot based on controversy score
  let controversyScore = parseFloat(data["ControversyLevel"]["Score"]);
  let leftPosition;

  if (controversyScore === 0) {
    // If controversyScore is 0, position the dot at a fixed percentage from the left side
    leftPosition = 0.1;
  } else {
    // For other scores, calculate the position based on the score
    leftPosition = controversyScore ? Math.max(0, controversyScore * 19.55) : 0; // Assuming 5% of 391 pixels for full scale
  }

  return(
    <>
      <div style={{ display: "flex", justifyContent: "space-between", padding: isSmallScreen ? "1rem 1rem 0rem 1rem" : "1rem 1rem 0rem 1rem" , color: "#FFF"}}>
        <div style={{ fontSize: "16px", fontWeight: "500", display: "inline-block"}}>
          Controversy Level | {data["ControversyLevel"]["Score"].slice(0, Math.ceil(data["ESGScores"]["Rank"].length / 2))}
        </div>
        <div className="rectangle" style={{ position: "relative", margin: "0.1rem 0.35rem 1rem 2.5rem", height: "20px"}} >
          <div className="leftHalf"></div>
          <span className="dot" style={{ width: "15px", height: "15px", backgroundColor: "#0083e9", display: "inline-block", borderRadius: "50%", position: "absolute", left: `${leftPosition}%`, top: "15%", transform: "translate(-50%, -50%)" }}></span>
        </div>
      </div>
    </>
  );
};

export default RectangleCustom;
