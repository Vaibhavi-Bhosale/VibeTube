import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Wait from '../components/Wait';

function Profile() {
  const userId = useSelector((state) => state.auth.user?._id);
  console.log("This is whhat ",userId)

  if (userId) {
    return <Navigate to={`/profile/${userId}`} replace />;
  }

  return (
   <Wait msg="Loading profile..." />
  );
}

export default Profile;
