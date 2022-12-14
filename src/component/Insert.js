import React,{useState,useEffect} from 'react'
import axios from "axios";
const Insert = () => {
    const [val, setVal] = useState({
        projectref: '',
        projectname: '',
        country: '',
        company: '',
      });
      function changeData(e) {
        setVal({ ...val, [e.target.name]: e.target.value });
      }
      const PostData = async (e) => {
        e.preventDefault();
            const {
                projectref,
                projectname,
                country,
                company
            } = val;
            const { data } = await axios.post(
              "machintestbackend-production.up.railway.app/insert",
              {
                projectref,
                projectname,
                country,
                company
              }
            );
            if (data.status) {
              alert(data.msg);
            }
      };
  return (
    <div>
      <h1>Data Entry</h1>
      <div>
        <input type="text" onChange={(e) => changeData(e)} name="projectref" placeholder='Enter Reference No' /><br /><br />
        <input type="text" onChange={(e) => changeData(e)} name="projectname" placeholder='Enter Project Name' /><br /><br />
        <input type="text" onChange={(e) => changeData(e)} name="company" placeholder='Enter Company Name' /><br /><br />
        <input type="text" onChange={(e) => changeData(e)} name="country" placeholder='Enter Country Name' /><br /><br />
        <button onClick={(e)=>PostData(e)}>Save</button>
      </div>
    </div>
  )
}

export default Insert
