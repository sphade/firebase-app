import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "hind, san-serif",
    },
  },
  palette: {
   
    secondary: {
      main: "#fd1414",
      // contrastText: '#e50adar',
      // light: '#0d93b4r',
      // dark:'#e78742r'


    },
    contrastThreshold: 3,
  tonalOffset:.1
  },

  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {},
      },
    },

    MuiButton: {
      variants: [
        {
          props: {
            variant: "dashed",
          },
          style: {
            border: "0px",
            background: 'red',

          },
        },
      ],
      defaultProps: {
        disableElevation: true,
        size: "large",
        variant: "contained",
      },
      styleOverrides: {
        sizeLarge: {
          fontWeight: "bolder",
          padding: "11px 14px",
        },
        
        containedPrimary: {
          background: "#FF481A",
          borderRadius: "6px",
          ":hover": {
            background: "#e94016",
          },
        },

      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: "red",
          borderRadius: "20px",
        },
      },
    },

    MuiTableCell: {
      defaultProps: {
        align: "right",
        padding: "normal",
      },
      styleOverrides: {
        head: {
          color: "GrayText",
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      },
    },
  },
});
