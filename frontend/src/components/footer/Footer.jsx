import React from 'react';

import './footer.scss';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer-background.jpg';
// import style1 from '../../assets/feauture-blog-1.png';
// import style2 from '../../assets/feauture-blog-2.png';
// import style3 from '../../assets/feauture-blog-3.png';
// import style5 from '../../assets/feauture-blog-4.png';
import logo from '../../assets/logo1.gif';

const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <div className='logoicon'>
                            <img src={logo} alt="" />
                        </div>
                        
                        <Link to="/"><span className="logostyle"><span style={{color:'#f4cb15'}}>C</span>hannel <span style={{color:'#f4cb15'}}>H</span>ub</span></Link>
                    </div>
                </div>
                {/* <div className='blog1'>
                        <img src={style1} alt=""/>
                    </div>
                    <div className='blog2'>
                        <img src={style2} alt=""/>
                    </div> */}
                <div className="footer__content__menus">
                    
                    <div className="footer__content__menu">
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of services</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
