/**
 *  here is two type of code to Validation of the mobile number based on the selected country code.
 *  first user select the country and enter the number 
 * secound if user enter the number country code automatically update according the enter number
 * 
 * please go and read README.md file to know more about the project 
 * 
 *  */


import React, { useState } from "react";
import './Login.css'; 
import sideImg from '../../Assets/ss.png'
const countries = [
  { name: "India", code: "+91", maxLength: 10 }, 
  { name: "US", code: "+1", maxLength: 10 }, 
  { name: "Canada", code: "+1", maxLength: 10 }, 
  { name: "Germany", code: "+49", maxLength: 11 }, 
  { name: "France", code: "+33", maxLength: 10 }, 
  { name: "Brazil", code: "+55", maxLength: 11 }, 
  { name: "Mexico", code: "+52", maxLength: 10 }, 
  
];

const countryPhoneRegex = {
  "+91": /^[6-9]\d{9}$/,
  "+1": /^[2-9]\d{2}[2-9](?!11)\d{6}$/, 
  "+49": /^[1-9]\d{10}$/, 
  "+33": /^[1-9]\d{8}$/, 
  "+55": /^[1-9]\d{10}$/, 
  "+52": /^[1-9]\d{9}$/,
};

const LoginPopup = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountryCode(selectedCountry);
    setError("");
    setSuccess("");
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;

    const selectedCountry = countries.find(country => country.code === countryCode);
    if (/^\d*$/.test(value) && value.length <= selectedCountry.maxLength) {
      setMobileNumber(value);
      setError("");
      setSuccess("");

      if (countryCode === "") {
        const firstDigit = value.charAt(0);
        if (firstDigit >= '6' && firstDigit <= '9') {
          setCountryCode("+91"); // India
        } else if (firstDigit === '1') {
          setCountryCode("+1"); // USA or Canada
        } else if (firstDigit === '3') {
          setCountryCode("+33"); // France
        } else if (firstDigit === '4') {
          setCountryCode("+49"); // Germany
        } else if (firstDigit === '5') {
          setCountryCode("+55"); // Brazil
        } else {
          setCountryCode("+91"); // Default to India if unknown
        }
      }
    }
  };

  const validateMobileNumber = () => {
    const trimmedMobileNumber = mobileNumber.trim();

    const regex = countryPhoneRegex[countryCode];

    if (!regex || !regex.test(trimmedMobileNumber)) {
      setError(`Number doesn't match with ${countryCode}`);
      setSuccess("");
      return;
    }

    setError("");
    setSuccess(`OTP sent to ${countryCode} ${trimmedMobileNumber}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (mobileNumber.length === 0) {
      setError("Please enter a mobile number.");
      return;
    }

    const firstDigit = mobileNumber.charAt(0);
    if (countryCode === "+91" && (firstDigit < '6' || firstDigit > '9')) {
      setError(`Number doesn't match with ${countryCode}`);
      return;
    } else if (countryCode === "+1" && (firstDigit < '2' || firstDigit === '1')) {
      setError(`Number doesn't match with ${countryCode}`);
      return;
    } else if (countryCode === "+33" && firstDigit !== '3') {
      setError(`Number doesn't match with ${countryCode}`);
      return;
    } else if (countryCode === "+49" && firstDigit !== '4') {
      setError(`Number doesn't match with ${countryCode}`);
      return;
    } else if (countryCode === "+55" && firstDigit !== '5') {
      setError(`Number doesn't match with ${countryCode}`);
      return;
    }

    validateMobileNumber();
  };

  return (
    <>
    <div className="main-container">
    <div className="img-container">
    <img src={sideImg} alt="" />
    </div>
    <div className="popup-container">
      <div className="popup">
        <h3 className="heading">Welcome to the
        family—your journey starts here!
        <span> AgentC.Global</span>
       </h3>

   
        {success && <p className="success-message">{success}</p>}

 
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <select value={countryCode} onChange={handleCountryChange} className="country-select">
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} {country.code}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            placeholder="Enter mobile number"
            className="mobile-input"
          />
        </div>

       
        <p className="p">By providing my mobile number, I agree to the and <span>Terms of Service </span> 
       and <span>Privacy Policy.</span> </p>
       <button className="btn" onClick={handleSubmit}>Get OTP</button>
      </div>
      </div>
    </div>
    </>
  );
};

export default LoginPopup;


// to view the output of secound code please comment first code and after uncomment secound code.

// import React, { useState } from "react";
// import './Login.css'; 

// const countries = [
//   { name: "India", code: "+91", maxLength: 10 }, 
//   { name: "US", code: "+1", maxLength: 10 }, 
//   { name: "Canada", code: "+1", maxLength: 10 }, 
//   { name: "Germany", code: "+49", maxLength: 11 },
//   { name: "France", code: "+33", maxLength: 10 },
//   { name: "Brazil", code: "+55", maxLength: 11 }, 
//   { name: "Mexico", code: "+52", maxLength: 10 }, 
// ];

// const countryPhoneRegex = {
//   "+91": /^[6-9]\d{9}$/, 
//   "+1": /^[2-9]\d{2}[2-9](?!11)\d{6}$/, 
//   "+49": /^[1-9]\d{10}$/, 
//   "+33": /^[1-9]\d{8}$/, 
//   "+55": /^[1-9]\d{10}$/,
//   "+52": /^[1-9]\d{9}$/, 
// };

// const LoginPopup = () => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [countryCode, setCountryCode] = useState("+91"); 
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleCountryChange = (event) => {
//     const selectedCountry = event.target.value;
//     setCountryCode(selectedCountry);
//     setMobileNumber(""); 
//     setError("");
//     setSuccess("");
//   };

//   const handleMobileNumberChange = (e) => {
//     const value = e.target.value;
//     const selectedCountry = countries.find(country => country.code === countryCode);

//     if (/^\d*$/.test(value) && value.length <= selectedCountry.maxLength) {
//       setMobileNumber(value);

//       if (value.length > 0) {
//         const firstDigit = value.charAt(0);
//         if (firstDigit >= '6' && firstDigit <= '9') {
//           setCountryCode("+91"); // India
//         } else if (firstDigit === '1') {
//           setCountryCode("+1"); // USA or Canada
//         } else if (firstDigit === '3') {
//           setCountryCode("+33"); // France
//         } else if (firstDigit === '4') {
//           setCountryCode("+49"); // Germany
//         } else if (firstDigit === '5') {
//           setCountryCode("+55"); // Brazil
//         } else {
//           setCountryCode("+91"); // Default to India if unknown
//         }
//       } else {
//         setCountryCode("+91"); 
//       }
//     }
//     setError("");
//     setSuccess("");
//   };

//   const validateMobileNumber = () => {
//     const trimmedMobileNumber = mobileNumber.trim();

//     const regex = countryPhoneRegex[countryCode];

//     if (!regex || !regex.test(trimmedMobileNumber)) {
//       setError(`Number doesn't match with ${countryCode}`);
//       setSuccess("");
//       return;
//     }

//     setError("");
//     setSuccess(`OTP sent to ${countryCode} ${trimmedMobileNumber}`);
//   };

//   return (
//     <div className="popup-container">
//       <div className="popup">
//         <h3>Login with Mobile Number</h3>

    
//         {success && <p className="success-message">{success}</p>}

     
//         {error && <p className="error-message">{error}</p>}

//         <div className="input-group">
//           <select value={countryCode} onChange={handleCountryChange} className="country-select">
//             {countries.map((country) => (
//               <option key={country.code} value={country.code}>
//                 {country.name} {country.code}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             value={mobileNumber}
//             onChange={handleMobileNumberChange}
//             placeholder="Enter mobile number"
//             className="mobile-input"
//           />
//         </div>

//         <button onClick={validateMobileNumber}>Get OTP</button>
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;


