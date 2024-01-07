import { useEffect, useState, PureComponent } from "react";
import DashboardBox from "@/components/DashboardBox";
import { useGetProfileQuery } from "@/state/yahooAPI";
import { connectToWebSocket } from "@/state/priceStreamAPI";
import { Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import BoxHeader from "../../components/BoxHeader" // Replace with actual path to BoxHeader component

import "../../index.css";

type WebSocketData = {
  p: number;
  dd: number;
  dc: number;
};

type WebSocketDataCallback = (data: WebSocketData) => void;

// Function to extract domain from URL
const extractDomain = (url: string) => {
  const parsedUrl = new URL(url);
  let domain = parsedUrl.hostname.replace("www.", "");
  return domain;
};

type Props = {
  searchQuery: string;
};

const Row1 = ({ searchQuery }: Props) => {
  const [key, setKey] = useState(0); // Key for forcing component re-render
  const { data, isLoading, error } = useGetProfileQuery(searchQuery);

  const [streamedData, setStreamedData] = useState<WebSocketData>({
    p: 0,
    dd: 0,
    dc: 0,
  });
  const [socket, setSocket] = useState<WebSocket | null>(null);

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


  /////// pire chart 1 stuff
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];



  ////// Pie chart stuff
  const RADIAN = Math.PI / 180;
const data2 = [
  { name: 'A', value: 50, color: '#ff0000' },
  { name: 'B', value: 50, color: '#00fff0' },
  { name: 'C', value: 50, color: '#00ff00' },
];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 80;
const value = 50;

const needle = (value, data2, cx, cy, iR, oR, color) => {
  let total = 0;
  data2.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};


   return (
     
    <>

     <DashboardBox  gridArea="a" padding="1rem 1rem 1.25rem 1rem" key={key}>

        <div style={{height: "50%", display:"flex" }}>

          <div id='logo' style={{ width: "30%", backgroundColor: "transparent", padding: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={`https://api.companyurlfinder.com/logo/${domain}`} alt="Company Logo" style={{ width: "100%", height: "100%", borderRadius: "20%", objectFit: "cover" }} />
          </div>

          <div id='namePrice' style={{width: "70%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            
            <Typography variant="h1" style={{ fontSize: "2.5rem", display: "flex", alignItems: "center" }}>
              $<span>{streamedData['p']}</span>&nbsp;
              <span style={{ color: streamedData['dd'] < 0 ? 'red' : 'green', fontSize: "2.0rem" }}>{streamedData['dd']}</span>&nbsp;
              <span style={{ color: streamedData['dc'] < 0 ? 'red' : 'green', fontSize: "2.0rem" }}>({streamedData['dc']})</span>
            </Typography>

            <Typography variant="h1" style={{marginTop:"1rem", marginBottom:"1rem"}}>{data['Name']}</Typography>

            <Typography variant="h1" style={{fontSize: "1rem", marginBottom:"0.5rem"}}>
              <span style={{ fontWeight: "bold" }}>Website: </span>
              <a href={data['Website']} target="_blank" rel="noopener noreferrer">
                {data['Website']}
              </a>
            </Typography>

            <Typography variant="h1" style={{fontSize: "1rem"}}>
              <span style={{fontWeight: "bold"}}>Telephone: </span>{data['Telephone']}
            </Typography>


          </div>
             
        </div>

        <hr style={{marginTop: "0rem"}}/>

        <div className="custom-scrollbar" style={{height: "50%", display:"flex", overflow:"auto"}}>
          <p style={{ fontSize:"1rem", display: "inline", fontWeight: "normal", paddingBottom: "1rem", marginTop:"0rem"}}><span style={{fontSize: "1rem",fontWeight: "bold"}}>Summary: </span>{data['Summary']}</p>
        </div>

     </DashboardBox>
     
     
     <DashboardBox gridArea="e">
          <BoxHeader
                title="Pie Chart"
                subtitle="Visual representation(pie chart)"
                sideText=""
          />
          <div style={{ width: "100%", height: "calc(100% - 50px)"}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={data01}
                  cx="50%"
                  cy="47%"
                  outerRadius={140}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>   
          </div>
        </DashboardBox>


     <DashboardBox gridArea="g">

        <BoxHeader title="Environment, Social and Governance (ESG) Risk Ratings" subtitle= "Risk ratings provided by Sustainalytics" sideText="" />

        <div style={{ padding: "1rem", display: "flex", justifyContent: "space-between" }}>

        <div>
          <span>Total ESG Score</span>
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: "36px", fontWeight: "600", display: "incline-block" }}>17</div>
            <div style={{ display: "inline-block" , alignItems: "bottom" }}>
              <span style={{
                borderLeftStyle: "solid",
                borderLeftWidth: "0.5px",
                borderRightWidth: "0.5px",
                paddingLeft: "10px",
                fontSize: "12px",
                fontWeight: "500"
              }}>
                18th percentile
              </span>
            </div>
          </div>
        </div>

        <div>
          <span style={{ marginRight: "10px" }}>Environment Risk Score</span>
          <div style={{ fontSize: "23px", fontWeight: "600", display: "flex" }}>0.5</div>
        </div>

        <div>
          <span style={{ marginRight: "10px" }}>Social Risk Score</span>
          <div style={{ fontSize: "23px", fontWeight: "600", display: "flex" }}>7.4</div>
        </div>

        <div>
          <span style={{ marginRight: "10px" }}>Governane Risk Score</span>
          <div style={{ fontSize: "23px", fontWeight: "600", display: "flex" }}>9.4</div>
        </div>

      </div>

      <PieChart width={400} height={500}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data2}
          cx={cx + 20}
          cy={cy - 20}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data2, cx, cy, iR, oR, '#d0d000')}
      </PieChart>

      </DashboardBox>

     </>
   );
};

export default Row1;
