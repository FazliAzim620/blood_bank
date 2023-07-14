import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import Layout from "../components/shared/layout/Layout";
import Modal from "../components/shared/model/Modal";
import API from "../services/API";
import moment from 'moment'

const HomePage = () => {
  const { loading, error ,user} = useSelector((state) => state?.auth);
  const [bloodData, setBloodData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const getBloodRecord = async () => {
  
    const { data } = await API.get("/inventory/get-blood-record");
    if (data?.success) {
      setBloodData(data?.inventory);
    }
  };

  useEffect(() => {
    if (!loading && location.pathname === '/') {
      const userRole = user?.user?.role;
      if (userRole && userRole !== 'admin' && userRole !== 'organization') {
        // Redirect to the appropriate route based on user role
        window.location.replace(`/${userRole}`);
      }
    }
    
  }, [loading, location.pathname, user?.user?.role]);
  return (
    <Layout>
      {error && toast.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <>
         <div className="container    ">
          <h4
            className="  add_inventory ms-4 pt-3"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <i className="fa fa-plus text-success "></i>Add Inventory
          </h4>
          <Modal />
          {/* ///===================  Blood record table */}
        <div className="ms-3">
          {bloodData?.length>0? 
        <table className="table">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Donar Email</th>
                <th scope="col">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {bloodData?.map((data)=>{
              
              return(
                <tr key={data?._id}>
                <th>{data?.bloodGroup}</th>
                <td>{data?.inventoryType}</td>
                <th>{data?.quantity} (ML)</th>
                <td>{data?.email?data?.email:'NA'}</td>
                <td>{moment(data?.createdAt).format('DD.MM.YYYY  h:mm A')}</td>
                </tr>
                )
              })}
           
            
            </tbody>
          </table>:'No data to show'}
        </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
