import './cartTable.style.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectTotalPrice, selectCartReducer, selectAllItemsToArray, selectItemsTotalAmount } from '../../store/cart/cart.selector';
import { removeItemFromCart, clearItems, addItemToCart, updateTotal } from '../../store/cart/cart.action';



import PaymentForm from '../paymentForm/paymentForm.component'; 

const CartTable = () => {

    const dispatch = useDispatch();

    const cartItems = useSelector(selectAllItemsToArray);

    const totalPrice = useSelector(selectTotalPrice);

    const totalAmount = useSelector(selectItemsTotalAmount);

    const cart  = useSelector(selectCartReducer);


    return (
        <div className='mt-5 py-5'>
            {
                cartItems.length > 0 && (
                    <>
                    <h2>This is your cart</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <td>Product</td>
                                <td>Description</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td >Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(({ info, itemAmount }) => (
                                <tr key={info.id}>
                                    <td>
                                        <img height={180} width={200} src={info.imageUrl} alt={info.name} />
                                    </td>
                                    <td className='align-middle'>{info.name}</td>
                                    <td className='align-middle'>
                                        <button className='cart-card-button' onClick={() => { dispatch(removeItemFromCart(info, cart)) }}> <i className="fa-solid fa-chevron-left"></i> </button>
                                        <span>{itemAmount}</span>
                                        <button className='cart-card-button' onClick={() => { dispatch(addItemToCart(info, cart)) }}> <i className="fa-solid fa-chevron-right"></i> </button>
                                    </td>
                                    <td className='align-middle'>{info.price}</td>
                                    <td className='align-middle'>
                                        <button onClick={() => { dispatch(clearItems(info, cart)); dispatch(updateTotal(info,totalAmount, cart )) }} className='cart-card-button'><i className="fa-solid fa-xmark"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
                )
            }
            {totalPrice ? <h2 className='text-end'>Price: {totalPrice}$</h2> : <h2 className='text-center mt-5'>No Items in the cart</h2>}
            { totalPrice ? <PaymentForm/> : <></> }
        </div>
    )
}

export default CartTable;