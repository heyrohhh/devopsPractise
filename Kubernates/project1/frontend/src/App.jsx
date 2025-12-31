import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', position: '', email: '', salary: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "/api/employees";

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(API_URL);
    setEmployees(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: '', position: '', email: '', salary: '' });
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEmployees();
  };

  const startEdit = (emp) => {
    setEditingId(emp.id);
    setForm(emp);
  };

  return (
    <div className="container">
      <h2>🚀 Employee Management</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Position" value={form.position} onChange={e => setForm({...form, position: e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Salary" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
        <button className="btn-add">{editingId ? 'Update' : 'Add'} Employee</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Position</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td><td>{emp.position}</td><td>{emp.email}</td>
              <td>
                <button className="btn-edit" onClick={() => startEdit(emp)}>Edit</button>
                <button className="btn-delete" onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;