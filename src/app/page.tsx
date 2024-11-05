// pages/index.tsx
import { sql } from "@vercel/postgres";


// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  
  const { rows } = await sql`SELECT * from users`;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {rows.map((user) => (
          <li key={user.id}>
            {user.username} - {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
}
