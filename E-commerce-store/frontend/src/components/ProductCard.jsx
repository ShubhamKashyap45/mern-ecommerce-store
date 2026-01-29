import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const ProductCard = ({ product }) => {

    const { user } = useUserStore();
    if (!product) return null;

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        } else {
            // add to cart
        }
        toast.success("Added to cart");
    };

    return (
        <div className="group w-full bg-white">
            {/* Image */}
            <div className="relative w-full aspect-3/4 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2
          bg-black px-4 py-2 text-sm text-white opacity-0 transition-all duration-300
          group-hover:opacity-100"
                >
                    <ShoppingCart size={16} />
                    Add to cart
                </button>
            </div>

            {/* Content */}
            <div className="mt-3 space-y-1">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-sm font-semibold text-gray-800">
                    ${product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
