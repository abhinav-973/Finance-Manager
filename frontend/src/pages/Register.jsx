import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeField, setActiveField] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setServerError("");
      await axios.post("http://localhost:5000/auth/register", formData);
      setSuccess(true);
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Background FX */}
      <div className="bg-effect-left" />
      <div className="bg-effect-right" />
      <div className="noise-overlay"></div>

      <div className="register-card">
        {/* LEFT PANEL */}
        <div className="register-left">
          <div className="relative z-10">
            <div className="brand-header">
              <div className="brand-icon">
                <Sparkles size={16} className="text-black fill-black" />
              </div>
              <span className="brand-title">FINANCE-MANAGER</span>
            </div>

            <h2 className="brand-heading">
              Wealth management, <br />
              <span className="highlight-text">simplified.</span>
            </h2>

            <p className="brand-description">
              Join the users who have optimized their financial workflow
              with our insights. Experience clarity like never before.
            </p>
          </div>

          <div className="blob-container">
            <svg width="400" height="400" viewBox="0 0 200 200">
              <path
                fill="#10B981"
                d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,31.6C59,41.7,47.1,49,35.3,55.5C23.5,62,11.8,67.7,-1.1,69.6C-13.9,71.5,-29.9,69.6,-43.3,62.3C-56.7,55,-67.5,42.3,-75.4,28.1C-83.3,13.9,-88.3,-1.8,-85.4,-16.5C-82.5,-31.2,-71.7,-44.9,-58.8,-52.7C-45.9,-60.5,-30.9,-62.4,-17.3,-64.7C-3.7,-67,9.9,-69.7,24.5,-73.4L44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="register-right">
          {success ? (
            <div className="success-container">
              <div className="success-icon">
                <CheckCircle size={40} />
              </div>
              <h2 className="success-title">Account Created!</h2>
              <p className="success-text">
                Your account has been successfully registered.
              </p>
              <Link to="/login" className="submit-btn">
                Go to Login <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <>
              <div className="form-header">
                <h1>Create your account</h1>
                <p>Enter your details to access your dashboard.</p>
              </div>

              <form onSubmit={handleSubmit} className="form-space">
                {serverError && (
                  <div className="server-error">
                    <AlertCircle size={14} /> {serverError}
                  </div>
                )}

                {["name", "email", "password"].map((field) => (
                  <div key={field} className="input-group">
                    <div
                      className={`input-wrapper ${
                        activeField === field
                          ? "input-active"
                          : "input-default"
                      }`}
                    >
                      {field === "name" && <User size={18} />}
                      {field === "email" && <Mail size={18} />}
                      {field === "password" && <Lock size={18} />}
                      <input
                        name={field}
                        type={field === "password" ? "password" : "text"}
                        placeholder={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onFocus={() => setActiveField(field)}
                        onBlur={() => setActiveField("")}
                        className="input-field"
                      />
                    </div>
                    {errors[field] && (
                      <p className="error-text">{errors[field]}</p>
                    )}
                  </div>
                ))}

                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      Create Account <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;