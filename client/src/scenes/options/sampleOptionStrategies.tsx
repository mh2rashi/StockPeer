/*
 SampleOptionStrategies object containing various option strategies with sample data.
*/

// UUID import for unique ID
import { v4 as uuidv4 } from 'uuid';

const SampleOptionStrategies = {

    "Long Call": [{id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],
    
    "Short Call": [{ id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0.},],
   
    "Long Put" : [{ id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

    "Short Put" : [{ id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

    "Bull Call Spread" : [{ id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Bear Put Spread" : [{ id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Long Straddle" : [{ id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                        { id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Short Straddle" : [{ id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                         { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Long Strangle" : [{ id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                        { id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Short Strangle" : [{ id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                         { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Long Butterfly" : [{ id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                         { id: uuidv4(), direction: 'Sell', amount: 2, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                         { id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Short Butterfly" : [{ id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Put', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                          { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Long Condor" : [{ id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 80, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                      { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Call', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                      { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                      { id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 120, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

     "Short Condor" : [{ id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 110, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                       { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Call', strike: 120, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                       { id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Put', strike: 90, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},
                       { id: uuidv4(), direction: 'Sell', amount: 1, kind: 'Put', strike: 80, expiryDate: '2024-12-31', volatility: 30, greeks: [0, 0, 0, 0, 0], debitCredit: 0,},],

};

export default SampleOptionStrategies;
