import React from 'react';
import './Footer.css';
import Link from '@mui/material/Link';

const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="Footercon">
                    <Link>
                        Privacy Policy
                    </Link>
                    <h1 className="con"> 
                        | &copy; 2022 HighRadius Corporation. All rights reserved.
                    </h1>
                </div>
            </div>
            
        </>
    )
};
export default Footer;