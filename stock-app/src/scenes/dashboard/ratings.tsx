import DashboardBox from "@/components/DashboardBox";
import { useGetSustainabilityQuery } from "@/state/yahooAPI";
import BoxHeader from "../../components/BoxHeader"; // Replace with actual path to BoxHeader component
import "../../index.css";
import RectangleCustom from "../dashboard/rectangle";
import { useMediaQuery, useTheme  } from "@mui/material";
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file
import {useState, useEffect} from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function getCurrentDateFormatted() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1 to get correct month
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


type Props = {
  searchQuery: string;
};

const Ratings = ({ searchQuery }: Props) => {
  const palette = useTheme();  // Fix: Change `theme` to `palette`
  const isSmallScreen = useMediaQuery(palette.breakpoints.down('lg'));
  const { data, isLoading, error } = useGetSustainabilityQuery(searchQuery);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [searchQuery]);

  if (isLoading) {
    return (
      <DashboardBox gridArea="g" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  if (error || !searchQuery || !data) {
    return (
      <DashboardBox gridArea="g" padding="1rem 1rem 1.25rem 1rem" key={key} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
            <SearchRoundedIcon sx={{ fontSize: "144px" }}></SearchRoundedIcon>
            <span>Please enter or re-enter your stock ticker</span>
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

        <div style={{ display: "flex", justifyContent: "space-between", padding:"1rem 1rem 0rem 1rem" , color:"#FFF"}}>
          <div>
                <span>Total ESG Score</span>
                <div style={{ display: "flex" }}>

                  <div style={{ fontSize: "20px", fontWeight: "600", gap: "1rem" }}>
                      {data["ESGScores"]["Score"]} 
                  
                      <span
                      style={{
                          paddingLeft: "0.5rem",
                          fontSize: "12px",
                          fontWeight: "500",
                      }}
                      >
                      {data["ESGScores"]["Percentile"]}
                      </span>

                  </div>

                </div>

                {/*<div style={{ fontSize: "16px", fontWeight: "500", display: "incline-block", paddingLeft: "0.5rem" }}>
                      {data["ESGScores"]["Rank"].slice(0, Math.ceil(data["ESGScores"]["Rank"].length / 2))}
                    </div>*/}
          </div>

          <div>
                <span style={{ marginRight: "10px" }}>Environment Risk Score</span>
                <div style={{ fontSize: "20px", fontWeight: "600", display: "flex" }}>{data["EnvironmentScore"]["Score"]}</div>
          </div>

          <div>
                <span style={{ marginRight: "10px" }}>Social Risk Score</span>
                <div style={{ fontSize: "20px", fontWeight: "600", display: "flex" }}>{data["SocialScore"]["Score"]}</div>
          </div>

          <div>
                <span style={{ marginRight: "10px" }}>Governance Risk Score</span>
                <div style={{ fontSize: "20px", fontWeight: "600", display: "flex" }}>{data["GovernanceScores"]["Score"]}</div>
          </div>
        </div>
        <hr style={{
            margin: isSmallScreen
              ? "1rem 1rem 0.5rem 10px"
              : "1rem 1rem 0.5rem 10px",
          }} />
        <RectangleCustom searchQuery={searchQuery} />
      </DashboardBox>
    </>
  );
};

export default Ratings;
