import React, { useState, useEffect, useCallback } from 'react';


import './movie-grid.scss';
import { SwiperSlide, Swiper } from 'swiper/react';

// import { category, movieType, tvType } from '../api/tmdbApi';

import MovieCard from '../movie-card/MovieCard';


const MovieGrid = props => {

   

    const [categorys, setCategorys] = useState('');
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        // const url = 'https://momumiapi.quadbtech.com/api/v1/fetchAllcategories';
        const url = `${process.env.REACT_APP_API_KEY}/api/v1/fetchAllvideo`;

        const fecthData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                // console.log(json);
                if (json.msg === 'Success') {
                    // console.log("this is data",json)
                    const results = json.data.map((result) => {
                        // console.log(result)
                        return (
                            <>
                           
                                <SwiperSlide key={result.id} className='swiperslide' style={{ padding: '33px 16px' }} >
                                    <MovieCard item={result} category={props.category} key={result.id}/>
                                </SwiperSlide>
                                {/* {
                                    page < totalPage ? (
                                        <div className="movie-grid__loadmore">
                                            <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                                        </div>
                                    ) : null
                                }     */}
                                
                            </>
                        )
                    })


                    setCategorys(results);
                } else {

                }
            } catch (e) {
                console.log("errror", e)
            }
        }
        fecthData();
    }, []);


    return (<div className='movie-list'>
        <div className="container">
            <div className="row justify-content-md-center">
                {/* <input type="text" placeholder="Search.." name="search" />
                <button type="submit"> Search<i className="fa fa-search"></i></button> */}

                {categorys}
            </div>
        </div>
    </div>
    )
}

export default MovieGrid;
