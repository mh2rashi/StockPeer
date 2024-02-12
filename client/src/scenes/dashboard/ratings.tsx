/**
 * This is a TypeScript React component that displays environment, social, and governance (ESG) risk
 * ratings of a stock company within the Dashboard page.
 * @returns The component is returning JSX elements that display the environment, social, and
 * governance (ESG) risk ratings of a stock company. It fetches data from an API using the
 * `useGetSustainabilityQuery` hook.
 **/

// React imports
import { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from "@mui/material";

// Component imports
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "../../components/BoxHeader";
import RectangleCustom from "../dashboard/rectangle";

// API imports
import { useGetSustainabilityQuery } from "@/state/yahooAPI";

// Animation & icon imports
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/LoadingAnimation.json';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

// Function to get current formatted date
function getCurrentDateFormatted() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1 to get correct month
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Type definitions
type Props = {
  ticker: string;
};

const Ratings = ({ ticker }: Props) => {
  // Fetch data from API
  const { data, isLoading, error } = useGetSustainabilityQuery(ticker);
  
  // Custom theme colors
  const palette = useTheme();  // Fix: Change `theme` to `palette`
  const theme = useTheme();

  // Media query for responsiveness
  const isSmallScreen = useMediaQuery(palette.breakpoints.down('lg'));

  // State for key and to force re-rendering
  const [key, setKey] = useState(0);

  // useEffect to force re-render when ticker changes
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [ticker]);

  // Loading state
  if (isLoading) {
    return (
      <DashboardBox gridArea="g" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  // Error or no data state
  if (error || !ticker || !data) {
    return (
      <DashboardBox gridArea="g" padding="1rem 1rem 1.25rem 1rem" key={key} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
        <SearchRoundedIcon sx={{ fontSize: "144px", color: theme.palette.grey[300] }}></SearchRoundedIcon>
        <span style={{ color: theme.palette.grey[300] }}>Please enter or re-enter your stock ticker</span>
      </DashboardBox>
    );
  }

  return (
    <>
      <DashboardBox gridArea="g" width="100%" height="100%" key={key}>
        <BoxHeader
          title="Environment, Social and Governance (ESG): Risk Ratings"
          subtitle="Provided by Sustainalytics"
          sideText={getCurrentDateFormatted()}
        />

        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 1rem 0rem 1rem", color: "#FFF" }}>
          {/* Total ESG Score */}
          <div>
            <span>Total ESG Score</span>
            <div style={{ display: "flex" }}>
              <div style={{ fontSize: "20px", fontWeight: "600", gap: "1rem" }}>
                {data["ESGScores"]["Score"]}
                <span style={{ paddingLeft: "0.5rem", fontSize: "12px", fontWeight: "500" }}>{data["ESGScores"]["Percentile"]}</span>
              </div>
            </div>
          </div>

          {/* Environment Risk Score */}
          <div>
            <span style={{ marginRight: "10px" }}>Environment Risk Score</span>
            <div style={{ fontSize: "20px", fontWeight: "600", display: "flex" }}>{data["EnvironmentScore"]["Score"]}</div>
          </div>

          {/* Social Risk Score */}
          <div>
            <span style={{ marginRight: "10px" }}>Social Risk Score</span>
            <div style={{ fontSize: "20px", fontWeight: "600", display: "flex" }}>{data["SocialScore"]["Score"]}</div>
          </div>

          {/* Governance Risk Score */}
          <div>
            <span style={{ marginRight: "10px" }}>Governance Risk Score</span>
            <div style={{ fontSize: "20px", fontWeight: "600", display: "flex" }}>{data["GovernanceScores"]["Score"]}</div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ margin: isSmallScreen ? "1rem 1rem 0.5rem 10px" : "1rem 1rem 0.5rem 10px" }} />

        {/* RectangleCustom component */}
        <RectangleCustom ticker={ticker} />
      </DashboardBox>
    </>
  );
};

export default Ratings;
