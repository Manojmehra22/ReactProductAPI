import React, { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";

function Product() {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = tableData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);

  useEffect(() => {
    axios.get("https://api.restful-api.dev/objects").then((response) => {
      setTableData(response?.data);
    });
  }, []);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

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
            {currentItems?.map((value, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.data?.color || "N/A"}</td>
                <td>{value.data?.capacity || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePrevClick} disabled={currentPage === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextClick} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
