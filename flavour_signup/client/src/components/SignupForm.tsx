import { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';

/**
 * SignupForm Component
 * 
 * Design Philosophy: Modern Minimalist with Vibrant Accent
 * - Centered card layout with generous whitespace
 * - Bold red-orange (#E74C3C) accent for interactive elements
 * - Clear visual hierarchy with strategic typography
 * - Smooth transitions and hover states for interactivity
 */

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2C3E50] mb-2">
            Welcome to
            <span className="text-[#E74C3C]"> flavour !</span>
          </h1>
          <p className="text-[#95A5A6] text-base">
            Create your Account in a few seconds
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-[#ECF0F1] rounded-lg text-[#2C3E50] placeholder-[#BDC3C7] focus:outline-none focus:border-[#E74C3C] focus:ring-2 focus:ring-[#E74C3C]/20 transition-all duration-200"
              required
            />
          </div>

          {/* Email/Phone Input */}
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email Address/Phone number"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-[#ECF0F1] rounded-lg text-[#2C3E50] placeholder-[#BDC3C7] focus:outline-none focus:border-[#E74C3C] focus:ring-2 focus:ring-[#E74C3C]/20 transition-all duration-200"
              required
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-12 border-2 border-[#ECF0F1] rounded-lg text-[#2C3E50] placeholder-[#BDC3C7] focus:outline-none focus:border-[#E74C3C] focus:ring-2 focus:ring-[#E74C3C]/20 transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#95A5A6] hover:text-[#E74C3C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E74C3C]/50 rounded p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff size={20} className="transition-transform duration-180" />
              ) : (
                <Eye size={20} className="transition-transform duration-180" />
              )}
            </button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-3 py-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative w-6 h-6">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="sr-only"
                  required
                />
                <div className={`w-6 h-6 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                  formData.agreeToTerms
                    ? 'bg-[#E74C3C] border-[#E74C3C]'
                    : 'border-[#ECF0F1] group-hover:border-[#E74C3C]'
                }`}>
                  {formData.agreeToTerms && (
                    <Check size={16} className="text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
              <span className="text-[#95A5A6] text-sm">
                I agree to the terms and privacy policy
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#E74C3C] hover:bg-[#C0392B] text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
          >
            Sign in & Order Now
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-[#95A5A6] text-sm">
            Already member ?{' '}
            <a
              href="#"
              className="text-[#E74C3C] font-medium hover:underline transition-colors duration-200"
            >
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
