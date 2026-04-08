
// Homepage.jsx
function Homepage() {
  return (
    <div>

      <style>{`

      body{
        font-family: Arial;
        margin:0;
        background:#f4f4f4;
      }

      /* NAVBAR */
      .navbar{
        display:flex;
        justify-content:space-between;
        padding:20px;
        background:white;
      }
      .nav{
        display:flex;
        gap:30px;
        list-style:none;
      }
      .login{
        background:orange;
        border:none;
        padding:10px 20px;
        color:white;
      }

      /* HERO */
      .hero{
        display:flex;
        padding:60px;
        background:#ddd;
      }
      .hero-text{
        width:50%;
      }
      .hero-text span{
        color:red;
      }
      .hero-image img{
        width:350px;
        border-radius:50%;
      }

      /* WHAT WE SERVE */
      .serve{
        text-align:center;
        padding:40px;
      }
      .serve-box{
        display:flex;
        justify-content:center;
        gap:40px;
      }
      .card{
        background:white;
        padding:20px;
        width:200px;
      }
      .card img{
        width:60px;
      }

      /* HOW IT WORKS */
      .works{
        text-align:center;
        padding:40px;
      }
      .steps{
        display:flex;
        justify-content:center;
        gap:20px;
      }
      .step{
        background:#eee;
        padding:20px;
      }

      /* FEATURED */
      .featured{
        text-align:center;
        padding:40px;
      }
      .foods{
        display:grid;
        grid-template-columns:repeat(3,200px);
        gap:30px;
        justify-content:center;
      }
      .food img{
        width:200px;
        height:140px;
        object-fit:cover;
      }

      /* SEARCH BY FOOD */
      .search{
        text-align:center;
        padding:40px;
      }
      .categories{
        display:flex;
        justify-content:center;
        gap:40px;
      }
      .cat img{
        width:120px;
        height:120px;
        border-radius:50%;
        object-fit:cover;
      }

      /* FOOTER */
      .footer{
        display:flex;
        justify-content:space-around;
        background:#ddd;
        padding:40px;
      }

      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>E-DINE</h2>
        <ul className="nav">
          <li>Home</li>
          <li>Services</li>
          <li>Menu</li>
          <li>Contacts</li>
        </ul>
        <button className="login">Login</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Be the fastest in Delivering Your <span>Food</span></h1>
          <p>Our job is to fill your tummy with delicious food and with fast and free delivery</p>
          <button>Get Started</button>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"/>
        </div>
      </section>

      {/* WHAT WE SERVE */}
      <section className="serve">
        <h2>What we serve</h2>
        <div className="serve-box">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"/>
            <h3>Easy To Order</h3>
            <p>Just a few clicks to request food</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"/>
            <h3>Fastest Delivery</h3>
            <p>Delivery that is always on time</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"/>
            <h3>Best Quality</h3>
            <p>Quality is our number one priority</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="works">
        <h2>How it Works</h2>
        <div className="steps">
          <div className="step">Choose Order</div>
          <div className="step">Select Location</div>
          <div className="step">Make Payment</div>
          <div className="step">Enjoy Your Meal</div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <h2>Featured Restaurant</h2>
        <div className="foods">
          <div className="food">
            <img src="https://images.unsplash.com/photo-1594007654729-407eedc4fe24"/>
            <p>Ksh 400</p>
          </div>
          <div className="food">
            <img src="https://images.unsplash.com/photo-1550547660-d9450f859349"/>
            <p>Ksh 250</p>
          </div>
          <div className="food">
            <img src="https://images.unsplash.com/photo-1604908176997-431c7b8f1a65"/>
            <p>Ksh 700</p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search">
        <h2>Search By Food</h2>
        <div className="categories">
          <div className="cat">
            <img src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e"/>
            <p>Pizza</p>
          </div>
          <div className="cat">
            <img src="https://images.unsplash.com/photo-1550547660-d9450f859349"/>
            <p>Burger</p>
          </div>
          <div className="cat">
            <img src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e"/>
            <p>Ice Cream</p>
          </div>
          <div className="cat">
            <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add"/>
            <p>Chips</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <h3>E-dine</h3>
          <p>Quick and fast food delivery service</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Services</p>
          <p>Menu</p>
        </div>
        <div>
          <h4>Social Media</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </footer>

    </div>
  );
}

export default Homepage;