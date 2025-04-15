// components/AddDishForm.jsx
'use client';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

const AddDishForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [ingredients, setIngredients] = useState('');
    const [stock, setStock] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for button

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const base64Images = await Promise.all(images.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
            });
        }));

        const response = await fetch('/api/dishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                price,
                category,
                images: base64Images,
                ingredients: JSON.stringify(ingredients.split(',')),
                stock,
            }),
        });

        setLoading(false);
        if (response.ok) {
            alert('Dish added successfully!');
            setName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setImages([]);
            setImagePreviews([]);
            setIngredients('');
            setStock('');
        } else {
            alert('Error adding dish');
        }
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
        const previews = selectedFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    return (
        <>
        <Navbar />
        <div className="flex items-center mt-24 justify-center min-h-screen py-10 bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="w-full border max-w-2xl mx-auto shadow-2xl rounded-lg p-8 md:p-12 bg-white">
                <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">🍲 Add New Dish</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dish Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                            placeholder="E.g., Spaghetti Bolognese"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                            placeholder="Describe the dish in a few words"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                            placeholder="e.g., 15.99"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverage">Beverage</option>
                            <option value="Desi">Desi</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                        <input
                            type="text"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                            placeholder="Ingredients, comma-separated"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                            placeholder="Stock quantity"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            
                            onChange={handleImageChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                            required
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {imagePreviews.map((image, index) => (
                            <img key={index} src={image} alt={`Preview ${index}`} className="h-20 w-20 object-cover rounded-lg shadow-sm transition-transform duration-300 hover:scale-105" />
                        ))}
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            'Add Dish'
                        )}
                    </button>
                </form>
            </div>
        </div>
    </>
    
    );
};

export default AddDishForm;
