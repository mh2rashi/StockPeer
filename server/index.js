import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import StatisticsModel from "./models/statisticsModel.js";
import statisticsData from "./data/statisticsData.js";

import HistoricalModel from "./models/historicalModel.js";
import historicalData from "./data/historicalData.js";

import ProfileModel from "./models/profileModel.js";
import profileData from "./data/profileData.js";

import HoldersModel from "./models/holdersModel.js";
import holdersData from "./data/holdersData.js";

import sustainabilityData from "./data/sustainabilityData.js"
import incomeStatementData from "./data/incomeStatementData.js"
import balanceSheetData from "./data/balanceSheetData.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  console.log("Connected to MongoDB");
  
})
.catch((error) => {
  console.error("Connection failed:", error);
});

// API endpoint to fetch statistics for a given ticker
app.get('/api/statistics/:ticker', async (req, res) => {
    const ticker = req.params.ticker.toUpperCase();

    try {
        await mongoose.connection.db.dropDatabase();
        const statisticsDataForTicker = await statisticsData(ticker);
        const statisticsDocument = new StatisticsModel(statisticsDataForTicker);
        await statisticsDocument.save();

        res.status(200).json(statisticsDocument);
    } catch (error) {
        res.status(500).json({ message: `Error fetching statistics for ticker ${ticker}: ${error.message}` });
    }
});

// API endpoint to fetch profile data for a given ticker
app.get('/api/profile/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      await mongoose.connection.db.dropDatabase();
      const profileDataForTicker = await profileData(ticker);
      const profileDocument = new ProfileModel(profileDataForTicker);
      await profileDocument.save();

      res.status(200).json(profileDocument);
  } catch (error) {
      res.status(500).json({ message: `Error fetching statistics for ticker ${ticker}: ${error.message}` });
  }
});

// API endpoint to fetch historical data for a given ticker
app.get('/api/historical/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      await mongoose.connection.db.dropDatabase();
      const historicalDataForTicker = await historicalData(ticker);
      const historicalDocument = new HistoricalModel(historicalDataForTicker);
      await historicalDocument.save();

      res.status(200).json(historicalDocument);
  } catch (error) {
      res.status(500).json({ message: `Error fetching statistics for ticker ${ticker}: ${error.message}` });
  }
});

// API endpoint to fetch holders data for a given ticker
app.get('/api/holders/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      await mongoose.connection.db.dropDatabase();
      const holdersDataForTicker = await holdersData(ticker);
      const holdersDocument = new HoldersModel(holdersDataForTicker);
      await holdersDocument.save();

      res.status(200).json(holdersDocument);
  } catch (error) {
      res.status(500).json({ message: `Error fetching statistics for ticker ${ticker}: ${error.message}` });
  }
});

// API endpoint to fetch sustainability data for a given ticker
app.get('/api/sustainability/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      const sustainabilityDataForTicker = await sustainabilityData(ticker);
      res.status(200).json(sustainabilityDataForTicker);
  } catch (error) {
      res.status(500).json({ message: `Error fetching sustainability data for ticker ${ticker}: ${error.message}` });
  }
});


// API endpoint to fetch Balance Sheet data for a given ticker
app.get('/api/balanceSheet/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
    const balanceSheetDataForTicker = await balanceSheetData(ticker);
    res.status(200).json(balanceSheetDataForTicker);
} catch (error) {
    res.status(500).json({ message: `Error fetching balance Sheet data for ticker ${ticker}: ${error.message}` });
}
});

// API endpoint to fetch Income statement data for a given ticker
app.get('/api/incomeStatement/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
    const incomeStatementDataForTicker = await incomeStatementData(ticker);
    res.status(200).json(incomeStatementDataForTicker);
} catch (error) {
    res.status(500).json({ message: `Error fetching balance Sheet data for ticker ${ticker}: ${error.message}` });
}
});
