import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./Home.css";
import Category from "./Category";
import axios from "axios";
import Footer from "../footer/Footer";
import { useAuth } from "../context/AuthContext";
const Home = ({ data }) => {
  const [best, setBest] = useState([]);
  const [flash, setFlash] = useState([]);
  const { user } = useAuth();
  console.log(user);
  const addToPanier = (id) => {
    const data = {
      UserId: user.id,
      productId: id,
    };
    console.log(data, "data");
    axios
      .post("http://localhost:4000/api/panier/usercart", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/condition/best seller`)
      .then((response) => {
        setBest(response.data);
        console.log(best);
      })
      .catch((err) => {
        console.error(err);
      }),
      axios
        .get(`http://localhost:4000/api/products/condition/flash sells`)
        .then((response) => {
          setFlash(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <input type="radio" name="position" defaultChecked="" />
        <input type="radio" name="position" />
        <input type="radio" name="position" />
        <input type="radio" name="position" />
        <input type="radio" name="position" />
        <main id="carousel">
          {data.map((el) => {
            return (
              <div className="item">
                <img id="carImg" src={el.imgUrl} alt="" />
              </div>
            );
          })}
        </main>
      </div>

      <h2>flash Sells</h2>
      <div className="grid-container">
        {flash.map((el) => {
          return (
            <div
              className="container"
              style={{
                background: `url(${el.imgUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="overlay">
                <div className="items" />
                <div className="items head">
                  <p>{el.name}</p>
                  <hr />
                </div>
                <div className="items price">
                  <p className="old">$699</p>
                  <p className="new">${el.price}</p>
                </div>
                <div className="items cart">
                  <i className="fa fa-shopping-cart" />
                  <span
                    onClick={() => {
                      addToPanier(el.id);
                    }}
                  >
                    ADD TO CART
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h2>categories</h2>
        <Category />
      </div>
      <div>
        <h2>Best Seller</h2>
        <div className="grid-container">
          {best.map((el) => {
            return (
              <div
                className="container"
                style={{
                  background: `url(${el.imgUrl})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="overlay">
                  <div className="items" />
                  <div className="items head">
                    <p>{el.name}</p>
                    <hr />
                  </div>
                  <div className="items price">
                    <p className="old">$699</p>
                    <p className="new">${el.price}</p>
                  </div>
                  <div className="items cart">
                    <i className="fa fa-shopping-cart" />
                    <span
                      onClick={() => {
                        addToPanier(el.id);
                      }}
                    >
                      ADD TO CART
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h2>explore our products</h2>
        <div className="grid-container">
          {data.map((el) => {
            return (
              <div
                className="container"
                style={{
                  background: `url(${el.imgUrl})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="overlay">
                  <div className="items" />
                  <div className="items head">
                    <p>{el.name}</p>
                    <hr />
                  </div>
                  <div className="items price">
                    <p className="old">$699</p>
                    <p className="new">${el.price}</p>
                  </div>
                  <div className="items cart">
                    <i className="fa fa-shopping-cart" />
                    <span
                      onClick={() => {
                        addToPanier(el.id);
                      }}
                    >
                      ADD TO CART
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
