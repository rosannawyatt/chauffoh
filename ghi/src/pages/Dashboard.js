import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [userData, setUserData] = useState({});

  const handleUserData = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <>
      <h1>User</h1>
      <p>username: {userData.account && userData.account.username}</p>
    </>
  );
};
export default UserDashboard;
