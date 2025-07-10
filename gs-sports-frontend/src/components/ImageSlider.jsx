import React, { useState } from 'react'

function ImageSlider(props) {
    const images = props.images
    const [activeImage, setActiveImage] = useState(images[0])
    
    return (
        <div className="w-full h-full flex justify-center items-center p-2 md:p-4">
            <div className="w-full h-full flex gap-2 md:gap-4">
                {/* Left sidebar with thumbnails - responsive width */}
                <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-full flex flex-col gap-1 sm:gap-2 overflow-y-auto">
                    {images.map((image, index) => (
                        <img 
                            key={index} 
                            className={`w-full aspect-square object-cover cursor-pointer rounded border sm:border-2 transition-all duration-200 ${
                                activeImage === image 
                                    ? 'border-gray-800 opacity-100' 
                                    : 'border-gray-300 opacity-70 hover:opacity-100'
                            }`}
                            src={image} 
                            alt={`Product view ${index + 1}`}
                            onClick={() => setActiveImage(image)} 
                        />
                    ))}
                </div>
                
                {/* Main image display */}
                <div className="flex-1 h-full">
                    <img 
                        className="w-full h-full rounded sm:rounded-md" 
                        src={activeImage} 
                        alt="Selected product view" 
                    />
                </div>
            </div>
        </div>
    )
}

export default ImageSlider