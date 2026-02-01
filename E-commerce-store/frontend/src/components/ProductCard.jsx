import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {

    const { user } = useUserStore();
    const { addToCart } = useCartStore();
    if (!product) return null;

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        } else {
            // add to cart
            addToCart(product);
        }

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
                    className="
    absolute bottom-4 left-1/2 -translate-x-1/2
    inline-flex items-center gap-2
    border border-black bg-white px-4 py-2
    text-xs font-medium uppercase tracking-wide text-black
    opacity-0 transition-all duration-300
    hover:bg-black hover:text-white
    group-hover:opacity-100
    cursor-pointer
  "
                >
                    <ShoppingCart size={14} />
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
