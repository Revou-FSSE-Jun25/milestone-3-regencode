import React, { useContext } from "react";
import { cartContext } from "../ClientView";


const HeaderCartModal = () => {
    let cartItems = useContext(cartContext);
    return (
        <div className="absolute bg-red h-[30vh] w-[20vw] text-white">
        { cartItems.map(() => (
            <h1> cartItems.title </h1>
        )) }
        </div>
    );
}

export default HeaderCartModal;
