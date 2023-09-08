import './cartDropdown.style.scss';

import DropdownCard from '../dropdownCard/dropDownCard.component';
import Button from '../button/button.component';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectAllItemsToArray } from '../../store/cart/cart.selector';
import { selectItemsTotalAmount } from '../../store/cart/cart.selector';



const CartDropdown = () => {

    const isOpen = useSelector(selectIsCartOpen);

    const cartItems = useSelector(selectAllItemsToArray);

    const totalAmount = useSelector(selectItemsTotalAmount);


    return (
        <div className={`${isOpen ? 'cart-dropdown-container' : 'd-none'}`}>

            {
                totalAmount ? 
                (<div className='cart-items'>
                    {
                        cartItems.map((item)=>{return <DropdownCard item={item} key={item.info.id}/>})
                    }
                </div>)
                :
                (<div className='empty-message'>No items in cart</div>)
            }


            {
                totalAmount ?
                (
                    <NavLink to='checkout' className='w-100 mt-2'>
                        <Button text='Go to Checkout' buttonType='inverted'/>
                    </NavLink>
                )
                : 
                (<></>)
            }
        </div>

    )
}

export default CartDropdown;