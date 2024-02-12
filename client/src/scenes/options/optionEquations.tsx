/**
 * The function calculates values using the Black-Scholes Option Pricing Model, including
 * debit/credit and various greeks.
 * @param {string} direction - The direction of the option, either "Buy" or "Sell".
 * @param {string} kind - The "kind" parameter refers to the type of option being priced. It can be
 * either "Call" or "Put".
 * @param {number} amount - The amount is the number of options contracts being traded.
 * @param {number} strike - The strike price is the predetermined price at which the option can be
 * exercised. It is the price at which the buyer of the option can buy or sell the underlying asset.
 * @param {string} expiryDate - The `expiryDate` parameter is the expiration date of the option. It is
 * a string representing a date in the format "YYYY-MM-DD".
 * @param {number} volatility - The volatility parameter represents the standard deviation of the
 * stock's returns over a certain period of time. It is usually expressed as a percentage.
 * @param {number} stockPrice - The stock price is the current price of the underlying asset on which
 * the option is based.
 * @param {number} interestRate - The `interestRate` parameter represents the interest rate for the
 * option pricing model. It is a decimal value, where 0.05 represents 5% interest rate.
 * @returns The function `calculateValues` returns an object with two properties: `debitCredit` and
 * `greeks`.
 **/

// Import claculation libraries
import jStat from 'jstat';

// Calculate values using the Black-Scholes Option Pricing Model
export const calculateValues = (direction: string, kind: string, amount: number, strike: number, expiryDate: string, volatility: number, stockPrice: number, interestRate: number) => {
    // Convert expiry date to milliseconds
    const inputDate = new Date(expiryDate);
    const referenceDate = new Date();
    const millisecondsInYear = 365 * 24 * 60 * 60 * 1000;
    const timeDifference = inputDate.getTime() - referenceDate.getTime();
    const expiry = timeDifference / millisecondsInYear;

    // Convert percentage values to fractions
    const volatilityFraction = volatility / 100;
    const interestRateFraction = interestRate / 100;
    
    // Calculate components of the Black-Scholes model
    const d1 = (Math.log(stockPrice / strike) + (interestRateFraction + 0.5 * Math.pow(volatilityFraction, 2)) * expiry) / (volatilityFraction * Math.sqrt(expiry));
    const d2 = d1 - volatilityFraction * Math.sqrt(expiry);

    // Define functions for cumulative distribution and probability density
    const cumulativeDistribution = (x: number) => jStat.normal.cdf(x, 0, 1);
    const probabilityDensity = (x: number) => jStat.normal.pdf(x, 0, 1);

    // Calculate debit/credit and greeks
    const debitCredit = (direction === 'Buy' ? 1 : -1) * amount * (stockPrice * cumulativeDistribution(d1) - (kind === 'Call' ? strike * cumulativeDistribution(d2) : strike * cumulativeDistribution(-d2)));
    const delta = (direction === 'Buy' ? cumulativeDistribution(d1) : -cumulativeDistribution(d1)) * (kind === 'Call' ? 1 : -1);
    const gamma = probabilityDensity(d1) / (stockPrice * volatilityFraction * Math.sqrt(expiry));
    const theta = -((stockPrice * volatilityFraction * probabilityDensity(d1)) / (2 * Math.sqrt(expiry))) - (interestRateFraction * strike * Math.exp(-interestRateFraction * expiry) * cumulativeDistribution((direction === 'Buy' ? 1 : -1) * d2)) / (2 * expiry);
    const vega = stockPrice * Math.sqrt(expiry) * probabilityDensity(d1);
    const rho = (expiry * strike * Math.exp(-interestRateFraction * expiry) * cumulativeDistribution((direction === 'Buy' ? 1 : -1) * d2)) / 100;

    // Return calculated values
    return {
        debitCredit,
        greeks: [delta, gamma, theta, vega, rho],
    };
};
