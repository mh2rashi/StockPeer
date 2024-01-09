import axios from "axios";
import * as cheerio from "cheerio";

async function SustainabilityData(ticker) {
  
    try {
        const url = `https://finance.yahoo.com/quote/${ticker}/sustainability?p=${ticker}`;
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        const $ = cheerio.load(data);
    
        const ESGScores = {};
        const EnvironmentScore = {};
        const SocialScore = {};
        const GovernanceScores = {};
        const ControversyLevel = {};



        ESGScores['Score'] = $('div.D\\(ib\\) > div.Fz\\(36px\\)').text();
        ESGScores['Percentile'] = $('span.Bdstarts\\(s\\).Bdstartw\\(0\\.5px\\).Pstart\\(10px\\).Bdc\\(\\$seperatorColor\\).Fz\\(12px\\).smartphone_Bd\\(n\\).Fw\\(500\\) > span').text();
        ESGScores['Rank'] = $('div.Fz\\(s\\).Fw\\(500\\).smartphone_Pstart\\(4px\\) > span').text();

        const scores = $('div.D\\(ib\\).Fz\\(23px\\).smartphone_Fz\\(22px\\).Fw\\(600\\)').map(function(index) {
            return $(this).text();
          }).get();
          
        EnvironmentScore['Score'] = scores[0];
        SocialScore['Score'] = scores[1];
        GovernanceScores['Score'] = scores[2];

        const controversyScore = $('div.D\\(ib\\).Fz\\(36px\\).Fw\\(500\\)').text();

        ControversyLevel['Score'] = controversyScore

        return {ESGScores, EnvironmentScore, SocialScore, GovernanceScores, ControversyLevel};
    
    } catch (error) {
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }

    };

export default SustainabilityData;

