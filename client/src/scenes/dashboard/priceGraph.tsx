/*
  This component displays a LineChart representing the historical price data of a stock within the Dashboard page.
  The 'ticker' property is a string that represents the stock ticker symbol and is used to fetch data from the API.
*/

// React
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

// Components
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";

// API
import { useGetHistoricalQuery } from "@/state/yahooAPI";

// Charting
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Animations & Icons
import loadingAnimation from '../../assets/LoadingAnimation.json';
import Lottie from 'lottie-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { scaleLinear } from 'd3-scale';

// Function to format the current date
function getCurrentDateFormatted() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1 to get correct month
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Custom Y Axis Tick component
interface CustomYAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

const CustomYAxisTick: React.FC<CustomYAxisTickProps> = ({ x, y, payload }) => {
  const value = payload.value;
  const padding = 20; // To create more space between the axis and label
  
  // For the left tick, subtract the padding from the x position
  const leftTickX = x - padding;
  const originalTick = (
    <Text x={leftTickX} y={y} verticalAnchor="middle" textAnchor="start" fontSize={10}>
      {value}
    </Text>
  );
  
  // Calculate tick position for the right side
  const rightTickX = x + 1140 + padding;
  
  const rightTick = (
    <Text x={rightTickX} y={y} verticalAnchor="middle" textAnchor="end" fontSize={10}>
      {value}
    </Text>
  );

  // Return Group containing both ticks
  return <g>{originalTick}{rightTick}</g>
};

// Main component
type Props = {
  ticker: string;
}

const PriceGraph = ({ ticker }: Props) => {
  //Fetch data from API
  const { data, isLoading, error } = useGetHistoricalQuery(ticker);

  // Custom theme colors
  const { palette } = useTheme();
  const theme = useTheme();

  // Increment key whenever ticker changes to force re-rendering
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [ticker]);

  // Loading state
  if (isLoading) {
    return (
      <DashboardBox gridArea="h" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  // Error or no data state
  if (error || !ticker || !data) {
    return (
      <DashboardBox gridArea="h" padding="1rem 1rem 1.25rem 1rem" key={key} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
        <SearchRoundedIcon sx={{ fontSize: "344px", color: theme.palette.grey[300] }}></SearchRoundedIcon>
        <span style={{ color: theme.palette.grey[300] }}>Please enter or re-enter your stock ticker</span>
      </DashboardBox>
    );
  }

  if (!data) {
    return null;
  }
  
  // Data preparation
  const parsedData = data?.dates.reduce((result, dateStr, index) => {
    // Convert date string to Date object
    const date = new Date(dateStr);

    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      // Get the abbreviated month name
      const month = date.toLocaleString('default', { month: 'short' });

      // Get the day from the date
      const day = date.getDate();

      // Parse closing, high, and low prices
      const closingPrice = parseFloat(data.closingPrices[index]);
      const highPrice = parseFloat(data.highPrices[index]);
      const lowPrice = parseFloat(data.lowPrices[index]);

      // Push formatted data to the result array
      result.push({
        month: `${month} ${day}`, // Combine month and day
        closingPrice: closingPrice,
        highPrice: highPrice,
        lowPrice: lowPrice,
      });
    }
    return result;
  }, []).reverse(); // Reverse the array to display in chronological order

  // Extract all price values for scaling
  const allValues = [
    ...parsedData.map(p => p.closingPrice),
    ...parsedData.map(p => p.highPrice),
    ...parsedData.map(p => p.lowPrice),
  ];

  // Find the minimum and maximum values for scaling
  const minVal = Math.min(...allValues.filter(val => !isNaN(val)));
  const maxVal = Math.max(...allValues.filter(val => !isNaN(val)));

  // Create a linear scale for the y-axis
  const scale = scaleLinear().domain([minVal, maxVal]).nice();

  // Extract the new minimum and maximum values after scaling
  const [newMinVal, newMaxVal] = scale.domain();

  return (
    <>
      <DashboardBox gridArea="h" key={key}>
        <BoxHeader
          title="Market Trends: Analyzing Price Movements"
          subtitle="High, Closing, and Low prices over time"
          sideText={getCurrentDateFormatted()}
        />
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer>
            <LineChart
              data={parsedData}
              margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis
                dataKey="month"
                tickLine={true}
                style={{ fontSize: "10px" }}
                domain={[newMinVal, newMaxVal]}
                interval={Math.ceil(parsedData.length / 10)}
              />
              <YAxis
                yAxisId="left"
                tickLine={true}
                axisLine={false}
                style={{ fontSize: "10px" }}
                domain={[newMinVal - 10, newMaxVal + 10]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px" }}
                domain={[newMinVal - 10, newMaxVal + 10]}
              />
              <Tooltip />
              <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="highPrice"
                stroke={palette.primary.main}
                name="High Price"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="closingPrice"
                stroke="#8884d8"
                name="Closing Price"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="lowPrice"
                stroke={palette.secondary.main}
                name="Low Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardBox>
    </>
  );
}  

export default PriceGraph;
