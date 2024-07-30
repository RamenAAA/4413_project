import CartItems from "./CartItems";

function Cart(){
    return(
        <div className="cart">
            <h2 className="pageHeader">Shopping Cart</h2>
            <div  className="cart-container">
                <div className="cartItems">
                    <CartItems></CartItems>
                    <CartItems></CartItems>
                    <CartItems></CartItems>
                </div>
                <div className="buy-container">
                    <div className="buyText">
                        <p>Item Number : 2</p>
                        <h3><b>Order Total: $100.00</b></h3>
                    </div>
                    <button className="checkoutButton">Checkout</button>
                </div>
            </div>


        </div>

        
    );
}

export default Cart