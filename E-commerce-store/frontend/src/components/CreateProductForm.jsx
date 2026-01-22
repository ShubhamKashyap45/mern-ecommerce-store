import { useState } from "react";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      }

      reader.readAsDataURL(file); // base64
    }

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
    } catch {
      console.log("error creating a product");

    }
  };
  return (
    <motion.div
      className="max-w-4xl mx-auto bg-white"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Upload Image
          </label>

          <label
            htmlFor="image"
            className={`
        relative flex items-center justify-center
        border-2 border-dashed border-gray-300
        h-28 w-28 cursor-pointer text-xs text-gray-500
        hover:border-black overflow-hidden
      `}
          >
            {/* Show "Upload" text only if no image is selected */}
            {!newProduct.image && <span>Upload</span>}

            {/* Show preview image if uploaded */}
            {newProduct.image && (
              <img
                src={newProduct.image}
                alt="Preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {newProduct.image && (
            <p className="mt-2 text-xs text-gray-500">Image selected</p>
          )}
        </div>
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product name
          </label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Type here"
            className="w-full border border-gray-300 px-3 py-2 text-sm
            focus:outline-none focus:border-black"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product description
          </label>
          <textarea
            rows={3}
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Write content here"
            className="w-full border border-gray-300 px-3 py-2 text-sm
            focus:outline-none focus:border-black"
            required
          />
        </div>
        {/* Category + Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product category
            </label>
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 text-sm"
              required
            >
              <option value=''>Select a category</option>
              {/* <option value="Men">Men</option>
              <option value="Women">Women</option> */}
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Product price
            </label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="25"
              className="w-full border border-gray-300 px-3 py-2 text-sm"
              required
            />
          </div>
        </div>
        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white px-10 py-2 text-sm font-medium"
            disabled={loading}
          >{loading ? (
            <>Loading.....</>
          ) : (
            <>ADD</>
          )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
export default CreateProductForm;
