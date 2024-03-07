import React, { useEffect, useState } from 'react'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import './ImageSlider.css'


function ImageSlider({url, page = 1, limit = 5}) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImage, setCurrentImage] = useState(0)

    const fetchImages =  async (imgUrl) => {
        try {
            const response = await fetch(`${url}?page=${page}&limit=${limit}`)
            const data = await response.json();
            console.log(`${url}/v2/list?page=${page}&limit=${limit}`);

            if(data) {
                setImages(data);
                setIsLoading(false)
            }
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchImages(url);
    }, [url])
    
    const handlePrevImage = () => {
        setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
    }
    
    const handleNextImage = () => {
        setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
    }

    return (
        <div>
            <div className='slider'>
                <button className='slider-left-arrow' onClick={() => handlePrevImage()}><FaArrowLeft /></button>
                {
                    isLoading ? 'Loading image. Please wait!!' : 
                        error ? `Error occurred: ${error}.` : 
                            <img
                                className='slider-image'
                                key={images[currentImage].id}
                                src={images[currentImage].download_url}
                                alt={images[currentImage].download_url}
                                title={images[currentImage].author}
                            />
                }
                <button className='slider-right-arrow' onClick={() => handleNextImage()}><FaArrowRight /></button>
            </div>
        </div>
    )
}

export default ImageSlider