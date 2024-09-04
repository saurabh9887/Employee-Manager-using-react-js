import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/emp");
        setEmployee(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployee();
  }, []);

  console.log(employee);

  const handleDelete = async (id) => {
    try {
      axios.delete(`http://localhost:5003/api/emp/${id}`);
      setEmployee(employee.filter((emp) => emp._id !== id));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <table>
        <thead>
          <tr>
            <th>Emp Id</th>
            <th>Emp name</th>
            <th>Mobile no</th>
            <th>Designation</th>
            <th>State</th>
            <th>City</th>
            <th>Talukas</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.mobileNumber}</td>
              <td>{emp.designation}</td>
              <td>{emp.state}</td>
              <td>{emp.city}</td>
              <td>{emp.talukas}</td>
              <td>
                <div className="actionBtn">
                  <Link className="link" to={`/show/${emp._id}`}>
                    <button className="view">View</button>
                  </Link>
                  <Link className="link" to={`/edit/${emp._id}`}>
                    <button className="edit">Edit</button>
                  </Link>
                  <button
                    className="delete"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add">
        <button>Add employee</button>
      </Link>
    </div>
  );
};

export default Home;
