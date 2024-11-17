import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
const CarList = () => {
    const [cars, setCars] = useState([]);
    const [showMoreCar, setShowMoreCar] = useState(null);
    const [editCar, setEditCar] = useState({title: "", description: "", tags: ""});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [update_id, setupdate_id] = useState("");

    const [Imageedit, setImageedit] = useState(false);
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchCars = async () => {
            
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Authentication token is missing.");
                return;
            }
            const a = error;
            console.log(a);
            try {
                const response = await axios.get("https://car-management-system-spyne-backend.vercel.app/userCars", {
                    headers: {"auth-token": token},
                    credentials: "include",
                });
               
                setCars(response.data.cars);
            } catch (error) {
               
                console.error(error.response.data);
            }
        };

        fetchCars();
    }, [cars]);

    const handleShowMore = (car) => {
        setShowMoreCar(car);
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files.length > 10) {
            setError("You can upload a maximum of 10 images.");
        } else {
            setError("");
            setImages(files);
        }
    };

    const handleimageedit = (carID) => {
        setupdate_id({updat: carID});
        setImageedit(true);
    };

    const handlecloseimagepanel = () => {
        setImageedit(false);
        setupdate_id({updat: ""});
    };

    const updateimage = async (carSID) => {
        const carID = carSID.updat;
        console.log("Updating images for car:", carID);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing.");
            return;
        }
 
        if (images.length === 0) {
            setError("Please select at least one image to upload.");
            return;
        } 

        setLoading(true);

        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        try {
            const response = await axios.put(
                `https://car-management-system-spyne-backend.vercel.app/updateCarImage/${carID}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "auth-token": token,
                    },
                    credentials: "include",
                    withCredentials: true,
                }
            );

            alert(response.data.message);

            const updatedCars = cars.map((car) =>
                car._id === carID ? {...car, images: response.data.updatedCar.images} : car
            );
            setLoading(false);
            setCars(updatedCars);

            handlecloseimagepanel();
        } catch (error) {
            setLoading(false);
            console.error(error);
            setError(error.response?.data?.error || "An error occurred while uploading images.");
        }
    };

    const handleEditCar = (car) => {
        console.log(car._id);
        setEditCar({title: car.title, description: car.description});
        setupdate_id({updat: car._id});

        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditCar({title: "", description: "", tags: ""});
    };

    const handleCloseShowMoreModal = () => {
        setShowMoreCar(null);
    };

    const handleUpdateCar = async (carSID) => {
        //console.log(`from handle update"+${carId.updat}`);
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication token is missing.");
            return;
        }
        setLoading(true);
        const carId = carSID.updat;
        console.log(carId);
        try {
            const response = await axios.put(
                `https://car-management-system-spyne-backend.vercel.app/updateCar/${carId}`,
                {
                    title: editCar.title,
                    description: editCar.description,
                    tags: editCar.tags.split(",").map((tag) => tag.trim()),
                },
                {
                    headers: {"auth-token": token},
                    credentials: "include",
                    withCredentials: true,
                }
            );
            setLoading(false);
            alert(response.data.message);
            // Update the state with the new car details (optional)
            const updatedCars = cars.map((car) => (car._id === carId ? {...car, ...editCar} : car));
            setCars(updatedCars);

            handleCloseEditModal(); // Close the modal after update
        } catch (error) {
            setLoading(false);
            console.error(error);
            alert(error.response?.data?.error || "An error occurred while updating the car.");
        }
    };

    const handleDeleteCar = async (carId) => {
        console.log(carId);
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication token is missing.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.delete(
                `https://car-management-system-spyne-backend.vercel.app/deleteCar/${carId}`,
                {
                    headers: {"auth-token": token},
                    credentials: "include",
                    withCredentials: true,
                }
            );
            setLoading(false);
            setCars(cars.filter((car) => car._id !== carId));

            alert(response.data.message); // Show success message
        } catch (error) {
            setLoading(false);
            console.error(error.response.data);
            alert(error.response.data.error || "An error occurred while deleting the car.");
        }
    };

    // Handle image navigation in the Show More modal
    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % showMoreCar.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + showMoreCar.images.length) % showMoreCar.images.length);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditCar((prev) => ({...prev, [name]: value}));
    };

    return (
        <>
         {loading && <p style={{textAlign:"center"}}>Please Wait...</p>} 
        <div>
            <h1 style={{textAlign: "center", color: "black"}}>Your Cars</h1>
            {cars.map((car) => (
                <div
                    key={car._id}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        border: "1px solid #ccc",
                        padding: "40px",
                        margin: "40px auto",
                        width: "80%",
                        maxWidth: "900px",
                        backgroundColor: "#C1E899",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                    }}
                >
                    {/* Car details section (left side) */}
                    <div
                        style={{
                            flex: 1,
                            textAlign: "left",
                            marginTop: "20px",
                        }}
                    >
                        <h3 style={{marginBottom: "10px"}}>Title: {car.title}</h3>
                        <p style={{marginBottom: "10px"}}>Description: {car.description}</p>
                        <p style={{marginBottom: "10px"}}>Tags: {car.tags}</p>
                    </div>

                    {/* Buttons section (right side) */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "flex-start",
                            marginTop: "20px",
                        }}
                    >
                        {/* Button: Image Change */}
                        <button
                            onClick={() => handleimageedit(car._id)}
                            style={{
                                marginTop: "10px",
                                backgroundColor: "#018c01",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "bold",
                                width: "100%",
                            }}
                        >
                            Image change
                        </button>

                        {/* Button: Update */}
                        <button
                            onClick={() => handleEditCar(car)}
                            style={{
                                marginTop: "10px",
                                backgroundColor: "#018c01",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "bold",
                                width: "100%",
                            }}
                        >
                            Update
                        </button>

                        {/* Button: Delete */}
                        <button
                            onClick={() => handleDeleteCar(car._id)}
                            style={{
                                marginTop: "10px",
                                backgroundColor: "#018c01",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "bold",
                                width: "100%",
                            }}
                        >
                            Delete
                        </button>

                        {/* Button: Show More */}
                        <button
                            onClick={() => handleShowMore(car)}
                            style={{
                                marginTop: "10px",
                                backgroundColor: "#018c01",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "bold",
                                width: "100%",
                            }}
                        >
                            Show More
                        </button>
                    </div>
                </div>
            ))}

            {/* Show More Modal */}
            {showMoreCar && (
                <div style={styles.modalBackdrop} onClick={handleCloseShowMoreModal}>
                    <div
                        style={styles.modalCard}
                        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                    >
                        <h3 style={{textAlign: "left", color: "black", margin: "0 0 10px 0"}}>
                            Title: {showMoreCar.title}
                        </h3>
                        <p style={{textAlign: "left", color: "black", margin: "0 0 10px 0"}}>
                            Description: {showMoreCar.description}
                        </p>
                        <p style={{textAlign: "left", color: "black", margin: "0 0 10px 0"}}>
                            Tags: {showMoreCar.tags.join(", ")}
                        </p>

                        {/* Image Slider */}

                        <div style={{maxWidth: "400px", width: "100%"}}>
                            {showMoreCar.images.length > 0 && (
                                <div style={{textAlign: "center"}}>
                                    <img
                                        src={`data:image/jpeg;base64,${showMoreCar.images[currentImageIndex]}`}
                                        alt={`Car Image ${currentImageIndex + 1}`}
                                        style={{
                                            width: "400px",
                                            height: "400px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            marginBottom: "15px",
                                        }}
                                    />
                                    <div>
                                        <button onClick={handlePrevImage} style={styles.sliderButton}>
                                            &lt; Prev
                                        </button>
                                        <button onClick={handleNextImage} style={styles.sliderButton}>
                                            Next &gt;
                                        </button>
                                    </div>
                                    <div style={{marginTop: "10px", fontWeight: "bold"}}>
                                        {currentImageIndex + 1} / {showMoreCar.images.length}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button onClick={handleCloseShowMoreModal} style={styles.closeButton}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Car Modal */}
            {isEditModalOpen && (
                <div style={styles.modalBackdrop} onClick={handleCloseEditModal}>
                    <div
                        style={styles.modalCard}
                        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                    >
                        <h3>Edit Car Details</h3>
                        <input
                            type="text"
                            name="title"
                            value={editCar.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            style={styles.inputField}
                        />
                        <textarea
                            name="description"
                            value={editCar.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            style={styles.inputField}
                        />
                        <input
                            type="text"
                            name="tags"
                            value={editCar.tags}
                            onChange={handleInputChange}
                            placeholder="Tags (comma separated)"
                            style={styles.inputField}
                        />
                        <button onClick={() => handleUpdateCar(update_id)} style={styles.updateButton}>
                            Update
                        </button>
                        <button onClick={handleCloseEditModal} style={styles.closeButton}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* editimage */}

            {Imageedit && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "30px",
                            borderRadius: "10px",
                            maxWidth: "400px",
                            width: "80%",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                        }}
                    >
                        {/* File input */}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef} // Attach ref to the file input
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                            }}
                        />

                        {/* Process button */}
                        <button
                            onClick={() => updateimage(update_id)}
                            style={{
                                backgroundColor: "#018c01",
                                color: "white",
                                padding: "12px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Process
                        </button>

                        {/* Close button */}
                        <button
                            onClick={() => handlecloseimagepanel()}
                            style={{
                                backgroundColor: "#8d918d",
                                color: "white",
                                padding: "12px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

// Styles for the modal
const styles = {
    modalBackdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background to overlay the page
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modalCard: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "40%",
        maxWidth: "450px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflowY: "auto", // Ensures content scrolls if necessary
    },
    sliderButton: {
        padding: "8px 12px",
        margin: "5px",
        backgroundColor: "#018c01",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "14px",
    },
    closeButton: {
        position: "absolute",
        top: "5px",
        right: "5px",
        padding: "5px 10px",
        backgroundColor: "#018c01",
        color: "white",
        border: "none",
        borderRadius: "5px",
    },
    inputField: {
        width: "100%",
        padding: "8px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    updateButton: {
        backgroundColor: "#018c01",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default CarList;
