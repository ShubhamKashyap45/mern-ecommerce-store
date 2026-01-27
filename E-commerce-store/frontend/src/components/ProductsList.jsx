import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className='bg-white shadow-md rounded-lg overflow-hidden max-w-6xl mx-auto border border-gray-200'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <table className='min-w-full border-collapse'>
        <thead className='bg-gray-50 border-b border-gray-200'>
          <tr>
            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
              Product
            </th>
            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
              Price
            </th>
            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
              Category
            </th>
            <th className='px-6 py-4 text-center text-sm font-semibold text-gray-600'>
              Featured
            </th>
            <th className='px-6 py-4 text-center text-sm font-semibold text-gray-600'>
              Actions
            </th>
          </tr>
        </thead>

        <tbody className='divide-y divide-gray-200'>
          {products?.map((product) => (
            <tr
              key={product._id}
              className='hover:bg-gray-50 transition'
            >
              {/* Product */}
              <td className='px-6 py-4'>
                <div className='flex items-center gap-4'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='h-14 w-14 rounded-md object-cover border'
                  />
                  <span className='text-sm font-medium text-gray-800'>
                    {product.name}
                  </span>
                </div>
              </td>

              {/* Price */}
              <td className='px-6 py-4 text-sm text-gray-700'>
                ${product.price.toFixed(2)}
              </td>

              {/* Category */}
              <td className='px-6 py-4 text-sm text-gray-600'>
                {product.category}
              </td>

              {/* Featured */}
              <td className='px-6 py-4 text-center'>
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full transition ${product.isFeatured
                    ? 'bg-yellow-400 text-white'
                    : 'bg-gray-200 text-gray-500'
                    }`}
                >
                  <Star className='h-5 w-5' />
                </button>
              </td>

              {/* Actions */}
              <td className='px-6 py-4 text-center'>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className='text-gray-500 hover:text-red-500 transition text-lg'
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;


