import { useEffect, useLayoutEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useLayoutEffect(() => {
    async function getVehiclesList() {
      try {
        const response = await fetch("http://localhost:3001/api/allVehicle");
        const result = await response.json();
        if (result.status) {
          setVehiclesList(result.data);
        }
      } catch (err) {
        alert(err.message);
      }
    }
    if (!isModalOpen) getVehiclesList();
  }, [isModalOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async () => {
    for (let key in formData) {
      console.log("🚀 ~ handleSubmit ~ key:", key);
      if (!formData[key]) {
        alert("Add details for " + key);
        return;
      }
    }
    try {
      const response = await fetch("http://localhost:3001/api/addVehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.status) {
        alert(result.message);
        handleModal();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main>
      <div
        style={{
          display: isModalOpen ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#ccc",
          position: "absolute",
          zIndex: 10000,
          padding: "50px",
          rowGap: "16px",
          width: "50%",
          height: "50%",
          left: "25%",
          borderRadius: "16px",
        }}
      >
        <div>
          <label htmlFor="vehicleId"> Vehicle Id</label>
          <input
            type="text"
            id="vehicleId"
            name="vehicle_id"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="vin"> VIN</label>
          <input type="text" id="vin" name="vin" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="make"> Make</label>
          <input type="text" id="make" name="make" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="model"> Model</label>
          <input type="text" id="model" name="model" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="year"> Year</label>
          <input type="text" id="year" name="year" onChange={handleChange} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            columnGap: "16px",
          }}
        >
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleModal}>Close</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>List Of Vehicles</h4>
        <button onClick={handleModal}>Add New</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>Vehicle_Id</td>
              <td>Vin</td>
              <td>Make</td>
              <td>Model</td>
              <td>Year</td>
            </tr>
          </thead>
          <tbody>
            {vehiclesList.map((item) => (
              <tr>
                <td>{item.vehicle_id}</td>
                <td>{item.vin}</td>
                <td>{item.make}</td>
                <td>{item.model}</td>
                <td>{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
