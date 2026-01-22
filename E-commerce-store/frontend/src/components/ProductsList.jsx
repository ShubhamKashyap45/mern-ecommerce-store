import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeatureProduct, products } = useProductStore();

  console.log("products", products);
  return (
    <div>
      Product List
    </div>
  )
}

export default ProductsList
