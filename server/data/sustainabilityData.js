/**
 * The above JavaScript function fetches sustainability data for a given stock ticker from Yahoo
 * Finance using Axios and Cheerio.
 * @param ticker - The `ticker` parameter is a string that represents the stock ticker symbol of a
 * company. It is used to construct the URL for fetching sustainability data for that particular
 * company.
 * @returns The function `SustainabilityData` returns an object containing the extracted sustainability
 * data. The object has the following structure:
 **/

// Import Axios and Cheerio
import axios from "axios";
import * as cheerio from "cheerio";

async function getSustainabilityData(ticker) {
    try {
        // Construct the URL for fetching sustainability data
        const url = `https://finance.yahoo.com/quote/${ticker}/sustainability?p=${ticker}`;
        // Fetch HTML content from the URL
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        // Load HTML content into Cheerio for parsing
        const $ = cheerio.load(data);

        // Object to store ESG scores
        const ESGScores = {};
        // Object to store environmental score
        const EnvironmentScore = {};
        // Object to store social score
        const SocialScore = {};
        // Object to store governance scores
        const GovernanceScores = {};
        // Object to store controversy level
        const ControversyLevel = {};

        // Extract ESG score details
        ESGScores['Score'] = $('div.D\\(ib\\) > div.Fz\\(36px\\)').text();
        ESGScores['Percentile'] = $('span.Bdstarts\\(s\\).Bdstartw\\(0\\.5px\\).Pstart\\(10px\\).Bdc\\(\\$seperatorColor\\).Fz\\(12px\\).smartphone_Bd\\(n\\).Fw\\(500\\) > span').text();
        ESGScores['Rank'] = $('div.Fz\\(s\\).Fw\\(500\\).smartphone_Pstart\\(4px\\) > span').text();

        // Extract environmental, social, and governance scores
        const scores = $('div.D\\(ib\\).Fz\\(23px\\).smartphone_Fz\\(22px\\).Fw\\(600\\)').map(function(index) {
            return $(this).text();
        }).get();

        EnvironmentScore['Score'] = scores[0];
        SocialScore['Score'] = scores[1];
        GovernanceScores['Score'] = scores[2];

        // Extract controversy level score
        const controversyScore = $('div.D\\(ib\\).Fz\\(36px\\).Fw\\(500\\)').text();
        ControversyLevel['Score'] = controversyScore;

        // Return the extracted data as an object
        return { ESGScores, EnvironmentScore, SocialScore, GovernanceScores, ControversyLevel };

    } catch (error) {
        // Handle errors gracefully
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }
}

export default getSustainabilityData;
