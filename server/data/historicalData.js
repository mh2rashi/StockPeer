import axios from "axios";
import * as cheerio from "cheerio";

async function HistoricalData(ticker) {
  
    try {

        const url = `https://finance.yahoo.com/quote/${ticker}/history?p=${ticker}`
        console.log("URL:", url);
        const { data } = await axios.get(url, {
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
          }
        })
        const $ = cheerio.load(data);
  
  
        const date = $('td:nth-child(1)').get().map(val => $(val).text())
        const highPrice = $('td:nth-child(3)').get().map(val => $(val).text())
        const lowPrice = $('td:nth-child(4)').get().map(val => $(val).text())
        const closingPrice = $('td:nth-child(6)').get().map(val => $(val).text())
  
        const chartData = {
          dates: date,
          highPrices: highPrice,
          lowPrices: lowPrice,
          closingPrices: closingPrice,
      };

        return chartData;
    
    } catch (error) {
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }

    };

export default HistoricalData;

