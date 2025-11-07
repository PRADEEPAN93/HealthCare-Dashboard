import React, { useState, useEffect } from 'react';
import Navigation from './Components/Navigation';
import { Download } from 'lucide-react';
import BloodPressureChart from './Components/BloodPressureChart';
import heartBPM from './assets/HeartBPM.png';
import temperature from './assets/temperature.png';
import respiratory from './assets/respiratory rate.png';
import PatientList from './Components/PatientLisst';
import calendar from './assets/BirthIcon.png';
import female from './assets/FemaleIcon.png';
import phone from './assets/PhoneIcon.png';
import insurance from './assets/InsuranceIcon.png';
import './index.css';

function App() {
  const [patients, setPatients] = useState([]);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const credentials = btoa('coalition:skills-test');
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          headers: { Authorization: `Basic ${credentials}` },
        });

        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        const jessicaData = data.find((p) => p.name === 'Jessica Taylor');

        setPatients(data);
        setSelectedPatient(jessicaData);
        setPatientData(jessicaData);

        const dob = new Date(jessicaData.date_of_birth);
        const formatted = dob.toLocaleString('default', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
        setFormattedDate(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gray-50">
      <Navigation />
      <div className="flex">
        {/* Left Sidebar */}
        <div className="pt-4 pl-4 w-1/4">
          <PatientList
            patients={patients}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-4 px-6 w-2/4">
          <div className="bg-white rounded-2xl p-6 shadow mb-6">
            <h1 className="text-2xl font-extrabold mb-6">Diagnosis History</h1>
            {patientData?.diagnosis_history && (
              <BloodPressureChart diagnosisHistory={patientData.diagnosis_history} />
            )}

            {/* Vital Signs */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              {/* Respiratory Rate */}
              <div className="bg-[#E0F3FA] p-6 rounded-xl">
                <img src={respiratory} alt="Respiratory Rate" className="mb-2" />
                <div className="text-base font-medium pt-4">Respiratory Rate</div>
                <div className="text-3xl font-extrabold">
                  {patientData?.diagnosis_history?.[0]?.respiratory_rate?.value} bpm
                </div>
                <div className="text-sm pt-4">
                  {patientData?.diagnosis_history?.[0]?.respiratory_rate?.levels}
                </div>
              </div>

              {/* Temperature */}
              <div className="bg-[#FFE6E9] p-6 rounded-xl">
                <img src={temperature} alt="Temperature" className="mb-2" />
                <div className="text-base font-medium pt-4">Temperature</div>
                <div className="text-3xl font-extrabold">
                  {patientData?.diagnosis_history?.[0]?.temperature?.value} °F
                </div>
                <div className="text-sm pt-4">
                  {patientData?.diagnosis_history?.[0]?.temperature?.levels}
                </div>
              </div>

              {/* Heart Rate */}
              <div className="bg-[#FFE6F1] p-6 rounded-xl">
                <img src={heartBPM} alt="Heart Rate" className="mb-2" />
                <div className="text-base font-medium pt-4">Heart Rate</div>
                <div className="text-3xl font-extrabold">
                  {patientData?.diagnosis_history?.[0]?.heart_rate?.value} bpm
                </div>
                <div className="text-sm pt-4 flex items-center">
                  {patientData?.diagnosis_history?.[0]?.heart_rate?.levels?.includes('Higher')
                    ? '▲'
                    : '▼'}
                  <span className="ml-1">
                    {patientData?.diagnosis_history?.[0]?.heart_rate?.levels}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic List */}
          <div className="bg-white p-6 rounded-2xl shadow mb-6">
            <h3 className="text-2xl font-extrabold mb-8">Diagnostic List</h3>
            <div className="max-h-44 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F6F7F8] text-left">
                  <tr>
                    <th className="pl-4 py-4 w-1/4">Problem/Diagnosis</th>
                    <th className="w-2/4 py-4 pl-4">Description</th>
                    <th className="pr-4 py-4 w-1/6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData?.diagnostic_list?.map((diagnosis) => (
                    <tr key={diagnosis.name} className="border-b border-gray-100">
                      <td className="py-4 pl-4">{diagnosis.name}</td>
                      <td className="py-4 pl-4">{diagnosis.description}</td>
                      <td className="py-4 pl-2">{diagnosis.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="pt-4 pr-4 w-1/4">
          <div className="w-full bg-white p-6 rounded-2xl shadow">
            <div className="text-center mb-6">
              <img
                src={patientData?.profile_picture}
                alt="Patient"
                className="w-[200px] h-[200px] rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-extrabold">{patientData.name}</h2>
            </div>

            <div className="space-y-8">
              <InfoItem icon={calendar} label="Date of Birth" value={formattedDate} />
              <InfoItem icon={female} label="Gender" value={patientData.gender} />
              <InfoItem icon={phone} label="Contact Info" value={patientData.phone_number} />
              <InfoItem icon={phone} label="Emergency Contacts" value={patientData.emergency_contact} />
              <InfoItem icon={insurance} label="Insurance Provider" value={patientData.insurance_type} />
            </div>

            <div className="mt-10 mb-2 text-center">
              <button className="bg-[#01F0D0] text-black font-bold py-3 px-12 rounded-[42px]">
                Show All Information
              </button>
            </div>
          </div>

          {/* Lab Results */}
          <div className="bg-white p-6 rounded-2xl mt-8 shadow">
            <h3 className="text-2xl font-extrabold mb-4">Lab Results</h3>
            <div className="max-h-36 overflow-y-auto space-y-2">
              {patientData.lab_results.map((test) => (
                <div
                  key={test}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                >
                  <span>{test}</span>
                  <Download size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <img src={icon} alt={label} className="rounded-full w-12 h-12 bg-[#F6F7F8]" />
    <div className="pl-4">
      <h3 className="text-sm">{label}</h3>
      <p className="font-bold">{value}</p>
    </div>
  </div>
);

export default App;
