import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {Typography, useTheme, Box, TableHead, TableRow, TableCell, Table, FormControl, TableBody, InputLabel, TextField, Select, MenuItem, Button, CardHeader, CardContent  } from "@mui/material";
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../index.css";
import OptionStrategiesText from "./optionStrategiesText"
import OptionPosition from "./optionPosition";



const Options = () => {

    const { palette } = useTheme();

    const [positions, setPositions] = useState([

        {direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-26', volatility: 30, debitCredit: -10.83,},
      
    ]);

    const addPosition = () => {

        const initialPosition = {
            direction: 'Buy',
            amount: 1,
            kind: 'Call',
            strike: 100,
            expiryDate: '2024-12-26',
            volatility: 30,
            debitCredit: -10.83,
        };

        setPositions([...positions, initialPosition]);
    }

    const removeAllPositions = () => {
        
        setPositions([]);
    }

    const [sampleOption, setSampleOption] = useState('');

    const handleChangeSampleOption = (event) => {
        setSampleOption(event.target.value);
    }
    
  return (
    <>
        <DashboardBox height="325px" p="1.25rem 1.25rem 0rem 1.25rem" overflow="auto">
            
            <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
            
                <Table aria-label="simple table" className="custom-scrollbar">

                    <TableHead style={{ position: 'sticky',top: 1, zIndex: 2, backgroundColor: "solid" }}>
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
                                    onClick={addPosition}
                                >
                                    Add Position
                                </Button>
                            </TableCell>                            
                        </TableRow>
                    </TableHead>

                    <TableBody className="custom-scrollbar">

                        {positions.map((position, index) => (
                            <OptionPosition key={index} />
                        ))}

                        <TableRow>
                            <TableCell align="center">
                                <Typography variant="h4">Total</Typography>
                            </TableCell>

                            <TableCell align="center">
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
                                style={{height: '50px', width: '125px'}}
                                startIcon={
                                    <DeleteIcon>
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                    </DeleteIcon>
                                }
                                onClick={removeAllPositions}
                                >
                                Remove All
                                </Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>

            </FlexBetween>

        </DashboardBox>


        {/* Stock Data, Sample Options & Graph */}
        <Box sx={{ display: 'flex', width: '100%', gap:"1rem", padding:"0rem 0rem 1rem 0rem", color: palette.grey[300]}}>

            {/* Stock Data  */}
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
                        <Typography variant="h2" component="div" sx={{ fontWeight: 'bold'}}>
                            Stock Data
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
                        InputLabelProps={{
                            style: { color: palette.grey[300]}, // Change label color and font size
                          }}
                        fullWidth
                    />
                    <label for="interest-rate">Interest Rate (%)</label>                       
                    <TextField
                        id="interest-rate"
                        label="Interest"
                        type="number"
                        variant="filled"
                        InputLabelProps={{
                            style: { color: palette.grey[300]}, // Change label color and font size
                          }}
                        fullWidth
                    />
                    </CardContent>

                </DashboardBox>
                
                {/* Sample Options */}
                <DashboardBox sx={{ display: 'flex', flexDirection: 'column', height: '50%', minWidth: '300px' }}>
                    
                    <CardHeader
                        title={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: "1rem" }}>
                            
                            <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', flex: 1 }}>
                            Sample Options
                            </Typography>

                                
                        <FormControl sx={{
                            flex: 1,
                            '& .MuiInputLabel-root': { fontSize: '1rem', color: palette.grey[300] }, 
                            '& .MuiSelect-select': { fontSize: '1rem', color: palette.grey[200] },
                            '& fieldSet': { borderColor: palette.grey[600] },
                            }}>
                            <InputLabel htmlFor="demo-simple-select-outlined">Strategy</InputLabel>
                            <Select
                                value={sampleOption}
                                onChange={handleChangeSampleOption}
                                className="custom-scrollbar"
                                label="Strategy"
                                overflow= "auto"
                                inputProps={{ name: 'Strategy', id: 'demo-simple-select-outlined' }}
                                MenuProps={{ PaperProps: { style: { maxHeight: '200px' } } }} // Set the maxHeight here
                            >
                                <MenuItem disabled>Call</MenuItem>
                                <MenuItem value="Long Call">Long Call</MenuItem>
                                <MenuItem value="Short Call">Short Call</MenuItem>

                                <MenuItem disabled>Put</MenuItem>
                                <MenuItem value="Long Put">Long Put</MenuItem>
                                <MenuItem value="Short Put">Short Put</MenuItem>

                                <MenuItem disabled>Spreads</MenuItem>
                                <MenuItem value="Bull Call Spread">Bull Call Spread</MenuItem>
                                <MenuItem value="Bear Put Spread">Bear Put Spread</MenuItem>

                                <MenuItem disabled>Straddle</MenuItem>
                                <MenuItem value="Long Straddle">Long Straddle</MenuItem>
                                <MenuItem value="Short Straddle">Short Straddle</MenuItem>

                                <MenuItem disabled>Strangle</MenuItem>
                                <MenuItem value="Long Strangle">Long Strangle</MenuItem>
                                <MenuItem value="Short Strangle">Short Strangle</MenuItem>

                                <MenuItem disabled>Butterfly</MenuItem>
                                <MenuItem value="Long Butterfly">Long Butterfly</MenuItem>
                                <MenuItem value="Short Butterfly">Short Butterfly</MenuItem>

                                <MenuItem disabled>Condor</MenuItem>
                                <MenuItem value="Long Condor">Long Condor</MenuItem>
                                <MenuItem value="Short Condor">Short Condor</MenuItem>

                            </Select>

                        </FormControl>

                        </Box>
                        }
                        sx={{
                        textAlign: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                        }}
                    />

                    <hr style={{ fontSize: "1rem", fontWeight: "normal", width: "95%"}} />

                    {/* Option Strategy Text */}
                    {sampleOption && OptionStrategiesText[sampleOption]}

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