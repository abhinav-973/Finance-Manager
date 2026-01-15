import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

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

  const [activeField, setActiveField] = useState("");

  return (
    // MASTER CONTAINER: Deep textured background with ambient lighting
    <div className="h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden selection:bg-indigo-500/30 text-slate-200 font-sans p-6">
      {/* BACKGROUND FX: Ambient colored blobs for depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* NOISE OVERLAY: Adds a tactile 'film grain' feel to remove digital flatness */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

      {/* CARD CONTAINER: Glassmorphism effect */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 mx-4 mt-20">
        {/* LEFT PANEL: Brand & Vibe (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-white/5 to-transparent relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                FINANCE-MANAGER
              </span>
            </div>

            <h2 className="text-4xl font-light leading-tight text-white mb-4">
              Wealth management, <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-300">
                reimagined.
              </span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Join the 1% of users who have optimized their financial workflow
              with our AI-driven insights. Experience clarity like never before.
            </p>
          </div>

          {/* Abstract geometric element */}
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/3 translate-y-1/3">
            <svg
              width="400"
              height="400"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#6366F1"
                d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,31.6C59,41.7,47.1,49,35.3,55.5C23.5,62,11.8,67.7,-1.1,69.6C-13.9,71.5,-29.9,69.6,-43.3,62.3C-56.7,55,-67.5,42.3,-75.4,28.1C-83.3,13.9,-88.3,-1.8,-85.4,-16.5C-82.5,-31.2,-71.7,-44.9,-58.8,-52.7C-45.9,-60.5,-30.9,-62.4,-17.3,-64.7C-3.7,-67,9.9,-69.7,24.5,-73.4L44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>

        {/* RIGHT PANEL: The Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#0a0a0a]/60">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-slate-500 text-sm">
              Enter your details to access your dashboard.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!validate()) return;

              console.log("Validated Data:", formData);
            }}
            className="space-y-6"
          >
            {/* Input Group: name */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                full-name
              </label>
              <div
                className={`flex items-center bg-white/5 border rounded-xl px-4 py-3 transition-all duration-300 ${
                  activeField === "user"
                    ? "border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)] bg-white/[0.07]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <User
                  size={18}
                  className={`mr-3 transition-colors duration-300 ${
                    activeField === "user"
                      ? "text-indigo-400"
                      : "text-slate-500"
                  }`}
                />
                <input
                  name="name"
                  type="text"
                  placeholder="johndoe"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setActiveField("user")}
                  onBlur={() => setActiveField("")}
                  className="bg-transparent w-full text-white placeholder-slate-600 focus:outline-none text-sm font-medium"
                />
                {errors.name && (
                  <p className="text-xs text-rose-400 mt-1 ml-1">
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

            {/* Input Group: Email */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div
                className={`flex items-center bg-white/5 border rounded-xl px-4 py-3 transition-all duration-300 ${
                  activeField === "email"
                    ? "border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)] bg-white/[0.07]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Mail
                  size={18}
                  className={`mr-3 transition-colors duration-300 ${
                    activeField === "email"
                      ? "text-indigo-400"
                      : "text-slate-500"
                  }`}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField("email")}
                  onBlur={() => setActiveField("")}
                  className="bg-transparent w-full text-white placeholder-slate-600 focus:outline-none text-sm font-medium"
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Input Group: Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                Password
              </label>
              <div
                className={`flex items-center bg-white/5 border rounded-xl px-4 py-3 transition-all duration-300 ${
                  activeField === "password"
                    ? "border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)] bg-white/[0.07]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Lock
                  size={18}
                  className={`mr-3 transition-colors duration-300 ${
                    activeField === "password"
                      ? "text-indigo-400"
                      : "text-slate-500"
                  }`}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setActiveField("password")}
                  onBlur={() => setActiveField("")}
                  className="bg-transparent w-full text-white placeholder-slate-600 focus:outline-none text-sm font-medium"
                />
                {errors.password && (
                  <p className="text-xs text-rose-400 mt-1 ml-1">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="group w-full relative py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] mt-4"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              <div className="flex items-center justify-center gap-2">
                <span>Start Journey</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 mt-8">
            Already have an account?{" "}
            <span className="text-indigo-400 font-medium cursor-pointer hover:text-indigo-300 transition-colors">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
