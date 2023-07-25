import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Verification Code
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); // Use the AuthContext

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e, index) => {
    const code = e.target.value.replace(/[^0-9]/g, ""); // Only allow numeric input

    setVerificationCode((prevCodes) => {
      const newCodes = [...prevCodes];
      newCodes[index] = code;
      return newCodes;
    });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform email submission logic and send verification code
    setLoading(false);
    setStep(2); // Proceed to Step 2: Verification Code
  };

  const handleSubmitVerificationCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform verification code submission logic
    setLoading(false);
    toast.success("Verification successful!");
    navigate("/reset-password"); // Redirect to the reset password page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-lg">
        {step === 1 ? (
          <form onSubmit={handleSubmitEmail}>
            <h2 className="text-xl text-slate-700 font-semibold mb-6 text-center">
              Forgot Password?
            </h2>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500"
                value={email}
                placeholder="enter email address"
                onChange={handleEmailChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-500"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitVerificationCode}>
            <div className="mb-4">
              <h2 className="text-xl text-slate-700 font-semibold mb-6 text-center">
                Enter Verification Code
              </h2>

              <div className="flex items-center justify-center">
                {verificationCode.map((code, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`verificationCode-${index}`}
                    maxLength="1"
                    className="w-10 h-10 mx-1 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-slate-500"
                    value={code}
                    onChange={(e) => handleVerificationCodeChange(e, index)}
                    required
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-slate-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-500"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
