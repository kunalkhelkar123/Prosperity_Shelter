import { useLayoutEffect, useState } from "react";
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
      const response = await axios
        .post("/api/property/leads", formData)
        .then(async (response) => {
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

            const senddata = await axios.post(
              "/api/property/submit-google-form",
              googleFormData
            );
            console.log("datatatata==>>>>", senddata);

            setFormData({
              // Reset the form data
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
        });
    } catch (error) {
      console.error("There was an error submitting the lead:", error);
      alert("Error submitting the lead. Please try again.");
    }
  };

  return (
    <>
      <Corespace_navbar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 py-10">
        <div className="w-full max-w-[75%] bg-white rounded-lg shadow-lg lg:p-10 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
                  required
                />
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email ID
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  placeholder="info@example.com"
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+91 12345 67890"
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
                  required
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Contact Method
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
                  required
                >
                  <option value="" disabled>
                    Choose Method
                  </option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Area
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
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

              {/* Configuration */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Configuration
                </label>
                <select
                  name="configuration"
                  value={formData.configuration}
                  onChange={handleChange}
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
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

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Budget
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
                  required
                >
                  <option value="" disabled>
                    Select Budget
                  </option>
                  <option value="Below 10 Lakhs">Below 10 Lakhs</option>
                  <option value="10 Lakhs - 20 Lakhs">
                    10 Lakhs - 20 Lakhs
                  </option>
                  <option value="20 Lakhs - 50 Lakhs">
                    20 Lakhs - 50 Lakhs
                  </option>
                  <option value="50 Lakhs - 1 Crore">50 Lakhs - 1 Crore</option>
                  <option value="Above 1 Crore">Above 1 Crore</option>
                </select>
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expected Visit Date
                </label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
                  required
                />
              </div>

              {/* Reason for Inquiry */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reason for Inquiry
                </label>
                <select
                  name="inquiryReason"
                  value={formData.inquiryReason}
                  onChange={handleChange}
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
                  required
                >
                  <option value="" disabled>
                    Select Reason
                  </option>
                  <option value="Buying Property">Buying Property</option>
                  <option value="Selling Property">Selling Property</option>
                  <option value="Renting">Renting</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Message Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="mt-2 block w-full h-32 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Corespace_footer />
    </>
  );
}

export default ContactUs;
