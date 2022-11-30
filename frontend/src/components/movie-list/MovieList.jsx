import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/components/navigation/navigation.scss';


import MovieCard from '../movie-card/MovieCard';

const MovieList = props => {

    SwiperCore.use([Navigation]);
   

    const [items, setItems] = useState();

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_KEY}/api/v1/fetchSinglecategories/${props.catagaryId}`;
        const getList = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                if (json.msg === 'Success') {
                    const results = json.data.shows.map((result) => {
                        return (<SwiperSlide key={result.id}>
                            <MovieCard item={result} category={props.category} key={result.id}/>
                        </SwiperSlide>                                
                        );
                    });


                    setItems(results);
                } else {

                }

            } catch (e) {
                console.log("errror", e)
            }

        }
        getList();
    }, []);
    $('#movieList .swiper-button-prev').css('top', '39%');
    $('#movieList .swiper-button-next').css('top', '39%');
    return (
        <div className="movie-list" id='movieList'>
            <Swiper
                modules={[Navigation]}
                grabCursor={true}
                spaceBetween={20}
                slidesPerView={'auto'}
                navigation={true}
            >
                {items}
            </Swiper>
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList;
