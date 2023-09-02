import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Paginated.module.css";

const Paginated = ({ currentPage, totalPages }) => {
  const location = useLocation();

  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className={style.pagination}>
      <div className={`${style.arrow} ${style.leftArrow}`}>
        {currentPage > 1 && (
          <Link
            className={style.pageLink}
            to={`${location.pathname}?page=${currentPage - 1}`}
          >
            {"PREV"}
          </Link>
        )}
      </div>

      <div className={style.pageNumbers}>
        <Link
          className={`${style.pageLink} ${style.pageNumber} ${
            currentPage === 1 ? style.currentPage : ""
          }`}
          to={`${location.pathname}?page=1`}
        >
          1
        </Link>

        {currentPage > 4 && <span className={style.dots}>...</span>}

        {pageNumbers
          .filter(
            (number) =>
              number > 1 &&
              number < totalPages &&
              (number >= currentPage - 1 && number <= currentPage + 1)
          )
          .map((number) => (
            <Link
              key={number}
              className={`${style.pageLink} ${style.pageNumber} ${
                number === currentPage ? style.currentPage : ""
              }`}
              to={`${location.pathname}?page=${number}`}
            >
              {number}
            </Link>
          ))}

        {currentPage < totalPages - 3 && <span className={style.dots}>...</span>}

        {totalPages > 1 && (
          <Link
            className={`${style.pageLink} ${style.pageNumber} ${
              currentPage === totalPages ? style.currentPage : ""
            }`}
            to={`${location.pathname}?page=${totalPages}`}
          >
            {totalPages}
          </Link>
        )}
      </div>

      <div className={`${style.arrow} ${style.rightArrow}`}>
        {currentPage < totalPages && (
          <Link
            className={style.pageLink}
            to={`${location.pathname}?page=${currentPage + 1}`}
          >
            {"NEXT"}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Paginated;