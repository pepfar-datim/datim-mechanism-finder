import React from 'react';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Main from "./Main.js";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(39, 102, 150)'
        },
    },
});

const styles = {
    wrapper: {
        margin: 'auto'
    }
};

export default function ThemeWrapper() {
    return (
        <MuiThemeProvider theme={theme}>
            <div style={styles.wrapper}>
                <Main/>
            </div>
        </MuiThemeProvider>
    );
}
