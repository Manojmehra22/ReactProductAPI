import React, { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";

function Product() {
  const [Records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("https://api.restful-api.dev/objects").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  }, []);

  return (
    <>
      <div className="app">
        <h2>PRODUCTS DATA</h2>
        <table className="table">
          <thead>
            <tr className="heading ">
              <td>ID</td>
              <td>NAME</td>
              <td>COLOR</td>
              <td>CAPACITY</td>
            </tr>
          </thead>
          <tbody>
            {Records.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.color}</td>
                  <td>{item.capacity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Product;
