"use client";
import Link from "next/link";
import React, { useRef } from "react";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const register = async () => {
    const res = await fetch(`https://fakestoreapi.com/users`, {
      method: "POST",
      body: JSON.stringify({
        name: data.current.name,
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("Пользователь зарегистрирован!");
    console.log({ response });
  };
  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div>
      <div>Sign up</div>
      <div>
        <input
          autoComplete="off"
          name="name"
          placeholder="Name"
          required
          onChange={(e) => (data.current.name = e.target.value)}
        />
        <input
          name="email"
          placeholder="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div>
          <button onClick={register}>Зарегистрироваться</button>
          <Link href={"/"}>Отмена</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
