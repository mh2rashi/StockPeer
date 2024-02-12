/**
 * The above JavaScript function fetches and extracts profile data for a given stock ticker from Yahoo
 * Finance.
 * @param ticker - The `ticker` parameter is a string that represents the stock ticker symbol of a
 * company. It is used to construct the URL for fetching the profile data of the company from Yahoo
 * Finance.
 * @returns The function `ProfileData` returns an object containing various pieces of profile data for
 * a given ticker symbol. The returned object includes the following properties:
 **/

// Import Axios and Cheerio
import axios from "axios";
import * as cheerio from "cheerio";

async function getProfileData(ticker) {
    try {
        // Construct the URL for fetching profile data
        const url = `https://finance.yahoo.com/quote/${ticker}/profile?p=${ticker}`;
        console.log("URL:", url);

        // Fetch data from the URL using axios with a specific User-Agent header
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        // Load HTML data into Cheerio for easy manipulation
        const $ = cheerio.load(data);

        // Extract various pieces of profile data from the HTML using Cheerio selectors
        const name = $('h1.D\\(ib\\).Fz\\(18px\\)').text();
        const closingPrice = $('div.D\\(ib\\).Mend\\(20px\\)').children().map(function() { return $(this).text(); }).get().join(' ');
        const address = $('p.D\\(ib\\).W\\(47\\.727\\%\\).Pend\\(40px\\)')
            .clone() // Clone the element
            .find('br').replaceWith(' - ').end() // Replace <br> with ' - '
            .find('a').remove().end() // Remove <a> tags
            .text().trim() // Get the text and trim whitespaces
            .replace(/[\r\n]+/g, ', '); // Replace line breaks with commas
        const telephone = $('p.D\\(ib\\).W\\(47\\.727\\%\\).Pend\\(40px\\) a').first().text();
        const website = $('p.D\\(ib\\).W\\(47\\.727\\%\\).Pend\\(40px\\) a').last().text();
        const summary = $('p.Mt\\(15px\\).Lh\\(1\\.6\\)').text().trim();
        const sector = $('div.Mb\\(25px\\) p.D\\(ib\\).Va\\(t\\) span:contains("Sector(s)") + span').text().trim();
        const industry = $('div.Mb\\(25px\\) p.D\\(ib\\).Va\\(t\\) span:contains("Industry") + span').text().trim();
        const fullTimeEmployees = $('div.Mb\\(25px\\) p.D\\(ib\\).Va\\(t\\) span:contains("Full Time Employees") + span').text().trim();

        // Create an object containing all the extracted profile data
        const profileData = {
            'Name': name,
            'Closing Price': closingPrice,
            'Address': address,
            'Telephone': telephone,
            'Website': website,
            'Summary': summary,
            'Sector(s)': sector,
            'Industry': industry,
            'Employees': fullTimeEmployees
        };

        // Return the profile data object
        return profileData;

    } catch (error) {
        // If an error occurs during fetching or parsing, throw an error with a helpful message
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }
}

// Export the ProfileData function as default
export default getProfileData;
