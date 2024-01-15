import { useEffect, useState } from "react";
import DashboardBox from "@/components/DashboardBox";
import { useGetProfileQuery } from "@/state/yahooAPI";
import { connectToWebSocket } from "@/state/priceStreamAPI";
import { Typography } from "@mui/material";
import "../../index.css";
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file


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
    return (
      <DashboardBox gridArea="a" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  if (error) {
    return (
      <DashboardBox gridArea="a" padding="1rem 1rem 1.25rem 1rem" key={key}>
        {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
          <defs>
          </defs>
          <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
            <path d="M 85.429 85.078 H 4.571 c -1.832 0 -3.471 -0.947 -4.387 -2.533 c -0.916 -1.586 -0.916 -3.479 0 -5.065 L 40.613 7.455 C 41.529 5.869 43.169 4.922 45 4.922 c 0 0 0 0 0 0 c 1.832 0 3.471 0.947 4.386 2.533 l 40.429 70.025 c 0.916 1.586 0.916 3.479 0.001 5.065 C 88.901 84.131 87.261 85.078 85.429 85.078 z M 45 7.922 c -0.747 0 -1.416 0.386 -1.79 1.033 L 2.782 78.979 c -0.373 0.646 -0.373 1.419 0 2.065 c 0.374 0.647 1.042 1.033 1.789 1.033 h 80.858 c 0.747 0 1.416 -0.387 1.789 -1.033 s 0.373 -1.419 0 -2.065 L 46.789 8.955 C 46.416 8.308 45.747 7.922 45 7.922 L 45 7.922 z M 45 75.325 c -4.105 0 -7.446 -3.34 -7.446 -7.445 s 3.34 -7.445 7.446 -7.445 s 7.445 3.34 7.445 7.445 S 49.106 75.325 45 75.325 z M 45 63.435 c -2.451 0 -4.446 1.994 -4.446 4.445 s 1.995 4.445 4.446 4.445 s 4.445 -1.994 4.445 -4.445 S 47.451 63.435 45 63.435 z M 45 57.146 c -3.794 0 -6.882 -3.087 -6.882 -6.882 V 34.121 c 0 -3.794 3.087 -6.882 6.882 -6.882 c 3.794 0 6.881 3.087 6.881 6.882 v 16.144 C 51.881 54.06 48.794 57.146 45 57.146 z M 45 30.239 c -2.141 0 -3.882 1.741 -3.882 3.882 v 16.144 c 0 2.141 1.741 3.882 3.882 3.882 c 2.14 0 3.881 -1.741 3.881 -3.882 V 34.121 C 48.881 31.98 47.14 30.239 45 30.239 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
          </g>
        </svg> */}
        <span>Please re-enter your ticker.</span>
      </DashboardBox>
    );
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

