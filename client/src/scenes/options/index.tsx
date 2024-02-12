/*
  This code defines the Option Builder component, which displays option and sample strategies with live stock prices and options payoff graph.
*/

// React imports
import { useState, useEffect } from 'react';
import "../../index.css";
import { v4 as uuidv4 } from 'uuid';

// Option and Strategy imports
import OptionPosition from "./optionPosition"
import SampleOptionStrategiesText from "./sampleOptionStrategiesText"
import SampleOptionStrategies from "./sampleOptionStrategies";
import OptionPayoffGraph from "./optionPayoffGraph";

// Components imports
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  Switch,
  Typography,
  useTheme,
  Box,
  TableHead,
  TableRow,
  TableCell,
  Table,
  FormControl,
  TableBody,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  CardHeader,
  CardContent,
  CardActions
} from "@mui/material";

// Navigation and Footer
import Navbar from "@/scenes/navbar";
import Footer from "@/scenes/footer";

// API
import { useGetHistoricalQuery, useGetProfileQuery } from "@/state/yahooAPI";

// Icon imports
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';



const Options = () => {

  // Lifted state and handler function
  const [searchQuery, setSearchQuery] = useState('');
  const [ticker, setTicker] = useState('');
  const theme = useTheme();
  const { palette } = useTheme();


  // Handler for search query change
  const handleSearchChange = (query : string) => {
    setSearchQuery(query);
  };

  // Handler for ticker change
  const handleTickerChange = () => {
    setTicker(searchQuery);
  };

  // Fetching historical and profile data
  const { data: historicalData } = useGetHistoricalQuery(ticker);
  const { data: profileData } = useGetProfileQuery(ticker);

  // Extracting stock name, closing price, and date from fetched data
  const stockName = profileData?.Name;
  const closingPrice = historicalData?.closingPrices[0];
  const closingPriceDate = historicalData?.dates[0];

  const [liveData, setLiveData] = useState(false);
  const [sampleOptionText, setSampleOptionText] = useState('');
  const [currentPrice, setCurrentPrice] = useState('100');
  const [interestRate, setInterestRate] = useState('5');
  const [positions, setPositions] = useState([
    {
      id: uuidv4(),
      direction: 'Buy',
      amount: 1,
      kind: 'Call',
      strike: 100,
      expiryDate: '2024-12-31',
      volatility: 30,
      greeks: [0, 0, 0, 0, 0],
      debitCredit: 0,
    },
  ]);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Function to add a new position
  const addPosition = () => {
    const initialPosition = {
      id: uuidv4(),
      direction: 'Buy',
      amount: 1,
      kind: 'Call',
      strike: 100,
      expiryDate: '2024-12-31',
      volatility: 30,
      greeks: [0, 0, 0, 0, 0],
      debitCredit: 0,
    };
    setPositions([...positions, initialPosition]);
  }

  // Function to remove all positions
  const removeAllPositions = () => {
    setPositions(() => []);
  };

  // Function to remove a specific position
  const removePosition = (index : number) => {
    setPositions(prevPositions => {
      const updatedPositions = [...prevPositions];
      updatedPositions.splice(index, 1);
      return updatedPositions;
    });
  };

  // Handler for changing the selected sample option strategy
  const handleChangeSampleOption = (event) => {
    setPositions(prevPositions => {
      const newPositions = SampleOptionStrategies[event.target.value] || [];
      return newPositions;
    });
    setSampleOptionText(event.target.value);
  };

  // Handler for position change
  const onPositionChange = (updatedPosition, index) => {
    setPositions(prevPositions => {
      const updatedPositions = [...prevPositions];
      updatedPositions[index] = updatedPosition;
      return updatedPositions;
    });
  };

  // Handler for changing the current price
  const handleCurrentPriceChange = (event) => {
    setCurrentPrice(event.target.value);
  };

  // Handler for changing the interest rate
  const handleInterestRateChange = (event) => {
    setInterestRate(event.target.value);
  };

  // Function to toggle live data display
  const liveDataToggle = () => {
    setLiveData(!liveData);
  };

  // Effect to log positions, sample option text, and ticker when they change
  useEffect(() => {
    console.log(positions);
  }, [positions, sampleOptionText, ticker]);

  // Labels for table cells
  const tableCellLabels = [
    'Direction',
    'Amount',
    'Kind',
    'Strike',
    'Expiry',
    'Volatility',
    'Debit/Credit',
    'Delta',
    'Gamma',
    'Theta',
    'Vega',
    'Rho',
  ];

  // Calculating total greeks for all positions
  const totalGreeks = positions.reduce((accumulator, position) => {
    const positionToUpdate = positions.find(pos => pos.id === position.id);
    return accumulator.map((sum, index) => sum + (positionToUpdate ? positionToUpdate.greeks[index] : 0));
  }, [0, 0, 0, 0, 0]).map(sum => sum.toFixed(2));

    // Menu items for sample option strategies
    const menuItems = [
        { label: 'Call', disabled: true },
        { label: 'Long Call', value: 'Long Call' },
        { label: 'Short Call', value: 'Short Call' },
        { label: 'Put', disabled: true },
        { label: 'Long Put', value: 'Long Put' },
        { label: 'Short Put', value: 'Short Put' },
        { label: 'Spreads', disabled: true },
        { label: 'Bull Call Spread', value: 'Bull Call Spread' },
        { label: 'Bear Put Spread', value: 'Bear Put Spread' },
        { label: 'Straddle', disabled: true },
        { label: 'Long Straddle', value: 'Long Straddle' },
        { label: 'Short Straddle', value: 'Short Straddle' },
        { label: 'Strangle', disabled: true },
        { label: 'Long Strangle', value: 'Long Strangle' },
        { label: 'Short Strangle', value: 'Short Strangle' },
        { label: 'Butterfly', disabled: true },
        { label: 'Long Butterfly', value: 'Long Butterfly' },
        { label: 'Short Butterfly', value: 'Short Butterfly' },
        { label: 'Condor', disabled: true },
        { label: 'Long Condor', value: 'Long Condor' },
        { label: 'Short Condor', value: 'Short Condor' }
    ];
    
return (
    <>

    {/* Navbar component for search and navigation */}
    <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchTicker={handleTickerChange} selectedPage={"Options"}  />

    <Box paddingBottom="1rem">

        {/* Options Box */}
        <DashboardBox height="325px" p="0rem 1.25rem 0rem 1.25rem" overflow="auto" className="custom-scrollbar" color={palette.grey[300]}>
            
            <FlexBetween color={palette.grey[700]}>
            
                {/* Table for displaying option positions */}
                <Table aria-label="simple table">

                    <TableHead style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: "#2d2d34", borderRadius:"0rem", boxShadow: 'none' }}>
                        <TableRow style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                        
                            {/* Render table cell labels */}
                            {tableCellLabels.map((label, index) => (
                                <TableCell key={index}>
                                    <Typography variant="h3" color={theme.palette.grey[300]}>
                                        {label}
                                    </Typography>
                                </TableCell>
                            ))}

                            <TableCell component="th" scope="col">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    style={{height: '50px', width: '125px', backgroundColor: '#006400', color:theme.palette.grey[300]}}
                                    onClick={addPosition}
                                >
                                    Add Position
                                </Button>
                            </TableCell>                            
                        </TableRow>
                    </TableHead>

                    <TableBody  style={{ position: 'relative', zIndex: 0 }}>

                        {/* Map through positions to render OptionPosition components */}
                        {positions.map((position, index) => (
                        <OptionPosition key={position.id}  onRemove={() => removePosition(index)} onPositionChange={(updatedPosition) => onPositionChange(updatedPosition, index)} position={position} currentPrice={liveData? closingPrice: currentPrice} interestRate={interestRate}> </OptionPosition>
                        ))}

                        {/* Table row for displaying totals */}
                        <TableRow>
                            <TableCell align="center">
                                <Typography variant="h4" color={theme.palette.grey[300]}>Total</Typography>
                            </TableCell>

                            <TableCell align="left">
                                <Typography variant="h4" color={theme.palette.grey[300]}>{positions.length}</Typography>
                            </TableCell>

                            {/* Empty cells */}
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell />

                            {/* Display total debit/credit */}
                            <TableCell>
                                <Typography variant="h4" color={theme.palette.grey[300]}>
                                {positions.reduce((accumulator, position) => {
                                    // Use the position id to ensure the correct position is considered
                                    const positionToUpdate = positions.find(pos => pos.id === position.id);
                                    return accumulator + (positionToUpdate ? positionToUpdate.debitCredit : 0);
                                }, 0).toFixed(2)}
                                </Typography>
                            </TableCell>

                            {/* Display total greeks */}
                            {totalGreeks.map((sum, index) => (
                                <TableCell key={index}>
                                    <Typography variant="h4" color={theme.palette.grey[300]}>
                                        {sum}
                                    </Typography>
                                </TableCell>
                            ))}

                            <TableCell>
                                <Button
                                variant="contained"
                                color="error"
                                style={{height: '50px', width: '125px', color:theme.palette.grey[300]}}
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
        <Box className="custom-scrollbar" sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap:"1rem",  overflow: 'auto', p:"0rem 0rem 1rem 0rem",color:palette.grey[300]}}>
            
            {/* Stock Data  */}
            <DashboardBox sx={{ display: 'flex', flexDirection: 'column', width: '30%', marginTop: '1rem',minWidth: '300px'}}>
                
                <CardHeader
                title={

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: "0.5rem"}}>
                        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                            Stock Data
                        </Typography>
                        <Typography variant="h4" sx={{ alignItems: 'center', color:palette.grey[300]}}>
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
                                <label htmlFor="current-price">{ticker? stockName: ""} Stock Price ($)</label>
                                <TextField
                                    id="current-price"
                                    label = {ticker? "Current Price" : "Enter stock ticker."}
                                    // type="number"
                                    variant="filled"
                                    InputLabelProps={{
                                    style: { color: palette.grey[300] } // Change label color and font size
                                    }}
                                    InputProps={{
                                        style: { color: palette.grey[300] } // Change text color and background color
                                    }}
                                    fullWidth
                                    value={ticker && closingPrice}
                                    onChange={handleCurrentPriceChange}
                                />

                                <label htmlFor="interest-rate">Interest Rate (%)</label>
                                <TextField
                                    id="interest-rate"
                                    label="Interest"
                                    type="number"
                                    variant="filled"
                                    InputLabelProps={{
                                    style: { color:palette.grey[300] } // Change label color and font size
                                    }}
                                    InputProps={{
                                        style: { color: palette.grey[300] } // Change text color and background color
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
                                    style: { color:palette.grey[300] } // Change label color and font size
                                    }}
                                    InputProps={{
                                        style: { color: palette.grey[300] } // Change text color and background color
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
                                    style: { color:palette.grey[300] } // Change label color and font size
                                    }}
                                    InputProps={{
                                        style: { color: palette.grey[300] } // Change text color and background color
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
                            inputProps={{ name: 'Strategy', id: 'demo-simple-select-outlined' }}
                            MenuProps={{ PaperProps: { style: { maxHeight: '200px' } } }} // Set the maxHeight here
                        >
                            {menuItems.map((item, index) => {
                                if (item.disabled) {
                                    return <MenuItem key={index} disabled>{item.label}</MenuItem>;
                                } else {
                                    return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>;
                                }
                            })}

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
        <DashboardBox className="custom-scrollbar" sx={{ display: 'flex', flexDirection: 'column',   minWidth: '300px', overflow: 'auto', flex:"1", p:"0rem 0rem 1rem 0rem"}}>
                
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
                                    color: hoveredButton === 'my-strategies' ? 'white' : 'currentColor',
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

    <Footer />
    
    </>     
  );

};

export default Options;
