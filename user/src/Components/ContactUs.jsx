
import  { useLayoutEffect, useState } from "react";
import Corespace_navbar from "./Corespace_Navigation/Corespace_navbar";
import Corespace_footer from "./Corespace_footer/Corespace_footer";
import axios from "axios";

function ContactUs() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    contactNumber: "",
    subject: "",
    message: "",
    Refer: "",
    preferredLocation: "",
    visitDate: "",
    budget: "",
    configuration: "",
    area: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // window.location.reload();
      // Send the form data to the backend
      const response = await axios.post("/api/property/leads", formData).then(async (response) => {
        if (response.data.success) {
          alert(response.data.message);

          const googleFormData = {
            "entry.455838840": formData.fullName,
            "entry.728196848": formData.emailId,
            "entry.2034244725": formData.contactNumber,
            "entry.587021357": formData.subject,
            "entry.799190995": formData.message,
            "entry.1506441273": formData.Refer,
            "entry.294442026": formData.preferredLocation,
            "entry.923813635": formData.visitDate,
            "entry.1974781562": formData.budget,
            "entry.29152889": formData.configuration,
            "entry.1437426984": formData.area,
          };

          const senddata = await axios.post("/api/property/submit-google-form", googleFormData);
          console.log("datatatata==>>>>", senddata)

          setFormData({ // Reset the form data
            fullName: "",
            emailId: "",
            contactNumber: "",
            subject: "",
            message: "",
            Refer: "",
            preferredLocation: "",
            visitDate: "",
            budget: "",
            configuration: "",
            area: "",
          });
        } else {
          // If success is false, show an error alert
          alert("Error submitting the lead. Please try again.");
        }

      })
    } catch (error) {
      console.error("There was an error submitting the lead:", error);
      alert("Error submitting the lead. Please try again.");
    }
  };

  return (
    <>
      <Corespace_navbar />
      <div className="">
        <div className="lg:m-10">
          <form
            onSubmit={handleSubmit}
            className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md p-6 shadow-xl lg:p-10 bg-purple-900"
          >
            <h1 className="mb-6 text-xl font-semibold lg:text-2xl text-yellow-300">
              Contact Us
            </h1>

            <div>
              <label className="text-white">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              />
            </div>

            <div>
              <label className="text-white">Email ID</label>
              <input
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                placeholder="Info@example.com"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              />
            </div>

            <div>
              <label className="text-white">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+543 5445 0543"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              />
            </div>

            <div>
              <label className="text-white">Area</label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              >
                <option value="" disabled>
                  Select Area
                </option>
                <option value="Hinjewadi">Hinjewadi</option>
                <option value="Wakad">Wakad</option>
                <option value="Baner">Baner</option>
                <option value="Pimple Saudagar">Pimple Saudagar</option>
                <option value="Kharadi">Kharadi</option>
                <option value="Viman Nagar">Viman Nagar</option>
                <option value="Hadapsar">Hadapsar</option>
                <option value="Magarpatta">Magarpatta</option>
                <option value="Balewadi">Balewadi</option>
                <option value="Aundh">Aundh</option>
              </select>
            </div>

            <div>
              <label className="text-white">Configuration</label>
              <select
                name="configuration"
                value={formData.configuration}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              >
                <option value="" disabled>
                  Select Configuration
                </option>
                <option value="RK">RK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="Office">Office</option>
                <option value="OpenSpace">OpenSpace</option>
                <option value="Plots">Plots</option>
                <option value="Garage">Garage</option>
              </select>
            </div>

            <div>
              <label className="text-white">Budget</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              >
                <option value="" disabled>
                  Select Budget
                </option>
                <option value="Below 10 Lakhs">Below 10 Lakhs</option>
                <option value="10 Lakhs - 20 Lakhs">10 Lakhs - 20 Lakhs</option>
                <option value="20 Lakhs - 50 Lakhs">20 Lakhs - 50 Lakhs</option>
                <option value="50 Lakhs - 1 Crore">50 Lakhs - 1 Crore</option>
                <option value="Above 1 Crore">Above 1 Crore</option>
              </select>
            </div>

            <div>
              <label className="text-white">Expected Visit Date</label>
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              />
            </div>

            <div>
              <label className="text-white">Preferred Location</label>
              <select
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              >
                <option value="" disabled>
                  Select Preferred Location
                </option>
                <option value="Hinjewadi">Hinjewadi</option>
                <option value="Wakad">Wakad</option>
                <option value="Baner">Baner</option>
                <option value="Kharadi">Kharadi</option>
                <option value="Viman Nagar">Viman Nagar</option>
                <option value="Hadapsar">Hadapsar</option>
                <option value="Aundh">Aundh</option>
                <option value="Balewadi">Balewadi</option>
                <option value="Magarpatta">Magarpatta</option>
              </select>
            </div>

            <div>
              <label className="text-white">Referred By</label>
              <input
                type="text"
                name="refer"
                value={formData.refer}
                onChange={handleChange}
                placeholder="Name"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              />
            </div>

            <div>
              <label className="text-white">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              />
            </div>

            <div>
              <label className="text-white">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="mt-2 h-32 w-full rounded-md bg-gray-100 px-3"
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="mt-5 w-full rounded-md bg-yellow-300 p-2 text-center font-semibold text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>



      <Corespace_footer />
    </>
  );
}

export default ContactUs;
