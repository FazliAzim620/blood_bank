import React from "react";
import {BiDonateBlood,BiUserCircle}  from'react-icons/bi'
import {RiLogoutCircleLine}  from'react-icons/ri'
import {useSelector} from 'react-redux'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const {user}=useSelector(state=>state.auth)
  
    // logout 
    const logOut=()=>{
        localStorage.clear();
        navigate('/login')
        toast.success('LogOut Successfully')
    }
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand h2">Blood Bank <BiDonateBlood color="red"/>
          </div>
          <ul className="navbar-nav flex-row  ">
            <li className="nav-item flex-row justify-content-center ">
              <p className="nav-link"><BiUserCircle/>Welcome <span className="text-decoration-underline user">{user?.user?.name ||user?.user?.hospitalName||user?.user?.organizationName}</span> &nbsp; <span className="badge bg-success"> {user?.user?.role}</span></p>
             
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donar" ||
            location.pathname === "/hospital" ? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
            <button className="btn btn-danger btn-sm m-1 " onClick={logOut}>Log out <RiLogoutCircleLine/></button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
