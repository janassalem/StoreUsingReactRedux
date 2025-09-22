import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GetAllProducts,
    AddProduct,
    UpdateProduct,
    DeleteProduct,
} from "../../features/Product/productSlice.js";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import { FaPlusCircle, FaBox } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../Loader.jsx";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector(
        (state) => state.ProductState
    );
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        stock: "",
        image: "",
    });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        dispatch(GetAllProducts());
        AOS.init({ duration: 600, easing: "ease-out-quart" });
    }, [dispatch]);

    const handleAddProduct = (e) => {
        e.preventDefault();
        dispatch(AddProduct(newProduct));
        setNewProduct({ title: "", price: "", stock: "", image: "" });
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        dispatch(
            UpdateProduct({ id: editingProduct.id, updatedData: editingProduct })
        );
        setEditingProduct(null);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(DeleteProduct(id));
        }
    };

    if (isLoading) return <Loader />;
    if (error)
        return (
            <p style={{ color: "var(--error)" }} className="text-lg">
                Error: {error}
            </p>
        );

    return (
        <div className="p-8 min-h-screen" style={{ color: "var(--text)" }}>
            {/* Header */}
            <div
                className="flex items-center gap-3 mb-8"
                data-aos="fade-right"
                data-aos-delay="100"
            >
                <FaBox className="text-2xl" style={{ color: "var(--text)" }} />
                <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
                    Manage Products
                </h1>
            </div>

            {/* Add New Product Form */}
            <form
                onSubmit={handleAddProduct}
                className="mb-10 space-y-4 p-6 rounded-xl shadow-sm"
                style={{ backgroundColor: "var(--bg)" }}
                data-aos="fade-up"
                data-aos-delay="200"
            >
                <div className="flex items-center gap-2 mb-6">
                    <FaPlusCircle className="text-2xl" style={{ color: "var(--success)" }} />
                    <h2 className="font-semibold text-xl" style={{ color: "var(--text)" }}>
                        Add New Product
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newProduct.title}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, title: e.target.value })
                        }
                        className="border p-3 w-full rounded-lg focus:ring-2 outline-none"
                        style={{ borderColor: "var(--muted)", color: "var(--text)", backgroundColor: "var(--input)" }}
                        required
                        data-aos="fade-up"
                        data-aos-delay="300"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                        }
                        className="border p-3 w-full rounded-lg focus:ring-2 outline-none"
                        style={{ borderColor: "var(--muted)", color: "var(--text)", backgroundColor: "var(--input)" }}
                        required
                        data-aos="fade-up"
                        data-aos-delay="400"
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={newProduct.stock}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, stock: e.target.value })
                        }
                        className="border p-3 w-full rounded-lg focus:ring-2 outline-none"
                        style={{ borderColor: "var(--muted)", color: "var(--text)", backgroundColor: "var(--input)" }}
                        required
                        data-aos="fade-up"
                        data-aos-delay="500"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.image}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, image: e.target.value })
                        }
                        className="border p-3 w-full rounded-lg focus:ring-2 outline-none"
                        style={{ borderColor: "var(--muted)", color: "var(--text)", backgroundColor: "var(--input)" }}
                        required
                        data-aos="fade-up"
                        data-aos-delay="600"
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
                    style={{ backgroundColor: "var(--accent)", color: "var(--accent-text)" }}
                    data-aos="zoom-in"
                    data-aos-delay="700"
                >
                    Add Product
                </button>
            </form>

            {/* Products Table with Animation */}
            <div
                className="max-h-[500px] overflow-auto rounded-xl shadow-lg"
                style={{ backgroundColor: "var(--bg)" }}
                data-aos="fade-up"
                data-aos-delay="800"
            >
                <table className="w-full border-collapse text-sm">
                    <thead
                        className="sticky top-0 text-xs shadow-sm uppercase font-semibold"
                        style={{ backgroundColor: "var(--muted)", color: "var(--text)" }}
                    >
                    <tr className="grid grid-cols-6 text-center">
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3">Image</th>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.length === 0 ? (
                        <tr className="grid grid-cols-6">
                            <td
                                colSpan="6"
                                className="text-center p-6"
                                style={{ color: "var(--muted)" }}
                                data-aos="fade-up"
                                data-aos-delay="900"
                            >
                                No products found.
                            </td>
                        </tr>
                    ) : (
                        products.map((product, index) => (
                            <tr
                                key={product.id}
                                className="grid grid-cols-6 items-center transition"
                                style={{ backgroundColor: "var(--bg)" }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--hover)"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--bg)"}
                                data-aos-delay={1000 + index * 100}
                            >
                                <td className="p-3 text-left" style={{ color: "var(--text)" }}>
                                    {product.id}
                                </td>

                                {/* Image */}
                                <td className="p-3 flex justify-center">
                                    {editingProduct?.id === product.id ? (
                                        <input
                                            type="text"
                                            value={editingProduct.image}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    image: e.target.value,
                                                })
                                            }
                                            className="border p-2 rounded-lg w-full"
                                            style={{ borderColor: "var(--muted)", color: "var(--text)", backgroundColor: "var(--input)" }}
                                        />
                                    ) : (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-16 h-16 object-contain rounded"
                                        />
                                    )}
                                </td>

                                {/* Title */}
                                <td className="p-3 text-left font-medium" style={{ color: "var(--text)" }}>
                                    {editingProduct?.id === product.id ? (
                                        <input
                                            type="text"
                                            value={editingProduct.title}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="border p-2 rounded-lg w-full"
                                            style={{ borderColor: "var(--muted)", color: "var(--text)", backgroundColor: "var(--input)" }}
                                        />
                                    ) : (
                                        product.title
                                    )}
                                </td>

                                {/* Price */}
                                <td className="p-3 flex justify-center items-center" style={{ color: "var(--success)" }}>
                                    {editingProduct?.id === product.id ? (
                                        <input
                                            type="number"
                                            value={editingProduct.price}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    price: e.target.value,
                                                })
                                            }
                                            className="border p-2 rounded-lg w-20 text-center"
                                            style={{ borderColor: "var(--muted)", color: "var(--text)", backgroundColor: "var(--input)" }}
                                        />
                                    ) : (
                                        `$${product.price}`
                                    )}
                                </td>

                                {/* Stock */}
                                <td className="p-3 flex justify-center items-center font-semibold" style={{ color: "var(--primary)" }}>
                                    {editingProduct?.id === product.id ? (
                                        <input
                                            type="number"
                                            value={editingProduct.stock}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    stock: e.target.value,
                                                })
                                            }
                                            className="border p-2 rounded-lg w-20 text-center"
                                            style={{ borderColor: "var(--muted)", color: "var(--text)", backgroundColor: "var(--input)" }}
                                        />
                                    ) : (
                                        product.stock
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="p-3 flex justify-center gap-2">
                                    {editingProduct?.id === product.id ? (
                                        <>
                                            <button
                                                onClick={handleUpdateProduct}
                                                className="px-3 py-2 rounded-lg shadow flex items-center gap-1"
                                                style={{ backgroundColor: "var(--success)", color: "var(--onSuccess)" }}
                                            >
                                                <FiSave /> Save
                                            </button>
                                            <button
                                                onClick={() => setEditingProduct(null)}
                                                className="px-3 py-2 rounded-lg shadow flex items-center gap-1"
                                                style={{ backgroundColor: "var(--muted)", color: "var(--text)" }}
                                            >
                                                <FiX /> Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="px-3 py-2 rounded-lg shadow flex items-center gap-1"
                                                style={{ backgroundColor: "var(--edit)", color: "var(--onWarning)" }}
                                            >
                                                <FiEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="px-3 py-2 rounded-lg shadow flex items-center gap-1"
                                                style={{ backgroundColor: "var(--error)", color: "var(--onError)" }}
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
