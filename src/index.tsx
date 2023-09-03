import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from "@chakra-ui/react";
import RouterComponent from "./components/RouterComponent";
import {extendTheme, withDefaultColorScheme} from '@chakra-ui/react'

const customTheme = extendTheme(withDefaultColorScheme({colorScheme: 'teal'}))


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ChakraProvider theme={customTheme}>
            <RouterComponent/>
        </ChakraProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
