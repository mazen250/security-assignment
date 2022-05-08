import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { useParams } from "react-router-dom";
import Login from "./Login";

function Home() {
  const [user, setUser] = useState([]);
  const [newtask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  // const getuser = (id) => {
  //   axios.get("http://localhost:5000/getuser" + id).then((res) => {
  //     setCurrentUser(res.data);
  //   });
  // };

  const { id } = useParams();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser([]);
    window.location.href = `/login`;
  };

  const addTask = async () => {
    axios.post("http://localhost:5000/addtask", {
      description: newtask,
      userId: currentUser._id,
    });
  };

  // const deleteTask = async (id) => {
  //   axios
  //     .delete("http://localhost:5000/deletetask/" + id)
  //     .then(alert("task deleted"));
  // };

  const getUserTasks = async (id) => {
    await axios.get("http://localhost:5000/getUserTasks/" + id).then((res) => {
      setTasks(res.data);
    });
  };
  useEffect(() => {
    console.log(id);

    axios.get("http://localhost:5000/getuser/" + id).then((res) => {
      if (res.data.role === "admin") {
        window.location.href = `/admin/${id}`;
      }

      setCurrentUser(res.data);
      getUserTasks(id);
    });
    // const token = localStorage.getItem("token");
    // if (token) {
    //   setUser(JSON.parse(localStorage.getItem("user")));
    //   // getuser(user._id);
    //   console.log(user);
    //   if (user.role === "user") {
    //     window.location.href = `/user: ${user._id}`;
    //   }
    // }
    // console.log(user);
  }, []);

  return (
    <div className="container">
      {/* <h1>user id = {id}</h1>
      <h2>username = {currentUser.name}</h2>
      <h1>tasks</h1> */}

      {currentUser.length !== 0 ? (
        <div className="pageConntainer">
          <h1>welcome back : {currentUser.name}</h1>
          <h2>user role : {currentUser.role}</h2>
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
          {/* <h3>user id : {currentUser._id}</h3> */}
          <div className="taskContainer">
            <input
              type="text"
              placeholder="enter a new task "
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
            />
            <button
              onClick={() => {
                addTask();
              }}
            >
              Add New Task
            </button>
          </div>
          <h3>my tasks</h3>
          {tasks.map((task) => {
            return (
              <div key={task._id} className="tasks">
                <h2>task desc : {task.description}</h2>
                {/* <button
                  onClick={() => {
                    deleteTask(task._id);
                  }}
                >
                  delete task
                </button> */}
              </div>
            );
          })}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
