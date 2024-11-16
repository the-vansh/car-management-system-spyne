import React, {useState, useEffect} from "react";
import axios from "axios";

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Fetch all cars initially
    useEffect(() => {
        const fetchCars = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Authentication token is missing.");
                return;
            }

            try {
                const response = await axios.get("https://car-management-system-spyne-backend.vercel.app/userCars", {
                    headers: {"auth-token": token},
                    credentials: "include",
                    withCredentials: true,
                });
                setCars(response.data.cars);
            } catch (error) {
                console.error(error.response.data);
                alert("Failed to fetch cars.");
            }
        };

        fetchCars();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication token is missing.");
            return;
        }

        try {
            const response = await axios.get(
                `https://car-management-system-spyne-backend.vercel.app/searchCars?query=${searchQuery}`,
                {
                    headers: {"auth-token": token},
                    credentials: "include",
                    withCredentials: true,
                }
            );
            setSearchResults(response.data.cars);
        } catch (error) {
            console.error(error.response.data);
            alert("Failed to search cars.");
        }
    };

    const handleShowMore = (carIndex) => {
        setSelectedCar(searchResults[carIndex]);
        setIsModalOpen(true);
        setCurrentImageIndex(0);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCar(null);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % selectedCar.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + selectedCar.images.length) % selectedCar.images.length);
    };

    return (
        <div>
            <h1
                style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: "2rem",
                    marginBottom: "20px",
                }}
            >
                Your Cars
            </h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                }}
            >
                <input
                    type="text"
                    placeholder="Search cars by title, tags, or description"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        outline: "none",
                        fontSize: "1rem",
                        marginRight: "10px",
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#018c01",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem",
                    }}
                >
                    Click & Search
                </button>
            </div>

            <h3
                style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: "1rem",
                    fontWeight: "bold",
                }}
            >
                {searchResults.length}Result Found
            </h3>

            {/* Display search results */}
            {searchResults.map((car, carIndex) => (
                <div
                    key={car._id}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #ccc",
                        padding: "40px",
                        marginBottom: "20px",
                        backgroundColor: "#C1E899",
                        color: "black",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        width: "80%",
                        maxWidth: "900px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}
                >
                    <h3>Title: {car.title}</h3>
                    <p>Description: {car.description}</p>
                    <p>Tags: {car.tags.join(", ")}</p>

                    <button
                        onClick={() => handleShowMore(carIndex)}
                        style={{
                            marginTop: "10px",
                            backgroundColor: "#018c01",
                            color: "white", // White text color
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                        }}
                    >
                        Show More
                    </button>
                </div>
            ))}

            {/* Modal to show more car details */}
            {isModalOpen && selectedCar && (
                <div style={styles.modalBackdrop} onClick={handleCloseModal}>
                    <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{textAlign: "left", color: "black", margin: "0 0 10px 0"}}>
                            Title: {selectedCar.title}
                        </h3>
                        <p style={{textAlign: "left", color: "black", margin: "0 0 10px 0"}}>
                            Description: {selectedCar.description}
                        </p>
                        <p style={{textAlign: "left", color: "black", margin: "0 0 10px 0"}}>
                            Tags: {selectedCar.tags.join(", ")}
                        </p>

                        {/* Image Slider */}
                        <div style={{maxWidth: "400px", width: "100%"}}>
                            {selectedCar.images.length > 0 && (
                                <div style={{textAlign: "center"}}>
                                    <img
                                        src={`data:image/jpeg;base64,${selectedCar.images[currentImageIndex]}`}
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
                                        {currentImageIndex + 1} / {selectedCar.images.length}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button onClick={handleCloseModal} style={styles.closeButton}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
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
        padding: "10px",
        borderRadius: "8px",
        width: "40%",
        maxWidth: "450px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflowY: "auto",
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
};

export default CarList;
