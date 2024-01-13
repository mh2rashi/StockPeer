const SampleOptionStrategies = {

    "Long Call": [{ direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],
    
    "Short Call": [{ direction: 'Sell', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0.},],
   
    "Long Put" : [{ direction: 'Buy', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

    "Short Put" : [{ direction: 'Sell', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

    "Bull Call Spread" : [{ direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { direction: 'Sell', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Bear Put Spread" : [{ direction: 'Buy', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { direction: 'Sell', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Long Straddle" : [{ direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                        { direction: 'Buy', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Short Straddle" : [{ direction: 'Sell', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                         { direction: 'Sell', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Long Strangle" : [{ direction: 'Buy', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                        { direction: 'Buy', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Short Strangle" : [{ direction: 'Sell', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                         { direction: 'Sell', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Long Butterfly" : [{ direction: 'Buy', amount: 1, kind: 'Call', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                         { direction: 'Sell', amount: 2, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                         { direction: 'Buy', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Short Butterfly" : [{ direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { direction: 'Sell', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { direction: 'Buy', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { direction: 'Sell', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Long Condor" : [{ direction: 'Buy', amount: 1, kind: 'Call', strike: 80, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                      { direction: 'Sell', amount: 1, kind: 'Call', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                      { direction: 'Sell', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                      { direction: 'Buy', amount: 1, kind: 'Call', strike: 120, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Short Condor" : [{ direction: 'Buy', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                       { direction: 'Sell', amount: 1, kind: 'Call', strike: 120, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                       { direction: 'Buy', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                       { direction: 'Sell', amount: 1, kind: 'Put', strike: 80, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

};

export default SampleOptionStrategies;