import { useEffect, useState } from "react";
import DashboardBox from "@/components/DashboardBox";
import { useGetProfileQuery } from "@/state/yahooAPI";
import { connectToWebSocket } from "@/state/priceStreamAPI";
import { Typography } from "@mui/material";
import "../../index.css";
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


type WebSocketData = {
  p: number;

};

 type WebSocketDataCallback = (data: WebSocketData) => void;

const extractDomain = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.replace("www.", "");
    return domain;
  } catch (error) {
    console.error("Error extracting domain:", error);
    return null; // or handle the error in a way that makes sense for your application
  }
};

type Props = {
  ticker: string;
};

const Profile = ({ ticker }: Props) => {

  const { data, isLoading, error } = useGetProfileQuery(ticker);

  const [key, setKey] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [streamedData, setStreamedData] = useState<WebSocketData>({
    p: 0,
  });

  useEffect(() => {

    setKey((prevKey) => prevKey + 1);

    const onDataReceived: WebSocketDataCallback = (data) => {

      console.log(data);

      const formattedData = {
        p: Number(data.data[0].p).toFixed(2),
      };

      setStreamedData(formattedData);
    };

    const newSocket = connectToWebSocket(ticker, onDataReceived);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [ticker]);

  if (isLoading) {
    return (
      <DashboardBox gridArea="a" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  if (error || !ticker || !data) {
    return (
      <DashboardBox gridArea="a" padding="1rem 1rem 1.25rem 1rem" key={key} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
            <SearchRoundedIcon sx={{ fontSize: "244px" }}></SearchRoundedIcon>
            <span>Please enter or re-enter your stock ticker</span>
      </DashboardBox>
    );
  }

  const domain = extractDomain(data['Website']);

  return (
    <>
      <DashboardBox gridArea="a" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <div style={{ height: "50%", display: "flex" }}>
          <div id='logo' style={{ width: "30%", backgroundColor: "transparent", padding: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={`https://api.companyurlfinder.com/logo/${domain}`} alt="Company Logo" style={{ width: "100%", height: "100%", borderRadius: "20%", objectFit: "cover" }} />
          </div>
          <div id='namePrice' style={{ width: "70%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h1" style={{ fontSize: "2.5rem", display: "flex", alignItems: "center" }}>
              $<span>{streamedData['p']}</span>&nbsp;
            </Typography>
            <Typography variant="h1" style={{ marginTop: "1rem", marginBottom: "1rem" }}>{data['Name']}</Typography>
            <Typography variant="h1" style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              <span style={{ fontWeight: "bold" }}>Website: </span>
              <a href={data['Website']} target="_blank" rel="noopener noreferrer">
                {data['Website']}
              </a>
            </Typography>
            <Typography variant="h1" style={{ fontSize: "1rem" }}>
              <span style={{ fontWeight: "bold" }}>Telephone: </span>{data['Telephone']}
            </Typography>
          </div>
        </div>
        <hr style={{ marginTop: "0rem" }} />
        <div className="custom-scrollbar" style={{ height: "50%", display: "flex", overflow: "auto" }}>
          <p style={{ fontSize: "1rem", display: "inline", fontWeight: "normal", paddingBottom: "1rem", marginTop: "0rem" }}><span style={{ fontSize: "1rem", fontWeight: "bold" }}>Summary: </span>{data['Summary']}</p>
        </div>
      </DashboardBox>
    </>
  );
};

export default Profile;


