import React from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import { getAllUsers } from "../services/authService";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useState, useEffect } from "react";
const Teachers = () => {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsersData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);
  const teachers = usersData.filter(
    (user) => user.role === "teacher" && user._id !== currentUser.id,
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 text-white flex flex-col items-center justify-center px-30">
      <Navbar userId={currentUser.id} fName={currentUser?.fname} />
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-white">
          {" "}
          <FaChalkboardTeacher className="inline text-primary-400 text-4xl mr-4" />
          Meet Our Teachers
        </h1>

        <p className="text-lg text-gray-400 mt-2">
          Learn from experienced and verified instructors .
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-30">
        {teachers.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">
            No teachers found.
          </p>
        ) : (
          usersData
            .filter(
              (user) => user.role === "teacher" && currentUser.id !== user._id,
            )
            .map((user) => (
              <ProfileCard
                key={user._id}
                id={user._id}
                fName={user.fname}
                lName={user.lname}
                specialty={user.specialty}
                experience={user.experience}
                rating={user.rating}
              />
            ))
        )}
        {currentUser.role != "teacher" && (
          <div
            className="flex flex-col justify-between items-center w-full h-80
  bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6
  shadow-xl hover:scale-[1.03]
  hover:border-primary-500
  hover:shadow-blue-500/20
  transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-4">
                {/* <span className="text-4xl text-primary-400">👨‍🏫</span> */}
                <FaChalkboardTeacher className="text-primary-400 text-4xl" />
              </div>

              <h3 className="text-2xl font-bold text-white">
                Become a Teacher
              </h3>

              <p className="mt-3 text-gray-300 leading-7">
                Share your knowledge
                <br />
                Create educational articles
                <br />
                Inspire thousands of students
              </p>
            </div>

            <Link
              to="/createRequest"
              className="w-full py-3 rounded-xl bg-primary-500
    hover:bg-primary-600 text-white text-center text-lg font-semibold
    transition-all duration-300"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
