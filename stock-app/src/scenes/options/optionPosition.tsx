import { useTheme, TableCell, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, TextField, Typography, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { calculateValues } from "./optionEquations";

const OptionPosition = ({ onRemove, onPositionChange, position, currentPrice, interestRate, }) => {
    const { palette } = useTheme();

    const [direction, setDirection] = useState<string>(position.direction);
    const [kind, setKind] = useState(position.kind);
    const [amount, setAmount] = useState<number>(position.amount);
    const [strike, setStrike] = useState<number>(position.strike);
    const [volatility, setVolatility] = useState<number>(position.volatility);
    const [expiryDate, setExpiryDate] = useState<string>(position.expiryDate);
    const [debitCredit, setDebitCredit] = useState<number>(position.debitCredit);
    const [greeks, setGreeks] = useState(position.greeks);

    useEffect(() => {
    
        const { debitCredit, greeks } = calculateValues( direction, kind, amount, strike, expiryDate, volatility, currentPrice, interestRate,);
    
        setDebitCredit(debitCredit);
        setGreeks(greeks);
    
        if (onPositionChange) {
            onPositionChange({
                ...position,
                direction,
                kind,
                amount,
                strike,
                expiryDate,
                volatility,
                greeks,        // Include greeks in the position object
                debitCredit,
            });
        }
    }, [direction, kind, amount, strike, expiryDate, volatility, currentPrice, interestRate,]);

    const removePosition = () => {
        if (onRemove) {
            onRemove();
        }
    };

    const handleChange = (event, key) => {
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

        <TableRow>

            <TableCell>

                <FormControl variant="outlined" fullWidth sx={{
                '& .MuiInputLabel-root': { fontSize: '1rem', color: palette.grey[300] }, // Larger font for InputLabel
                '& .MuiSelect-select': { fontSize: '1rem', color: palette.grey[300] },   // Larger font for Select
                '& fieldSet': {borderColor: palette.grey[300]}  // Custom font size for Input
                }}
                >
                    <InputLabel htmlFor="demo-simple-select-outlined">Direction</InputLabel>
                    <Select
                        value={direction}
                        onChange={(e) => handleChange(e, 'direction')}
                        label="Direction"
                        inputProps={{
                            name: 'direction',
                            id: 'demo-simple-select-outlined',
                        }}
                    >
                        <MenuItem value="Buy">Buy</MenuItem>
                        <MenuItem value="Sell">Sell</MenuItem>
                    </Select>
                </FormControl>

            </TableCell>
            
            <TableCell>

                <FormControl fullWidth variant="outlined" sx={{
                '& .MuiInputLabel-root': { fontSize: '1rem', color: palette.grey[300] }, // Larger font for InputLabel
                '& .MuiOutlinedInput-input': { fontSize: '1rem', color: palette.grey[300] },
                '& fieldSet': {borderColor: palette.grey[300]}  // Custom font size for Input
                // Larger font for Select
                }}>
                    <InputLabel htmlFor="outlined-amount">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => handleChange(e, 'amount')}
                        label="Amount"
                        
                    />
                </FormControl>

            </TableCell>

            <TableCell>

                <FormControl variant="outlined" fullWidth sx={{
                    '& .MuiInputLabel-root': { fontSize: '1rem', color: palette.grey[300] }, // Larger font for InputLabel
                    '& .MuiSelect-select': { fontSize: '1rem', color: palette.grey[300] },   // Larger font for Select
                    '& fieldSet': {borderColor: palette.grey[300]}  // Custom font size for Input
                    }}>
                    <InputLabel htmlFor="demo-simple-select-outlined">Kind</InputLabel>
                        <Select 
                            value={kind}
                            onChange={(e) => handleChange(e, 'kind')}
                            label="Kind"
                            inputProps={{
                                name: 'kind',
                                id: 'demo-simple-select-outlined',
                            }}
                        >
                            <MenuItem value="Call">Call</MenuItem>
                            <MenuItem value="Put">Put</MenuItem>
                            <MenuItem value="Cash">Cash</MenuItem>
                        </Select>
                </FormControl>

            </TableCell>

            <TableCell>

                <FormControl fullWidth variant="outlined" sx={{
                    '& .MuiInputLabel-root': { fontSize: '1rem', color: palette.grey[300] },       // Custom font size for Label
                    '& .MuiOutlinedInput-input': { fontSize: '1rem', color: palette.grey[300] },   // Custom font size for Input
                    '& fieldSet': {borderColor: palette.grey[300]}  // Custom font size for Input

                }}>
                    <InputLabel htmlFor="outlined-strike">Strike</InputLabel>
                    <OutlinedInput
                        id="outlined-strike"
                        type="number"
                        value={strike}
                        onChange={(e) => handleChange(e, 'strike')}
                        label="Strike"
                    />
                </FormControl>

            </TableCell>

            <TableCell>

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
                    sx={{
                        '& .MuiInputLabel-root': { fontSize: '1rem', color: palette.grey[300] },       // Custom font size for Label
                        '& .MuiOutlinedInput-input': { fontSize: '1rem', color: palette.grey[300] },   // Custom font size for Input
                        '& fieldSet': {borderColor: palette.grey[300]}  // Custom font size for Input

                    }}
                />

            </TableCell>

            <TableCell>

                <TextField
                    id="outlined-number"
                    label="Volatility"
                    type="number"
                    value={volatility}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleChange(e, 'volatility')}
                    sx={{
                    '& .MuiInputLabel-root': { fontSize: '1rem', color: palette.grey[300] },       // Custom font size for Label
                    '& .MuiOutlinedInput-input': { fontSize: '1rem', color: palette.grey[300] },
                    '& fieldSet': {borderColor: palette.grey[300]}  // Custom font size for Input
                    }}
                />

            </TableCell>

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
    
            <TableCell align="center">
                <Button
                    variant="contained"
                    color="error"
                    style={{height: '50px', width: '125px'}}
                    startIcon={
                    <DeleteIcon>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </DeleteIcon>
                    }
                    onClick={removePosition}
                >
                    Remove
                </Button>
            </TableCell>        

        </TableRow>

    );
};
  
export default OptionPosition;
