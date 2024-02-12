/**
 * The above JavaScript function fetches balance sheet data for a given ticker symbol from Yahoo
 * Finance using Axios and Cheerio.
 * @param ticker - The `ticker` parameter is a string that represents the ticker symbol of a company.
 * It is used to construct the URL to fetch balance sheet data for that company from Yahoo Finance.
 * @returns The function `balanceSheetData` returns an object containing the extracted balance sheet
 * data. The returned object has the following properties:
 **/

// Import Axios and Cheerio
import axios from "axios";
import * as cheerio from "cheerio";

// Function to fetch balance sheet data for a given ticker symbol
async function getBalanceSheetData(ticker) {
  try {
    // Construct the URL to fetch data from Yahoo Finance
    const url = `https://ca.finance.yahoo.com/quote/${ticker}/balance-sheet?p=${ticker}`;
    
    // Fetch HTML content from the URL using Axios
    const { data } = await axios.get(url, {
      headers: {
        // Set a User-Agent header to avoid being blocked by the server
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });

    // Load HTML content into Cheerio for easy DOM manipulation
    const $ = cheerio.load(data);

    // Initialize arrays to store different categories of data
    const currentLst1 = [];
    const currentLst2 = [];
    const currentLst3 = [];
    const currentLst4 = [];
    const currentLst5 = [];
    const currentLst6 = [];
    const currentLst7 = [];
    const currentLst8 = [];
    const currentLst9 = [];

    // Extract data using Cheerio selectors
    $('div.D\\(tbhg\\)').eq(0).find('span').each(function() {
      currentLst9.push($(this).text());
    });

    // Functions to extract specific data points using Cheerio selectors
    function extractData(selector, list) {
      $('div[data-test="fin-row"] span:contains("' + selector + '")')
        .parent()
        .parent()
        .parent()
        .find('span').each(function() {
          list.push($(this).text());
        });
    }

    // Call extractData function for each category of data
    extractData("Total Current Assets", currentLst1);
    extractData("Total non-current assets", currentLst2);
    extractData("Total Assets", currentLst3);
    extractData("Total Current Liabilities", currentLst4);
    extractData("Total non-current liabilities", currentLst5);
    extractData("Total Liabilities", currentLst6);
    extractData("Total stockholders' equity", currentLst7);
    extractData("Total liabilities and stockholders' equity", currentLst8);

    // Return the extracted data as an object
    return {
      currentLst9,
      currentLst1,
      currentLst2,
      currentLst3,
      currentLst4,
      currentLst5,
      currentLst6,
      currentLst7,
      currentLst8
    };

  } catch (error) {
    // Throw an error if data fetching fails
    throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
  }
}

// Export the balanceSheetData function as default
export default getBalanceSheetData;
