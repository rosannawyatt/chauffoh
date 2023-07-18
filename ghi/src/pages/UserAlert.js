import useToken from "@galvanize-inc/jwtdown-for-react";

const UserAlert = () => {
  const { logout } = useToken();
  logout();
  return (
    <>
      <h1>Not an employee</h1>
      <a href="/login">Click here to Log in</a>
    </>
  );
};

export default UserAlert;
