import React, { useState } from 'react'

function ImageSlider(props) {

    const images = props.images
    const [activeImage, setActiveImage] = useState(images[0])
  return (
    <div className="w-full h-full  flex justify-center items-center">
      <div className="w-[70%] aspect-square bg-green-500 relative">

        <img className="w-full h-full object-cover" src={activeImage} alt="" />
      
        <div className="w-full h-[100px] backdrop-blur-3xl  absolute bottom-0 left-0 flex justify-center items-center">
            {
                images.map((image, index) => {
                    return(
                        <img key={index} className="h-full aspect-square mx-2 cursor-pointer" src={image} alt="" onClick={() => {
                        setActiveImage(image)
                        }} />
                    )
                })
            }
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
