import React from "react";
import { MoreHorizontal, Search } from "lucide-react";

/**
 * PatientList Component
 * @param {Object[]} patients - Array of patient objects
 * @param {Object} selectedPatient - Currently selected patient
 * @param {Function} onSelectPatient - Callback triggered when patient is clicked
 */
const PatientList = ({ patients = [], selectedPatient, onSelectPatient }) => {
  return (
    <div className="bg-white rounded-2xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 border-b">
        <h2 className="text-xl font-extrabold text-gray-800">Patients</h2>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Search">
          <Search size={18} />
        </button>
      </div>

      {/* Scrollable List */}
      <div className="max-h-[60rem] overflow-y-auto py-2">
        {patients.length > 0 ? (
          <ul className="space-y-1">
            {patients.map((patient) => {
              const isSelected = selectedPatient?.name === patient.name;

              return (
                <li
                  key={patient.name}
                  onClick={() => onSelectPatient(patient)}
                  className={`flex items-center justify-between p-3 mx-2 rounded-lg cursor-pointer transition ${
                    isSelected
                      ? "bg-teal-100"
                      : "hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  {/* Left side: avatar and info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        patient.profile_picture ||
                        "https://via.placeholder.com/40x40"
                      }
                      alt={patient.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-800">
                        {patient.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {patient.gender}, {patient.age}
                      </p>
                    </div>
                  </div>

                  {/* Right side: More options */}
                  <button
                    className="p-1 rounded-full hover:bg-gray-200 transition"
                    aria-label="More options"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-sm py-6">
            No patients found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientList;
