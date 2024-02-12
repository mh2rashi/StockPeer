/**
 * The above JavaScript function fetches statistics data for a given ticker from Yahoo Finance using
 * Axios and Cheerio.
 * @param ticker - The `ticker` parameter is a string that represents the stock ticker symbol of a
 * company. It is used to construct the URL for fetching statistics data for that particular company.
 * @returns The function `getStatisticsData` returns an object containing four properties:
 * `valuationMeasures`, `incomeStatement`, `balanceSheet`, and `cfStatement`. Each property contains
 * data related to the respective financial statement or valuation measure.
 **/


// Import Axios and Cheerio
import axios from "axios";
import * as cheerio from "cheerio";

// Function to fetch statistics data for a given ticker
async function getStatisticsData(ticker) {
    try {
        // Construct URL for fetching statistics data
        const url = `https://finance.yahoo.com/quote/${ticker}/key-statistics?p=${ticker}`;
        
        // Fetch HTML data from the URL
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        // Load HTML data into Cheerio for parsing
        const $ = cheerio.load(data);
    
        // Initialize objects to store different types of data
        const valuationMeasures = {};
        const incomeStatement = {};
        const balanceSheet = {};
        const cfStatement = {};
    
        // Parse valuation measures data
        $('.Fl\\(start\\) .W\\(100\\%\\) tbody tr').slice(0, 9).each(function() {
            const label = $(this).find('td').eq(0).text().trim();
            const value = $(this).find('td').eq(1).text().trim();
            valuationMeasures[label] = value;
        });

        // Parse income statement data
        $('.Fl\\(start\\) .W\\(100\\%\\) tbody tr').slice(15, 23).each(function() {
            const label = $(this).find('td').eq(0).text().trim();
            const value = $(this).find('td').eq(1).text().trim();
            incomeStatement[label] = value;
        });

        // Parse balance sheet data
        $('.Fl\\(start\\) .W\\(100\\%\\) tbody tr').slice(23, 29).each(function() {
            const label = $(this).find('td').eq(0).text().trim();
            const value = $(this).find('td').eq(1).text().trim();
            balanceSheet[label] = value;
        });

        // Parse cash flow statement data
        $('.Fl\\(start\\) .W\\(100\\%\\) tbody tr').slice(29, 31).each(function() {
            const label = $(this).find('td').eq(0).text().trim();
            const value = $(this).find('td').eq(1).text().trim();
            cfStatement[label] = value;
        });

        // Return the collected data
        return {valuationMeasures, incomeStatement, balanceSheet, cfStatement};
    
    } catch (error) {
        // Throw an error if fetching data fails
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }
}

// Export the function to be used elsewhere
export default getStatisticsData;

