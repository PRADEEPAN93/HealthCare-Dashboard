import React from "react";
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  Settings,
  MoreVertical,
} from "lucide-react";
import testLogo from "../assets/TestLogo.png";
import practitioner from "../assets/practitioner.png";

/**
 * Top navigation bar component
 */
const Navigation = () => {
  return (
    <div className="p-4">
      <nav className="w-full bg-white rounded-[70px] flex items-center justify-between px-6 py-3 shadow-sm">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img
            src={testLogo}
            alt="Tech.Care"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Center: Nav links */}
        <div className="flex items-center space-x-3">
          <NavItem icon={<Home size={20} />} label="Overview" />
          <NavItem icon={<Users size={20} />} label="Patients" active />
          <NavItem icon={<Calendar size={20} />} label="Schedule" />
          <NavItem icon={<MessageSquare size={20} />} label="Message" />
          <NavItem icon={<CreditCard size={20} />} label="Transactions" />
        </div>

        {/* Right: Practitioner info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src={practitioner}
              alt="Dr. Jose Simmons"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-right leading-tight">
              <div className="font-semibold text-gray-800 text-sm">
                Dr. Jose Simmons
              </div>
              <div className="text-xs text-gray-500">
                General Practitioner
              </div>
            </div>
          </div>

          <div className="h-6 border-r border-gray-300"></div>

          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="More options"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </nav>
    </div>
  );
};

/**
 * Reusable Nav item button
 */
const NavItem = ({ icon, label, active }) => {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
        active
          ? "bg-[#01F0D0] text-gray-800"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Navigation;
