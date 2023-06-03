import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import Avatar from "avataaars";
import "./User.css";

export const Users = () => {
  const colors = [
    "#fecaca",
    "#fed7aa",
    "#fde68a",
    "#fef08a",
    "#d9f99d",
    "#bbf7d0",
    "#99f6e4",
    "#a5f3fc",
    "#bfdbfe",
    "#ddd6fe",
    "#f5d0fe",
    "#fecdd3",
    "#e9d5ff",
  ];
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
  const showQuestions = (userId, userAvatar) => {
    console.log(userId);
    navigate("/home", { state: { userId, userAvatar } });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <h1 className="users-head heading">Users</h1>
      <p className="left-align">{usersList.length} Users</p>

      <div className="users-list">
        {isLoading && <LoadingSpinner asOverlay />}
        {usersList.map((user, i) => (
          <React.Fragment key={i}>
            <div className="user-item-container">
              {" "}
              <div
                className="user-item"
                onClick={() => showQuestions(user.id, user.avatar)}
              >
                <Avatar
                  className="avatar-large"
                  avatarStyle="Circle"
                  {...user.avatar}
                  style={{
                    backgroundColor: `${
                      colors[Math.floor(Math.random() * colors.length)]
                    }`,
                  }}
                />
                <div>
                  <p>{user.name}</p>
                  <span>Questions Asked : {user.questions.length}</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6rem"
                  height="1.5rem"
                  viewBox="0 0 16 15"
                  fill="none"
                >
                  <path
                    d="M10.4776 10.2251C10.308 12.6529 8.96022 13.6761 5.95571 13.7509L5.85927 13.7533C2.54318 13.836 1.18526 12.6648 1.11032 9.65745L1.00101 5.27091C0.926068 2.26358 2.22398 1.02621 5.54006 0.943578L5.6365 0.941175C8.61876 0.86686 10.0155 1.80819 10.3197 4.18374M5.87788 7.35075L14.3202 7.14038M12.722 9.43542L15.1511 7.11967L12.6097 4.92778"
                    stroke="black"
                    stroke-opacity="0.5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};
export default Users;
