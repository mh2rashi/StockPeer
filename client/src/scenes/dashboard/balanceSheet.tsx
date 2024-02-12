/**
 * This is a TypeScript React component that displays a radar chart representing the balance sheet data
 * of a stock within the Dashboard page.
 * @property {string} ticker - The `ticker` property is a string that represents the stock ticker
 * symbol. It is used to fetch data from the API and display the balance sheet data for that particular
 * stock in the radar chart.
 **/


// React imports
import { useState, useEffect } from 'react';
import { useTheme } from "@mui/material";

// Charting imports
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

// Component imports
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "../../components/BoxHeader";

// API imports
import { useGetBalanceSheetQuery } from "@/state/yahooAPI";

// Animations & Icons imports
import loadingAnimation from '../../assets/LoadingAnimation.json';
import Lottie from 'lottie-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

type Props = {
  ticker: string;
};

const BalanceSheet = ({ ticker }: Props) => {
  // Fetch data from API
  const { data, isLoading, error } = useGetBalanceSheetQuery(ticker);

  // Custom theme colors
  const theme = useTheme();

  // Increment key whenever ticker changes to force re-rendering
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [ticker]);

  // Loading state
  if (isLoading) {
    return (
      <DashboardBox gridArea="e" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  // Error or no data state
  if (error || !ticker || !data) {
    return (
      <DashboardBox gridArea="e" padding="1rem 1rem 1.25rem 1rem" key={key} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
        <SearchRoundedIcon sx={{ fontSize: "244px", color: theme.palette.grey[300] }}></SearchRoundedIcon>
        <span style={{ color: theme.palette.grey[300] }}>Please enter or re-enter your stock ticker</span>
      </DashboardBox>
    );
  }

  // Prepare balance sheet data for radar chart
  const total = 2*parseInt(data["currentLst3"][1]);
  
  const balanceSheetData = [
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
    <DashboardBox gridArea="e" key={key}>
      <BoxHeader
        title="Financials: Balance Sheet"
        subtitle="All figures are in percentages"
        sideText={data["currentLst9"][1]}
      />
      <div style={{ width: "100%", height: "calc(100% - 50px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={balanceSheetData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" stroke={theme.palette.grey[300]} />
            <PolarRadiusAxis />
            <Radar dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </DashboardBox>
  );
};

export default BalanceSheet;
