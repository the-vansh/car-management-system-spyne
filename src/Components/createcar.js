import React, {useState, useRef} from "react";
import axios from "axios";

const AddCarForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null); // Ref for file input

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files.length > 10) {
            setError("You can upload a maximum of 10 images.");
        } else {
            setError("");
            setImages(files); // Store the selected files
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);

        const tagsArray = tags.split(",").map((tag) => tag.trim());
        formData.append("tags", JSON.stringify(tagsArray)); // Send tags as a JSON string

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing.");
            return;
        }

        try {
            const response = await axios.post(
                "https://car-management-system-spyne-backend.vercel.app/addCar",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "auth-token": token,
                    },
                    credentials: "include",
                }
            );
            console.log(response.data);

            setTitle("");
            setDescription("");
            setTags("");
            setImages([]);
            setError("");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            alert("Car saved successfully!");
        } catch (error) {
            console.error(error.response?.data || error.message);
            setError(error.response?.data?.error || "An error occurred while adding the car.");
        }
    };

    const styles = {
        container: {
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#006400",
            color: "#114a10",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
            width: "100%",
            maxWidth: "400px",
            margin: "20px auto",
        },
        heading: {
            color: "#fff",
            textAlign: "center",
            marginBottom: "20px",
        },
        label: {
            display: "block",
            fontWeight: "bold",
            color: "#fff",
            marginBottom: "5px",
        },
        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #546f5d",
            borderRadius: "5px",
            backgroundColor: "#C1E899",
            color: "#000",
        },
        textarea: {
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #546f5d",
            borderRadius: "5px",
            backgroundColor: "#C1E899",
            color: "#000",
            resize: "none",
            height: "100px",
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#6da06f",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
        },
        buttonHover: {
            backgroundColor: "#8fbc8b",
        },
        error: {
            color: "#ff6b6b",
            fontWeight: "bold",
            textAlign: "center",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add Car</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={styles.label}>Title:</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={styles.label}>Description:</label>
                    <textarea
                        style={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label style={styles.label}>Tags:</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={styles.label}>Images (max 10):</label>
                    <input
                        type="file"
                        style={styles.input}
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                    />
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Add Car
                </button>
            </form>
        </div>
    );
};

export default AddCarForm;
