import React, { useState } from "react";
import axios from "axios";

const PsychologistRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    password: "",
    specialties: [],
    experience: "",
    location: "",
    availability: [],
    rating: "3",
    imageUrl: "",
    description: "",
    timings: {},
    fees: "",
    education: "",
    languagesSpoken: [],
    zoomLink: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const timeOptions = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
    "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contactInfo")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        contactInfo: { ...prevState.contactInfo, [field]: value },
      }));
    } else if (name === "languagesSpoken") {
      const languages = value.split(',').map(lang => lang.trim());
      setFormData((prevState) => ({
        ...prevState,
        languagesSpoken: languages,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSpecialtiesChange = (e) => {
    const specialties = e.target.value.split(",");
    setFormData((prevState) => ({
      ...prevState,
      specialties,
    }));
  };

  const handleAvailabilityChange = (index, key, value) => {
    setFormData((prevState) => {
      const updatedTimings = { ...prevState.timings };
      const updatedAvailability = [...prevState.availability];

      if (key === "day") {
        const previousDay = updatedAvailability[index];
        if (previousDay && updatedTimings[previousDay]) delete updatedTimings[previousDay];

        updatedAvailability[index] = value;
        updatedTimings[value] = updatedTimings[value] || { start: "", end: "" };
      } else {
        const currentDay = updatedAvailability[index];
        if (currentDay) {
          updatedTimings[currentDay][key] = value;
        }
      }

      return {
        ...prevState,
        timings: updatedTimings,
        availability: updatedAvailability.slice(0, 2), // Restrict to two days only
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      timings: Object.fromEntries(
        formData.availability
          .filter(day => day && formData.timings[day])
          .map(day => [day, `${formData.timings[day].start} - ${formData.timings[day].end}`])
      )
    };

    try {
      await axios.post(
        "http://localhost:3000/api/psychologists",
        dataToSend
      );
      setSuccessMessage("Psychologist registered successfully!");
      setErrorMessage(""); // Clear error message on successful registration

      // Reset the form data after successful registration
      setFormData({
        name: "",
        contactInfo: {
          phone: "",
          email: "",
        },
        password: "",
        specialties: [],
        experience: "",
        location: "",
        availability: [],
        rating: "3",
        imageUrl: "",
        description: "",
        timings: {},
        fees: "",
        education: "",
        languagesSpoken: [],
        zoomLink: "",
      });
    } catch (error) {
      console.error("Error registering psychologist:");

      if (error.response && error.response.status === 400) {
        setErrorMessage("Psychologist with this email, name, or password already exists.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
      setSuccessMessage(""); // Clear success message on failed registration
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="success-message-box" style={{marginLeft: "360px", marginTop: "30px"}}>
          Registration Successful! You can now log in.
        </div>
      )}
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="contactInfo.phone"
              placeholder="Enter your phone number"
              value={formData.contactInfo.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="contactInfo.email"
              placeholder="Enter your email"
              value={formData.contactInfo.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="specialties"
              value={formData.specialties.join(",")}
              onChange={handleSpecialtiesChange}
              placeholder="Enter your specialties: 'anxiety, depression'"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="experience"
              placeholder="Your experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          {["day1", "day2"].map((_, index) => (
            <div className="form-group" key={`availability-${index}`}>
              <select
                onChange={(e) => handleAvailabilityChange(index, "day", e.target.value)}
                value={formData.availability[index] || ""}
                required
              >
                <option value="">Day</option>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                  .filter(day => !formData.availability.includes(day) || formData.availability[index] === day)
                  .map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
              </select>

              <select
                onChange={(e) => handleAvailabilityChange(index, "start", e.target.value)}
                value={formData.timings[formData.availability[index]]?.start || ""}
                required
              >
                <option value="">Start Time</option>
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>

              <select
                onChange={(e) => handleAvailabilityChange(index, "end", e.target.value)}
                value={formData.timings[formData.availability[index]]?.end || ""}
                required
              >
                <option value="">End Time</option>
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          ))}

          <input type="hidden" name="rating" value={formData.rating} />

          <div className="form-group">
            <input
              type="text"
              name="location"
              placeholder="Enter your location: 'City, State'"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your expertise"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="fees"
              placeholder="Appointment fees"
              value={formData.fees}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="education"
              placeholder="Education details"
              value={formData.education}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="languagesSpoken"
              value={formData.languagesSpoken.join(", ")}
              onChange={handleChange}
              placeholder="Languages Known: 'Japanese, English'"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="zoomLink"
              placeholder="Enter your zoom Link"
              value={formData.zoomLink}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="submit-btn">
              Register
            </button>
          </div>

          {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
        </form>
        <style>
      {`
        body {
  background-color: #E6E6FA;
}

.register-container {
  width: 750px;
  margin: 10px auto;
  padding: 20px;
  border: 2px solid #4CAF50;
  background-color: #F5F5F5;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
}

form {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  gap: 15px; /* gap between the input fields */
  width: 80%;
  align-items: center;
}

.form-group input {
  padding: 10px;
  width: 92%;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px solid #4CAF50;
}

.form-group textarea {
  padding: 20px;
  width: 85%;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px solid #4CAF50;
  resize: none;
}

.form-group select {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px solid #4CAF50;
}

.submit-btn {
  grid-column: span 2; /* make the button span across both columns */
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  margin-left: 150px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  width: 100%;
}

.submit-btn:hover {
  background-color: #45a049;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.success-message-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  margin-bottom: 0px;
  text-align: center;
  animation: fadeIn 0.5s ease, slideDown 0.5s ease;
}

      `}
      </style>
      </div>
    </div>
  );
};

export default PsychologistRegister;
