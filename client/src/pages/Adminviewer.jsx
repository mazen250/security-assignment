import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Login from "./Login";
import "../styles/home.css";

function Adminviewer() {
  const [user, setUser] = useState([]);
  const [tempUser, setTempUser] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [userRole, setUserRole] = useState("");
  const { id } = useParams();

  const logout = () => {
    setUser([]);
    window.location.href = `/login`;
  };
  const getalltasks = async () => {
    await axios.get("http://localhost:5000/getallTasks").then((res) => {
      setAllTasks(res.data);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/getuser/" + id).then((res) => {
      if (res.data.role === "adminviewer") {
        setUser(res.data);
        getalltasks();
      } else {
        // alert(res.data.role);
        window.location.href = `/login`;
      }
    });
  }, []);
  return (
    <div>
      <h1>this is admin that can view only</h1>
      {user.length !== 0 ? (
        <div className="pageConntainer">
          <h1>Admin Home</h1>
          <h2>{user.name}</h2>

          {/* <button
            onClick={() => {
              getalltasks();
            }}
          >
            get all tasks
          </button> */}
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
          {allTasks.length !== 0 ? (
            <div>
              <h1>All Tasks</h1>
              {allTasks.map((task) => {
                return (
                  <div key={task._id} className="tasks">
                    <h2>{task.description}</h2>
                    <h2>{task.userId}</h2>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>No tasks</h1>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Adminviewer;
