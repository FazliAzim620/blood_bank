import React from "react";
import { userMenu } from "./menu/userMenu";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/sidbar.css";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const filterItem = userMenu.filter((item) => {
    if (user?.user?.role === "admin") {
      return item;
    } else if(user?.user?.role === "hospital"){
      return item?.dbname === user?.user?.role || item?.dbname ==='donar' ||item?.dbname ==='organization';
    }else if(user?.user?.role==='organization'){
        return item?.dbname === user?.user?.role || item?.dbname ==='donar' || item?.dbname ==='hospital'|| item?.dbname ==='inventory' ;
    }
  });

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {filterItem?.map((menu, index) => {
            const isActive = location.pathname === menu.path;

            return (
              <div className={`menu-item ${isActive && "active"}`} key={index}>
                <Link to={menu.path} className="a">
                  <i className={` ${menu.icon}`}></i>
                  <p className="mx-3">{menu.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
          {/* <div className="sidebar">
        <div className="menu">
          { user?.user?.role === "organization" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">Donar</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital">Hospital</Link>
              </div>
            </>
          )}
          {user?.user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donar-list">Donar List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/org-list">Organisation List</Link>
              </div>
            </>
          )}
          {(user?.user?.role === "donar" || user?.user?.role === "hospital") && (
            <div
              className={`menu-item ${
                location.pathname === "/orgnaization" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/organization">Organization</Link>
            </div>
          )}
          {user?.user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/consumer">Consumer</Link>
            </div>
          )}
          {user?.user?.role === "donar" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/donate">Donation</Link>
            </div>
          )}
          </div>
          </div> */}
    </div>
  );
};

export default Sidebar;
