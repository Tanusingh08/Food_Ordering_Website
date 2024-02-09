import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import Button from "../UI/Button";
import { currencyFormatting } from "../utils/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CartItems from "./CartItems.jsx";
import CartTotal from "../utils/CartTotal.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UserProgressContext);
 
  function handleCloseCart() {
    UserProgressCtx.hideCart();
  }

  function handleOpenCheckOut(){
    UserProgressCtx.showCheckout();
  }

  return (
    <Modal className="cart" open={UserProgressCtx.progress === "cart"} onClose={UserProgressCtx.progress === "cart" ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItems
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">
        {<CartTotal cartCtx={cartCtx}/>}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && <Button onClick={handleOpenCheckOut}>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}
