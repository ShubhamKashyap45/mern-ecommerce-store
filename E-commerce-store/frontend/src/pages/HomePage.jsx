import CategoryItem from "../components/CategoryItem";


const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirt.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  // { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <h1 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Explore Categories
        </h1>

        <p className="text-center text-gray-600 text-lg mb-12">
          Discover modern fashion curated for everyday style
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>

      </div>
    </div>
  );

};
export default HomePage;