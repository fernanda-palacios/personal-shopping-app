import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0E0E57',
    },
    secondary: {
      main: '#FF8A00',
      contrastText: "#fff"
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    h1: {
      // fontFamily: "Gothoic A1",
      fontStyle: 'normal',
      fontWeight: '800',
      fontSize: '40 px',
      lineHeight:'50 px'
    },
    h2: {
      // fontFamily: "Gothoic A1",
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '24 px',
      lineHeight:'30 px'
    },
    h3: {
      fontFamily: "Raleway",
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '18 px',
      lineHeight:'21 px'
    },
    h4: {
      fontFamily: "Raleway",
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '16 px',
      lineHeight:'19 px'
    },
    h5: {
      fontFamily: "Raleway",
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16 px',
      lineHeight:'19 px'
    },
    subtitle1: {
      // fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '19px'
    }
  }
});

export default theme;