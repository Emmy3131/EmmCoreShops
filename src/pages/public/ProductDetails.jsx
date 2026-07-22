import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ProductDetailsCard from "../../component/Products/ProductDetailsCard";
import ProductReviews from "../../component/Products/ProductReviews";

import api from "../../library/api";


const ProductDetails = () => {

  const { id } = useParams();


  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [cartLoading, setCartLoading] = useState(false);




  /*
  ===============================
  FETCH PRODUCT
  ===============================
  */

  const fetchProduct = async () => {

    try {

      setLoading(true);


      const res = await api.get(
        `/products/${id}`
      );


      if(res.data.status === "success"){

        setProduct(
          res.data.data
        );

      }


    } catch(error){

      console.log(
        "Fetch product error:",
        error.response?.data ||
        error.message
      );


    } finally {

      setLoading(false);

    }

  };





  useEffect(()=>{

    if(id){
      fetchProduct();
    }

  },[id]);







  /*
  ===============================
  ADD TO CART
  ===============================
  */


  const handleAddToCart = async()=>{


    try{


      setCartLoading(true);



      await api.post(
        "/cart",
        {
          productId: product._id,
          quantity:1,
        }
      );



      alert(
        "Added to cart 🛒"
      );



    }catch(error){


      console.log(
        error.response?.data ||
        error.message
      );


      alert(
        "Failed to add product"
      );


    }finally{


      setCartLoading(false);


    }

  };









  /*
  ===============================
  SCROLL TO REVIEW SECTION
  ===============================
  */


  const scrollToReviews = ()=>{

    const reviewSection =
      document.getElementById(
        "reviews"
      );


    if(reviewSection){

      reviewSection.scrollIntoView({
        behavior:"smooth",
        block:"start",
      });

    }

  };









  if(loading){

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        text-gray-500
        "
      >

        Loading product...

      </div>

    );

  }






  if(!product){

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        "
      >

        Product not found

      </div>

    );

  }








  return (

    <div
      className="
      bg-gray-50
      min-h-screen
      py-8
      px-4
      md:px-8
      space-y-10
      "
    >



      {/* PRODUCT INFORMATION */}


      <ProductDetailsCard

        product={product}

        loading={cartLoading}

        onAddToCart={
          handleAddToCart
        }


        onReviewClick={
          scrollToReviews
        }

      />







      {/* PRODUCT REVIEWS */}


      <ProductReviews

        productId={
          product._id
        }

      />





    </div>

  );

};


export default ProductDetails;