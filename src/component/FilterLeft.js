import React, { useState, useEffect, useRef } from "react";

import Table from "./Table";
const FilterLeft = () => {

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [suggestionPro, setSuggestionPro] = useState(false);
  const [suggestionCom, setSuggestionCom] = useState(false);
  const [suggestionCoun, setSuggestionCoun] = useState(false);

  let pro = useRef(null);
  let company = useRef(null);
  let count = useRef(null);

  const [data, setData] = useState([]);
  const [dropdata, setDropData] = useState([]);
  const [temp, setTemp] = useState([]);
  const[tableData,setTableData]=useState([]);
  const [allData, setAllData] = useState([]);

  const [dependentCom, setDependentCom] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/tabledata").then((result) => {
      result.json().then((resp) => {
        setData(resp);
        setDropData(resp);
        setTemp(resp);
        setAllData(resp);
      });
    });
  }, []);

  function showAll() {
    setDropData(data);
    setShow(true);
    setSuggestionCoun(false);
    setTableData(data);
    setShow1(true);
  }
  function searchUpdateProject(e) {
    if (e !== "") {
      setSuggestionPro(true);
    } else {
      setSuggestionPro(false);
    }
    setDropData("");
    const item = data.filter((val) => {
      if (val.projectname.includes(e)) {
        return val.projectname;
      }
    });
    setDropData(item);
    
  }
  function searchUpdateCompany(e) {
    if (e !== "") {
      setSuggestionCom(true);
      const item = dropdata.filter((val) => {
        if (val.company.includes(e)) {
          return val.company;
        }
      });
      setDropData(item);
    } else {
      setSuggestionCom(false);
      setDropData(temp);
    }
  }
  function searchUpdateCountry(e) {
    if (e !== "") {
      setSuggestionCoun(true);
    } else {
      setSuggestionCoun(false);
    }
    const item = dropdata.filter((val) => {
      if (val.country.includes(e)) {
        return val.country;
      }
    });
    setDropData(item);
    if (e === "") {
      setDropData(temp);
    }
  }
  function setTableDataPro(e) {
    const temp = dropdata;
    pro.current.value = e.target.innerText;
    setSuggestionPro(false);
    const item = data.filter((val) => {
      if (val.projectname === pro.current.value) {
        return val.projectname;
      }
    });
    setDropData(item);
    setTemp(item);
    if (e.target.innerText === "") {
      setDropData(temp);
    }
  }
  function setTableDataCom(e) {
    const temp = dropdata;
    company.current.value = e.target.innerText;
    setSuggestionCom(false);
    const item = data.filter((val) => {
      
      if (val.company === company.current.value) {
        console.log(val);
        return val.company;
      }
    });
    setDropData(item);
    if (e.target.innerText === "") {
      setDropData(temp);
    }
  }
  function setTableDataCountry(e) {
    count.current.value=e.target.innerText;
    if(e.target.name!==undefined){
      count.current.value=e.target.name;
    }
    const temp=dropdata;
    setSuggestionCoun(false);
    const item = data.filter((val) => {
      if (val.country===(count.current.value)) {
        return val.country;
      }
    });
    setDropData(item);
    if(e.target.innerText===""){
      setDropData(temp);
    }
    if(item!==""){
      setTemp(item);
    }
  }
  function showAdditonal() {
    setSuggestionCoun(!suggestionCoun)
    if (company.current.value !== "" || pro.current.value !== "") {
      setDropData(temp);
    } else {
      setDropData(data);
    }

    if(company.current.val===undefined && pro.current.value===''){
      let tempArr=[];
    const newData=dropdata.filter((val)=>{
      if(!tempArr.includes(val.country)){
        tempArr.push(val.country);
        return val;
      }
    })
    setDropData(newData);
    }
  }
  function applyTableData(e) {
    e.preventDefault();
    
    if(dropdata.length==0){
      setTableData(temp);
    }else{
      setTableData(dropdata);
    }
    setShow1(true);
  }
  function funcShow(){
    setShow(false);
    setShow1(false);
    setTableData(data);
  }
  function clearFilter(){
    setDropData(allData);
    setTableData(allData);
    setData(allData);
    pro.current.value='';
    company.current.value='';
    count.current.value='';
  }
  return (
    <div>
      <div className="btn">
        <button onClick={showAll}>Filter</button>
      </div>
      <div className="main">
        {show && (
          <div className="filter">
            <div className="upper">
              <div className="header-sec">Filter</div>
              <div style={{ cursor: "pointer",color:'red' }} onClick={() => funcShow()}>
                X
              </div>
            </div>
            <div style={{marginTop:'5px'}}>
              <input
                ref={pro}
                type="text"
                placeholder="Enter Project Name"
                onChange={(e) => searchUpdateProject(e.target.value)}
              />
              {suggestionPro && (
                <div className="add-listPro">
                  {dropdata !== "" &&
                    dropdata.map((item, idx) => {
                      return (
                        <div key={idx}
                          style={{ marginBottom: "5px", cursor: "pointer" }}
                          onClick={(e) => setTableDataPro(e)}
                        >
                          {item.projectname}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div style={{marginTop:'5px',marginBottom:'10px'}}>
              <input
                ref={company}
                type="text"
                placeholder="Enter Company Name"
                onChange={(e) => searchUpdateCompany(e.target.value)}
              />

              {suggestionCom && (
                <div className="add-listCom">
                  {dropdata !== "" &&
                    dropdata.map((item, idx) => {
                      return (
                        <div
                          className="company"
                          style={{ marginBottom: "5px", cursor: "pointer" }}
                          onClick={(e) => setTableDataCom(e)}
                        >
                          {item.company}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div>
              <div className="country">
              <input type="text" ref={count} placeholder="Enter Country Name" onChange={(e)=>searchUpdateCountry(e.target.value)}/>
              <div className='plus' onClick={()=>showAdditonal()}>+</div>
              </div>
              {suggestionCoun && (
                <div className="add-listCom">
                  {dropdata !== "" &&
                    dropdata.map((item, idx) => {
                      return (
                        <div className="country-list" onClick={(e)=>setTableDataCountry(e)}>
                          <input type="checkbox" name={item.country} onClick={(e)=>setTableDataCountry(e)}/>
                          <label key={idx} style={{display:'inline-block'}}>{item.country}</label>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <button onClick={(e)=>applyTableData(e)}>Filter</button>
            <button onClick={clearFilter}>Clear</button>
          </div>
        )}
        <div>
          <Table tbldata={tableData} show1={show1}/>
        </div>
      </div>
    </div>
  );
};


export default FilterLeft;
