import React, { useEffect, useState } from "react";
import "./SingleEmp.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleEmp = () => {
  const [singleEmp, setSingleEmp] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getSingleEmp = async () => {
      try {
        const res = await axios.get(`http://localhost:5003/api/emp/${id}`);
        setSingleEmp(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleEmp();
  }, []);

  console.log(singleEmp);

  return (
    <div className="singleEmp">
      <div className="info">
        <span>id:</span>
        <span>{singleEmp.id}</span>
      </div>
      <div className="info">
        <span>Employee Name:</span>
        <span>{singleEmp.name}</span>
      </div>
      <div className="info">
        <span>Mobile Number:</span>
        <span>{singleEmp.mobileNumber}</span>
      </div>
      <div className="info">
        <span>Designation:</span>
        <span>{singleEmp.designation}</span>
      </div>
      <div className="info">
        <span>Salary:</span>
        <span>{singleEmp.salary}</span>
      </div>
      <div className="info">
        <span>Last company name:</span>
        <span>{singleEmp.lastCompanyName}</span>
      </div>
      <div className="info">
        <span>Skills:</span>
        {/* <span>{singleEmp.skills}</span> */}
        {singleEmp.skills ? singleEmp.skills.join(", ") : "No skills available"}
      </div>
      <div className="info">
        <span>Address:</span>
        <span>{singleEmp.address}</span>
      </div>
      <div className="info">
        <span>Gender:</span>
        <span>{singleEmp.gender}</span>
      </div>
      <div className="info">
        <span>State:</span>
        <span>{singleEmp.state}</span>
      </div>
      <div className="info">
        <span>City:</span>
        <span>{singleEmp.city}</span>
      </div>
      <div className="info">
        <span>Taluka:</span>
        <span>{singleEmp.talukas}</span>
      </div>
    </div>
  );
};

export default SingleEmp;
