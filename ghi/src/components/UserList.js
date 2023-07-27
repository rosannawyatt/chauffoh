import { useState, useEffect, useCallback } from "react";
import { Collapse } from "antd";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilteredUsers] = useState([]);

  const loadUsers = useCallback(async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/users/current`;
    const response = await fetch(url);
    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const data = await response.json();
      setUsers(data);
    }
  }, []);

  const loadFilterUsers = useCallback(async () => {
    const urlFilter = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts`;
    const responseFilter = await fetch(urlFilter);
    if (!responseFilter.ok) {
      console.log("error with fetch");
    } else {
      const data = await responseFilter.json();
      const filteredUsers = data.filter(
        (activeUser) =>
          activeUser.is_employee === false && activeUser.current_ride === false
      );
      setFilteredUsers(filteredUsers);
    }
  }, []);

  useEffect(() => {
    loadUsers();
    loadFilterUsers();
  }, [loadFilterUsers, loadUsers]);

  const ListUser = () => (
    <>
      <div className="container-fluid table-responsive">
        <h2>List of Users</h2>
        <table className="table table-sm table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Current Ride</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers.map((userF) => {
              return (
                <tr key={userF.id}>
                  <td>{userF.id}</td>
                  <td>
                    {userF.first_name} {userF.last_name}
                  </td>
                  <td>{userF.email}</td>
                  <td>{userF.current_ride ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );

  const items = [
    {
      key: "1",
      label: "List of Users",
      children: <ListUser />,
    },
  ];

  return (
    <>
      <div className="container-fluid p-3 mt-3 table-responsive">
        <h2>Users with Active Rides</h2>
        <table className="table table-sm table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Current Ride</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.current_ride ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Collapse
          ghost
          items={items}
          defaultActiveKey={["1"]}
          bordered={false}
          size="large"
        />
      </div>
    </>
  );
};
export default UserList;
