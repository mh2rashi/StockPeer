import DashboardBox from "@/components/DashboardBox";
import { useGetSustainabilityQuery } from "@/state/yahooAPI";
import BoxHeader from "../../components/BoxHeader"; // Replace with actual path to BoxHeader component
import "../../index.css";
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file

type Props = {
  searchQuery: string;
};

const Ratings = ({ searchQuery }: Props) => {
  const { data, isLoading, error } = useGetSustainabilityQuery(searchQuery);

  if (isLoading) {
    return (
      <DashboardBox gridArea="a" padding="1rem 1rem 1.25rem 1rem">
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <DashboardBox gridArea="g" >
        <BoxHeader
          title="Environment, Social and Governance (ESG) Risk Ratings"
          subtitle="Risk ratings provided by Sustainalytics"
          sideText=""
        />

        <div style={{ display: "flex", justifyContent: "space-between", padding:"1rem 1rem 1.25rem 1rem" }}>
          <div>
                <span>Total ESG Score</span>
                <div style={{ display: "flex" }}>

                  <div style={{ fontSize: "36px", fontWeight: "600", gap: "1rem" }}>
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

                <div style={{ fontSize: "16px", fontWeight: "500", display: "incline-block", paddingLeft: "0.5rem" }}>
                      {data["ESGScores"]["Rank"].slice(0, Math.ceil(data["ESGScores"]["Rank"].length / 2))}
                </div>
          </div>

          <div>
                <span style={{ marginRight: "10px" }}>Environment Risk Score</span>
                <div style={{ fontSize: "36px", fontWeight: "600", display: "flex" }}>{data["EnvironmentScore"]["Score"]}</div>
          </div>

          <div>
                <span style={{ marginRight: "10px" }}>Social Risk Score</span>
                <div style={{ fontSize: "36px", fontWeight: "600", display: "flex" }}>{data["SocialScore"]["Score"]}</div>
          </div>

          <div>
                <span style={{ marginRight: "10px" }}>Governance Risk Score</span>
                <div style={{ fontSize: "36px", fontWeight: "600", display: "flex" }}>{data["GovernanceScores"]["Score"]}</div>
          </div>
        </div>

        <hr style={{ marginTop: "0rem", marginRight: "10px", marginLeft: "1rem" }} />
      </DashboardBox>
    </>
  );
};

export default Ratings;
