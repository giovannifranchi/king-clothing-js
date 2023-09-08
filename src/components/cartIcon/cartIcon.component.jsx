
import './cartIcon.style.scss';
import CartDropdown from '../cartDropdown/cartDropdown.component';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';
import { toggleIsOpen } from '../../store/cart/cart.action';
import { selectItemsTotalAmount } from '../../store/cart/cart.selector';
import { selectConfetti } from '../../store/cart/cart.selector';
import { showConfetti } from '../../store/cart/cart.action';
import Confetti from 'react-confetti';
import { useEffect, useRef } from 'react';


const CartIcon = () => {

    const totalAmount = useSelector(selectItemsTotalAmount);

    const isOpen = useSelector(selectIsCartOpen);

    const confetti = useSelector(selectConfetti);

    const prevTotalAmount = useRef(totalAmount); 

    const dispatch = useDispatch();

    const toggleDropDown = ()=>{
        dispatch(toggleIsOpen(!isOpen));
    }

    useEffect(() => {
        if (prevTotalAmount.current < totalAmount) {
          dispatch(showConfetti(true));
          setTimeout(() => {
            dispatch(showConfetti(false));
          }, 3000);
        }
        prevTotalAmount.current = totalAmount;
      }, [totalAmount, dispatch]);

    return (
        <div onClick={toggleDropDown} className='cart-icon-container'>

            <ShoppingIcon className='shopping-icon' />
            { confetti && <Confetti  /> }
            <span className='item-count'>{totalAmount}</span>
            <CartDropdown/>
        </div>
    )
}

export default CartIcon;