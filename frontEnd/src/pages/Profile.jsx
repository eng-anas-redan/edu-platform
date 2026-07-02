import React from 'react'
import TeacherProfile from "../components/TeacherProfile"

const Profile = () => {
      const teacher = {
        fname : "ali",
        lname : "ali",
        email : "ali1111@domin.com",
        role : "teacher",
        bio : "Math teacher",
        experience : 3,
        rating : 0,
  };
  return (
    <div>
        <TeacherProfile
         teacher={teacher}
            />
    </div>
  )
}

export default Profile