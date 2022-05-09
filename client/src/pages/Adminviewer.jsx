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
  const [adminnameTmp, setAdminnameTmp] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminpasswordTmp, setAdminpasswordTmp] = useState("");
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
  const deleteTask = async (id) => {
    if (user.role !== "admin") {
      alert("you are not an admin that can delete todos");
    } else {
      await axios.delete("http://localhost:5000/deletetask/" + id);
      getalltasks();
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/getuser/" + id).then((res) => {
      if (res.data.role === "adminviewer") {
        setUser(res.data);
        getalltasks();
        console.log(user.role);
      } else {
        // alert(res.data.role);
        window.location.href = `/login`;
      }
    });
  }, []);
  const addUser = async () => {
    const userRole = user.role;
    await axios
      .post("http://localhost:5000/addAdmin", {
        name: adminnameTmp,
        password: adminpasswordTmp,
        role: "adminviewer",
        email: adminEmail,
        currentUserRole: userRole,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
        }
      });
  };
  return (
    <div>
      <h1>this is admin that can view only</h1>
      <h3>add new admin</h3>
      <input
        type="text"
        placeholder="enter new admin name"
        onChange={(e) => {
          setAdminnameTmp(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter new admin email"
        onChange={(e) => {
          setAdminEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="enter new admin password"
        onChange={(e) => {
          setAdminpasswordTmp(e.target.value);
        }}
      />
      <button onClick={() => addUser()}>add new admin</button>
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
                    <button
                      onClick={() => {
                        deleteTask(task._id);
                      }}
                    >
                      delete task
                    </button>
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
