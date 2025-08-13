import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets.js";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$'
    const delivery_fee = 10; 
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemid, size) => {

        if (!size) {
            toast.error("Select Product Size");
        }

        //Cloning 
        let cartData = structuredClone(cartItems);

        if (cartData[itemid]) {
            if (cartData[itemid][size]) {
                cartData[itemid][size] += 1;
            } else {
                cartData[itemid][size] = 1;
            }
        } else {
            cartData[itemid] = {};
            cartData[itemid][size] = 1;
        }

        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;

        Object.values(cartItems).forEach(category => {
            Object.values(category).forEach(quantity => {
                if (quantity > 0) {
                    totalCount += quantity;
                }
            });
        });

        return totalCount;
    }


    const value = {
        products, currency, delivery_fee, search, showSearch, setSearch, setShowSearch, cartItems, addToCart, getCartCount
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
