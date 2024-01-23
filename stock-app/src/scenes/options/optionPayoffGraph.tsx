import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

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

interface OptionPayoffGraphProps {
  options: Option[];
  currentPrice: string; // Add currentPrice prop
}

interface PayoffData {
  label: string;
  data: number[];
  borderColor?: string; // Make it optional
  fill?: boolean;
}

const OptionPayoffGraph: React.FC<OptionPayoffGraphProps> = ({ options, currentPrice }) => {
  useEffect(() => {
    const calculateOptionPayoff = (option: Option, stockPrice: number) => {
      const payoff =
        option.direction === 'Buy'
          ? option.amount * Math.max(0, stockPrice - option.strike)
          : option.amount * Math.max(0, option.strike - stockPrice);

      return option.kind === 'Call' ? payoff - option.debitCredit : payoff + option.debitCredit;
    };

    const generateStockPrices = (start: number, end: number, step: number) => {
      const stockPrices: number[] = [];
      for (let price = start; price <= end; price += step) {
        stockPrices.push(price);
      }
      return stockPrices;
    };

    const generateMinMaxPrices = () => {
      let minPrice = parseFloat(currentPrice);
      let maxPrice = parseFloat(currentPrice);
    
      options.forEach((option) => {
        minPrice = Math.min(minPrice, option.strike);
        maxPrice = Math.max(maxPrice, option.strike);
      });
    
      return { minPrice, maxPrice };
    };
    

    const { minPrice, maxPrice } = generateMinMaxPrices();
    const stockPrices = generateStockPrices(minPrice - 20, maxPrice + 20, 1);

    const cumulativePayoffData = stockPrices.map(price =>
      options.reduce((cumulativePayoff, option) => cumulativePayoff + calculateOptionPayoff(option, price), 0)
    );

    const payoffData = options.map(option => ({
      label: `${option.direction} ${option.amount} ${option.kind}`,
      data: stockPrices.map(price => calculateOptionPayoff(option, price)),
    }));

    payoffData.push({
      label: 'Cumulative Payoff',
      data: cumulativePayoffData,
      borderColor: 'white',
      fill: false,
    } as PayoffData);

    const ctx = document.getElementById('payoffGraph') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockPrices.map(String),
        datasets: payoffData.map(option => ({
          label: option.label,
          data: option.data,
          borderColor: option.label === 'Cumulative Payoff' ? 'white' : getRandomColor(),
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
              color: 'white',
            },
            ticks: {
              color: 'white', // Set x-axis color to white
            },
            grid: {
              color: 'grey', // Set x-axis grid color to white
            },
          },
          y: {
            title: {
              display: true,
              text: 'Payoff ($)',
              color: 'white',
            },
            ticks: {
              color: 'white', // Set x-axis color to white
            },
            grid: {
              color: 'grey', // Set x-axis grid color to white
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [options, currentPrice]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return <canvas id="payoffGraph" />;
};

export default OptionPayoffGraph;

