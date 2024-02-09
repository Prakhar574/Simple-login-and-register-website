import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8081/login')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  const handleEdit = (user) => {
    setEditedUser({ ...user }); 
    setIsEditing(true);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8081/login/${editedUser.id}`, editedUser)
      .then(() => {
        setIsEditing(false);
        fetchUsers();
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log('User not found');
        } else {
          console.log(err);
        }
      });
  
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/login/${id}`)
      .then(() => fetchUsers())
      .catch(err => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    
    <div className="container mt-5">
        
      <h1 className="text-center mb-4">User Details</h1>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {isEditing && editedUser.id === user.id ? (
                  <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} className="form-control"/>
                ) : (
                  <p className="mb-0">{user.name}</p>
                )}
              </td>
              <td>
                {isEditing && editedUser.id === user.id ? (
                  <input type="text" name="email" value={editedUser.email} onChange={handleInputChange} className="form-control"/>
                ) : (
                  <p className="mb-0">{user.email}</p>
                )}
              </td>
              <td>
                {isEditing && editedUser.id === user.id ? (
                  <button onClick={handleUpdate} className="btn btn-primary mr-2">Save</button>
                ) : (
                  <button onClick={() => handleEdit(user)} className="btn btn-warning mr-2">Edit</button>
                )}
                <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default App;