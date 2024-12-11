"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    const username = (document.getElementById("username") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)?.value;

    if (!username || !password) return;

    axios.post("/api/admin/login", {
      username,
      password,
    }).then((response) => {
      if (response.status === 200) {
        alert("Login successful");
        router.push("/admin/prebuilt");
      }
    }).catch((error) => { 
      alert("Invalid username or password");
      console.error(error);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[30vw]">
        <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">Admin Login</h1>
        <div className="flex flex-col gap-4 justify-center pt-5">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" className="text-black p-3" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="text-black p-3" />
          <button className="bg-rakitin-orange text-white py-2 px-4 rounded-md" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
