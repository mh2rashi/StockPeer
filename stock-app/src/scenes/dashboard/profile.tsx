import { useEffect, useState } from "react";
import DashboardBox from "@/components/DashboardBox";
import { useGetProfileQuery } from "@/state/yahooAPI";
import { connectToWebSocket } from "@/state/priceStreamAPI";
import { Typography } from "@mui/material";
import "../../index.css";

type WebSocketData = {
  p: number;
  dd: number;
  dc: number;
};

type WebSocketDataCallback = (data: WebSocketData) => void;

const extractDomain = (url: string) => {
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname.replace("www.", "");
  return domain;
};

type Props = {
  searchQuery: string;
};

const Profile = ({ searchQuery }: Props) => {
  const { data, isLoading, error } = useGetProfileQuery(searchQuery);

  const [key, setKey] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [streamedData, setStreamedData] = useState<WebSocketData>({
    p: 0,
    dd: 0,
    dc: 0,
  });

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [searchQuery]);

  useEffect(() => {
    const onDataReceived: WebSocketDataCallback = (data) => {
      const formattedData = {
        p: Number(data['p']).toFixed(2),
        dc: Number(data['dc']).toFixed(2),
        dd: Number(data['dd']).toFixed(2),
      };
      setStreamedData(formattedData);
    };

    const newSocket = connectToWebSocket('ETH-USD', onDataReceived);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!data) {
    return null;
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
              <span style={{ color: streamedData['dd'] < 0 ? 'red' : 'green', fontSize: "2.0rem" }}>{streamedData['dd']}</span>&nbsp;
              <span style={{ color: streamedData['dc'] < 0 ? 'red' : 'green', fontSize: "2.0rem" }}>({streamedData['dc']})</span>
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

