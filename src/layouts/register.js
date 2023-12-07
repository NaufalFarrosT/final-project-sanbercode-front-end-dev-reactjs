"use client";

import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    image_url: "",
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "name") {
      setInput({ ...input, name: value });
    } else if (name === "image_url") {
      setInput({ ...input, image_url: value });
    } else if (name === "email") {
      setInput({ ...input, email: value });
    } else if (name === "password") {
      setInput({ ...input, password: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let { name, image_url, email, password } = input;

    axios
      .post("https://dev-example.sanbercloud.com/api/register", {
        name,
        image_url,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-1/2 mx-auto mt-10 border-solid border-2 border-gray-500 p-6">
      <form className="flex max-w-mx flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            name="name"
            placeholder=""
            required
            type="text"
            onChange={handleInput}
            value={input.name}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="image_url" value="Image_Url" />
          </div>
          <TextInput
            id="image_url"
            name="image_url"
            placeholder=""
            required
            type="text"
            onChange={handleInput}
            value={input.image_url}
          />
        </div>
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
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
