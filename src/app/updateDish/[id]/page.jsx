'use client';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const UpdateDishPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [stock, setStock] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch existing dish data when the component mounts
    useEffect(() => {
        if (id) {
            const fetchDishData = async () => {
                try {
                    const response = await fetch(`/api/dishes/${id}`);
                    const dish = await response.json();

                    // Populate state with dish data
                    setName(dish.name);
                    setDescription(dish.description);
                    setPrice(dish.price);
                    setCategory(dish.category);
                    setIngredients(dish.ingredients.join(',')); // assuming ingredients are a comma-separated string
                    setStock(dish.stock);
                    setImagePreviews(dish.images.map((img) => img.url));
                } catch (error) {
                    console.error("Failed to fetch dish data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchDishData();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch(`/api/dishes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                price,
                category,
                ingredients: ingredients.split(','), // convert back to an array
                stock,
            }),
        });

        setLoading(false);

        if (response.ok) {
            alert('Dish updated successfully!');
            router.push('/addmenu'); // Redirect to the dishes list page after updating
        } else {
            alert('Error updating dish');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center h-fit py-5 mt-24 bg-gradient-to-br from-blue-100 via-white to-pink-100">
                <div className="w-full max-w-2xl border mx-auto shadow-xl mt-10 rounded-lg p-8 md:p-12 pb-10">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Update Dish</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Dish Name"
                                required
                            />
                        </div>

                        {/* Description Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Description"
                                required
                            />
                        </div>

                        {/* Price Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Price"
                                required
                            />
                        </div>

                        {/* Category Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Category"
                                required
                            />
                        </div>

                        {/* Ingredients Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                            <input
                                type="text"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Comma-separated ingredients"
                                required
                            />
                        </div>

                        {/* Stock Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Stock Quantity"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Dish'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateDishPage;
