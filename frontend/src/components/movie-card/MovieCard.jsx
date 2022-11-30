import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {
    // console.log(props.item)
    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.video_id;

    const bg = item.thumbnail;

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h4>{item.video_title || item.video_title} </h4>
        </Link>
    );
}

export default MovieCard;
