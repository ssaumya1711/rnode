import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [toDo,setList] = useState([]);
  const [task,setTask] = useState("");
  useEffect(async() => {
    fetchTask();
  },[])
  
  let fetchTask = async() => {
    try {
      let listData = await axios.get("https://node1-todo.herokuapp.com//list-all-todo");
      setList([...listData.data])
    } catch (error) {
      console.log(error);
    }
  }

  let handleCreate = async() => {
    try {
      let postData = await axios.post("https://node1-todo.herokuapp.com//create-task",{message:task});
      fetchTask();
      setTask("");
      //alert(postData.data.message);
    } catch (error) {
      console.log(error); 
    }
  }

let handleChange = async(e,id) => {
  try {
    let updateData = await axios.put(`https://node1-todo.herokuapp.com//update-task/${id}`,{status:e.target.checked});
    fetchTask();
  } catch (error) {
    console.log(error);
  }
}

let handleDelete = async(id) => {
  try {
    await axios.delete(`https://node1-todo.herokuapp.com//delete-task/${id}`);
    fetchTask();
  } catch (error) {
    alert(error);
  }
}
  return (
    <div className="container">
      <div className="row">
        <h2>To Do</h2>
        <div className="col-lg-12">
          <div class="input-group mb-3">
  <input type="text" class="form-control" value = {task} onChange={e => setTask(e.target.value)} placeholder="Task..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
  <button onClick={handleCreate} class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
</div>
          <ul class="list-group">
            {
              toDo.map((items) => {
                return(<li class="list-group-item">
                  <input class="form-check-input me-1" checked={items.status} type="checkbox" value="" aria-label="..." onChange={(e) => {handleChange(e,items._id)}}/>
                  <span style={{textDecoration:items.status ? "line-through" : ""}}>{items.message}</span>
                  <span class="badge bg-primary rounded-pill" onClick={() => {handleDelete(items._id)}}>X</span>
                </li>)
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
