import React, { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";

function Product() {
  const [Records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("https://api.restful-api.dev/objects").then((response) => {
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
          <tbody >
            {Records.map((item, i) => {
              return (
                <>
                  <tr key={i} style={{ textAlign: "center" }}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.data?.color || "N/A"}</td>
                    <td>{item.data?.capacity || "N/A"}</td>
                  </tr>
                </>
              );
            })}

          </tbody>
        </table>
      </div>
    </>
  );
}

export default Product;
