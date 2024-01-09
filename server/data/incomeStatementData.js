import axios from "axios";
import * as cheerio from "cheerio";

async function incomeStatementData(ticker) {
  
    try {
        const url = `https://finance.yahoo.com/quote/${ticker}/financials?p=${ticker}`;
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        const $ = cheerio.load(data);

        const OutputLst = [];
        const currentLst1 = [];
        const currentLst2 = [];
        const currentLst3 = [];
        const currentLst4 = [];

        $('div.D\\(tbhg\\)').eq(0).find('span').each(function() {
          currentLst1.push($(this).text());
        });


        $('div[data-test="fin-row"]').eq(0).find('span').each(function() {
          currentLst2.push($(this).text());
        }); 


        $('div[data-test="fin-row"]').eq(9).find('span').each(function() {
          currentLst3.push($(this).text());
        });


        $('div[data-test="fin-row"]').eq(16).find('span').each(function() {
          currentLst4.push($(this).text());
        });

        OutputLst.push(currentLst1);
        OutputLst.push(currentLst2);
        OutputLst.push(currentLst3);
        OutputLst.push(currentLst4);

        return OutputLst;
    
    } catch (error) {
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }

    };

export default incomeStatementData;
