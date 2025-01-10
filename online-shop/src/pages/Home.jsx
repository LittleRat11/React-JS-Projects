import {useEffect, useState} from "react"
import { useNavigate } from "react-router";
export default function Home() {
    const [products, setProduct] = useState([]);
        const navigate = useNavigate();
        const goToProfile = () => {
            navigate("/profile");
        }

        useEffect(() => {
            fetch("/data.json")
            .then((res) => res.json())
            .then((data) => setProduct(data))
        },[]);
    return (
            <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Online Shopping</h1>
      <button onClick={goToProfile} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">Go to Profile</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-yellow-500">Rating: {product.rating}</p>
            <button
                onClick={() => navigate(`/products/${product.id}`)}
              className="text-blue-500 hover:underline"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
    )
}