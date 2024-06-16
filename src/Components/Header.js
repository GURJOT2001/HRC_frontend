import React from 'react';
import './Header.css';
import ABClogo from './img/ABClogo.png';
import HRClogo from './img/HRClogo.svg';
import EnhancedTable from './Table';
import Footer from './Footer';
const Header = () => {
    return (
        <>
            <div className="Header">
                <div className="Container">
                    <div className="ABCLogo">
                        <img src={ABClogo} alt="Logo1"/>
                    </div>
                </div>
                <div className="HRCLogo">
                    <img src={HRClogo} alt="Logo2"/>
                </div>
                
                <div>
                    <EnhancedTable/>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
            
        </>
    )
};
export default Header;