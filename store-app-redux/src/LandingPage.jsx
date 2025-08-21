import React from 'react'
import HeroSection from "./HeroSection.jsx";
import ProductSection from "./ProductSection.jsx";
import TopSelling from "./TopSelling.jsx";
// import {useDispatch, useSelector} from "react-redux";
// import {increment, decrement, GetAllProducts} from "./features/Product/productSlice.js";


function LandingPage() {

// const dispatch = useDispatch();
// const {products ,value} = useSelector((state)=> state.counter)
//     console.log(products)


    return (
        <div>

            <HeroSection/>
            <ProductSection/>
            <TopSelling/>

            {/*<div className={"w-100 h-100 border border-red-500"}>*/}
            {/*   <h1> {value}</h1>*/}

            {/*    <button className={"text-2xl p-4 bg-green-500"} onClick={()=> dispatch(increment())}>+</button>*/}
            {/*    <button className={"text-2xl p-4 bg-purple-500"} onClick={()=> dispatch(decrement())}>-</button>*/}
            {/*    <button className={"text-2xl p-4 bg-purple-500"} onClick={()=> dispatch(GetAllProducts())}>Async but</button>*/}

            {/*    <div className={"w-100 h-100 border border-red-500"}>*/}
            {/*        {products.length > 0 ?  products?.map(item => (<h1>{item.name}</h1>)) : <h1>Loading ....</h1>}*/}

            {/*    </div>*/}


            {/*</div>*/}

        </div>

    )
}

export default LandingPage
