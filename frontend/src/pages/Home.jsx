import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';
    

const Home = () => {
    const [categorys, setCategorys] = useState('');  
    
    useEffect(() => {
        // const url = 'https://momumiapi.quadbtech.com/api/v1/fetchAllcategories';
        const url = `${process.env.REACT_APP_API_KEY}/api/v1/fetchAllcategories`;

        const fecthData =  async () => {
            try{  
                const response = await fetch(url);
                const json = await response.json();
                if(json.msg === 'Success'){
                    // console.log("this is data",json)
                    const results = json.data.map((result) =>{
                        return ( 
                            <div className="section mb-3" style={{padding:'0 2rem'}} key={result.id}>
                                <div className="section__header mb-2">
                                    <div className='headline'>
                                        <span>{result.category_name}</span>
                                    </div>
                                    
                                    {/* <Link to="/movie">
                                        <OutlineButton className="small">View more</OutlineButton>
                                    </Link> */}
                                </div>
                                <MovieList catagaryId={result.category_id} key={result.id}/>
                                <hr/>
                            </div>
                        )
                      })
                      
                
                      setCategorys(results);
                }else{

                }
            }catch(e){
                console.log("errror", e)
            }
        }
        fecthData();
    },[]);
        
    return (
        <>
            <HeroSlide/>
            <div className="container">
                {categorys}
            </div>
        </>
    );
}

export default Home;
