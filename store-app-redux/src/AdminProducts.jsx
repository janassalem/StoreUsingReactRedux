import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts, AddProduct, UpdateProduct, DeleteProduct } from "./features/Product/productSlice.js";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.ProductState);
    const [newProduct, setNewProduct] = useState({ title: "", price: "", stock: "", image: ""});
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        dispatch(GetAllProducts());

    }, [dispatch , length]);

    const handleAddProduct = (e) => {
        e.preventDefault();
        // setNewProduct((prev)=>({...prev,id:products.length + 1}))
        dispatch(AddProduct(newProduct));
        setNewProduct({ title: "", price: "", stock: "", image: "" });
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        dispatch(UpdateProduct({ id: editingProduct.id, updatedData: editingProduct }));
        setEditingProduct(null);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(DeleteProduct(id));
        }
    };

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 ">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

            {/* Add New Product Form */}
            <form onSubmit={handleAddProduct} className="mb-6 space-y-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                <h2 className="font-semibold">Add New Product</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="border p-2 w-full rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Product
                </button>
            </form>


            {/* Products Table */}
            <div className="max-h-[500px] overflow-auto">
                <table className="w-full border-collapse border border-gray-200 shadow-sm ">
                    <thead className="sticky top-0 text-center">
                    <tr className="bg-gray-200 text-left">
                        <th className="border p-2 w-16 text-center">ID</th>
                        <th className="border p-2 w-48 text-center">Image</th>
                        <th className="border p-2 text-center">Title</th>
                        <th className="border p-2 w-24 text-center">Price</th>
                        <th className="border p-2 w-24 text-center">Stock</th>
                        <th className="border p-2 w-40 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center p-4">
                                No products found.
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id} className="text-center hover:bg-gray-50">
                                {/* Product ID */}
                                <td className="border p-2">{product.id}</td>

                                {/* Product Image */}
                                <td className="border p-2">
                                    {editingProduct?.id === product.id ? (
                                        <input
                                            type="text"
                                            value={editingProduct.image}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, image: e.target.value })
                                            }
                                            className="border p-1 rounded w-full"
                                        />
                                    ) : (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-32 object-contain rounded bg-gray-50"
                                        />
                                    )}
                                </td>

                                {/* Product Name */}
                                <td className="border p-2 text-center whitespace-nowrap">
                                    {editingProduct?.id === product.id ? (
                                        <input
                                            type="text"
                                            value={editingProduct.title || editingProduct.title}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, title: e.target.value })
                                            }
                                            className="border p-1 rounded w-full"
                                        />
                                    ) : (
                                        <span className="font-medium text-gray-800">
                                        {product.title }
                                    </span>
                                    )}
                                </td>


                                {/* Product Price */}
                                <td className="border p-2">
                                    {editingProduct?.id === product.id ? (
                                        <input
                                            type="number"
                                            value={editingProduct.price}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, price: e.target.value })
                                            }
                                            className="border p-1 rounded w-full"
                                        />
                                    ) : (
                                        `$${product.price}`
                                    )}
                                </td>

                                {/* Product Stock */}
                                <td className="border p-2">
                                    {editingProduct?.id === product.id ? (
                                        <input
                                            type="number"
                                            value={editingProduct.stock}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, stock: e.target.value })
                                            }
                                            className="border p-1 rounded w-full"
                                        />
                                    ) : (
                                        product.stock
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="border p-2 text-center">
                                    {editingProduct?.id === product.id ? (
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={handleUpdateProduct}
                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingProduct(null)}
                                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col justify-center space-y-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
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
