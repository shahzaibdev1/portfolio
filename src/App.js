import React, { useContext } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { motion } from "framer-motion";
import { Box } from "@material-ui/core";
import "@fontsource/roboto";

import "./App.css";
import { ThemeContext } from "./contexts/theme";
import AppBar from "./components/layout/Navbar";
import OpenIconSpeedDial from "./components/layout/BottomButton";
import Header from "./components/home/Header";

function App() {
    const theme = useContext(ThemeContext);

    return (
        <ThemeProvider theme={theme.theme}>
            <CssBaseline />

            <div className="App">
                <motion.div drag layout dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                    <AppBar />
                </motion.div>
                <Header />
                <OpenIconSpeedDial />
                <Box py={10}></Box>
            </div>
        </ThemeProvider>
    );
}

export default App;
