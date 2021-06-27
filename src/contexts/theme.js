import { createMuiTheme, useMediaQuery } from "@material-ui/core";
import { createContext, useMemo, useState } from "react";

export const ThemeContext = createContext(
    createMuiTheme({
        palette: {
            type: "dark",
        },
    })
);

export default function ThemeChanger(props) {
    const [theme, setTheme] = useState({});

    const changeTheme = (newTheme) => {
        if (newTheme) {
            setTheme(newTheme);
            console.log(newTheme)
            localStorage.setItem("theme", JSON.stringify(newTheme));
        } else {
            if (theme.palette.type === "dark") {
                localStorage.setItem("theme", { palette: { type: "light" } });
                setTheme(
                    createMuiTheme({
                        palette: {
                            type: "light",
                        },
                    })
                );
            } else {
                localStorage.setItem("theme", { palette: { type: "dark" } });

                setTheme(
                    createMuiTheme({
                        palette: {
                            type: "dark",
                        },
                    })
                );
            }
        }
    };

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    useMemo(() => {
        if (localStorage.getItem("theme")) {
            console.log(localStorage.getItem("theme"));
            setTheme(createMuiTheme(JSON.parse(localStorage.getItem("theme"))));
        } else {
            setTheme(
                createMuiTheme({
                    palette: {
                        type: prefersDarkMode ? "dark" : "light",
                    },
                })
            );
        }
    }, [prefersDarkMode]);

    return <ThemeContext.Provider value={{ theme, changeTheme }}>{props.children}</ThemeContext.Provider>;
}
