import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations");
                setRecommendations(res.data);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "An error occurred while fetching recommendations"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="mt-16">
            {/* Heading */}
            <div className="mb-8 flex items-center gap-4">
                <h3 className="text-lg font-medium tracking-wide text-black uppercase">
                    People also bought
                </h3>
                <span className="h-px flex-1 bg-gray-300"></span>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recommendations.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default PeopleAlsoBought;
