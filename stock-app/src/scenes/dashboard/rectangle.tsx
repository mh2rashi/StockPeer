import "../../index.css";
import { useGetSustainabilityQuery } from "@/state/yahooAPI";
import { useMediaQuery, useTheme } from "@mui/material";


type Props = {
    searchQuery: string;
  };
  
const RectangleCustom = ({ searchQuery }: Props) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const { data, isLoading, error } = useGetSustainabilityQuery(searchQuery);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.toString()}</div>;
    }
  
    if (!data) {
      return null;
    }

  

    let controversyScore = parseFloat(data["ControversyLevel"]["Score"]);
    let leftPosition;

    if (controversyScore === 0) {
      // If controversyScore is 0, position the dot at a fixed percentage from the left side
      leftPosition = 0.1; // Adjust this value as needed
    } else {
      // For other scores, calculate the position based on the score
      leftPosition = controversyScore ? Math.max(0, controversyScore * 19.55) : 0;
    }
    return(

      <>
    <div style={{ display: "flex", justifyContent: "space-between", padding:isSmallScreen ? "1rem 1rem 0rem 1rem" : "1rem 1rem 0rem 1rem" , color:"#FFF"}}>
    {/*<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}> */}
      {/*<div style={{ display: "flex", justifyContent: "space-between", padding: "0.2rem 1rem 0.2rem 1rem", color: "#FFF" }}> */}
        <div style={{ fontSize: "16px", fontWeight: "500", display: "inline-block"}}>
          Controversy Level | {data["ControversyLevel"]["Score"].slice(0, Math.ceil(data["ESGScores"]["Rank"].length / 2))}
        </div>
        <div className="rectangle" style={{ position: "relative", margin:"0.1rem 0.35rem 1rem 2.5rem", height:"20px"}} >
          <div className="leftHalf"></div>
          <span className="dot" style={{ width: "15px", height: "15px", backgroundColor: "#0083e9", display: "inline-block", borderRadius: "50%", position: "absolute", left: `${leftPosition}%`, top: "15%", transform: "translate(-50%, -50%)`" }}></span>
        </div>
    </div>
    </>
    );

};

export default RectangleCustom;