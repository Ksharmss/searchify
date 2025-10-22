import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      {/* 🔹 Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm px-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* Hamburger Button */}
            <button
              className="btn p-0 me-3 text-white"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
            >
              <i className="bi bi-list fs-3"></i>
            </button>

          
          </div>

          {/* Right-side icons */}
          <div className="d-flex align-items-center">
            <button className="btn p-0 me-3 text-white">
              <i className="bi bi-qr-code-scan fs-5"></i>
            </button>
            <button className="btn p-0 me-3 text-white">
              <i className="bi bi-bell fs-5"></i>
            </button>
            <button className="btn p-0 text-white">
              <i className="bi bi-person-circle fs-5"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* 🔹 Offcanvas Sidebar Menu */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled">
            <li>
              <Link className="nav-link mb-2" to="/" data-bs-dismiss="offcanvas">
                🏠 Home
              </Link>
            </li>
            <li>
              <Link className="nav-link mb-2" to="/results" data-bs-dismiss="offcanvas">
                🔍 Search Results
              </Link>
            </li>
            <li>
              <a className="nav-link mb-2" href="#" data-bs-dismiss="offcanvas">
                ℹ️ About
              </a>
            </li>
            <li>
              <a className="nav-link mb-2" href="#" data-bs-dismiss="offcanvas">
                📞 Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
