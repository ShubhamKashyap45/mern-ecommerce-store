import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSummary = () => {

    const { total, subtotal, coupon, isCouponApplied } = useCartStore();

    const savings = subtotal - total;
    const formattedSubtotal = subtotal.toFixed(2);
    const formattedTotal = total.toFixed(2);
    const formattedSavings = savings.toFixed(2);

    return (
        <motion.div
            className="space-y-6 border border-gray-200 bg-white p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Heading */}
            <div className="flex items-center gap-4">
                <p className="text-lg font-semibold tracking-wide text-black">
                    Order summary
                </p>
                <span className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="space-y-6">
                <div className="space-y-4 text-sm">
                    <dl className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <dt className="text-gray-600">Original price</dt>
                        <dd className="font-medium text-black">${formattedSubtotal}</dd>
                    </dl>

                    {savings > 0 && (
                        <dl className="flex items-center justify-between border-b border-gray-200 pb-3">
                            <dt className="text-gray-600">Savings</dt>
                            <dd className="font-medium text-black">-${formattedSavings}</dd>
                        </dl>
                    )}

                    {coupon && isCouponApplied && (
                        <dl className="flex items-center justify-between border-b border-gray-200 pb-3">
                            <dt className="text-gray-600">Coupon ({coupon.code})</dt>
                            <dd className="font-medium text-black">
                                -{coupon.discountPercentage}%
                            </dd>
                        </dl>
                    )}

                    <dl className="flex items-center justify-between pt-2">
                        <dt className="text-base font-semibold text-black">Total</dt>
                        <dd className="text-base font-semibold text-black">
                            ${formattedTotal}
                        </dd>
                    </dl>
                </div>

                {/* Checkout Button */}
                <motion.button
                    className="w-full border border-black bg-black py-3 text-sm font-medium tracking-wide
      text-white transition hover:bg-white hover:text-black"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    PROCEED TO CHECKOUT
                </motion.button>

                {/* Continue Shopping */}
                <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-gray-500">or</span>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 font-medium text-black
        underline-offset-4 hover:underline"
                    >
                        Continue Shopping
                        <MoveRight size={16} />
                    </Link>
                </div>
            </div>
        </motion.div>

    )
}

export default OrderSummary
