"use client";
// pages/index.tsx
import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  password: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
}
