import axios from "axios";
import * as cheerio from "cheerio";

async function ProfileData(ticker) {
  
    try {
  
        const url = `https://finance.yahoo.com/quote/${ticker}/profile?p=${ticker}`
        console.log("URL:", url);
        const { data } = await axios.get(url, {
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
          }
        })
        const $ = cheerio.load(data);
    
    
        const name = $('h1.D\\(ib\\).Fz\\(18px\\)').text()
        const closingPrice = $('div.D\\(ib\\).Mend\\(20px\\)').children().map(function() { return $(this).text();}).get().join(' ');
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
    

        const profileData =  { 'Name': name,'Closing Price': closingPrice, 'Address': address, 'Telephone': telephone,
                              'Website': website, 'Summary': summary, 'Sector(s)': sector, 'Industry':industry,
                              'Employees' : fullTimeEmployees};

        return profileData;
    
    } catch (error) {
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }

    };

export default ProfileData;
