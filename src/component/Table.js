import React, { useState, useEffect,useRef } from "react";
import "./tablestyle.css";
const Table = ({ tbldata, show1 }) => {

  const [addPro, setAddPro] = useState(false);
  const [addCount, setAddCount] = useState(false);
  const [addComp, setAddComp] = useState(false);
  const [showCountry, setShowCountry] = useState(false);

  let pro = useRef(null);
  let company = useRef(null);
  let count = useRef(null);

  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableDataFirst, setTableDataFirst] = useState([]);
  const [data, setData] = useState([]);
  const [dropdata, setDropData] = useState([]);
  const [allData, setAllData] = useState([]);
  // const [dropdatacompany, setDropDataCompany] = useState([]);
  // const [dropdatacountry, setDropDataCountry] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/tabledata").then((result) => {
      result.json().then((resp) => {
        setData(resp);
        setTableData(resp);
        setDropData(resp);
        setAllData(resp);
      });
    });
  }, []);
  function searchUpdateProject(e) {
    if (e !== "") {
      setShow(true);
    } else {
      setShow(false);
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
      setShow(true);
    } else {
      setShow(false);
    }

    const item = data.filter((val) => {
      if (val.company.includes(e)) {
        return val.company;
      }
    });
    setDropData(item);
  }
  function searchUpdateCountry(e) {
    setShowCountry(true);
    const item = data.filter((val) => {
      if (val.country.includes(e)) {
        return val.country;
      }
    });
    setDropData(item);
  }
  function showAdditonal() {
    setShowCountry(!showCountry);
    let tempArr = [];
    const newData = dropdata.filter((val) => {
      if (!tempArr.includes(val.country)) {
        tempArr.push(val.country);
        return val;
      }
    });
    setDropData(newData);
    if(show1){
        setDropData(tbldata)
    }
  }
  function setTableDataF(e) {
    const item = data.filter((val) => {
      if (
        e.target.className === "projectname" &&
        val.projectname.includes(e.target.innerText)
      ) {
        return val;
      } else if (
        e.target.className === "company" &&
        val.company.includes(e.target.innerText)
      ) {
        return val;
      }
    });
    setShow(false);
    setTableDataFirst(item);
  }
  function applyTableData() {
    // setAddPro(false);
    setTableData(tableDataFirst);
    setDropData(tableDataFirst);
    setData(tableDataFirst);
  }
  function setTableDataCountry(e) {
    count.current.value=e.target.innerText;
    if(e.target.name!==undefined){
      count.current.value=e.target.name;
    }
    setShowCountry(false);
    const temp=dropdata;
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
        setTableDataFirst(item);
    }
    
  }
  function clearFilter(){
    setDropData(allData);
    setTableData(allData);
    setData(allData);
  }
  return (
    <div className="table">
      <table style={{ width: "100%" }}>
        <thead>
          <tr className="tbl-head">
            <th>Project Ref. No</th>
            <th>
              Project Name{" "}
              <span onClick={() => setAddPro(!addPro)}>
                {addPro ? "-" : "+"}
              </span>
              {addPro && (
                <div className="dropdownProject">
                  <div>Enter Project Name</div>
                  <div>
                    <input
                      type="text"
                      onChange={(e) => searchUpdateProject(e.target.value)}
                      style={{ width: "120px" }}
                    />
                  </div>
                  {show && (
                    <div className="add-list">
                      {dropdata !== "" &&
                        dropdata.map((item, idx) => {
                          return (
                            <div
                              className="projectname"
                              key={idx}
                              onClick={(e) => setTableDataF(e)}
                            >
                              {item.projectname}
                            </div>
                          );
                        })}
                    </div>
                  )}
                  <div>
                    <button onClick={applyTableData}>Filter</button>
                    <button onClick={clearFilter}>Clear</button>
                  </div>
                </div>
              )}
            </th>
            <th>
              Company Name{" "}
              <span onClick={() => setAddComp(!addComp)}>
                {addComp ? "-" : "+"}
              </span>
              {addComp ? (
                <div className="dropdownCompany">
                  <div>Enter Company Name</div>
                  <div>
                    <input
                      type="text"
                      onChange={(e) => searchUpdateCompany(e.target.value)}
                      style={{ width: "120px" }}
                    />
                  </div>
                  {show && (
                    <div className="add-list">
                      {dropdata !== "" &&
                        dropdata.map((item, idx) => {
                          return (
                            <div
                              className="company"
                              key={idx}
                              onClick={(e) => setTableDataF(e)}
                            >
                              {item.company}
                            </div>
                          );
                        })}
                    </div>
                  )}
                  <div>
                    <button onClick={applyTableData}>Filter</button>
                    <button onClick={clearFilter}>Clear</button>
                  </div>
                </div>
              ) : null}
            </th>
            <th>
              Country
              <span onClick={() => setAddCount(!addCount)}>
                {addCount ? "-" : "+"}
              </span>
              {addCount ? (
                <div className="dropdownCountry">
                  <div>Enter Country Name</div>
                  <div>
                    <div className="country">
                      <input
                      ref={count}
                        type="text"
                        placeholder="Search Country"
                        onChange={(e) => searchUpdateCountry(e.target.value)}
                      />
                      <div className="plus" onClick={() => showAdditonal()}>
                        +
                      </div>
                    </div>
                    {showCountry && (
                      <div className="add-list">
                        {dropdata !== "" &&
                          dropdata.map((item, idx) => {
                            return (
                              <div className="country-list">
                                <input type="checkbox" name={item.country} onClick={(e)=>setTableDataCountry(e)}/>
                                <label onClick={(e)=>setTableDataCountry(e)}>{item.country}</label>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  <div>
                    <button onClick={applyTableData}>Filter</button>
                    <button onClick={clearFilter}>Clear</button>
                  </div>
                </div>
              ) : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {!show1
            ? tableData.map((project, idx) => (
                <tr key={idx}>
                  <td>{project.projectref}</td>
                  <td>{project.projectname}</td>
                  <td>{project.company}</td>
                  <td>{project.country}</td>
                </tr>
              ))
            : tbldata.map((project, idx) => (
                <tr key={idx}>
                  <td>{project.projectref}</td>
                  <td>{project.projectname}</td>
                  <td>{project.company}</td>
                  <td>{project.country}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
