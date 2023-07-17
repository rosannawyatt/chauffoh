import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
const useUser = () => {
  const [account, setAccount] = useState({});

  useEffect(() => {
    const handleUserData = async () => {
      try {
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
        const response = await fetch(url, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const { id, username, first_name, last_name, email, is_employee } =
            data.account;
          setAccount({
            id,
            username,
            first_name,
            last_name,
            email,
            is_employee,
          });
        } else {
          // Handle error
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    handleUserData();
  }, []);

  return account;
};

export default useUser;
