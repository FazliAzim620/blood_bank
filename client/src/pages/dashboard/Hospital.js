import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/layout/Layout'
import API from '../../services/API'
import moment from 'moment'

const Hospital = () => {
    const [hospitalRecord,setHospitalRecord]=useState([])
    const getHospital=async()=>{
    const {data}=await API.get('/inventory/get-hospital')
    
    if(data?.success){
        setHospitalRecord(data?.hospitals)
    }
    }
    useEffect(()=>{
      
    getHospital()
    },[])
  return (
    <Layout>
     <div className="ms-3">
          {hospitalRecord?.length>0? 
        <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Date</th>
                
              </tr>
            </thead>
            <tbody>
              {hospitalRecord?.map((data)=>{
              
              return(
                <tr key={data?._id}>
                <th>{ data?.hospitalName}</th>
                <td>{data?.email?data?.email:'NA'}</td>
                <td>{data?.phone?data?.phone:'NA'}</td>
                <td>{data?.address?data?.address:'NA'}</td>
                <td>{moment(data?.createdAt).format('DD.MM.YYYY  h:mm A')}</td>
                </tr>
                )
              })}
           
            
            </tbody>
          </table>:'No data to show'}
        </div>
    </Layout>
  )
}

export default Hospital
