
import './cartIcon.style.scss';
import CartDropdown from '../cartDropdown/cartDropdown.component';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';
import { toggleIsOpen } from '../../store/cart/cart.action';
import { selectItemsTotalAmount } from '../../store/cart/cart.selector';


const CartIcon = () => {

    const totalAmount = useSelector(selectItemsTotalAmount);

    const isOpen = useSelector(selectIsCartOpen);

    const dispatch = useDispatch();

    const toggleDropDown = ()=>{
        dispatch(toggleIsOpen(!isOpen));
    }

    return (
        <div onClick={toggleDropDown} className='cart-icon-container'>

            <ShoppingIcon className='shopping-icon' />

            <span className='item-count'>{totalAmount}</span>
            <CartDropdown/>
        </div>
    )
}

export default CartIcon;