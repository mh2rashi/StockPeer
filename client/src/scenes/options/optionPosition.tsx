/**
 * The `OptionPosition` component creates an option position when the 'ADD POSITION' button is clicked
 * on the Option Builder page.
 * @param  - - `children`: Any child components or elements that need to be rendered within the
 * `OptionPosition` component.
 **/

// React imports
import { useState, useEffect } from 'react';

// Component imports
import {
useTheme,
TableCell,
Button,
FormControl,
InputLabel,
Select,
MenuItem,
OutlinedInput,
TextField,
Typography,
TableRow
} from '@mui/material';

// Icon imports
import DeleteIcon from '@mui/icons-material/Delete';

// Utility function imports
import { calculateValues } from "./optionEquations";

const OptionPosition = ({children, onRemove, onPositionChange, position, currentPrice, interestRate }) => {
    // Custom theme colors
    const theme = useTheme();

    // State declarations
    const [direction, setDirection] = useState<string>(position.direction);
    const [kind, setKind] = useState(position.kind);
    const [amount, setAmount] = useState<number>(position.amount);
    const [strike, setStrike] = useState<number>(position.strike);
    const [volatility, setVolatility] = useState<number>(position.volatility);
    const [expiryDate, setExpiryDate] = useState<string>(position.expiryDate);
    const [debitCredit, setDebitCredit] = useState<number>(position.debitCredit);
    const [greeks, setGreeks] = useState(position.greeks);

    // useEffect to calculate values and update state
    useEffect(() => {
        const { debitCredit, greeks } = calculateValues( direction, kind, amount, strike, expiryDate, volatility, currentPrice, interestRate,);
        setDebitCredit(debitCredit);
        setGreeks(greeks);

        // Invoke onPositionChange callback if provided
        if (onPositionChange) {
            onPositionChange({
                ...position,
                direction,
                kind,
                amount,
                strike,
                expiryDate,
                volatility,
                greeks,        
                debitCredit,
            });
        }
    }, [direction, kind, amount, strike, expiryDate, volatility, currentPrice, interestRate,]);

    // Function to remove position
    const removePosition = () => {
        if (onRemove) {
            onRemove();
        }
    };

    // Function to handle changes in input fields
    const handleChange = (event : any, key : string) => {
        const value = event.target.value;

        switch (key) {
            case 'direction':
                setDirection(value as string);
                break;
            case 'kind':
                setKind(value);
                break;
            case 'amount':
                setAmount(parseInt(value));
                break;
            case 'strike':
                setStrike(parseInt(value));
                break;
            case 'expiryDate':
                setExpiryDate(value);
                break;
            case 'volatility':
                setVolatility(parseFloat(value));
                break;
            default:
                break;
        }
    };

    return (
        <TableRow sx={{
            '& .MuiInputLabel-root': { fontSize: '1rem', color: theme.palette.grey[300] },
            '& .MuiSelect-select': { fontSize: '1rem', color: theme.palette.grey[300] },
            '& fieldSet': {borderColor:theme.palette.grey[300]},
            }}>
            {/* Direction */}
            <TableCell>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="demo-simple-select-outlined">Direction</InputLabel>
                    <Select
                        value={direction}
                        onChange={(e) => handleChange(e, 'direction')}
                        label="Direction"
                        inputProps={{
                            name: 'direction',
                            id: 'demo-simple-select-outlined',
                            style: { color: 'white' },
                        }}
                    >
                        <MenuItem value="Buy">Buy</MenuItem>
                        <MenuItem value="Sell">Sell</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
            
            {/* Amount */}
            <TableCell>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="demo-simple-select-outlined">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => handleChange(e, 'amount')}
                        label="Amount"
                        inputProps={{style: { color: 'white' }}}
                    />
                </FormControl>
            </TableCell>

            {/* Kind */}
            <TableCell>
                <FormControl variant="outlined" fullWidth >
                    <InputLabel htmlFor="demo-simple-select-outlined">Kind</InputLabel>
                        <Select 
                            value={kind}
                            onChange={(e) => handleChange(e, 'kind')}
                            label="Kind"
                            inputProps={{
                                name: 'kind',
                                id: 'demo-simple-select-outlined',
                                style: { color: 'white' }}}
                        >
                            <MenuItem value="Call">Call</MenuItem>
                            <MenuItem value="Put">Put</MenuItem>
                            <MenuItem value="Cash">Cash</MenuItem>
                        </Select>
                </FormControl>
            </TableCell>

            {/* Strike */}
            <TableCell>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-strike">Strike</InputLabel>
                    <OutlinedInput
                        id="outlined-strike"
                        type="number"
                        value={strike}
                        onChange={(e) => handleChange(e, 'strike')}
                        label="Strike"
                        inputProps={{style: { color: 'white' }}}
                    />
                </FormControl>
            </TableCell>

            {/* Expiry */}
            <TableCell >
                <TextField
                    id="date"
                    label="Expiry"
                    type="date"
                    defaultValue={expiryDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleChange(e, 'expiryDate')}
                    inputProps={{style: { color: 'white' }}}
                />
            </TableCell>

            {/* Volatility */}
            <TableCell>
                <TextField
                    id="outlined-number"
                    label="Volatility"
                    type="number"
                    value={volatility}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleChange(e, 'volatility')}
                    inputProps={{style: { color: 'white' }}}
                />
            </TableCell>

            {/* Greeks */}
            <TableCell style={{ verticalAlign: "middle" }}>
                <Typography variant="h4">{debitCredit.toFixed(2)}</Typography>
            </TableCell>
            
            <TableCell style={{ verticalAlign: 'middle' }}>
                <Typography variant="h4">{greeks[0].toFixed(2)}</Typography>
            </TableCell>

            <TableCell style={{ verticalAlign: 'middle' }}>
                <Typography variant="h4">{greeks[1].toFixed(2)}</Typography>
            </TableCell>

            <TableCell style={{ verticalAlign: 'middle' }}>
                <Typography variant="h4">{greeks[2].toFixed(2)}</Typography>
            </TableCell>

            <TableCell style={{ verticalAlign: 'middle' }}>
                <Typography variant="h4">{greeks[3].toFixed(2)}</Typography>
            </TableCell>

            <TableCell style={{ verticalAlign: 'middle' }}>
                <Typography variant="h4">{greeks[4].toFixed(2)}</Typography>
            </TableCell>
    
            {/* Remove Button */}
            <TableCell align="center">
                <Button
                    variant="contained"
                    color="error"
                    style={{height: '50px', width: '125px', color:theme.palette.grey[300]}}
                    startIcon={<DeleteIcon />}
                    onClick={removePosition}
                >
                    Remove
                </Button>
            </TableCell>        
        </TableRow>
    );
};
  
export default OptionPosition;
