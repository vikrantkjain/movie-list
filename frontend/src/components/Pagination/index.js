import React from "react";
import Link from "next/link";

function Pagination({  page,  noOfPage, goToPage }) {
  
  return (
    <div className="commonPagination d-flex justify-content-center align-items-center text-center">
      
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item prev ${page === 1 ? "disabled" : ""}`}>
            <Link
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPage(page - 1);
              }}
            >
              Prev
            </Link>
          </li>
          {Array.from(Array(noOfPage).keys()).map((row) => {
            if (noOfPage < 5) {
              return (
                <li
                  key={row}
                  className={`page-item ${page === row + 1 ? "active" : ""}`}
                >
                  <Link
                    className="page-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page !== row + 1) {
                        goToPage(row + 1);
                      }
                    }}
                    href=" #"
                  >
                    {row + 1}
                  </Link>
                </li>
              );
            }
            if (noOfPage >= 5) {
              if (page < 3) {
                if (noOfPage === row + 1) {
                  return (
                    <li
                      key={row}
                      className={`page-item ${
                        page === row + 1 ? "active" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page !== row + 1) {
                            goToPage(row + 1);
                          }
                        }}
                        href="#"
                      >
                        {row + 1}
                      </Link>
                    </li>
                  );
                }
                return row < 3 ? (
                  <>
                    <li
                      key={row}
                      className={`page-item ${
                        page === row + 1 ? "active" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page !== row + 1) {
                            goToPage(row + 1);
                          }
                        }}
                        href=" #"
                      >
                        {row + 1}
                      </Link>
                    </li>
                    {row === 2 && page < 3 ? (
                      <li className="page-item disabled">
                        <Link
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          href="#"
                        >
                          . . .
                        </Link>
                      </li>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                );
              }
              if (page >= 3) {
                if (row === 0) {
                  return (
                    <>
                      <li
                        key={row}
                        className={`page-item ${
                          page === row + 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page !== row + 1) {
                              goToPage(row + 1);
                            }
                          }}
                          href="#"
                        >
                          {row + 1}
                        </Link>
                      </li>
                      {page >= 4 ? (
                        <li className="page-item disabled">
                          <Link
                            className="page-link"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            href="#"
                          >
                            . . .
                          </Link>
                        </li>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                }
                if (row + 1 === noOfPage) {
                  return (
                    <>
                      {page <= noOfPage - 4 ? (
                        <li className="page-item disabled">
                          <Link
                            className="page-link"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            href="#"
                          >
                            . . .
                          </Link>
                        </li>
                      ) : (
                        <></>
                      )}
                      <li
                        key={row}
                        className={`page-item ${
                          page === row + 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page !== row + 1) {
                              goToPage(row + 1);
                            }
                          }}
                          href="#"
                        >
                          {row + 1}
                        </Link>
                      </li>
                    </>
                  );
                }
                if (page >= row - 1 && page <= row + 2) {
                  return (
                    <li
                      key={row}
                      className={`page-item ${
                        page === row + 1 ? "active" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page !== row + 1) {
                            goToPage(row + 1);
                          }
                        }}
                        href="#"
                      >
                        {row + 1}
                      </Link>
                    </li>
                  );
                }
                return <></>;
              }
            }
          })}
          <li
            className={`page-item next ${noOfPage <= page ? "disabled" : ""}`}
          >
            <Link
              onClick={(e) => {
                e.preventDefault();
                goToPage(page + 1);
              }}
              className="page-link"
              href="#"
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
}

export default Pagination;