import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {Switch, Typography, useTheme, Box, TableHead, TableRow, TableCell, Table, FormControl, TableBody, InputLabel, TextField, Select, MenuItem, Button, CardHeader, CardContent, CardActions  } from "@mui/material";
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../index.css";
import OptionPosition from "./optionPosition"
import SampleOptionStrategiesText from "./sampleOptionStrategiesText"
import SampleOptionStrategies from "./sampleOptionStrategies";
import { useGetHistoricalQuery, useGetProfileQuery } from "@/state/yahooAPI";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SaveIcon from '@mui/icons-material/Save';
import OptionPayoffGraph from "./optionPayoffGraph";
import { v4 as uuidv4 } from 'uuid';


type Props = {
    searchQuery: string;
}

const Options = ({ searchQuery } : Props) => {

    const { data: historicalData} = useGetHistoricalQuery(searchQuery);
    
    const { data: profileData} = useGetProfileQuery(searchQuery);

    const stockName = profileData?.Name
    const closingPrice = historicalData?.closingPrices[0];
    const closingPriceDate = historicalData?.dates[0];
    
    const { palette } = useTheme();
    const [liveData, setLiveData] = useState(false);
    const [sampleOptionText, setSampleOptionText] = useState('');
    const [currentPrice, setCurrentPrice] = useState('100');
    const [interestRate, setInterestRate] = useState('5');
    const [positions, setPositions] = useState([{id: uuidv4(), direction: 'Buy', amount: 1, kind: 'Call', strike: 100, expiryDate: '2024-12-31', volatility: 30, greeks: [0,0,0,0,0,], debitCredit: 0,},]);
    const [hoveredButton, setHoveredButton] = useState(null);


    const addPosition = () => {

        const initialPosition = {
            id: uuidv4(),
            direction: 'Buy',
            amount: 1,
            kind: 'Call',
            strike: 100,
            expiryDate: '2024-12-31',
            volatility: 30,
            greeks: [0,0,0,0,0,],
            debitCredit: 0,
        };

        setPositions([...positions, initialPosition]);
    }

    const removeAllPositions = () => {
        
        setPositions(prevPositions => []);
    };

    const removePosition = (index) => {
        setPositions(prevPositions => {
            const updatedPositions = [...prevPositions];
            updatedPositions.splice(index, 1);
            return updatedPositions;
        });
    };


    const handleChangeSampleOption = (event) => {
        setPositions(prevPositions => {
            const newPositions = SampleOptionStrategies[event.target.value] || [];
            return newPositions;
        });
        setSampleOptionText(event.target.value);
    };
    

    const onPositionChange = (updatedPosition, index) => {
        setPositions(prevPositions => {
            const updatedPositions = [...prevPositions];
            updatedPositions[index] = updatedPosition;
            return updatedPositions;
        });
    };
    

    const handleCurrentPriceChange = (event) => {
        setCurrentPrice(event.target.value);
    };
    
      const handleInterestRateChange = (event) => {
        setInterestRate(event.target.value);
    };

    const liveDataToggle = () => {
        setLiveData(!liveData);
      };

    useEffect(() => {

        console.log(positions);
        }, [positions, sampleOptionText]);

    
return (
    <>

    <Box paddingBottom="1rem">

        {/* Options Box */}
        <DashboardBox height="325px" p="1.25rem 1.25rem 0rem 1.25rem" overflow="auto">
            
            <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
            
                <Table aria-label="simple table" className="custom-scrollbar">

                    <TableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                        <TableRow style={{ position: 'sticky', top: 0, zIndex: 1 }}>
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

                    <TableBody  style={{ position: 'relative', zIndex: 0 }}>

                        {positions.map((position, index) => (
                        <OptionPosition key={position.id}  onRemove={() => removePosition(index)} onPositionChange={(updatedPosition) => onPositionChange(updatedPosition, index)} position={position} currentPrice={liveData? closingPrice: currentPrice} interestRate={interestRate}> </OptionPosition>
                        ))}

                        <TableRow>
                            <TableCell align="center">
                                <Typography variant="h4">Total</Typography>
                            </TableCell>

                            <TableCell align="left">
                                <Typography variant="h4">{positions.length}</Typography>
                            </TableCell>

                            {/* Empty cells */}
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell />

                            <TableCell>
                                <Typography variant="h4">
                                {positions.reduce((accumulator, position) => {
                                    // Use the position id to ensure the correct position is considered
                                    const positionToUpdate = positions.find(pos => pos.id === position.id);
                                    return accumulator + (positionToUpdate ? positionToUpdate.debitCredit : 0);
                                }, 0).toFixed(2)}
                                </Typography>
                            </TableCell>


                            <TableCell>
                                <Typography variant="h4">
                                {positions.reduce((accumulator, position) => {
                                    // Use the position id to ensure the correct position is considered
                                    const positionToUpdate = positions.find(pos => pos.id === position.id);
                                    return accumulator + (positionToUpdate ? positionToUpdate.greeks[0] : 0);
                                }, 0).toFixed(2)}

                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="h4">
                                {positions.reduce((accumulator, position) => {
                                    // Use the position id to ensure the correct position is considered
                                    const positionToUpdate = positions.find(pos => pos.id === position.id);
                                    return accumulator + (positionToUpdate ? positionToUpdate.greeks[1] : 0);
                                }, 0).toFixed(2)}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="h4">
                                    {positions.reduce((accumulator, position) => {
                                        // Use the position id to ensure the correct position is considered
                                        const positionToUpdate = positions.find(pos => pos.id === position.id);
                                        return accumulator + (positionToUpdate ? positionToUpdate.greeks[2] : 0);
                                    }, 0).toFixed(2)}
                                </Typography>
                            </TableCell>
                                
                            <TableCell>
                                <Typography variant="h4">
                                {positions.reduce((accumulator, position) => {
                                // Use the position id to ensure the correct position is considered
                                const positionToUpdate = positions.find(pos => pos.id === position.id);
                                return accumulator + (positionToUpdate ? positionToUpdate.greeks[3] : 0);
                                }, 0).toFixed(2)}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="h4">
                                {positions.reduce((accumulator, position) => {
                                // Use the position id to ensure the correct position is considered
                                const positionToUpdate = positions.find(pos => pos.id === position.id);
                                return accumulator + (positionToUpdate ? positionToUpdate.greeks[4] : 0);
                                }, 0).toFixed(2)}
                                </Typography>
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

        {/* Stock Data & Sample Options */}
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap:"1rem",  overflow: 'auto', p:"0rem 0rem 1rem 0rem"}}>
            
            {/* Stock Data  */}
            <DashboardBox sx={{ display: 'flex', flexDirection: 'column', width: '30%', marginTop: '1rem',minWidth: '300px'}}>
                
                <CardHeader
                title={

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: "0.5rem"}}>
                        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                            Stock Data
                        </Typography>
                        <Typography variant="h4" sx={{ alignItems: 'center', }}>
                            {liveData && closingPriceDate}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center'}} >
                        <Typography variant="body1" sx={{ marginRight: '0.1rem' }}>
                        Live Data
                        </Typography>
                        <Switch checked={liveData} onChange={liveDataToggle} />
                    </Box>

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
                {liveData?  
                            <CardContent>
                                <label htmlFor="current-price">{searchQuery? stockName: ""} Stock Price ($)</label>
                                <TextField
                                    id="current-price"
                                    label = {searchQuery? "Current Price" : "Enter stock ticker."}
                                    // type="number"
                                    variant="filled"
                                    InputLabelProps={{
                                    style: { color: 'grey' } // Change label color and font size
                                    }}
                                    fullWidth
                                    value={searchQuery && closingPrice}
                                    onChange={handleCurrentPriceChange}
                                />

                                <label htmlFor="interest-rate">Interest Rate (%)</label>
                                <TextField
                                    id="interest-rate"
                                    label="Interest"
                                    type="number"
                                    variant="filled"
                                    InputLabelProps={{
                                    style: { color: 'grey' } // Change label color and font size
                                    }}
                                    fullWidth
                                    value={interestRate}
                                    onChange={handleInterestRateChange}
                                />
                            </CardContent>
                                : 
                            <CardContent>
                                <label htmlFor="current-price">Current Stock Price ($)</label>
                                <TextField
                                    id="current-price"
                                    label="Current Price"
                                    type="number"
                                    variant="filled"
                                    InputLabelProps={{
                                    style: { color: 'grey' } // Change label color and font size
                                    }}
                                    fullWidth
                                    value={currentPrice}
                                    onChange={handleCurrentPriceChange}
                                />

                                <label htmlFor="interest-rate">Interest Rate (%)</label>
                                <TextField
                                    id="interest-rate"
                                    label="Interest"
                                    type="number"
                                    variant="filled"
                                    InputLabelProps={{
                                    style: { color: 'grey' } // Change label color and font size
                                    }}
                                    fullWidth
                                    value={interestRate}
                                    onChange={handleInterestRateChange}
                                />
                            </CardContent>}
            </DashboardBox>
            
            
            {/* Sample Options */}
            <DashboardBox sx={{ display: 'flex', flexDirection: 'column', width: '70%', marginTop: '1rem', minWidth: '300px', overflow:"auto", flex:"1" }}>
                
                <CardHeader
                    title={
                    <Box sx={{ display: 'flex', justifyContent: 'justify-between', alignItems: 'center', gap: "1rem" }}>
                        
                        <Typography display="flex" variant="h2" component="div" sx={{ fontWeight: 'bold', flex: 1 }}>
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
                            value={sampleOptionText}
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

                <hr style={{ fontSize: "1rem", fontWeight: "normal", width: "98%"}} />

                {/* Option Strategy Text */}
                <Box sx={{ display: 'flex', padding: "0rem 1rem 0rem 1rem"}}>
                {sampleOptionText && SampleOptionStrategiesText[sampleOptionText]}
                </Box>
                

            </DashboardBox>

        </Box>

        {/* Payoff Graph */}
        <DashboardBox sx={{ display: 'flex', flexDirection: 'column',   minWidth: '300px', overflow: 'auto', flex:"1", p:"0rem 0rem 1rem 0rem"}}>
                
                <CardHeader
                    title={
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: "0.5rem"}}>
                            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                Payoff Graph
                            </Typography>
                        
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            
                        <Button
                                className="MuiButtonBase-root MuiButton-root MuiButton-outlined jss2"
                                tabIndex={0}
                                type="button"
                                variant="outlined"
                                //onClick={handleClick}
                                startIcon={<AutoGraphIcon fontSize="large" />}
                                onMouseEnter={() => setHoveredButton('my-strategies')}
                                onMouseLeave={() => setHoveredButton(null)}
                                style={{
                                    backgroundColor: hoveredButton === 'white',
                                    color: hoveredButton === 'my-strategies' ? 'white' : 'currentColor'
                                    }}
                                >
                                My Strategies
                            </Button>

                            <Button
                                className="MuiButtonBase-root MuiButton-root MuiButton-outlined jss2"
                                tabIndex={0}
                                type="button"
                                variant="outlined"
                                //onClick={handleClick}
                                startIcon={<SaveIcon fontSize="large" />}
                                onMouseEnter={() => setHoveredButton('save-strategy')}
                                onMouseLeave={() => setHoveredButton(null)}
                                style={{
                                    backgroundColor: hoveredButton === 'white',
                                    color: hoveredButton === 'save-strategy' ? 'white' : 'currentColor'
                                    }}
                                >
                                Save Strategy
                            </Button>
                        </Box>

                    </Box>
                    }
                    sx={{
                        textAlign: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    />
                    <hr style={{ fontSize: "1rem", fontWeight: "normal", width: "98%"}} />

                    <OptionPayoffGraph options={positions} currentPrice={liveData ? closingPrice : currentPrice} />

        </DashboardBox>

    </Box>
    
    </>     
  );

};

export default Options;

