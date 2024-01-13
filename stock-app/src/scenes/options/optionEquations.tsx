import jStat from 'jstat';

// Black-Scholes Option Pricing Model components calculation
export const calculateValues = (direction, kind, amount, strike, expiryDate, volatility, stockPrice, interestRate) => {
   
    const inputDate = new Date(expiryDate);
    const referenceDate = new Date();
    const millisecondsInYear = 365 * 24 * 60 * 60 * 1000; // Total milliseconds in a year
    const timeDifference = inputDate - referenceDate;
    const expiry = timeDifference / millisecondsInYear;

    const volatilityFraction = volatility / 100;
    const interestRateFraction = interestRate / 100;

    console.log("stockPrice", stockPrice);
    console.log("interestRate", interestRate);
    
    // Calculate Black-Scholes Option Pricing Model components
    const d1 = (Math.log(stockPrice / strike) + (interestRateFraction + 0.5 * Math.pow(volatilityFraction, 2)) * expiry) / (volatilityFraction * Math.sqrt(expiry));
    const d2 = d1 - volatilityFraction * Math.sqrt(expiry);

    // Black-Scholes formulas
    const cumulativeDistribution = (x) => jStat.normal.cdf(x, 0, 1);
    const probabilityDensity = (x) => jStat.normal.pdf(x, 0, 1);

    const debitCredit = (direction === 'Buy' ? 1 : -1) * amount * (stockPrice * cumulativeDistribution(d1) - (kind === 'Call' ? strike * cumulativeDistribution(d2) : strike * cumulativeDistribution(-d2)));
    
    const delta = (direction === 'Buy' ? cumulativeDistribution(d1) : -cumulativeDistribution(d1)) * (kind === 'Call' ? 1 : -1);
    const gamma = probabilityDensity(d1) / (stockPrice * volatilityFraction * Math.sqrt(expiry));
    const theta = -((stockPrice * volatilityFraction * probabilityDensity(d1)) / (2 * Math.sqrt(expiry))) - (interestRateFraction * strike * Math.exp(-interestRateFraction * expiry) * cumulativeDistribution((direction === 'Buy' ? 1 : -1) * d2)) / (2 * expiry);
    const vega = stockPrice * Math.sqrt(expiry) * probabilityDensity(d1);
    const rho = (expiry * strike * Math.exp(-interestRateFraction * expiry) * cumulativeDistribution((direction === 'Buy' ? 1 : -1) * d2)) / 100;

    return {
        debitCredit,
        greeks: [ delta, gamma, theta, vega, rho ],
    };
};
