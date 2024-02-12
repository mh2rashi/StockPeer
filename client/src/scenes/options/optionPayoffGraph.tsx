/**
 * The `OptionPayoffGraph` component renders a line graph representing option
 * payoffs based on provided options and the current price.
 * @param  - - `options`: An array of objects representing different options. Each option object has
 * the following properties:
 * @returns The code is returning a React functional component called `OptionPayoffGraph`.
**/

// React and charting imports
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

// Interface for defining the structure of an option
interface Option {
  direction: string;
  amount: number;
  kind: string;
  strike: number;
  expiryDate: string;
  volatility: number;
  greeks: number[];
  debitCredit: number;
}

// Interface defining the props expected by the OptionPayoffGraph component
interface OptionPayoffGraphProps {
  options: Option[];
  currentPrice: string;
}

// Interface for defining the structure of data points for the graph
interface PayoffData {
  label: string;
  data: number[];
  borderColor?: string;
  fill?: boolean;
}

// OptionPayoffGraph component displays a line graph representing option payoffs
const OptionPayoffGraph: React.FC<OptionPayoffGraphProps> = ({ options, currentPrice }) => {
  
  useEffect(() => {
    // Function to calculate the payoff of an option at a given stock price within a useEffect for re-rendering when price changes
    const calculateOptionPayoff = (option: Option, stockPrice: number): number => {
      const payoff =
        option.direction === 'Buy'?
            option.amount * Math.max(0, stockPrice - option.strike)
          : option.amount * Math.max(0, option.strike - stockPrice);

      return option.kind === 'Call' ? payoff - option.debitCredit : payoff + option.debitCredit;
    };

    // Function to generate an array of stock prices based on option strike prices
    const generateStockPrices = (start: number, end: number, step: number): number[] => {
      const stockPrices: number[] = [];
      for (let price = start; price <= end; price += step) {
        stockPrices.push(price);
      }
      return stockPrices;
    };

    // Function to determine the minimum and maximum stock prices for the graph
    const generateMinMaxPrices = (): { minPrice: number; maxPrice: number } => {
      let minPrice = parseFloat(currentPrice);
      let maxPrice = parseFloat(currentPrice);
    
      options.forEach((option) => {
        minPrice = Math.min(minPrice, option.strike);
        maxPrice = Math.max(maxPrice, option.strike);
      });
    
      return { minPrice, maxPrice };
    };

    // Generate an array of stock prices based on option strike prices
    const { minPrice, maxPrice } = generateMinMaxPrices();
    const stockPrices = generateStockPrices(minPrice - 20, maxPrice + 20, 1);

    // Calculate option payoffs and cumulative payoffs for each stock price
    const cumulativePayoffData = stockPrices.map(price =>
      options.reduce((cumulativePayoff, option) => cumulativePayoff + calculateOptionPayoff(option, price), 0)
    );

    // Generate data sets for each option and cumulative payoff
    const payoffData = options.map(option => ({
      label: `${option.direction} ${option.amount} ${option.kind}`,
      data: stockPrices.map(price => calculateOptionPayoff(option, price)),
    }));

    // Add cumulative payoff data set
    payoffData.push({
      label: 'Cumulative Payoff',
      data: cumulativePayoffData,
      borderColor: 'white', // Set border color to white
      fill: false,
    } as PayoffData);

    // Render the chart using Chart.js
    const ctx = document.getElementById('payoffGraph') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockPrices.map(String),
        datasets: payoffData.map(option => ({
          label: option.label,
          data: option.data,
          borderColor: option.label === 'Cumulative Payoff' ? 'white' : getRandomColor(), // Set color based on label
          fill: false,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Stock Price ($)',
              color: 'white', // Set x-axis label color to white
            },
            ticks: {
              color: 'white', // Set x-axis tick color to white
            },
            grid: {
              color: 'grey', // Set x-axis grid color to grey
            },
          },
          y: {
            title: {
              display: true,
              text: 'Payoff ($)',
              color: 'white', // Set y-axis label color to white
            },
            ticks: {
              color: 'white', // Set y-axis tick color to white
            },
            grid: {
              color: 'grey', // Set y-axis grid color
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart
    return () => {
      myChart.destroy();
    };
  }, [options, currentPrice]);

  // Generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Render canvas element for the chart
  return <canvas id="payoffGraph" />;
};

export default OptionPayoffGraph;
