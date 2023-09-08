import { CATEGORIES_ACTION_TYPES } from "./categories.type"
import { createAction } from "../../utils/reducer/reducer.utils"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"

export const fetchCategoriesStart = ()=> createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoryArray)=>createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoryArray);

export const fetchCategoriesFailure = (error)=>createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);


export const fetchCategoriesAsync = ()=>{
    return async (dispatch)=> {
        dispatch(fetchCategoriesStart());
        try {
            
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(fetchCategoriesSuccess(categoriesArray));
            
        } catch (error) {
            dispatch(fetchCategoriesFailure(error));
        }
    }
}

