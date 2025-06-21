import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  Activity,
  Heart,
  FileText,
  Shield,
  AlertTriangle,
  Pill,
  X,
  Menu,
  LogOut,
  Droplet,
} from "lucide-react";

export default function PatientDetails() {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("patientData");
    if (stored) {
      setPatientData(JSON.parse(stored));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!patientData) return null;

  const { data: patient, results } = patientData;

  const handleImageClick = (url) => setModalImage(url);
  const closeModal = () => setModalImage(null);

  const handleLogout = () => {
    localStorage.removeItem("patientData");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-slate-200 px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Patient Overview
            </h1>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="flex relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Enhanced Sidebar */}
        <div
          className={`
          w-80 bg-white shadow-xl border-r border-slate-200 min-h-screen
          fixed lg:static top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          <div className="p-4 sm:p-6 border-b border-slate-100">
            {/* Patient Avatar and Info */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">
                {patient.patientName}
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                {patient.gender}
              </p>
            </div>

            {/* Patient Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
              {/* DOB */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 sm:p-3 text-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                  DOB
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700">
                  {format(new Date(patient.birthDate), "dd/MM/yyyy")}
                </p>
              </div>

              {/* Age */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-2 sm:p-3 text-center">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mx-auto mb-1" />
                <p className="text-xs text-teal-600 font-semibold uppercase tracking-wide">
                  Age
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700">
                  {patient.age} yrs
                </p>
              </div>

              {/* Blood Type */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-2 sm:p-3 text-center">
                <Droplet className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mx-auto mb-1" />
                <p className="text-xs text-red-600 font-semibold uppercase tracking-wide">
                  Blood Type
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700">
                  {patient.bloodType || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-4 sm:p-6">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">
              Contact Information
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 p-2 sm:p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
                  {patient.phone}
                </span>
              </div>
              <div className="flex items-center gap-3 p-2 sm:p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer truncate">
                  {patient.email}
                </span>
              </div>
              <div className="flex items-center gap-3 p-2 sm:p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
                  {patient.currentAddress?.street},{" "}
                  {patient.currentAddress?.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 lg:ml-0">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Current Medications */}
            {patient.currentMedications?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    Current Medications
                  </h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {patient.currentMedications.map((med, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg border border-green-100"
                    >
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm font-medium text-slate-700">
                        {med}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergies */}
            {patient.allergies?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    Allergies
                  </h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {patient.allergies.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 rounded-lg border border-red-100"
                    >
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medical History */}
            {patient.medicalHistory?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 xl:col-span-2 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    Medical History
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {patient.medicalHistory.map((entry, i) => (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-lg p-3 sm:p-4 bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-1 sm:space-y-2">
                        <p className="text-xs sm:text-sm font-semibold text-slate-800">
                          <span className="text-purple-600">Condition:</span>{" "}
                          {entry.condition}
                        </p>
                        <p className="text-xs sm:text-sm">
                          <span className="font-semibold text-slate-600">
                            Diagnosis:
                          </span>{" "}
                          <span className="text-slate-700">
                            {format(
                              new Date(entry.diagnosisDate),
                              "dd/MM/yyyy"
                            )}
                          </span>
                        </p>
                        <p className="text-xs sm:text-sm">
                          <span className="font-semibold text-slate-600">
                            Treatment:
                          </span>{" "}
                          <span className="text-slate-700">
                            {entry.treatment}
                          </span>
                        </p>
                        <p className="text-xs sm:text-sm">
                          <span className="font-semibold text-slate-600">
                            Status:
                          </span>{" "}
                          <span
                            className={`font-medium ${entry.status === "Ongoing" ? "text-orange-600" : "text-green-600"}`}
                          >
                            {entry.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Examination Results */}
            {results?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 xl:col-span-2 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    Examination Results
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {results.map((res) => {
                    const exam = res.examinationResponse;
                    const title =
                      res.labExaminationType || res.radExaminationType;

                    return (
                      <div
                        key={res.id}
                        className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-slate-50 to-blue-50 hover:shadow-md transition-shadow"
                      >
                        {exam.image?.url && (
                          <img
                            src={exam.image.url}
                            alt="Exam"
                            onClick={() => handleImageClick(exam.image.url)}
                            className="w-full sm:w-16 h-40 sm:h-16 object-cover rounded-lg cursor-pointer border-2 border-white shadow-md hover:shadow-lg transition-shadow flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1 sm:gap-0">
                            <span className="text-sm font-bold text-slate-800 truncate">
                              {title} - {exam.bodyPart}
                            </span>
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full flex-shrink-0 self-start sm:self-auto">
                              {format(
                                new Date(exam.responseDateTime),
                                "dd/MM/yyyy"
                              )}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            {exam.impression}
                          </p>
                          <p className="text-xs text-slate-600 mb-2">
                            {exam.responseNotes}
                          </p>
                          <p className="text-xs text-slate-600 mb-2">
                            <span className="font-semibold">Doctor:</span>{" "}
                            {res.doctorId?.userName} (
                            {res.doctorId?.specialization})
                          </p>
                          {exam.pdfUrl?.url && (
                            <a
                              href={exam.pdfUrl.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                            >
                              View PDF Report
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Emergency Contact & Insurance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  Emergency Contact
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-sm font-bold text-slate-800">
                    {patient.emergencyContact?.name}
                  </p>
                  <p className="text-xs text-slate-600 mb-1">
                    {patient.emergencyContact?.relation}
                  </p>
                  <p className="text-sm text-slate-700">
                    {patient.emergencyContact?.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  Insurance
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm">
                    <span className="font-semibold text-slate-600">
                      Provider:
                    </span>{" "}
                    <span className="font-bold text-slate-800">
                      {patient.insuranceDetails?.provider}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-slate-600">
                      Policy #:
                    </span>{" "}
                    <span className="text-slate-700">
                      {patient.insuranceDetails?.policyNumber}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-slate-600">
                      Valid Until:
                    </span>{" "}
                    <span className="text-slate-700">
                      {format(
                        new Date(patient.insuranceDetails?.validUntil),
                        "dd/MM/yyyy"
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={modalImage}
              alt="Zoomed"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
            />
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
              onClick={closeModal}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
