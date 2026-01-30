import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCartStore();

    return (
        <div className="border-b border-gray-200 py-6">
            <div className="flex items-center gap-6">

                {/* Product Image */}
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 object-cover rounded-md"
                />

                {/* Product Info */}
                <div className="flex-1">
                    <p className="text-sm font-semibold text-black">
                        {item.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                    </p>
                    <p className="mt-2 text-sm font-medium text-black">
                        ${item.price}
                    </p>
                </div>

                {/* Quantity + Actions */}
                <div className="flex items-center gap-6">

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                            className="px-2 py-1 hover:bg-gray-100"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                            <Minus size={14} />
                        </button>

                        <span className="px-4 text-sm font-medium text-black">
                            {item.quantity}
                        </span>

                        <button
                            className="px-2 py-1 hover:bg-gray-100"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-500 hover:text-black transition"
                    >
                        <Trash size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
