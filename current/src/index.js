import React from "react";
import { render } from 'react-dom';
import Main from "./components/Main.js";
import {generateUrlD2} from "./services/getUrl.service";
import { init, config } from 'd2';
import "./index.css";
import NetworkError from "./utils/networkError.component";
import {HeaderBar} from '@dhis2/ui-widgets'
import {Provider} from '@dhis2/app-runtime'

const baseUrl = generateUrlD2();
config.baseUrl = generateUrlD2() + 'api';
config.i18n.sources.add('i18n.txt');

function Dhis2(){
    return (
        <Provider config={{baseUrl: baseUrl, apiVersion: '30'}}>
            <span id='dhis2HeaderBar'>
                <HeaderBar/>
            </span>
            <Main />
            <br/><br/><br/>
        </Provider>
    );
}

init().then(d2 => {
    render(<Dhis2 appName={'DATIM Mechanism Finder'} />, document.getElementById('root'));
}).catch(e=>{
    render(<NetworkError/>, document.getElementById('root'));
});