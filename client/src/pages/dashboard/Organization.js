import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/layout/Layout'
import moment from 'moment'
import API from '../../services/API'
import { useSelector } from 'react-redux'
const Organization = () => {
    const [organizationRecord,setOrganizationRecord]=useState()
    const {user}=useSelector(state=>state.auth)
    const getOrganizationData=async()=>{
        if(user?.user?.role==='donar'){
            const {data}=await API.get('/inventory/get-organization')
            if(data?.success){
              setOrganizationRecord(data?.organizations)}
        }
        if(user?.user?.role==='hospital'){
            const {data}=await API.get('/inventory/get-orgnaisation-for-hospital')
            if(data?.success){
              setOrganizationRecord(data?.organizations)}
        }
    }
    useEffect(()=>{
        getOrganizationData()
    },[user])
  return (
    <Layout>
      <div className="ms-3">
          {organizationRecord?.length>0? 
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
              {organizationRecord?.map((data)=>{
              
              return(
                <tr key={data?._id}>
                <th>{ data?.organizationName || data?.hospitalName}</th>
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

export default Organization
