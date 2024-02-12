/* 
The code is setting up a server using the Express framework in JavaScript. It imports various
middleware packages such as `express`, `body-parser`, `cors`, `dotenv`, `helmet`, and `morgan`. It
also imports individual data fetching functions from different files.
*/

// Imports for middleware
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// Importing individual data fetching functions
import getStatisticsData from "./data/statisticsData.js";
import getHistoricalData from "./data/historicalData.js";
import getProfileData from "./data/profileData.js";
import getHoldersData from "./data/holdersData.js";
import getSustainabilityData from "./data/sustainabilityData.js";
import getIncomeStatementData from "./data/incomeStatementData.js";
import getBalanceSheetData from "./data/balanceSheetData.js";

dotenv.config();
const app = express();

// Middleware setup
// app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// API endpoints

// Endpoint to fetch statistics for a given ticker
app.get('/api/statistics/:ticker', async (req, res) => {
    const ticker = req.params.ticker.toUpperCase();

    try {
        const statisticsDataForTicker = await getStatisticsData(ticker);
        res.status(200).json(statisticsDataForTicker);
    } catch (error) {
        res.status(500).json({ message: `Error fetching statistics for ticker ${ticker}: ${error.message}` });
    }
});

// Endpoint to fetch profile data for a given ticker
app.get('/api/profile/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      const profileDataForTicker = await getProfileData(ticker);
      res.status(200).json(profileDataForTicker);
  } catch (error) {
      res.status(500).json({ message: `Error fetching profile data for ticker ${ticker}: ${error.message}` });
  }
});

// Endpoint to fetch historical data for a given ticker
app.get('/api/historical/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      const historicalDataForTicker = await getHistoricalData(ticker);
      res.status(200).json(historicalDataForTicker);
  } catch (error) {
      res.status(500).json({ message: `Error fetching historical data for ticker ${ticker}: ${error.message}` });
  }
});

// Endpoint to fetch holders data for a given ticker
app.get('/api/holders/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      const holdersDataForTicker = await getHoldersData(ticker);
      res.status(200).json(holdersDataForTicker);
  } catch (error) {
      res.status(500).json({ message: `Error fetching holders data for ticker ${ticker}: ${error.message}` });
  }
});

// Endpoint to fetch sustainability data for a given ticker
app.get('/api/sustainability/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      const sustainabilityDataForTicker = await getSustainabilityData(ticker);
      res.status(200).json(sustainabilityDataForTicker);
  } catch (error) {
      res.status(500).json({ message: `Error fetching sustainability data for ticker ${ticker}: ${error.message}` });
  }
});

// Endpoint to fetch Balance Sheet data for a given ticker
app.get('/api/balanceSheet/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
    const balanceSheetDataForTicker = await getBalanceSheetData(ticker);
    res.status(200).json(balanceSheetDataForTicker);
  } catch (error) {
    res.status(500).json({ message: `Error fetching balance sheet data for ticker ${ticker}: ${error.message}` });
  }
});

// Endpoint to fetch Income statement data for a given ticker
app.get('/api/incomeStatement/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
    const incomeStatementDataForTicker = await getIncomeStatementData(ticker);
    res.status(200).json(incomeStatementDataForTicker);
  } catch (error) {
    res.status(500).json({ message: `Error fetching income statement data for ticker ${ticker}: ${error.message}` });
  }
});
