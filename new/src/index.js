import React from "react";
import { render } from 'react-dom';
import ThemeWrapper from "./components/ThemeWrapper.js";
import {generateUrlD2} from "./services/getUrl.service";
import { init, config } from 'd2';
//import HeaderBar from '@dhis2/d2-ui-header-bar';
import "./index.css";
import NetworkError from "./utils/networkError.component";

function Dhis2Wrapper(props){
    if (!props.d2) return null;
    return (
        <React.Fragment>
            <span id='dhis2HeaderBar'>
            
            </span>
            <br/><br/><br/>
            <ThemeWrapper/>
        </React.Fragment>
    );
}

config.baseUrl = generateUrlD2();

config.i18n.sources.add('i18n.txt');

init().then(d2 => {
    render(<Dhis2Wrapper appName={'DATIM Mechanism Finder'} d2={d2}/>, document.getElementById('root'));
}).catch(e=>{
    render(<NetworkError/>, document.getElementById('root'));
});