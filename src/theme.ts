import createTheme from "@mui/material/styles/createTheme";
import grey from '@mui/material/colors/grey';
import green from '@mui/material/colors/green';
import red from "@mui/material/colors/red";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#e41c23",
      light: red[200]
    },
    secondary: {
      main: grey[500],
      light: "#9e9e9e"
    },
    success: {
      main: green["A700"],
      light: green[200]
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    background: {
      default: '#ffffff',
    },
  },
})

export default theme