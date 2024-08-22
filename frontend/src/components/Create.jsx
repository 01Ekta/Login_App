import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Create = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    console.log(name, email, age);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addUser = {name, email, age}
        const response = await fetch("http://localhost:5000", {
            method: "POST",
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();

        if(!response.ok){
            console.log(result.error);
            setError(result.error);
        }
        if(response.ok) {
            console.log(result);
            setError("");
            setName("");
            setEmail("");
            setAge(0);
            navigate("/all");
        }
    };

    return (
        <div className="container my-2">
        <h2 className="text-center">Enter the data</h2>

        {error && <div class="alert alert-danger">{error}</div>}
        <form className="form" onSubmit={handleSubmit}>
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)}>
            </input>
        </div>
        <div class="mb-3">
        <label class="form-label">Email address</label>
        <input 
        type="email" 
        class="form-control"
        value = {email}
        onChange={(e) => setEmail(e.target.value)}>
        </input>
        </div>
        <div class="mb-3">
            <label class="form-label">Age</label>
            <input 
            type="number" 
            class="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}>
            </input>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    );
};

export default Create;