import React, { useState} from "react";
import Header from "../Layout/Header/Header"
import { Outlet } from 'react-router-dom';

import classes from './RootModule.css';
import LandingPage from "./LandingPage";

const RootLayout = () => {


    return (
        <>  
            <div>
                <Outlet />
            </div>
            {/* <div className={isLanding && 'element-non-visible'}>
                <Header />
                <main>
                    <Outlet />
                </main>
            </div> */}
            
        </>
    )
}

export default RootLayout;