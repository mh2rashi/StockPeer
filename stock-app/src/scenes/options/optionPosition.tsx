import { useTheme, TableCell, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, TextField, Typography, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';


const OptionPosition = () => {

    const { palette } = useTheme();

    const [direction, setDirection] = useState<string>('Buy');
    const [kind, setKind] = useState('Call');
    const [amount, setAmount] = useState<number>(1);
    const [strike, setStrike] = useState<number>(100);
    const [expiryDate, setExpiryDate] = useState<string>("2024-12-26");
    const [volatility, setVolatility] = useState<number>(30);
    const debitCredit = -10.83;
    const values = [-41.43, 1.30, -1.32, 38.93, -52.16];

  
    const handleChange = (event, stateKey) => {
       
        const value = event.target.value;

        console.log(value);
      
        switch (stateKey) {

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

                <Typography variant="h4"><strong>{debitCredit}</strong></Typography>

            </TableCell>
            

            <TableCell style={{ verticalAlign: 'middle' }}>
                 <Typography variant="h4">{values[0]}</Typography>
             </TableCell>

             <TableCell style={{ verticalAlign: 'middle' }}>
                 <Typography variant="h4">{values[1]}</Typography>
             </TableCell>

             <TableCell style={{ verticalAlign: 'middle' }}>
                 <Typography variant="h4">{values[2]}</Typography>
             </TableCell>

             <TableCell style={{ verticalAlign: 'middle' }}>
                <Typography variant="h4">{values[3]}</Typography>
            </TableCell>

             <TableCell style={{ verticalAlign: 'middle' }}>
                <Typography variant="h4">{values[4]}</Typography>
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
                    //onClick={removeOrder}
                >
                    Remove
                </Button>
                </TableCell>        

        </TableRow>

    );
};
  
  export default OptionPosition;





//   <TableRow>
//         <TableCell>
//             <FormControl variant="outlined" fullWidth sx={{ /* your styles */ }}>
//             <InputLabel htmlFor={`direction-${position}`}>Direction</InputLabel>
//             <Select
//                 value={position.direction}
//                 onChange={(e) => handleChange(e, position)}
//                 label="Direction"
//                 inputProps={{
//                 name: 'direction',
//                 id: `direction-${position}`,
//                 }}
//             >
//                 <MenuItem value="Buy">Buy</MenuItem>
//                 <MenuItem value="Sell">Sell</MenuItem>
//             </Select>
//             </FormControl>
//         </TableCell>
    
//         <TableCell>
//             <FormControl fullWidth variant="outlined" sx={{ /* your styles */ }}>
//             <InputLabel htmlFor={`amount-${position}`}>Amount</InputLabel>
//             <OutlinedInput
//                 id={`amount-${position}`}
//                 type="number"
//                 value={position.amount}
//                 onChange={(e) => handleChange(e, position)}
//                 label="Amount"
//             />
//             </FormControl>
//         </TableCell>
    
//         <TableCell>
//             <FormControl variant="outlined" fullWidth sx={{ /* your styles */ }}>
//             <InputLabel htmlFor={`kind-${position}`}>Kind</InputLabel>
//             <Select
//                 value={position.kind}
//                 onChange={(e) => handleChange(e, position)}
//                 label="Kind"
//                 inputProps={{
//                 name: 'kind',
//                 id: `kind-${position}`,
//                 }}
//             >
//                 <MenuItem value="Call">Call</MenuItem>
//                 <MenuItem value="Put">Put</MenuItem>
//                 <MenuItem value="Cash">Cash</MenuItem>
//             </Select>
//             </FormControl>
//         </TableCell>
    
//         <TableCell>
//             <FormControl fullWidth variant="outlined" sx={{ /* your styles */ }}>
//             <InputLabel htmlFor={`strike-${position}`}>Strike</InputLabel>
//             <OutlinedInput
//                 id={`strike-${position}`}
//                 type="number"
//                 value={position.strike}
//                 onChange={(e) => handleChange(e, position)}
//                 label="Strike"
//             />
//             </FormControl>
//         </TableCell>
    
//         <TableCell>
//             <TextField
//             id={`expiry-${position}`}
//             label="Expiry"
//             type="date"
//             defaultValue={position.expiryDate}
//             InputLabelProps={{
//                 shrink: true,
//             }}
//             variant="outlined"
//             fullWidth
//             onChange={(e) => handleChange(e, position)}
//             sx={{ /* your styles */ }}
//             />
//         </TableCell>
    
//         <TableCell>
//             <TextField
//             id={`volatility-${position}`}
//             label="Volatility"
//             type="number"
//             value={position.volatility}
//             variant="outlined"
//             fullWidth
//             onChange={(e) => handleChange(e, position)}
//             sx={{ /* your styles */ }}
//             />
//         </TableCell>
    
//         <TableCell style={{ verticalAlign: 'middle' }}>
//             <Typography variant="h4">
//             <strong>{position.debitCredit.toFixed(2)}</strong>
//             </Typography>
//         </TableCell>
    
        
//         {/* // Greeks */}

//             <TableCell style={{ verticalAlign: 'middle' }}>
//                 <Typography variant="h4">{position.delta.toFixed(2)}</Typography>
//             </TableCell>

//             <TableCell style={{ verticalAlign: 'middle' }}>
//                 <Typography variant="h4">{position.gamma.toFixed(2)}</Typography>
//             </TableCell>

//             <TableCell style={{ verticalAlign: 'middle' }}>
//                 <Typography variant="h4">{position.theta.toFixed(2)}</Typography>
//             </TableCell>

//             <TableCell style={{ verticalAlign: 'middle' }}>
//                 <Typography variant="h4">{position.vega.toFixed(2)}</Typography>
//             </TableCell>

//             <TableCell style={{ verticalAlign: 'middle' }}>
//                 <Typography variant="h4">{position.rho.toFixed(2)}</Typography>
//             </TableCell>
    

            
//         <TableCell align="center">
//             <Button
//             variant="contained"
//             color="error"
//             style={{ height: '50px', width: '125px' }}
//             startIcon={
//                 <DeleteIcon>
//                 <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
//                 </DeleteIcon>
//             }
//             onClick={() => removeOrder(position)}
//             >
//             Remove
//             </Button>
//         </TableCell>
//         </TableRow>