import './categoriesSection.style.scss';
import ProductCard from '../productCard/productCard.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.selector';
import { NavLink } from 'react-router-dom';
import { selectIsLoading } from '../../store/categories/categories.selector';
import Spinner from '../spinner/spinner.component';




const CategoriesSection = () => {

    const categories = useSelector(selectCategoriesMap);

    const isLoading = useSelector(selectIsLoading);

    return (
        <div className='container py-5 mt-5'>
            {
                isLoading ?
                    (<Spinner />)
                    :
                    (
                        <>
                            {
                                Object.keys(categories).map((category) => {
                                    return (
                                        <div className='row mt-3 mb-5' key={category}>
                                            <h2>
                                                <NavLink className='text-reset text-decoration-none' to={category}>{category.toUpperCase()}</NavLink>
                                            </h2>
                                            {
                                                categories[category].slice(0, 4).map((item) => (
                                                    <div key={item.id} className='col-sm-6 col-md-3'>
                                                        <ProductCard product={item} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                })
                            }
                        </>
                    )
            }
        </div>
    )
}

export default CategoriesSection;