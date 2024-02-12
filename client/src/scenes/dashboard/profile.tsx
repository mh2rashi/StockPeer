/**
 * The Profile component displays the profile of a stock company within the Dashboard page, fetching
 * data from an API and using a WebSocket connection for real-time data updates.
 * @param {string} url - The `url` parameter is a string representing the website URL of the stock
 * company. It is used to extract the domain from the URL.
 * @returns The Profile component is being returned.
 **/


// React imports
import { useState, useEffect } from 'react';
import { Typography, useTheme } from "@mui/material";

// Component imports
import DashboardBox from "@/components/DashboardBox";

// API imports
import { useGetProfileQuery } from "@/state/yahooAPI";

// WebSocket & animation imports
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/LoadingAnimation.json';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { connectToWebSocket } from "@/state/priceStreamAPI";

// Function to extract domain from URL
const extractDomain = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.replace("www.", "");
    return domain;
  } catch (error) {
    console.error("Error extracting domain:", error);
    return null;
  }
};

// Type definitions
type WebSocketData = {
  "data": [
    {
      "p": number,
      "s": string,
      "t": number,
      "v": number
    }
  ],
  "type": "trade"
}

type WebSocketDataCallback = (data: WebSocketData) => void;

type Props = {
  ticker: string;
};

const Profile = ({ ticker }: Props) => {
  // Fetch data from API
  const { data, isLoading, error } = useGetProfileQuery(ticker);
  
  // Custom theme colors
  const theme = useTheme();

  // State for WebSocket connection and streamed data
  const [key, setKey] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [streamedData, setStreamedData] = useState('0');

  // useEffect to set up WebSocket connection and handle cleanup
  useEffect(() => {
    // Increment key whenever ticker changes to force re-rendering
    setKey((prevKey) => prevKey + 1);

    // Callback function to handle WebSocket data
    const onDataReceived: WebSocketDataCallback = (inputData) => {
      const formattedData = Number(inputData.data[0].p).toFixed(2);
      setStreamedData(formattedData);
    };

    // Connect to WebSocket and set up data handler
    const newSocket = connectToWebSocket(ticker, onDataReceived);
    setSocket(newSocket);

    // Clean up WebSocket connection
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [ticker]);

  // Loading state
  if (isLoading) {
    return (
      <DashboardBox gridArea="a" padding="1rem 1rem 1.25rem 1rem" key={key} >
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  // Error or no data state
  if (error || !ticker || !data) {
    return (
      <DashboardBox gridArea="a" padding="1rem 1rem 1.25rem 1rem" key={key} display="flex" flexDirection="column" alignItems="center" justifyContent="center" color="white">
        <SearchRoundedIcon sx={{ fontSize: "244px", color: theme.palette.grey[300] }} />
        <span style={{ color: theme.palette.grey[300] }}>Please enter or re-enter your stock ticker</span>
      </DashboardBox>
    );
  }

  // Extract domain from website URL
  const domain = extractDomain(data['Website']);

  return (
    <>
      <DashboardBox gridArea="a" padding="1rem 1rem 1.25rem 1rem" key={key} style={{ color: theme.palette.grey[300] }}>
      <Typography mb="-0.9rem" color={theme.palette.secondary[500]} variant="h5" fontWeight="700" style={{ textAlign: "right" }}>
        {streamedData === "0" ? "Last Closing Price" : "Live Price"}
      </Typography>
        <div style={{ height: "50%", display: "flex" }}>
          <div id='logo' style={{ width: "30%", backgroundColor: "transparent", padding: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={`https://api.companyurlfinder.com/logo/${domain}`} alt="Company Logo" style={{ width: "100%", height: "100%", borderRadius: "20%", objectFit: "cover" }} />
          </div>
          <div id='namePrice' style={{ width: "70%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h1" style={{ fontSize: "2.5rem", display: "flex", alignItems: "center" }}>
            <span>${streamedData !== "0" ? streamedData : parseFloat(data["Closing Price"].split(" ")[0])}</span>&nbsp;
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
          <p style={{ fontSize: "1rem", display: "inline", fontWeight: "normal", paddingBottom: "1rem", marginTop: "0rem" }}>
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>Summary: </span>{data['Summary']}
          </p>
        </div>
      </DashboardBox>
    </>
  );
};

export default Profile;
