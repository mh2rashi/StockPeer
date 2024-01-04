import axios from "axios";
import * as cheerio from "cheerio";

async function StatisticsData(ticker) {
  
    try {
        const url = `https://finance.yahoo.com/quote/${ticker}/key-statistics?p=${ticker}`;
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        const $ = cheerio.load(data);
    
        const valuationMeasures = {};
        const incomeStatement = {};
        const balanceSheet = {};
        const cfStatement = {};
    
        $('.Fl\\(start\\) .W\\(100\\%\\) tbody tr').slice(0, 9).each(function() {
            const label = $(this).find('td').eq(0).text().trim();
            const value = $(this).find('td').eq(1).text().trim();
            valuationMeasures[label] = value;
        });

    
        $('.Fl\\(start\\) .W\\(100\\%\\) tbody tr').slice(15, 23).each(function() {
            const label = $(this).find('td').eq(0).text().trim();
            const value = $(this).find('td').eq(1).text().trim();
            incomeStatement[label] = value;
        });
    
          
        $('.Fl\\(start\\) .W\\(100\\%\\) tbody tr').slice(23, 29).each(function() {
            const label = $(this).find('td').eq(0).text().trim();
            const value = $(this).find('td').eq(1).text().trim();
            balanceSheet[label] = value;
        });

        
        $('.Fl\\(start\\) .W\\(100\\%\\) tbody tr').slice(29, 31).each(function() {
            const label = $(this).find('td').eq(0).text().trim();
            const value = $(this).find('td').eq(1).text().trim();
            cfStatement[label] = value;
        });

        return {valuationMeasures, incomeStatement, balanceSheet, cfStatement};
    
    } catch (error) {
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }

    };

export default StatisticsData;
