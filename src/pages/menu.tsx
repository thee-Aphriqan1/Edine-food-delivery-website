import React, { useState } from "react";

function Menu() {

  // Sample food data (later from backend)
  const [foods] = useState([
    {
      id: 1,
      name: "Burger",
      price: 250,
      image: "https://via.placeholder.com/150",
      description: "Delicious beef burger"
    },
    {
      id: 2,
      name: "Pizza",
      price: 800,
      image: "https://via.placeholder.com/150",
      description: "Cheesy pizza with toppings"
    },
    {
      id: 3,
      name: "Fries",
      price: 200,
      image: "https://via.placeholder.com/150",
      description: "Crispy french fries"
    }
  ]);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Our Menu</h1>

      <div style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        {foods.map((food) => (
          <div key={food.id} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            width: "200px"
          }}>
            <img src={food.image} alt={food.name} style={{ width: "100%" }} />

            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p><strong>Ksh {food.price}</strong></p>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Menu;