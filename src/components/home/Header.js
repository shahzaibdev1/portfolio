import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { Box, Paper, Typography, Button, Container } from "@material-ui/core";
import { Settings } from "@material-ui/icons";

import mob1bg from "../../assets/mob1bg.jpg";
import "../../fonts/_fonts.css";

const useStyles = makeStyles((theme) => ({
    "@global": {
        ".MuiTypography-h3": {
            color: theme.palette.info.dark,
        },
    },
    header: {
        height: "600px",
        position: "relative",
        overflow: "hidden",
    },

    boxContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },

    trapezium: {
        backgroundColor: theme.palette.primary.main,
        width: "200px",
        borderRadius: "50%",
        height: "200px",
        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
    },

    animatedBox: {
        backgroundColor: theme.palette.secondary.main,
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        position: "absolute",
        top: "120px",
        left: 0,
        right: 0,
        margin: "auto",
        // zIndex: -1,
    },

    animatedBox2: {
        backgroundColor: theme.palette.secondary.main,
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        position: "absolute",
        top: "70%",
        left: 0,
        right: 0,
        margin: "auto",
        // zIndex: -1,
    },

    mob1: {
        backgroundImage: `url(${mob1bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "60%",
        borderRadius: "18px",
    },

    mob1Container: {
        borderRadius: "20px",
        backgroundColor: "white",
    },

    paper1: {
        borderRadius: "20px",
        height: "100%",
    },

    textGlow: {
        fontWeight: "bold",
        textAlign: "center",
        textShadow: "0 0 3px #1976d2",
        color: theme.palette.info.dark,
    },

    desc: {
        textAlign: "center",
        color: theme.palette.info.dark,
    },

    fontWeightBold: {
        fontWeight: "bold",
    },

    mainHeading: {
        fontFamily: "membra",
        fontSize: "74px",
    },

    subHeding: {
        fontFamily: "membra",
        fontSize: "42px",
    },
}));

const Header = () => {
    const { scrollY } = useViewportScroll();
    const ref = useRef();
    const [elementTop, setElementTop] = useState(0);
    const [elementBottom, setElementBottom] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const classes = useStyles();
    const theme = useTheme();

    let yOffset = 100; // number > 0
    let easing = [0.42, 0, 0.58, 1];
    // easing = "easeInOut", // [number, number, number, number] | "linear" | "easeIn" |
    //"easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" |
    //"backInOut" | "anticipate" | EasingFunction;
    let triggerPoint = 0.1; // value between 0 and 1 (top and bottom of the window), point to start animation
    let fadeOut = false;

    useEffect(() => {
        if (!ref.current) return;

        const setValues = () => {
            setElementTop(ref.current.offsetTop);
            setElementBottom(ref.current.offsetTop + ref.current.offsetHeight);
            setClientHeight(window.innerHeight);
        };

        setValues();
        document.addEventListener("load", setValues);
        window.addEventListener("resize", setValues);

        return () => {
            document.removeEventListener("load", setValues);
            window.removeEventListener("resize", setValues);
        };
    }, [ref, yOffset]);

    const transformInitialValue = elementTop - clientHeight * triggerPoint;
    const transformFinalValue = elementTop + yOffset;

    const yRange = [transformInitialValue, transformFinalValue];

    const y = useTransform(scrollY, yRange, [0, -yOffset], easing);

    const opacityInitialValue = fadeOut ? 0 : 1;
    const opacityRange = useMemo(() => [opacityInitialValue, 1], [opacityInitialValue]);

    // const yOpacityRange = [transformInitialValue, transformFinalValue];
    const yOpacityRange = [elementBottom, transformFinalValue - yOffset];
    const opacity = useTransform(scrollY, yOpacityRange, opacityRange, "anticipate");

    return (
        <Box className={classes.header}>
            <Container>
                <Box py={10} position="relative" height="100%">
                    <Box display="flex" justifyContent="space-between">
                        <Box mr={10}>
                            <motion.div
                                dragConstraints={{ left: 0, right: 100, bottom: 0, top: 0 }}
                                whileTap={{ transition: { type: "spring", mass: 0.5, damping: 5 }, scale: 1.2 }}
                                whileHover={{ transition: { type: "spring", mass: 2, damping: 5 }, borderRadius: "30%" }}
                                drag
                                layout
                                className={classes.animatedBox2}
                            />
                            <Typography className={classes.mainHeading}>Shahzaib Umaar</Typography>
                            <Typography variant="h5" className={classes.subHeading}>
                                Mern Stack Engineer
                            </Typography>
                            <Typography>
                                I'm a MERN stack Developer in Lahore. I have serious passion for UI effects, animations and creating intuitive, dynamic user
                                experiences. Let's make something special together.
                            </Typography>
                            <motion.div
                                dragConstraints={{ left: 0, right: 100, top: 0, bottom: 0 }}
                                whileHover={{ transition: { type: "spring", mass: 1, damping: 5 }, borderRadius: "30%", rotate: 100 }}
                                whileTap={{ transition: { type: "spring", mass: 2, damping: 5 }, rotate: 150 }}
                                drag
                                layout
                                className={classes.trapezium}
                            />
                        </Box>

                        <Box display="flex" className={classes.boxContainer}>
                            <Box mr={2}>
                                <motion.div
                                    ref={ref}
                                    initial={{ y: 0 }}
                                    style={{ y, opacity }}
                                    dragConstraints={{ left: 0, right: 100, bottom: 0, top: 0 }}
                                    whileHover={{ transition: { type: "spring", mass: 2, damping: 5 }, borderRadius: "30%" }}
                                    drag
                                    layout>
                                    <Paper elevation={20} component={Box} height={500} width={250} className={classes.mob1Container}>
                                        <Paper elevation={5} className={classes.mob1}></Paper>
                                        <Box width="fit-content" mx="auto" py={4}>
                                            <Typography variant="h6" component="p" className={classes.textGlow}>
                                                Best mobile UI Apps
                                            </Typography>

                                            <Typography className={classes.desc} variant="subtitle2">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                            </Typography>
                                            <Box mx="auto" width="fit-content" py={2}>
                                                <Button color="secondary" variant="outlined" mx="auto">
                                                    See another example
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </motion.div>
                            </Box>
                            <Box ml={2}>
                                <motion.div
                                    dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
                                    whileHover={{ transition: { type: "spring", mass: 2, damping: 5 }, borderRadius: "30%" }}
                                    drag
                                    layout>
                                    <Paper elevation={20} component={Box} height={500} width={250}>
                                        <Container>
                                            <Box display="flex" justify="center" alignItems="center">
                                                <Box width="100%" mx="auto" py={4}>
                                                    <Typography variant="h4" className={classes.fontWeightBold}>
                                                        Popular Apps
                                                    </Typography>
                                                </Box>

                                                <Box width={20} height={20}>
                                                    <Settings />
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Box mb={5}>
                                                    <motion.div style={{ height: "60px" }} whileHover={{ transition: { type: "spring", mass: 2, damping: 5 }, scale: 1.2 }}>
                                                        <Paper component={Box} display="flex" alignItems="center" height="100%" bgcolor={theme.palette.info.dark} borderRadius={10}>
                                                            <Box height="90%" width={40} mx={1} bgcolor={theme.palette.warning.light} borderRadius={10} ml={1}></Box>
                                                            <Box>
                                                                <Typography>Design System</Typography>
                                                            </Box>
                                                        </Paper>
                                                    </motion.div>
                                                </Box>

                                                <Box mb={5}>
                                                    <motion.div style={{ height: "60px" }} whileHover={{ transition: { type: "spring", mass: 2, damping: 5 }, scale: 1.2 }}>
                                                        <Paper component={Box} display="flex" alignItems="center" height="100%" bgcolor={theme.palette.info.dark} borderRadius={10}>
                                                            <Box height="90%" width={40} mx={1} bgcolor={theme.palette.warning.light} borderRadius={10} ml={1}></Box>
                                                            <Box>
                                                                <Typography>Design System</Typography>
                                                            </Box>
                                                        </Paper>
                                                    </motion.div>
                                                </Box>

                                                <Box mb={5}>
                                                    <motion.div style={{ height: "60px" }} whileHover={{ transition: { type: "spring", mass: 2, damping: 5 }, scale: 1.2 }}>
                                                        <Paper component={Box} display="flex" alignItems="center" height="100%" bgcolor={theme.palette.info.dark} borderRadius={10}>
                                                            <Box height="90%" width={40} mx={1} bgcolor={theme.palette.warning.light} borderRadius={10} ml={1}></Box>
                                                            <Box>
                                                                <Typography>Design System</Typography>
                                                            </Box>
                                                        </Paper>
                                                    </motion.div>
                                                </Box>
                                            </Box>
                                        </Container>
                                    </Paper>
                                </motion.div>
                            </Box>
                        </Box>
                    </Box>
                    {/* <motion.div
                    dragConstraints={{ left: 0, right: 100, bottom: 0, top: 0 }}
                    whileTap={{ transition: { type: "spring", mass: 0.5, damping: 5 }, scale: 1.2 }}
                    whileHover={{ transition: { type: "spring", mass: 2, damping: 5 }, borderRadius: "30%" }}
                    drag
                    layout
                    className={classes.box}
                />

                <motion.div
                    dragConstraints={{ left: 0, right: 100, top: 0, bottom: 60 }}
                    whileHover={{ transition: { type: "spring", mass: 1, damping: 5 }, borderRadius: "30%", rotate: 100 }}
                    whileTap={{ transition: { type: "spring", mass: 2, damping: 5 }, rotate: 150 }}
                    drag
                    layout
                    className={classes.trapezium}
                /> */}
                </Box>
            </Container>
        </Box>
    );
};

export default Header;
