import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import IHeader from "../Header/iHeader";

const ViewEnrollments = () => {
  const { course_id } = useParams();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FETCH ENROLLED STUDENTS
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `/instructor/total-students/${course_id}`
        );

        setStudents(res.data.students || []);
      } catch (error) {
        console.error(
          "Fetch Students Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load students"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [course_id]);

  // SEARCH FILTER
  const filteredUsers = students.filter(
    (student) =>
      student.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      student.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <IHeader />

      <div className="bg-gray-100 min-h-screen p-6">
        
        {/* PAGE TITLE */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          
          <h1 className="text-3xl font-bold text-[#042439]">
            Enrolled Students
          </h1>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-80 outline-none focus:ring-2 focus:ring-[#042439]"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          
          {loading ? (
            <p className="p-6 text-gray-500">
              Loading students...
            </p>
          ) : filteredUsers.length === 0 ? (
            <p className="p-6 text-gray-500">
              No enrolled students found
            </p>
          ) : (
            <table className="w-full min-w-[700px]">
              
              {/* TABLE HEADER */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    #
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-700">
                    Student Name
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-700">
                    Student Email
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-700">
                    Enroll Date
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-700">
                    Payment Status
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {filteredUsers.map(
                  (student, index) => (
                    <tr
                      key={student.user_id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      
                      {/* SERIAL NUMBER */}
                      <td className="p-4">
                        {index + 1}
                      </td>

                      {/* NAME */}
                      <td className="p-4 font-medium text-gray-800">
                        {student.name}
                      </td>

                      {/* EMAIL */}
                      <td className="p-4 text-gray-700">
                        {student.email}
                      </td>

                      {/* ENROLL DATE */}
                      <td className="p-4 text-gray-700">
                        {student.enrolled_at
                          ? new Date(
                              student.enrolled_at
                            ).toLocaleDateString()
                          : "—"}
                      </td>

                      {/* PAYMENT STATUS */}
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                          
                          ${
                            student.payment_status ===
                            "PAID"
                              ? "bg-green-100 text-green-700"
                              : student.payment_status ===
                                "UNPAID"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {
                            student.payment_status
                          }
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewEnrollments;