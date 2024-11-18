import react, {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function LeavesForm() {

    const navigate = useNavigate()
    const [leave_reason, setLeave_reason] = useState('')
    const [start_leave_date, setStart_leave_date] = useState('')
    const [end_leave_date, setEnd_leave_date] = useState('')

    const handleLeave = async (e) => {
        e.preventDefault()


        if (start_leave_date.trim() == '' && leave_reason.trim() == ''){
            return Error('Start leave date and leave reason is required')
        }

        const token = Cookies.get('accessToken')
        const decode = jwtDecode(token)
        const csrftoken = Cookies.get('csrftoken')
        let res = await axios.post(
            'api/users/leaves/',
            {
                user: decode.user_id,
                leave_reason: leave_reason,
                start_leave_date: start_leave_date,
                end_leave_date: end_leave_date,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if(res.status == 200){
            setLeave_reason('')
            setStart_leave_date('')
            setEnd_leave_date('')
            
            document.getElementById('LeaveSubmitButton').innerText = 'Submited'
            navigate('/')
        }

    }

    return (
        <div>
            <h2>Apply for leave</h2>
            <form onSubmit={handleLeave} action='#' >

                <label htmlFor='leave reason'>Leave reason</label>
                <input
                type='text'
                id='leave reason'
                placeholder='leave reason'
                value={leave_reason}
                onChange={(e) => setLeave_reason(e.target.value)}
                />

                <label htmlFor='start_leave_date'>To date you want leave</label>
                <input
                type='date'
                id='start_leave_date'
                value={start_leave_date}
                onChange={(e) => setStart_leave_date(e.target.value)}
                />

                <label htmlFor='end_leave_date'>Till date you wnat leave</label>
                <input
                type='date'
                id='end_leave_date'
                value={end_leave_date}
                onChange={(e) => setEnd_leave_date(e.target.value)}
                />

                <button type='submit' id='LeaveSubmitButton'>Submit</button>
            </form>
        </div>
    )
}