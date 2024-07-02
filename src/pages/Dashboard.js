import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const fetchUsers = async () => {
        const res = await axios.get(`http://localhost:5000/api/users?page=${page}&search=${search}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
    };

    useEffect(() => {
        fetchUsers();
    }, [page, search]);

    return (
        <div>
            <h1>User List</h1>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => setPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
