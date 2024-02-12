/**
 * The above JavaScript function fetches holders data for a given ticker from Yahoo Finance using Axios
 * and parses it using Cheerio.
 * @param ticker - The `ticker` parameter is a string that represents the stock ticker symbol for which
 * you want to fetch the holders data. For example, if you want to fetch the holders data for Apple
 * Inc., the ticker symbol would be "AAPL".
 * @returns The function `getHoldersData` returns an object containing the holders data for a given
 * ticker. The object has two properties: 'Top Institutional Holders' and 'Top Mutual Fund Holders'.
 * Each property contains an object with three properties: 'Holders', 'Shares', and 'Value'. These
 * properties store the respective data for the top institutional holders and top mutual fund holders.
 **/

// Import Axios and Cheerio
import axios from "axios";
import * as cheerio from "cheerio";

// Function to fetch holders data for a given ticker
async function getHoldersData(ticker) {
    try {
        // Construct the URL for fetching holders data
        const url = `https://finance.yahoo.com/quote/${ticker}/holders?p=${ticker}`;
        console.log("URL:", url);
        
        // Fetch data from the URL using Axios
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        // Load the fetched HTML data into Cheerio for parsing
        const $ = cheerio.load(data);
        
        // Initialize arrays to store holders, shares, and values data
        const holders1 = [];
        const shares1 = [];
        const values1 = [];
        const holders2 = [];
        const shares2 = [];
        const values2 = [];

        // Extract top institutional holders data
        $('tbody tr').slice(4, 9).each(function() {
            holders1.push($(this).find('td').eq(0).text().trim());
            shares1.push($(this).find('td').eq(1).text().trim());
            values1.push($(this).find('td').eq(4).text().trim());
        });

        // Extract top mutual fund holders data
        $('tbody tr').slice(14, 19).each(function() {
            holders2.push($(this).find('td').eq(0).text().trim());
            shares2.push($(this).find('td').eq(1).text().trim());
            values2.push($(this).find('td').eq(4).text().trim());
        });

        // Construct objects with extracted data
        const topInstitutionalHolders = { 'Holders': holders1, 'Shares': shares1, 'Value': values1 };
        const topMutualHolders = { 'Holders': holders2, 'Shares': shares2, 'Value': values2 };

        // Return the holders data
        return {
            'Top Institutional Holders': topInstitutionalHolders,
            'Top Mutual Fund Holders': topMutualHolders
        };
    } catch (error) {
        // Throw an error if fetching or parsing data fails
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }
}

export default getHoldersData;
