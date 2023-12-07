"use client";

import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "email") {
      setInput({ ...input, email: value });
    } else if (name === "password") {
      setInput({ ...input, password: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    let { email, password } = input;

    axios
    .post("https://dev-example.sanbercloud.com/api/login", {email, password})
    .then((res)=>{
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log(res.data.user)

      navigate('/dashboard/list-job-vacancy')
    })
    .catch((error)=>console.log(error))
  }

  return (
    <div className="w-3/4 mx-auto mt-10 border-solid border-2 border-gray-500 p-6 md:w-1/4">
      <form className="flex max-w-mx flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email"
            name="email"
            placeholder="name@gmail.com"
            required
            type="email"
            onChange={handleInput}
            value={input.email}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password"
            name="password"
            required
            type="password"
            onChange={handleInput}
            value={input.password}
          />
        </div>
        <div>
            Doesn't Have Account? 
            <Link to="/register" className="text-blue-600"> Register</Link>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
