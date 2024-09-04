import React, { useEffect, useState } from "react";
import "./UpdateEmployee.scss";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const UpdateEmployee = () => {
  const [stateClick, setStateClick] = useState(false);
  const [cityClick, setCityClick] = useState(false);
  const [talukaClick, setTalukaClick] = useState(false);

  // this below fileds should be pushed in db
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [talukas, setTalukas] = useState([]);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  // const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [mobileNumber, setMobileNumber] = useState(0);
  const [salary, setSalary] = useState("");
  const [lastCompanyName, setLastCompanyName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAdress] = useState("");

  const navigate = useNavigate();
  const { paramId } = useParams();

  // const [emp, setEmp] = useState({});

  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [getTalukas, setGetTalukas] = useState([]);

  // Fething thing up

  useEffect(() => {
    // Fetch location data from the backend API
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/empRes");
        setLocations(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setState(state);

    // Find the selected state and update cities
    const location = locations.find((loc) => loc.addState === state);
    if (location) {
      setCities(location.addCities);
    } else {
      setCities([]); // Clear cities if no state matches
    }
  };

  useEffect(() => {
    if (state) {
      const location = locations.find((loc) => loc.addState === state);
      if (location) {
        setCities(location.addCities);
      } else {
        setCities([]);
      }

      setGetTalukas([]); // Reset talukas when state changes
    }
  }, [state, locations]);

  useEffect(() => {
    if (city) {
      const location = locations.find((loc) => loc.addState === state);
      if (location && location.addTalukas[city]) {
        setGetTalukas(location.addTalukas[city]);
      } else {
        setGetTalukas([]);
      }
    }
  }, [city, state, locations]);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setCity(city);
    const location = locations.find((loc) => loc.addState === state);
    if (location && location.addTalukas[city]) {
      setGetTalukas(location.addTalukas[city]);
    } else {
      setGetTalukas([]);
    }
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/emp/${paramId}`
        );
        const empData = response.data;

        setId(empData.id);
        setName(empData.name);
        setGender(empData.gender);
        setDesignation(empData.designation);
        setSkills(empData.skills);
        setMobileNumber(empData.mobileNumber);
        setSalary(empData.salary);
        setLastCompanyName(empData.lastCompanyName);
        setAdress(empData.address);
        setState(empData.state);
        setCity(empData.city);
        setTalukas(empData.talukas);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [paramId]);

  const handleUpdateEmployee = async () => {
    try {
      const data = {
        state,
        city,
        talukas,
        id,
        name,
        gender,
        designation,
        // skill,
        skills,
        mobileNumber,
        salary,
        lastCompanyName,
        address,
      };

      try {
        if (
          state === "" ||
          city === "" ||
          talukas.length == 0 ||
          id === 0 ||
          name === "" ||
          gender === "" ||
          designation === "" ||
          mobileNumber === 0 ||
          address === ""
        ) {
          alert("Please enter all the required fields!");
        } else {
          await axios.put(`http://localhost:5003/api/emp/${paramId}`, data);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        alert("Please enter all the required fields!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSkills((prevSkills) =>
      prevSkills.includes(value)
        ? prevSkills.filter((skill) => skill !== value)
        : [...prevSkills, value]
    );
  };

  // Just trying

  // const [state, setState] = useState("");
  // const [city, setCity] = useState("");
  // const [talukas, setTalukas] = useState([]);
  // const [selectedTalukas, setSelectedTalukas] = useState([]);

  // const [cities, setCities] = useState([]);
  // const [talukas, setTalukas] = useState([]);

  // const handleStateChange = (e) => {
  //   const selectedState = e.target.value;
  //   setState(selectedState);
  //   setCities(Object.keys(statesData[selectedState].cities));
  //   setCity(""); // Reset city and taluka when state changes
  //   setTaluka("");
  //   setTalukas([]);
  // };

  // const handleCityChange = (e) => {
  //   const selectedCity = e.target.value;
  //   setCity(selectedCity);
  //   setTalukas(statesData[state].cities[selectedCity]);
  //   setTaluka(""); // Reset taluka when city changes
  // };

  return (
    <div className="updateEmployee">
      <form>
        <div className="empInfo">
          <label className="required">Employee Id</label>
          <input
            value={id}
            type="number"
            placeholder="Id"
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="empInfo">
          <label className="required">Employee name</label>
          <input
            value={name}
            type="text"
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="empInfo">
          <label className="required">Mobile number</label>
          <input
            value={mobileNumber}
            type="number"
            placeholder="Mobile Number"
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        {/* <div className="empInfo">
          <label>Designation</label>
          <input
            type="text"
            placeholder="designation"
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
        </div> */}
        <div className="empInfo">
          <label className="required">Designation</label>
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          >
            <option value="">Select Designation</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Senior Software Engineer">
              Senior Software Engineer
            </option>
            <option value="Team Lead">Team Lead</option>
            <option value="Project Manager">Project Manager</option>
            <option value="AI/ML dev">AI/ML Developer</option>
            <option value="Dot Net Developer">Dot Net Developer</option>
          </select>
        </div>
        <div className="empInfo">
          <label>Salary</label>
          <input
            value={salary}
            type="number"
            placeholder="Salary"
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="empInfo">
          <label>Last company name</label>
          <input
            value={lastCompanyName}
            type="text"
            placeholder="Last company name"
            onChange={(e) => setLastCompanyName(e.target.value)}
          />
        </div>
        {/* <div className="empInfo">
          <label>Skill</label>
          <input
            type="text"
            placeholder="skills"
            onChange={(e) => setSkill(e.target.value)}
          />
        </div> */}
        {/* <div className="empInfo">
          <label className="required">Skills</label>
          <div className="skills">
            <label>
              <input
                type="checkbox"
                value="JavaScript"
                onChange={handleSkillChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                value="React"
                onChange={handleSkillChange}
              />
              React
            </label>
            <label>
              <input
                type="checkbox"
                value="Node.js"
                onChange={handleSkillChange}
              />
              Node.js
            </label>
            <label>
              <input
                type="checkbox"
                value="MongoDB"
                onChange={handleSkillChange}
              />
              MongoDB
            </label>
            <label>
              <input
                type="checkbox"
                value="ExpressJS"
                onChange={handleSkillChange}
              />
              Express js
            </label>
          </div>
        </div> */}
        <div className="empInfo">
          <label className="required">Skills</label>
          <div className="skills">
            <label>
              <input
                type="checkbox"
                value="JavaScript"
                onChange={handleSkillChange}
                checked={skills.includes("JavaScript")}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                value="React"
                onChange={handleSkillChange}
                checked={skills.includes("React")}
              />
              React
            </label>
            <label>
              <input
                type="checkbox"
                value="Node.js"
                onChange={handleSkillChange}
                checked={skills.includes("Node.js")}
              />
              Node.js
            </label>
            <label>
              <input
                type="checkbox"
                value="MongoDB"
                onChange={handleSkillChange}
                checked={skills.includes("MongoDB")}
              />
              MongoDB
            </label>
            <label>
              <input
                type="checkbox"
                value="ExpressJS"
                onChange={handleSkillChange}
                checked={skills.includes("ExpressJS")}
              />
              Express js
            </label>
          </div>
        </div>
        {/* <div className="empInfo">
          <label className="required">Gender</label>
          <div className="select">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                required
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                required
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
        </div> */}
        <div className="empInfo">
          <label className="required">Gender</label>
          <div className="select">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                required
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "male"}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                required
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "female"}
              />
              Female
            </label>
          </div>
        </div>
        <div className="empInfo">
          <label>Address</label>
          <input
            type="textarea"
            onChange={(e) => setAdress(e.target.value)}
            value={address}
          />
        </div>
        {/* <div className="empInfo">
          <div className="addInfo">
            <label className="required">State</label>
            <IoMdAdd
              style={{ cursor: "pointer" }}
              onClick={() => setStateClick(true)}
            />
          </div>
          <label>{state}</label>
        </div>
        <div className="empInfo">
          <div className="addInfo">
            <label className="required">City</label>
            <IoMdAdd
              style={{ cursor: "pointer" }}
              onClick={() => setCityClick(true)}
            />
          </div>
          <label>{city}</label>
        </div>
        <div className="empInfo">
          <div className="addInfo">
            <label className="required">Taluka</label>
            <IoMdAdd
              style={{ cursor: "pointer" }}
              onClick={() => setTalukaClick(true)}
            />
          </div>
          <label>{taluka}</label>
        </div> */}
        <div className="empInfo">
          {/* <lable className="required">State</lable>
          <div className="empContainer">
            <div className="left">
              <input
                type="text"
                placeholder="state"
                onChange={handleStateChange}
              />
            </div>
            <RiAddBoxLine className="right" />
          </div> */}
          <label className="required">Select or Enter State:</label>
          <input
            type="text"
            value={state}
            onChange={handleStateChange}
            placeholder="Enter state"
            list="stateList"
          />
          <datalist id="stateList">
            {locations.map((location) => (
              <option key={location.addState} value={location.addState} />
            ))}
          </datalist>
        </div>

        {state && (
          <div className="empInfo">
            <label className="required">Select City:</label>
            <select value={city} onChange={handleCityChange}>
              <option value="" disabled selected>
                Select City
              </option>
              {cities.length > 0 ? (
                cities.map((ct) => (
                  <option key={ct} value={ct}>
                    {ct}
                  </option>
                ))
              ) : (
                <option value="">No cities available</option>
              )}
            </select>
          </div>
        )}

        {city && (
          <div className="empInfo">
            <label>Select Taluka:</label>
            <select
              multiple
              value={talukas}
              onChange={(e) => {
                const options = e.target.options;
                const selectedValues = [];
                for (let i = 0; i < options.length; i++) {
                  if (options[i].selected) {
                    selectedValues.push(options[i].value);
                  }
                }
                setTalukas(selectedValues);
              }}
            >
              <option value="" disabled selected>
                Select Taluka
              </option>
              {getTalukas.map((taluka) => (
                <option key={taluka} value={taluka}>
                  {taluka}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
      <button onClick={handleUpdateEmployee}>Update Employee</button>

      {/* {stateClick && (
        <div className="popup">
          <div className="popupContent">
            <label>State</label>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              required
            />
            <button onClick={handleStateOk}>OK</button>
          </div>
        </div>
      )}

      {cityClick && (
        <div className="popup">
          <div className="popupContent">
            <label>City</label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <button onClick={handleCityOk}>OK</button>
          </div>
        </div>
      )}

      {talukaClick && (
        <div className="popup">
          <div className="popupContent">
            <label>Taluka</label>
            <input
              type="text"
              onChange={(e) => setTaluka(e.target.value)}
              required
            />
            <button onClick={handleTalukaOk}>OK</button>
          </div>
        </div>
      )} */}

      <Link className="link" to="/">
        <button className="homeBtn">Back to Home</button>
      </Link>
    </div>
  );
};

export default UpdateEmployee;
