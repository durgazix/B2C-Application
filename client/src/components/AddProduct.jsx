import { useState } from "react";
import API from "../utils/axios";

const AddProduct = ({ onProductAdded }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/admin/products", form);
      onProductAdded(res.data);
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error(err); 
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded shadow">
      <h3 className="mb-2 font-bold">Add New Product</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="border p-2 mb-2 w-full" />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border p-2 mb-2 w-full" />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required className="border p-2 mb-2 w-full" />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="border p-2 mb-2 w-full" />
      <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required className="border p-2 mb-2 w-full" />
      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="border p-2 mb-2 w-full" />
      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProduct;