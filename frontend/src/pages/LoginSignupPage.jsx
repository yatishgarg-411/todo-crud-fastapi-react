import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignupPage.css';
import { User, Mail, Lock, Eye, EyeOff, Heart, Star, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function LoginSignupPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });

    if (isLogin) {
      const loginPayload = {
        useremail: formData.email,
        userpassword: formData.password
      };

      try {
        console.log("Logging in with data: ", loginPayload);
        const res = await axios.post(`http://localhost:8000/user/login`, loginPayload);
        alert(res.data.msg);
        localStorage.setItem("token", res.data.token);
        navigate("/todo");
      } catch (error) {
        console.error(error);
        alert("Login failed. Please check your credentials.");
      }

    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!! 💕");
        return;
      }

      const signupPayload = {
        username: formData.name,
        useremail: formData.email,
        userpassword: formData.password
      };

      try {
        console.log("Sending new User Data: ", signupPayload);
        const res = await axios.post(`http://localhost:8000/user/signup`, signupPayload);
        alert(res.data.msg);
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("Signup failed. Please try again.");
      }
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setShowPassword(false);
  };

  return (
    <div className="login-signup-container">
      {/* Floating elements */}
      <div className="floating flower">🌸</div>
      <div className="floating sparkle">✨</div>
      <div className="floating butterfly">🦋</div>
      <div className="floating star">🌟</div>
      <div className="floating twinkle">💫</div>

      <div className="form-wrapper">
        <div className="header">
        <div className="brand">
  <Heart className="icon pink" />
  <h1 className="brand-text">NUTAGO</h1>
  <Sparkles className="icon purple" />
</div>
<p className="tagline">Notes & To-dos Anywhere on the Go</p>


          <div className="subheading">
            {isLogin ? '👋 Welcome back!!' : '🌟 Join our lovely community!'}
          </div>
        </div>

        <div className="form-card">
          <div className="tabs">
            <button onClick={() => isLogin || switchMode()} className={isLogin ? 'active' : ''}>
              💕 Login
            </button>
            <button onClick={() => !isLogin || switchMode()} className={!isLogin ? 'active' : ''}>
              ✨ Sign Up
            </button>
          </div>

          <form className="form-content" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label>🌸 Your Sweet Name</label>
                <div className="input-icon">
                  <User className="icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="What should we call you?"
                    required
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>📧 Email Address</label>
              <div className="input-icon">
                <Mail className="icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>🔒 Password</label>
              <div className="input-icon">
                <Lock className="icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your secret password"
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="input-group">
                <label>🔒 Confirm Password</label>
                <div className="input-icon">
                  <Lock className="icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Type your password again"
                    required
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="text-right forgot-password">
                Forgot your password? 💭
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? (
                <>
                  <Heart className="icon" />
                  Welcome Back
                </>
              ) : (
                <>
                  <Star className="icon" />
                  Join the Fun
                </>
              )}
            </button>
          </form>

          <div className="footer-msg">
            <div className="emoji">🌻</div>
            <p>
              {isLogin
                ? "Ready to be productive today? 💪"
                : "Let's make your days more organized! 📝"}
            </p>
          </div>
        </div>

      
      </div>
    </div>
  );
}
