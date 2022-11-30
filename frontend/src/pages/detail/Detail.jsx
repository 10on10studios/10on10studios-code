import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReactPlayer from "react-player";


import './detail.scss';


import MovieList from '../../components/movie-list/MovieList';

import ReactReadMoreReadLess from "react-read-more-read-less";

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const onLoadedData = () => {
        setIsVideoLoaded(true);
    };
    useEffect(() => {
        const url = `https://momumiapi.quadbtech.com/api/v1/fetchSinglevideo/${id}`;
        const getDetail = async () => {
            const response = await fetch(url);
            const json = await response.json();
            setItem(json);
            window.scrollTo(0, 0);
        }
        getDetail();
    }, [id]);

    // console.log(item);
    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{ backgroundImage: `url(${item.data.thumbnail})` }}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${item.data.thumbnail})` }}></div>
                            </div>
                            <div className="movie-content__info">
                                <h2 className="title">
                                    {item.data.video_title || item.data.video_title}
                                </h2>
                                <div className="genres">
                                    <span className='genres__item'>{item.data.category.category_name} </span>
                                </div>
                                <p className="overview"
                                >
                                    <ReactReadMoreReadLess
                                        readMoreclassName="readMoreclassName"
                                        charLimit={200}
                                        readMoreText={". . . . .Read more ▼"}
                                        readLessText={". . . . Read less ▲"}
                                    >
                                        {item.data.description}
                                    </ReactReadMoreReadLess>
                                </p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <div className="video">
                                    <ReactPlayer
                                        // Disable download button
                                        config={{ file: { attributes: { controlsList: 'nodownload' } } }}

                                        // Disable right click
                                        onContextMenu={e => e.preventDefault()}
                                        url={item.data.video_src}
                                        playing={true}
                                        controls={true}
                                        loop={true}

                                        playsinline={true}
                                        width={'100%'}
                                        height={'70%'}
                                        onReady={onLoadedData}
                                    />
                                </div>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" catagaryId={item.data.category.category_id} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
