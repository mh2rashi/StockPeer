import axios from "axios";
import * as cheerio from "cheerio";

async function HoldersData(ticker) {
  
    try {

        const url = `https://finance.yahoo.com/quote/${ticker}/holders?p=${ticker}`
        console.log("URL:", url);
        const { data } = await axios.get(url, {
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
          }
        })
        const $ = cheerio.load(data);
    
        const holders1 = [];
        const shares1 = [];
        const values1 = [];
    
        $('tbody tr').slice(4, 9).each(function() {
            holders1.push($(this).find('td').eq(0).text().trim()); // First <td> for holder
            shares1.push($(this).find('td').eq(1).text().trim());  // Fourth <td> for shares
            values1.push($(this).find('td').eq(4).text().trim());  // Fifth <td> for value
        });
        
        const topInstitutionalHolders = { 'Holders' : holders1, 'Shares' : shares1, 'Value' : values1}
    
        const holders2 = [];
        const shares2 = [];
        const values2 = [];
    
        $('tbody tr').slice(14, 19).each(function() {
          holders2.push($(this).find('td').eq(0).text().trim()); // First <td> for holder
          shares2.push($(this).find('td').eq(1).text().trim());  // Fourth <td> for shares
          values2.push($(this).find('td').eq(4).text().trim());  // Fifth <td> for value
        });
    
        const topMutualHolders = { 'Holders' : holders2, 'Shares' : shares2, 'Value' : values2}

        return {'Top Institutional Holders' : topInstitutionalHolders,
                           'Top Mutual Fund Holders' : topMutualHolders};
    
    } catch (error) {
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }

    };

export default HoldersData;