import React, {useState, useEffect} from "react";
import Cookies from "js-cookie"
import axios from "axios";

export default function Leaves() {

    const [leaveData, setLeaveData] = useState([])
    const [error, setError] = useState('')

    const dateString = (time) => {
        const date = new Date(time)
        return date.toDateString()
      }
    
      useEffect(() => {
        const fetchLeaveData = async () => {
          try {
      
            const token = Cookies.get('accessToken')
      
            let res = await axios.get(
              'api/users/leaves/',
              {
                headers : {
                  Authorization: `Bearer ${token}`
                }
              }
            )
        
            if (res.status == 200){
              setLeaveData(res.data)
            }
          } catch (error) {
            console.log(error)
          }
        }

        if(Cookies.get('accessToken')){
          fetchLeaveData()
        }
        else{
          setError('you are not logged in !')
        }
        
      }, [])

    return (
        <div>
            {
              leaveData.map((items) => {
                  return (
                    <div key={items.id}>
                    <h3>Leave reason</h3>
                    <p>{items.leave_reason}</p>
                    <h3>Applied leave date</h3>
                    <span>{dateString(items.applied_leave_date)}</span>
                    <h3>Start leave date</h3>
                    <span>{items.start_leave_date}</span>
                    <h3>End leave date</h3>
                    <span>{items.end_leave_date !='' ? items.end_leave_date : items.start_leave_date }</span>
                    <h3>Leave Status</h3>
                    <strong>{items.Leave_status == true ? 'Approved' : 'Pending'}</strong>
                  </div>
                  )
              })
            }
        </div>
    )
}