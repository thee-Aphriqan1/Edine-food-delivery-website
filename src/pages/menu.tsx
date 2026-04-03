import React, { useState } from "react";

function Menu() {
  // Sample food data
  const [foods] = useState([
    { id: 1, name: "Burger", price: 250, image: "https://via.placeholder.com/150", description: "Delicious beef burger" },
    { id: 2, name: "Pizza", price: 800, image: "https://via.placeholder.com/150", description: "Cheesy pizza with toppings" },
    { id: 3, name: "Fries", price: 200, image: "https://via.placeholder.com/150", description: "Crispy french fries" }
  ]);

  // Cart state
  const [cart, setCart] = useState<{id:number, name:string, price:number, qty:number}[]>([]);

  // Add item to cart
  const addToCart = (food: any) => {
    const existing = cart.find(item => item.id === food.id);
    if (existing) {
      setCart(cart.map(item => item.id === food.id ? {...item, qty: item.qty + 1} : item));
    } else {
      setCart([...cart, { ...food, qty: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate total
  const totalPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);

  // Place order
  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    console.log("Order submitted:", cart);
    alert(`Order placed! Total: Ksh ${totalPrice}`);
    setCart([]); // Clear cart
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Our Menu</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {foods.map((food) => (
          <div key={food.id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px", width: "200px" }}>
            <img src={food.image} alt={food.name} style={{ width: "100%" }} />
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p><strong>Ksh {food.price}</strong></p>
            <button onClick={() => addToCart(food)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div style={{ marginTop: "30px", borderTop: "1px solid #ddd", paddingTop: "20px" }}>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div>
            {cart.map(item => (
              <div key={item.id} style={{ marginBottom: "10px" }}>
                {item.name} x {item.qty} = Ksh {item.price * item.qty}{" "}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <h3>Total: Ksh {totalPrice}</h3>
            <button onClick={handleOrder}>Place Order</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;