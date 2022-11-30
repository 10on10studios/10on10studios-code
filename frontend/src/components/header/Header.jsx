import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';

import Metamask from '../metamask/metamask';

// import logo from '../../assets/logo1.gif';

import logo from '../../assets/Asset 5@500x.png';

// import logo from '../../assets/Asset 4@500x.png';




const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Videos',
        path: '/videos'
    },
    // {
    //     display: 'TV Series',
    //     path: '/tv'
    // },
    // {
    
    //     display: 'Contact Us.',
    //     path: '/contuct'
    // }
];

const Header = () => {

    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <div className='logoicon'>
                    <img src={logo} alt="" />
                    </div>
                    
                    <Link to="/">
                        <span className='logostyle'><span className='logoSpan'>10</span>ON <span className='logoSpan1'>10</span>STUDIOS</span>
                        </Link>
                </div>
                
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                    
                                </Link>
                                
                            </li>
                            
                        ))
                        
                    }
                </ul>
                    <Metamask/>
                
            </div>
        </div>
    );
}

export default Header;
