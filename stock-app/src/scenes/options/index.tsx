import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {Typography, useTheme, Box, TableHead, TableRow, TableCell, Table, FormControl, TableBody, InputLabel,
    OutlinedInput, TextField, Select, MenuItem, Button, CardHeader, CardContent  } from "@mui/material";
import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';


const Options = () => {

    //const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
    const { palette } = useTheme();


    const [direction, setDirection] = useState<string>('Buy');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setDirection(event.target.value as string);
    };


    const [amount, setAmount] = useState<number>(1);
    const [strike, setStrike] = useState<number>(100);
    

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };

    const handleStrikeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStrike(parseInt(event.target.value));
    };


    const [expiryDate, setExpiryDate] = useState<string>("2024-12-26");
    const [volatility, setVolatility] = useState<number>(30);
    const debitCredit = -10.83; // Assuming this is a static value

    const handleExpiryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpiryDate(event.target.value);
    };

    const handleVolatilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolatility(parseFloat(event.target.value));
    };

    const values = [-41.43, 1.30, -1.32, 38.93, -52.16];


  return (
    <>
        <DashboardBox height="325px" p="1.25rem 1.25rem 0rem 1.25rem" >
            <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
            
                <Table aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h3">Direction</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Amount</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Kind</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Strike</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Expiry</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Volatility</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Debit/Credit</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Delta</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Gamma</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Theta</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Vega</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h3">Rho</Typography>
                            </TableCell>
                            <TableCell component="th" scope="col">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    style={{height: '50px', width: '125px', backgroundColor: '#006400'}}

                                >
                                    Add Position
                                </Button>
                            </TableCell>                            
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        <TableRow>

                            <TableCell>
                                <FormControl variant="outlined" fullWidth sx={{
                                '& .MuiInputLabel-root': { fontSize: '1rem' }, // Larger font for InputLabel
                                '& .MuiSelect-select': { fontSize: '1rem' },   // Larger font for Select
                                }}>
                                    <InputLabel htmlFor="demo-simple-select-outlined">Direction</InputLabel>
                                    <Select
                                        value={direction}
                                        onChange={handleChange}
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
                                '& .MuiInputLabel-root': { fontSize: '1rem' }, // Larger font for InputLabel
                                '& .MuiOutlinedInput-input': { fontSize: '1rem' },   // Larger font for Select
                                }}>
                                    <InputLabel htmlFor="outlined-amount">Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-amount"
                                        type="number"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        label="Amount"
                                        
                                    />
                                </FormControl>
                            </TableCell>

                            <TableCell>
                                {/* Assuming "Kind" is a static field */}
                                <TextField
                                    id="outlined-kind"
                                    label="Kind"
                                    defaultValue="Put"
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        '& .MuiInputLabel-root': { fontSize: '1rem' },       // Larger font for Label
                                        '& .MuiOutlinedInput-input': { fontSize: '1rem' },   // Larger font for Input
                                      }}
                                />
                            </TableCell>

                            <TableCell>
                                <FormControl fullWidth variant="outlined" sx={{
                                    '& .MuiInputLabel-root': { fontSize: '1rem' },       // Custom font size for Label
                                    '& .MuiOutlinedInput-input': { fontSize: '1rem' },   // Custom font size for Input
                                }}>
                                    <InputLabel htmlFor="outlined-strike">Strike</InputLabel>
                                    <OutlinedInput
                                        id="outlined-strike"
                                        type="number"
                                        value={strike}
                                        onChange={handleStrikeChange}
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
                                    onChange={handleExpiryChange}
                                    sx={{
                                        '& .MuiInputLabel-root': { fontSize: '1rem' },       // Custom font size for Label
                                        '& .MuiOutlinedInput-input': { fontSize: '1rem' },   // Custom font size for Input
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
                                    onChange={handleVolatilityChange}
                                    sx={{
                                    '& .MuiInputLabel-root': { fontSize: '1rem' },       // Custom font size for Label
                                    '& .MuiOutlinedInput-input': { fontSize: '1rem' },   // Custom font size for Input
                                    }}
                                />
                            </TableCell>

                            <TableCell style={{ verticalAlign: "middle" }}>
                                <Typography variant="h4"><strong>{debitCredit.toFixed(2)}</strong></Typography>
                            </TableCell>
                            

                            {values.map((value, index) => (
                                <TableCell key={index} style={{ verticalAlign: "middle" }}>
                                    <Typography variant="h4">
                                        {value.toFixed(2)}
                                    </Typography>
                                </TableCell>
                            ))}

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
                                >
                                    Remove
                                </Button>
                                </TableCell>        

                    
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <Typography variant="h4">Total</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h4">3</Typography>
                            </TableCell>
                            {/* Empty cells */}
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell>
                                <Typography variant="h4">-36.40</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h4">75.67</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h4">3.91</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h4">-5.03</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h4">116.66</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h4">39.10</Typography>
                            </TableCell>
                            <TableCell>
                                <Button
                                variant="contained"
                                color="error"
                                style={{height: '50px', width: '150px'}}
                                startIcon={
                                    <DeleteIcon>
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                    </DeleteIcon>
                                }
                                >
                                Remove All
                                </Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>

            </FlexBetween>

        </DashboardBox>


        <Box sx={{ display: 'flex', width: '100%', gap:"1rem"}}>

            <Box sx={{ display: 'flex', width: '25%', height:"800px", gap:"1rem", flexDirection: 'column'}}>
                <DashboardBox 
                    sx={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        height: '50%', 
                        marginTop: '1rem',
                        minWidth: '300px'
                    }}
                >
                    <CardHeader
                    title={
                        <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}
                        >
                        <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', color:'#FFFFFF'}}>
                            Stock Data
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="div">
                            12-27-2023
                        </Typography>
                        </Box>
                    }
                    sx={{
                        textAlign: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    />
                    <CardContent>
                    <label for="current-price">Current Stock Price ($)</label>                       
                    <TextField
                        id="current-price"
                        label="Current Price"
                        type="number"
                        variant="filled"
                        fullWidth
                    />
                    <label for="interest-rate">Interest Rate (%)</label>                       
                    <TextField
                        id="interest-rate"
                        label="Interest"
                        type="number"
                        variant="filled"
                        fullWidth
                        sx={{ marginTop: '1rem' }}
                    />
                    </CardContent>

                </DashboardBox>

                <DashboardBox 
                    sx={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        height: '50%', 
                        minWidth: '300px'
                    }}
                >
                    <h1>Greeks</h1>
                </DashboardBox>
            </Box>

            <DashboardBox
                sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '788px', 
                    width: '75%', // Adjusted to 70% of the parent container
                    marginTop: '1rem',
                    minWidth: '300px'
                }}
            >
                <h1>Graph</h1>
            </DashboardBox>
        </Box>


        
    </>     
  );

};

export default Options;