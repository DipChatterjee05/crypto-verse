import React from "react";
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../provider/ContextProvider";

const Header = () => {
    const useStyles = makeStyles(() => ({
        title: {
            flex: 1,
            color: "gold",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            cursor: "pointer",
        },
    }));

    const classes = useStyles();
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });


    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title} onClick={() => navigate("/")}>
                            Crypto Verse
                        </Typography>

                        <Select variant="outlined" style={{ width: 100, height: 40, marginRight: 15, }} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
