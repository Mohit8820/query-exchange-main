import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import Avatar from "../../components/Avatar/Avatar";
import "./User.css";

export const Users = () => {
  const [usersList, setUsersList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_API_URL + "/users"
        );

        setUsersList(responseData.users);
      } catch (err) {}
    };
    getUsers();
  }, [sendRequest]);

  const navigate = useNavigate();
  const showQuestions = (userId) => {
    console.log(userId);
    navigate("/home", { state: userId });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <div className="users-container">
        <h1 className="users-head heading">Users</h1>
        <p>{usersList.length} Users</p>

        <div className="users-list">
          {isLoading && <LoadingSpinner asOverlay />}
          {usersList.map((user, i) => (
            <React.Fragment key={i}>
              <div className="user-item" onClick={() => showQuestions(user.id)}>
                <Avatar
                  backgroundColor="#1976d2"
                  width="3rem"
                  height="3rem"
                  borderRadius="50%"
                  color="white"
                  fontSize="1.8rem"
                >
                  {user.name.slice(0, 1)}
                </Avatar>
                <div>
                  <p>
                    <strong>{user.name}</strong>
                  </p>
                  <span>Questions Asked : {user.questions.length}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Users;
