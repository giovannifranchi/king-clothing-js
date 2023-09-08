
import './dropdownCard.style.scss';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartReducer } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';

const DropdownCard = ({item})=> {


    const dispatch = useDispatch();

    const cart = useSelector(selectCartReducer);

    
    const {info, itemAmount } = item;

    const { name, imageUrl, price } = info;

    const addItems = (event)=>{
        event.stopPropagation();
        dispatch(addItemToCart(info, cart));
    }

    const removeItems = (event)=>{
        event.stopPropagation();
        dispatch(removeItemFromCart(info, cart));
    } 


    return (
        <div className='row mb-3'>
            <div className='col-4'>
                <img src={imageUrl} alt={name} className='img-fluid'/>
            </div>
            <div className='col-8 d-flex flex-column'>
                <span>{name}</span>
                <div className='d-flex justify-content-between pe-3'>
                    <span>{`${itemAmount} x ${price}$`}</span>
                    <span className='d-flex '>
                        <button className='cart-card-button' onClick={removeItems}>-</button>
                        <button className='cart-card-button' onClick={addItems}>+</button>
                    </span>
                </div>
                <span>{`Total: ${itemAmount * price}$`}</span>
            </div>
        </div>
    )
}

export default DropdownCard;