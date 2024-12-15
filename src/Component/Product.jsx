import React, { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";

function Product() {
  const [Records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Records.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Records.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
          <tbody>
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
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Pre
              </a>
            </li>
            {numbers.map((item, i) => (
              <li
                className={`page-item ${currentPage === item ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCPage(item)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default Product;
