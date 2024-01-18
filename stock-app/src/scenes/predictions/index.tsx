import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression from "regression";
import { useGetIncomeStatementQuery } from "@/state/yahooAPI";
import { FormatTextdirectionRToL } from "@mui/icons-material";
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file
import Lottie from 'lottie-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Footer from "@/scenes/footer"; // Import the Footer component
import Navbar from "@/scenes/navbar";

// Utility function to add months to a date object


// Function to format the date in MM/DD/YYYY format
function getCurrentDateFormatted(yearsToAdd) {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1 to get correct month
    const day = now.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year + yearsToAdd}`;
}



const Predictions = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [ticker, setTicker] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleTickerChange = (query) => {
    setTicker(searchQuery);
  };


  const { data, isLoading, error } = useGetIncomeStatementQuery(ticker);
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);

  if (isLoading) {
    return (
      <>
      
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchTicker={handleTickerChange} />
      <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
            <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
      <Footer/>

      </>
    );
  }

  if (error || !searchQuery || !data) {
    return (
      <>

      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchTicker={handleTickerChange} />
      <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden" display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
          <SearchRoundedIcon sx={{ fontSize: "444px" }}></SearchRoundedIcon>
          <span>Please enter or re-enter your stock ticker</span>
      </DashboardBox>
      <Footer/>

      </>
    );
  }

  

  
  // let formattedData = useMemo(() => {
    const [, ...rows] = data; // Ignore headers because we know the structure.
    let totalRevenueRow = rows.find(row => row[0] === 'Total Revenue');
    if (!totalRevenueRow) return [];


    let formatted = totalRevenueRow.map((value, index) => {
      const month = data[0][index];
      return {
        name: month,
        TotalRevenue: parseFloat(value.replace(/,/g, "")),
      };
    });

    formatted = formatted.filter(item => item.name !== "Breakdown");
    formatted = formatted.reverse();

    const regressionData = formatted.map((item, index) => [index, item.TotalRevenue]);
    const regressionResult = regression.linear(regressionData);
    const lastKnownPoint = regressionData.length - 1;
  
    const predictions = [];

    for (let i = 0; i <= 3; i++) { // Predict the next 12 months
      const predictedRevenueValue = regressionResult.predict(lastKnownPoint + i)[1];
      predictions.push({
        name:getCurrentDateFormatted(i) ,
        PredictedRevenue: predictedRevenueValue,
      });
    }

    const formattedData =  isPredictions ? [...formatted,...predictions] : [...formatted];
  // }, [data, isPredictions]);
  


 
  return (
    <>

    <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchTicker={handleTickerChange} />


    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h4">
            Charted revenue and predicted revenue based on a simple linear regression model.
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          {isPredictions? "Hide Predicted Revenue" : "Show Predicted Revenue for the Next 5 Years" }
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={true} style={{ fontSize: "10px" }}>
            <Label value="Year" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          >
            <Label
              style={{padding: "0rem 2rem 0rem 0rem", textAnchor:"middle"}}
              dx={-20}
              value="Revenue"
              angle={-90}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend  verticalAlign="top"/>
          <Line
            type="monotone"
            dataKey="TotalRevenue"
            name="Total Revenue"
            stroke={palette.primary.main}
            activeDot={{ r: 8 }}
          />
          {isPredictions && (
            <Line
              type="monotone"
              dataKey="PredictedRevenue"
              name="Predicted Revenue"
              stroke={palette.secondary.main}
              activeDot={{ r: 8 }}
              strokeDasharray="5 5"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>

    <Footer/>
    
  </>
        

  );
 };

 export default Predictions;