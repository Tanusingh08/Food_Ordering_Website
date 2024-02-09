import { useContext } from 'react';
import Modal from "../UI/Modal"
import CartTotal from "../utils/CartTotal.jsx";
import CartContext from '../store/CartContext';
import Input from '../UI/Input.jsx';
import Button from '../UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import useHttp from './hooks/useHttp.js';
import Error from './Error.jsx';

const requestConfig = {
    method:'POST',
    headers : {
        'Content-Type':'application/json',
    }
}
export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const UserProgressCtx = useContext(UserProgressContext);

    const{data,isLoading : isSending,error,sendRequest,clearData} = useHttp("http://localhost:3000/orders",requestConfig);
    function handleCloseCheckout(){
        UserProgressCtx.hideCheckout();
    }

    function handleFinish(){
        UserProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order:{
                items:cartCtx.items,
                customer:customerData,
            }
        }))


        // fetch('http://localhost:3000/orders',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json',
        //     },
        //     body: JSON.stringify({
        //         order:{
        //             items:cartCtx.items,
        //             customer:customerData,
        //         }
        //     })
        // })
    }

    let actions = (
        <>
         <Button textOnly type="button" onClick={handleCloseCheckout}>Close</Button>
         <Button >Submit Order</Button>
        </>
    )

    if(isSending){
        actions = <span>Sending Order Data...</span>
    }

    if(data && !error){
        return <Modal open={UserProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email  within the next few minutes.</p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return <Modal open={UserProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>TotalAmount: {<CartTotal cartCtx={cartCtx}/>}</p>
            
            <Input label="Full Name" id="name" type="text"/>
            <Input label="E-Mail Address" id="email" type="email"/>
            <Input label="Street" id="street" type="text"/>

            <div className='control-flow'>
                <Input label="Postal Code" id="postal-code" type="text"/>
                <Input label="City" id="city" type="text"/>
            </div>

            {error && <Error title="Failed To Submit Order" message={error}/>}
            <p className='modal-actions'>
               {actions}
            </p>
        </form>
    </Modal>
}