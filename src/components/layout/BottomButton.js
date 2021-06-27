import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import { Typography, Dialog, DialogContent, DialogTitle, Grid, DialogContentText, DialogActions, Box, createMuiTheme } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { purple, pink, red, blue, lime, orange, green, teal } from "@material-ui/core/colors";
import { ThemeContext } from "../../contexts/theme";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        transform: "translateZ(0px)",
        flexGrow: 1,
    },

    speedDial: {},

    bgTransparent: {
        backgroundColor: "transparent",
    },

    cursor: {
        cursor: "pointer",
    },
}));

const themes = {
    dark: { primary: [purple, pink, red, blue, lime, orange, green, teal], secondary: [purple, pink, red, blue, lime, orange, green, teal] },
    light: { primary: [purple, pink, red, blue, lime, orange, green, teal], secondary: [purple, pink, red, blue, lime, orange, green, teal] },
};

export default function OpenIconSpeedDial() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [themeDialog, setThemeDialog] = useState(false);

    const { theme, changeTheme } = useContext(ThemeContext);

    const handleChangeTheme = (theme) => {
        changeTheme(theme);
    };

    const createTheme = (color, type) => {
        console.log(color);
        const newTheme = createMuiTheme({ palette: { type, ...color } });
        changeTheme(newTheme);
    };

    const openThemeDialog = () => setThemeDialog(true);
    const handleCloseDialog = () => setThemeDialog(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}>
                <SpeedDialAction icon={<FileCopyIcon />} tooltipTitle="Theme" onClick={() => openThemeDialog()} />
            </SpeedDial>

            <Dialog open={themeDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Dark
                    </Typography>
                    <Box display="flex">
                        <Grid container>
                            {themes.dark.primary.map((color) => {
                                return (
                                    <Grid item className={classes.bgTransparent} key={color["A400"]}>
                                        <Box
                                            mx={1}
                                            my={1}
                                            width={20}
                                            padding={0}
                                            height={20}
                                            bgcolor={color}
                                            className={classes.cursor}
                                            onClick={() => createTheme({ primary: { main: color["A400"] } }, "dark")}></Box>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Grid container className={classes.bgTransparent}>
                            {themes.dark.secondary.map((color) => {
                                return (
                                    <Grid item key={color["A400"]}>
                                        <Box
                                            mx={1}
                                            my={1}
                                            width={20}
                                            padding={0}
                                            height={20}
                                            bgcolor={color}
                                            className={classes.cursor}
                                            onClick={() => createTheme({ secondary: { main: color["A400"] } }, "dark")}></Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>

                    <Typography variant="h4" align="center" gutterBottom>
                        Light
                    </Typography>
                    <Box display="flex">
                        <Grid container>
                            {themes.light.primary.map((color) => {
                                return (
                                    <Grid item className={classes.bgTransparent} key={color["A400"]}>
                                        <Box
                                            mx={1}
                                            my={1}
                                            width={20}
                                            padding={0}
                                            height={20}
                                            bgcolor={color}
                                            className={classes.cursor}
                                            onClick={() => createTheme({ primary: { main: color["A400"] } }, "light")}></Box>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Grid container className={classes.bgTransparent}>
                            {themes.light.secondary.map((color) => {
                                return (
                                    <Grid item key={color["A400"]}>
                                        <Box
                                            mx={1}
                                            my={1}
                                            width={20}
                                            padding={0}
                                            height={20}
                                            bgcolor={color}
                                            className={classes.cursor}
                                            onClick={() => createTheme({ secondary: { main: color["A400"] } }, "light")}></Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
