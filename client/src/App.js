import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";


function App() {

  const mode = useSelector((state) => state.global.mode) //accessing the data from redux store
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]) //useMemo is used for Memoisation

  return (
    <div className="app">
      <ThemeProvider theme={theme}> {/*: Provides this theme to all nested components */}
        <CssBaseline /> {/*  Resets default browser styling (optional but commonly used) */}
      </ThemeProvider>
      
    </div>
  );
}

export default App;
