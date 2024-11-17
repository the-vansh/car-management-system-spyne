import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./login.css";
import {Link} from "react-router-dom";

export default function Login() {
    const [credentials, setcredentails] = useState({email: " ", password: ""});
    const [loading, setLoading] = useState(false); 
    let navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const {email, password} = credentials;
        const response = await fetch("https://car-management-system-spyne-backend.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({email, password}),
        });
        const json = await response.json();
        console.log(json);

        setLoading(false);

        if (json.success) {
            //save the authtoken and redirect

            localStorage.setItem("token", json.authtoken);
            console.log("Token stored:", json.authtoken);

            alert("Logged in successfully");
            navigate("/showcars");
        } else {
            alert("Invalid Credentails");
            setcredentails({email: "", password: ""});
        }
    };

    const onchange = (e) => {
        setcredentails({...credentials, [e.target.name]: e.target.value});
    };
    return (
        <>
        {loading && (
            <p style={{
                position: 'fixed', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: '#fff', 
                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                zIndex: 1000
            }}>
                Please wait...
            </p>
        )}
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
                            <h2>Log In</h2>
                            <div className="form">
                                <div className="inputBox">
                                    <input
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={onchange}
                                        required
                                    />{" "}
                                    <i>Email</i>
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={onchange}
                                        required
                                    />{" "}
                                    <i>Password</i>
                                </div>
                                <div className="links">
                                    {" "}
                                    <h4>Do not have account?</h4> <Link to="/signup">Signup</Link>
                                </div>
                                <div className="inputBox">
                                    <input type="submit" onClick={submit} value="Login" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
