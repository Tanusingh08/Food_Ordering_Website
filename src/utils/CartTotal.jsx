import { currencyFormatting } from "./formatting.js";

function CartTotal({ cartCtx }) {
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  return currencyFormatting.format(cartTotal);
}

export default CartTotal;
