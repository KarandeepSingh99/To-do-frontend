import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const AddTodo = () => {

    const [activity, setActivity] = useState("")
    const [status, setStatus] = useState("")

  let history=useHistory()






    fetch(`http://localhost:5000/addtodo`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            activity

        })
    }).then(res => res.json())
        .then(data => {
            if (!data) {
                alert("PLEASE ADD Your TODO")
                return
            }
            // console.log(data)
            alert("SUCCESSFULLY ADDED")
            history.push("/")
        })
  return (
    <>

<div className='main-container'>

<div className='sidebar'>

    To-do List
    History

</div>

<div className='main-activity'>

    <table>
     

        <tbody>
        
            <tr>
                <td placeholder='add activity' onChange={(e) => setActivity(e.target.value)}>{activity}</td>
                <td placeholder='add status' onChange={(e) => setStatus(e.target.value)}>{status}</td>
                
                
            
            </tr>
        </tbody>
    </table>



</div>

</div>
    </>
  )
}

export default AddTodo