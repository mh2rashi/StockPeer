import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"
import statisticsData from "./data/statisticsData.js";
import historicalData from "./data/historicalData.js";
import profileData from "./data/profileData.js";
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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.status(200).send('<h1>StockPeer backend</h1>')
})

// API endpoint to fetch statistics for a given ticker
app.get('/api/statistics/:ticker', async (req, res) => {
    const ticker = req.params.ticker.toUpperCase();

    try {
        const statisticsDataForTicker = await statisticsData(ticker);
        res.status(200).json(statisticsDataForTicker);
    } catch (error) {
        res.status(500).json({ message: `Error fetching statistics for ticker ${ticker}: ${error.message}` });
    }
});

// API endpoint to fetch profile data for a given ticker
app.get('/api/profile/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      const profileDataForTicker = await profileData(ticker);
      res.status(200).json(profileDataForTicker);
  } catch (error) {
      res.status(500).json({ message: `Error fetching statistics for ticker ${ticker}: ${error.message}` });
  }
});

// API endpoint to fetch historical data for a given ticker
app.get('/api/historical/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      const historicalDataForTicker = await historicalData(ticker);

      res.status(200).json(historicalDataForTicker);
  } catch (error) {
      res.status(500).json({ message: `Error fetching statistics for ticker ${ticker}: ${error.message}` });
  }
});

// API endpoint to fetch holders data for a given ticker
app.get('/api/holders/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
      const holdersDataForTicker = await holdersData(ticker);
      res.status(200).json(holdersDataForTicker);
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


// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, '../stock-app/build')))

// // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../stock-app/build/index.html'))
// })
