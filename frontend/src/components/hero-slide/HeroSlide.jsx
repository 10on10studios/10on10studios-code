import React, { useState, useEffect } from 'react';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';


import Button, { OutlineButton } from '../button/Button';

import './hero-slide.scss';
import { useHistory } from 'react-router';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);
    SwiperCore.use([Navigation]);
    SwiperCore.use([Pagination]);
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const url = `${process.env.REACT_APP_API_KEY}/api/v1/fetchAllvideo`;
            try{  
                const response = await fetch(url);
                const json = await response.json(); 
                if(json.msg === 'Success'){
                    // console.log("this is data",json)
                    const results = json.data.map((result) =>{
                        return ( 
                            result
                        )
                      })
                      setMovieItems(results.slice(0, 11));
                }else{

                }
            }catch(e){
                console.log("errror", e)
            }
        }
        getMovies();
    }, []);
    // console.log(movieItems)
    return (
        <div className="hero-slide">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={true}
                autoplay={{delay: 8000}}
               
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/* {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            } */}
        </div>
    );
}

const HeroSlideItem = props => {

    let hisrory = useHistory();

    const item = props.item;

    const background = item.thumbnail;

    return (
        <div 
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`, cursor:'pointer'}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h6 className="title">{item.video_title}</h6>
                    {/* <div className="overview">{item.description}</div> */}
                    <div className="btns">
                        <Button onClick={() => hisrory.push('/movie/' + item.video_id)}>
                            Watch now
                        </Button>
                        {/* <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton> */}
                    </div>
                </div>
                <div className="hero-slide__item__content__poster" onClick={() => hisrory.push('/movie/' + item.video_id)}>
                    <img src={background} alt="" />
                </div>
            </div>
        </div>
    )
}


export default HeroSlide;
