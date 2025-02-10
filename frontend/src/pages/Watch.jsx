import React from 'react'
import { useParams } from 'react-router-dom';
import { Img } from "react-image";
import Skeleton from 'react-loading-skeleton';

export default function Watch() {

    const { id } = useParams();



    return (
        <div className='mt-5'>
            <h1>Watch page {id}</h1>
            <Img
                src="https://image.tmdb.org/t/p/w500/1E5bAaEse26fej7uHcjOgEE2t2.jpg"
                alt='Fast-X'
                loader={
                    <Skeleton height={500} width={500} />
                }
                unloader={
                    <img
                        src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        alt="placeholder"
                        className='w-[500px] h-[500px]'
                    />
                }
                className='w-[500px] h-[500px]'
            />
        </div>
    )
}


/*
  * react-image:
    - automatically lazy loading
    - skeleton placeholder(loader)
    - fallback image(unloader)
    - multiple image sources (Automatic Fallback)

*/

// HATEOAS
