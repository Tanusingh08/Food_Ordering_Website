import { currencyFormatting } from "../utils/formatting.js";

export default function CartItems({name,quantity,price,onIncrease,onDecrease}){
    return <li className="cart-item">
        <p>
            {name} - {quantity} x {currencyFormatting.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}