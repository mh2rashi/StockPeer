import DashboardBox from "@/components/DashboardBox";
import { useGetBalanceSheetQuery } from "@/state/yahooAPI";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import BoxHeader from "../../components/BoxHeader" // Replace with actual path to BoxHeader component
import "../../index.css";
import {useState, useEffect} from 'react';
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file
import Lottie from 'lottie-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useTheme  } from "@mui/material";


type Props = {
  ticker: string;
};

const BalanceSheet = ({ ticker }: Props) => {

  const { data, isLoading, error } = useGetBalanceSheetQuery(ticker);
  const theme = useTheme();

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [ticker]);
  
  if (isLoading) {
    return (
      <DashboardBox gridArea="e" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  if (error || !ticker || !data) {
    return (
      <DashboardBox gridArea="e" padding="1rem 1rem 1.25rem 1rem" key={key} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
            <SearchRoundedIcon sx={{ fontSize: "244px", color: theme.palette.grey[300] }}></SearchRoundedIcon>
            <span style={{ color: theme.palette.grey[300] }}>Please enter or re-enter your stock ticker</span>
          </DashboardBox>

    );
  }

 

  const total = 2*parseInt(data["currentLst3"][1]);
  
  const inputData = [
    {
      subject: "Current Assets",
      A: parseFloat((parseInt(data["currentLst1"][1]) / total * 100).toFixed(2)),
      fullMark: 100,
    },
    {
      subject: "Non-Current assets",
      A: parseFloat((parseInt(data["currentLst2"][1]) / total * 100).toFixed(2)),
      fullMark: 100,
    },
    {
      subject: "Current Liabilities",
      A: parseFloat((parseInt(data["currentLst4"][1]) / total * 100).toFixed(2)),
      fullMark: 100,
    },
    {
      subject: 'Non-Current liabilities',
      A: parseFloat((parseInt(data["currentLst5"][1]) / total * 100).toFixed(2)),
      fullMark: 100,
    },
    {
      subject: "Stockholders' Equity",
      A: parseFloat((parseInt(data["currentLst7"][1]) / total * 100).toFixed(2)),
      fullMark: 100,
    },
  ];

   return (
     
    <>
     <DashboardBox gridArea="e" key={key}>
          <BoxHeader
                title="Financials: Balance Sheet"
                subtitle="All figures are in percentages"
                sideText= {data["currentLst9"][1]}
          />
          <div style={{ width: "100%", height: "calc(100% - 50px)"}}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={inputData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
          </div>
        </DashboardBox> 
     </>
   );
};

export default BalanceSheet;


