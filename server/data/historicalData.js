/**
 * The above JavaScript code defines a function called `getHistoricalData` that fetches historical
 * stock data for a given ticker symbol from Yahoo Finance using Axios and parses the HTML content
 * using Cheerio.
 * @param ticker - The `ticker` parameter is a string that represents the stock ticker symbol for which
 * you want to fetch historical data. For example, if you want to fetch historical data for Apple Inc.,
 * the ticker symbol would be "AAPL".
 * @returns The function `getHistoricalData` returns an object containing the extracted historical data
 * for a given ticker. The object has the following properties:
 **/

// Import Axios and Cheerio
import axios from "axios";
import * as cheerio from "cheerio";

// Function to fetch historical data for a given ticker
async function getHistoricalData(ticker) {
    try {
        // Construct the URL for fetching historical data
        const url = `https://finance.yahoo.com/quote/${ticker}/history?p=${ticker}`;
        console.log("URL:", url); // Log the URL for debugging purposes
        
        // Fetch HTML content from the URL using Axios
        const { data } = await axios.get(url, {
            headers: {
                // Set user agent to avoid bot detection
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        // Load the HTML content into Cheerio for parsing
        const $ = cheerio.load(data);

        // Extract data from HTML using Cheerio selectors
        const date = $('td:nth-child(1)').get().map(val => $(val).text());
        const highPrice = $('td:nth-child(3)').get().map(val => $(val).text());
        const lowPrice = $('td:nth-child(4)').get().map(val => $(val).text());
        const closingPrice = $('td:nth-child(6)').get().map(val => $(val).text());

        // Construct an object containing the extracted data
        const chartData = {
            dates: date,
            highPrices: highPrice,
            lowPrices: lowPrice,
            closingPrices: closingPrice,
        };

        // Return the extracted historical data
        return chartData;
    } catch (error) {
        // Throw an error if fetching data fails
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }
}

// Export the function to be used elsewhere in the application
export default getHistoricalData;
