import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { user } = useAuth();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side (branding / AI pitch) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex-col justify-between items-center p-12">
        {/* Top Logo */}
        {/* <div className="w-full text-left">
          <img
            src="favicon.ico"
            alt="Company Logo"
            className="h-10 mb-6"
          />
          <span style={{ marginLeft: 15, fontWeight: 600 }}>EMPLO AI</span>
        </div> */}

        <div className="flex items-center justify-center mb-8">
            <img
              src="favicon.ico"
              alt="Company Logo"
              className="h-10"
            />
            <span className="ml-4 font-bold text-2xl text-hirena-dark-brown">Emplo AI</span>
          </div>

        {/* Center Text */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Unlock the Future of Recruitment with AI
          </h1>
          <p className="text-lg text-center opacity-90 max-w-md">
            Ready to transform your old recruitment process with AI? 
            Revolutionize your process for smarter, more efficient hiring. 
            Join us today!
          </p>
        </div>
      </div>

      {/* Right Side (form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 border border-hirena-light-brown/10 rounded-lg shadow-md">
          {/* Top Logo above form */}
          <div className="flex items-center justify-center mb-8">
            <img
              src="favicon.ico"
              alt="Company Logo"
              className="h-6"
            />
            <span className="ml-4 font-bold text-xl text-hirena-dark-brown">Emplo AI</span>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-hirena-dark-brown">
                {mode === "login" ? "Welcome Back" : "Create Your Account"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {mode === "login"
                  ? "Enter your credentials to access your account"
                  : "Sign up to start using Hirena"}
              </p>
            </div>

            {mode === "login" ? (
              <Login switchToSignup={() => setMode("signup")} />
            ) : (
              <Signup switchToLogin={() => setMode("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
