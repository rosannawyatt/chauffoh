// import { useState, useEffect } from "react";

// export default ReceiptPreview = () => {
//   const [userData, setUserData] = useState({});

//   const handleUserData = async () => {
//     const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
//     fetch(url, {
//       credentials: "include",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setUserData(data);
//       })
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     handleUserData();
//   }, []);

//   return (
//     <>
//       <p> Receipt Preview Page</p>
//     </>
//   );
// };
