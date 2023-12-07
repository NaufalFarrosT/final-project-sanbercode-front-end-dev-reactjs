import React from "react"
import blankImage from "../images/blank-image.png"
import ContentSeparator from "../components/sidebar"
import { AuthContext } from "../hooks/useAuth";
import { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import axios from "axios";

const Profile = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)

    const [input, setInput] = useState({
        current_password: "",
        new_password: "",
        new_confirm_password: "",
    });

    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        if (name === "current_password") {
            setInput({ ...input, current_password: value });
        } else if (name === "new_password") {
            setInput({ ...input, new_password: value });
        } else if (name === "new_confirm_password") {
            setInput({ ...input, new_confirm_password: value });
        }
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        let {
            current_password,
            new_password,
            new_confirm_password,

        } = input;

        axios
            .post(`https://dev-example.sanbercloud.com/api/change-password`, {
                current_password,
                new_password,
                new_confirm_password,
                token
            })
            .then((res) => {
                alert("success change password")

                setInput({
                    current_password: "",
                    new_password: "",
                    new_confirm_password: "",
                  });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex">
            <ContentSeparator />
            <div className="w-1/2 mx-auto mt-5">
                <img className="w-32 h-32 mx-auto" src={user.image_url} />
                <h1 className="text-gray-900 font-bold text-xl text-center">
                    {user.name}
                </h1>
                <h2 className="text-gray-900 font-bold text-l text-center">
                    {user.email}
                </h2>

                <Card
                    className="w-1/2 mx-auto mt-20"
                >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="small" value="Current Password" />
                            </div>
                            <TextInput
                                id="current_password"
                                name="current_password"
                                sizing="sm"
                                type="text"
                                onChange={handleInput}
                                value={input.current_password}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="small" value="New Password" />
                            </div>
                            <TextInput
                                id="new_password"
                                name="new_password"
                                sizing="sm"
                                type="text"
                                onChange={handleInput}
                                value={input.new_password}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="small" value="Confirm New Password" />
                            </div>
                            <TextInput
                                id="new_confirm_password"
                                name="new_confirm_password"
                                sizing="sm"
                                type="text"
                                onChange={handleInput}
                                value={input.new_confirm_password}
                                required
                            />
                        </div>
                        <Button className="mx-auto mt-5" type={"submit"}>Change Password</Button>
                    </form>
                </Card>

            </div>
        </div>
    )
}

export default Profile