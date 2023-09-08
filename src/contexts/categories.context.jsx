import { createContext, useEffect } from "react";
import { useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils"; used to seed db;
// import SHOP_DATA from "../utils/shop-data"; //; used to seed db;


export const CategoriesContext = createContext({
    categories: {},
    setCategories: ()=>null
});

export const CategoriesProvider = ({children})=>{
    //USED to seed db
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(()=> {
        const getCategoriesMap = async ()=> {
            const categoryMap = await getCategoriesAndDocuments();
            setCategories(categoryMap);
            console.log(categoryMap);
        }

        getCategoriesMap();
    }, []);

    const [categories, setCategories] = useState({});

    const value = {categories, setCategories}

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}