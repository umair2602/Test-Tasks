import { createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: grey[500],
    },
  },
});

export default theme;
