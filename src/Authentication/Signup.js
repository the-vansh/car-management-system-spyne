import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./login.css";
import {Link} from "react-router-dom";
export default function Signup() {
    const [credentials, setcredentails] = useState({username: "", email: " ", password: ""});
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const Submit = async (e) => {
        e.preventDefault();
        const {username, email, password} = credentials;
        // console.log("SEND");
        // console.log(username);
        // console.log(email);
        // console.log(password);
        setLoading(true);
        const response = await fetch("https://car-management-system-spyne-backend.vercel.app/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, email, password}),
            credentials: "include", // Ensure credentials are sent with the request
        });
        const json = await response.json();
        console.log(json);
        setLoading(false);
        //save the authtoken and redirect
        if (json.success) {
            alert("Account created successfully & please Login", "success");
            navigate("/");
        } else {
            alert("Invalid credentials", "danger");
            setcredentails({username: "", email: "", password: ""});
        }
    };

    const onchange = (e) => {
        setcredentails({...credentials, [e.target.name]: e.target.value});
    };

    return (
        <>
           {loading && <p style={{textAlign:"center"}}>Please wait...</p>} 
            <div className="one">
                <section className="sectioning">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="signin">
                        <div className="content">
                            <h2>Signup</h2>
                            <div className="form">
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={onchange}
                                        value={credentials.username}
                                        required
                                    />{" "}
                                    <i>Username</i>
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={onchange}
                                        value={credentials.email}
                                        required
                                    />{" "}
                                    <i>Email</i>
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={onchange}
                                        value={credentials.password}
                                        required
                                    />{" "}
                                    <i>Password</i>
                                </div>
                                <div className="links">
                                    {" "}
                                    <h4>Already have account?</h4> <Link to="/">Login</Link>
                                </div>
                                <div className="inputBox">
                                    <input type="submit" value="Signup" onClick={Submit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
