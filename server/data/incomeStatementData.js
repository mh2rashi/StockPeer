/**
 * The above JavaScript function fetches income statement data from Yahoo Finance for a given ticker
 * symbol.
 * @param ticker - The ticker parameter is a string that represents the stock ticker symbol of a
 * company. It is used to construct the URL for fetching the income statement data from Yahoo Finance.
 * @returns The function `incomeStatementData` returns an array `OutputLst` which contains the income
 * statement data extracted from the Yahoo Finance website. The array contains four sub-arrays, each
 * representing a row of data from the income statement.
 **/

// Import Axios and Cheerio
import axios from "axios";
import * as cheerio from "cheerio";

// Function to fetch income statement data from Yahoo Finance
async function getIncomeStatementData(ticker) {
    try {
        // Construct the URL for fetching income statement data
        const url = `https://finance.yahoo.com/quote/${ticker}/financials?p=${ticker}`;
        // Fetch HTML content from the URL
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        // Load HTML content into cheerio for DOM manipulation
        const $ = cheerio.load(data);

        // Initialize arrays to store income statement data
        const OutputLst = [];
        const currentLst1 = [];
        const currentLst2 = [];
        const currentLst3 = [];
        const currentLst4 = [];

        // Extract data for the first row (e.g., Total Revenue) from the income statement
        $('div.D\\(tbhg\\)').eq(0).find('span').each(function() {
            currentLst1.push($(this).text());
        });

        // Extract data for the second row from the income statement
        $('div[data-test="fin-row"]').eq(0).find('span').each(function() {
            currentLst2.push($(this).text());
        });

        // Extract data for the third row from the income statement
        $('div[data-test="fin-row"]').eq(9).find('span').each(function() {
            currentLst3.push($(this).text());
        });

        // Extract data for the fourth row from the income statement
        $('div[data-test="fin-row"]').eq(16).find('span').each(function() {
            currentLst4.push($(this).text());
        });

        // Push the extracted data into the output list
        OutputLst.push(currentLst1);
        OutputLst.push(currentLst2);
        OutputLst.push(currentLst3);
        OutputLst.push(currentLst4);

        // Return the income statement data
        return OutputLst;
    } catch (error) {
        // Throw an error if fetching or parsing data fails
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }
}

// Export the incomeStatementData function as the default export
export default getIncomeStatementData;
