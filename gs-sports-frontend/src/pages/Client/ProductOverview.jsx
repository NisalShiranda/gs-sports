import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/Loader';
import ImageSlider from '../../components/ImageSlider';
import getCart, { addToCart } from '../../../utils/Cart';

function ProductOverview() {

    const params = useParams();
    
    if(params.id == null){
        toast.error("Product ID not found")
        window.location.href = "/products"
    }

    const [product,setProduct] = useState(null)
    const [status, setStatus] = useState("loading") // loaded, error
    const navigate = useNavigate();

    useEffect(() => {
        if(status == "loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then((res) => {
                console.log(res.data.product)
                setProduct(res.data.product)
                setStatus("loaded")
            }).catch(() => {
                setStatus("error")
                toast.error("Error loading product")
            })
        }
    }, [status])



  return (
    <div className="w-full h-full p-[40px]">
        {
            status == "loading" && <Loader />
        }
        {
            status == "loaded" && 
            <div className="w-full h-full flex">
                <div className="w-[50%]  h-full">
                    <ImageSlider images={product.images} />
                </div>
                <div className="w-[50%]  h-full ">
                    <h1 className="font-bold text-center text-3xl">{product.name}</h1>
                    <p className="text-center text-md text-gray-500">{product.altNames.join(" | ")}</p>
                    <div>
                        {
                            product.labeledPrice>product.price?
                            <div className="flex justify-center items-center space-x-2">
                                <h1 className="text-2xl font-bold text-red-500">LKR: {product.price.toFixed(2)}</h1>
                                <h1 className="text-md font-bold text-gray-500 line-through">LKR: {product.labeledPrice.toFixed(2)}</h1>
                            </div>
                            :
                            <h1 className="text-2xl font-bold text-red-500 text-center">LKR: {product.price.toFixed(2)}</h1>
                        }
                    </div>
                    <p className="text-center">{product.descriprion}</p>
                    <div className="w-full flex justify-center items-center space-x-4 mt-[20px]">
                        <button className="bg-yellow-500 p-3 rounded-xl cursor-pointer w-[200px] h-[50px]" onClick={() => {
                            addToCart(product, 1)
                            toast.success("Product added to cart")
                            console.log(getCart())
                        }}>Add to Cart</button>

                        <button className="bg-yellow-500 p-3 rounded-xl cursor-pointer w-[200px] h-[50px]" onClick={() => {
                            navigate("/checkout", {
                              state: {
                                items: [
                                  {
                                    productID: product.productID,
                                    name: product.name,
                                    altNames: product.altNames,
                                    price: product.price,
                                    labeledPrice: product.labeledPrice,
                                    image: product.images[0],
                                    quantity: 1,
                                  },
                                ],
                              },
                            });  
                        }}>Buy Now</button>
                    </div>
                </div>
            </div>
        }
        {
            status == "error" && <div className="w-full h-full flex justify-center items-center"><h1 className="text-2xl text-red-500">Error loading product</h1></div>
        }
    </div>
     
  )
}

export default ProductOverview
