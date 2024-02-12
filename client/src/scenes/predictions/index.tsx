/** 
 The Predictions component in a TypeScript React application fetches income statement data for a
 given stock ticker, performs linear regression analysis on the revenue data, and displays a line
 chart of the actual revenue and predicted revenue for the next 4 years.
 @param {number} yearsToAdd - The `yearsToAdd` parameter is a number that represents the number of
 years to add to the current date. It is used in the `getCurrentDateFormatted` function to calculate
 the future date for the revenue predictions.
 @returns The code is returning a React component called "Predictions". This component displays a
 line chart of a company's revenue over time, along with predicted revenue for the next 4 years based
 on a linear regression model. The component also includes a search bar for entering a stock ticker,
 and handles fetching the income statement data for the specified ticker using a custom hook. The
 component handles loading and error states,
 **/

// React imports
import { useState } from "react";

// Regression imports
import regression from "regression";

// Charting imports
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

// Navbar and Footer
import Footer from "@/scenes/footer";
import Navbar from "@/scenes/navbar";

// Component imports
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { Box, Button, Typography, useTheme } from "@mui/material";

// API
import { useGetIncomeStatementQuery } from "@/state/yahooAPI";

// Animation and Icon imports 
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file
import Lottie from 'lottie-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

// Function to format the date in MM/DD/YYYY format
function getCurrentDateFormatted(yearsToAdd: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1 to get correct month
  const day = now.getDate().toString().padStart(2, '0');
  return `${month}/${day}/${year + yearsToAdd}`;
}

const Predictions = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [ticker, setTicker] = useState('');
  const theme = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);

  // Event handlers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleTickerChange = () => {
    setTicker(searchQuery);
  };

  // Fetch income statement data using custom hook
  const { data, isLoading, error } = useGetIncomeStatementQuery(ticker);
  const { palette } = useTheme();

  // Loading state
  if (isLoading) {
    return (
      <>
        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchTicker={handleTickerChange} selectedPage={"Predictions"} />
        {/* Loading animation */}
        <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
          <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
        </DashboardBox>
        <Footer />
      </>
    );
  }

  // Error state or missing data
  if (error || !searchQuery || !data) {
    return (
      <>
        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchTicker={handleTickerChange} selectedPage={"Predictions"} />
        {/* Display error message */}
        <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden" display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
          <SearchRoundedIcon sx={{ fontSize: "444px", color: theme.palette.grey[300] }}></SearchRoundedIcon>
          <span style={{ color: theme.palette.grey[300] }}>Please enter or re-enter your stock ticker</span>
        </DashboardBox>
        <Footer />
      </>
    );
  }

// Data processing
// Extract rows of data from the fetched income statement
const rows = Object.values(data);

// Find the row containing the total revenue, if it exists
let totalRevenueRow = rows.find(row => row[0] === 'Total Revenue');

// If total revenue row is not found, return empty array
if (!totalRevenueRow) return [];

// Format the revenue data for plotting
let formatted = totalRevenueRow.map((value: string, index: number) => {
  // Extract the month label from the first row of data
  const month = data[0][index];
  return {
    name: month, // Month label
    TotalRevenue: parseFloat(value.replace(/,/g, "")), // Total revenue value
  };
});

// Filter out any entries labeled as "Breakdown"
formatted = formatted.filter((item: any) => item.name !== "Breakdown");

// Reverse the data to display in chronological order
formatted = formatted.reverse();

// Prepare data for regression analysis
const regressionData = formatted.map((item: any, index: number) => [index, item.TotalRevenue]);

// Perform linear regression to predict future revenue trends
const regressionResult = regression.linear(regressionData);
const lastKnownPoint = regressionData.length - 1;

// Generate revenue predictions for the next 4 years
const predictions = [];
for (let i = 0; i <= 3; i++) {
  // Predict revenue for each future point
  const predictedRevenueValue = regressionResult.predict(lastKnownPoint + i)[1];
  predictions.push({
    name: getCurrentDateFormatted(i), // Date label for predicted revenue
    PredictedRevenue: predictedRevenueValue, // Predicted revenue value
  });
}

// Combine actual data with predictions based on user selection
const formattedData = isPredictions ? [...formatted, ...predictions] : [...formatted];


  return (
    <>

    {/* Navigation bar */}
    <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchTicker={handleTickerChange} selectedPage={"Predictions"} />

    {/* Main content */}
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h4">
            Charted revenue and predicted revenue based on a simple linear regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[300],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          {isPredictions? "Hide Predicted Revenue" : "Show Predicted Revenue for the Next 4 Years" }
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
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} dx={5} />
          {/* X-axis */}
          <XAxis dataKey="name" tickLine={true} style={{ fontSize: "10px",}} stroke={theme.palette.grey[300]}>
            <Label value="Year" offset={-5} position="insideBottom" fill={theme.palette.grey[300]} />
          </XAxis>
          {/* Y-axis */}
          <YAxis
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            stroke={theme.palette.grey[300]}
            dx={10}
          >
            <Label
              style={{padding: "0rem 2rem 0rem 0rem", textAnchor:"middle", gap:"2rem"}}
              dx={-20}
              value="Revenue"
              angle={-90}
              position="insideLeft"
              fill={theme.palette.grey[300]}
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
