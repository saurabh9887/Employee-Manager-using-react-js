import React, { useEffect, useState } from "react";
import "./AddEmployee.scss";
import { IoMdAdd } from "react-icons/io";
import { RiAddBoxLine } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddEmployee = () => {
  // const [selectedTalukas, setSelectedTalukas] = useState([]);

  // const [stateClick, setStateClick] = useState(false);
  // const [cityClick, setCityClick] = useState(false);
  // const [talukaClick, setTalukaClick] = useState(false);

  // this below fileds should be pushed in db
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  // const [taluka, setTaluka] = useState("");

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

  // const [emp, setEmp] = useState({});

  const navigate = useNavigate();

  // console.log(state);

  // Fetching all the cities corresponding to the state

  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [getTalukas, setGetTalukas] = useState([]);

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
    setCity("");

    // Find the selected state and update cities
    const location = locations.find((loc) => loc.addState === state);
    if (location) {
      setCities(location.addCities);
    } else {
      setCities([]); // Clear cities if no state matches
    }
  };

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

  // console.log(getTalukas);

  // const handleTalukaChange = (e) => {
  //   const value = e.target.value;
  //   setSelectedTalukas((prevSelected) =>
  //     prevSelected.includes(value)
  //       ? prevSelected.filter((taluka) => taluka !== value)
  //       : [...prevSelected, value]
  //   );
  // };

  // const [takeState, setTakeState] = useState("");
  // console.log(state);

  // const handleState = () => {
  //   useEffect(() => {
  //     const saveState
  //   });
  // };

  const [talukas, setTalukas] = useState([]);

  const handleSaveEmployee = async () => {
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

      console.log(data);

      try {
        if (state === "" || city === "" || talukas.length === 0) {
          alert("Please enter all the required fields!");
        } else {
          await axios.post("http://localhost:5003/api/emp/add", data);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        alert("Please enter all the required fields!");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
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

  // const handleStateOk = () => {
  //   setStateClick(false);
  // };

  // const handleCityOk = () => {
  //   setCityClick(false);
  // };

  // const handleTalukaOk = () => {
  //   setTalukaClick(false);
  // };

  // console.log(skills);

  // Just trying

  // const statesData = {
  //   Maharashtra: {
  //     cities: {
  //       Mumbai: ["Andheri", "Bandra", "Juhu"],
  //       Pune: ["Shivajinagar", "Kothrud", "Hadapsar"],
  //     },
  //   },
  //   Gujarat: {
  //     cities: {
  //       Ahmedabad: ["Navrangpura", "Maninagar", "Chandkheda"],
  //       Surat: ["Adajan", "Katargam", "Vesu"],
  //     },
  //   },
  //   TamilNadu: {
  //     cities: {
  //       Chennai: ["T. Nagar", "Adyar", "Tambaram"],
  //       Coimbatore: ["Gandhipuram", "RS Puram", "Peelamedu"],
  //     },
  //   },
  // };

  return (
    <div className="addEmployee">
      <form>
        <div className="empInfo">
          <label className="required">Employee Id</label>
          <input
            type="text"
            placeholder="id"
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="empInfo">
          <label className="required">Employee name</label>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="empInfo">
          <label className="required">Mobile number</label>
          <input
            type="number"
            placeholder="mobile Number"
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        {/* <div className="empInfo">
          <label className="required">Designation</label>
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
            type="number"
            placeholder="salary"
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="empInfo">
          <label>Last company name</label>
          <input
            type="text"
            placeholder="last com name"
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
        <div className="empInfo">
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
        </div>
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
        </div>
        <div className="empInfo">
          <label className="required">Address</label>
          <input
            type="textarea"
            placeholder="Address"
            onChange={(e) => setAdress(e.target.value)}
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

        {/* State select option coloume */}

        {/* <div className="empInfo">
          <label className="required">State</label>
          <select
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setCity(""); // Reset city and taluka when state changes
              setTaluka("");
            }}
            required
          >
            <option value="">Select State</option>
            {Object.keys(statesData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
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
            <select onChange={handleCityChange}>
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
            <label>Select Talukas:</label>
            <select
              multiple
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
                Select Talukas
              </option>
              {getTalukas.map((taluka) => (
                <option key={taluka} value={taluka}>
                  {taluka}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* {state && (
          <div className="empInfo">
            <label className="required">City</label>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setTaluka(""); // Reset taluka when city changes
              }}
              required
            >
              <option value="">Select City</option>
              {Object.keys(statesData[state].cities).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}

        {city && (
          <div className="empInfo">
            <label className="required">Taluka</label>
            <select
              value={taluka}
              onChange={(e) => setTaluka(e.target.value)}
              required
            >
              <option value="">Select Taluka</option>
              {statesData[state].cities[city].map((taluka) => (
                <option key={taluka} value={taluka}>
                  {taluka}
                </option>
              ))}
            </select>
          </div>
        )} */}
      </form>
      <button onClick={handleSaveEmployee}>Add Employee</button>

      {/* <div className="popup">
        <div className="popupContent">
          <label>State</label>
          <input type="text" onChange={(e) => setState(e.target.value)} />
          <button onClick={handleStateOk}>OK</button>
        </div>
      </div> */}

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

export default AddEmployee;
