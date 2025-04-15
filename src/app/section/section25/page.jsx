'use client'
import React, { useEffect, useState } from 'react';
import MoreButton from '@/components/MoreButton';

const DealsPage = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await fetch("/api/deals");
                if (!response.ok) {
                    throw new Error("Failed to fetch deals");
                }
                const data = await response.json();

                // Filter deals based on categories containing "Special"
                const specialDeals = data.filter((deal) =>
                    deal.categories.some((category) =>
                        category.includes("Special")
                    )
                );
                setDeals(specialDeals);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center gap-5 py-10">
                Loading deals...
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 py-10">{error}</div>;
    }

    // Get the first deal to display three times
    const featuredDeal = deals.length > 0 ? deals[0] : null;

    return (
        <section className="bg-gradient-to-r from-gray-100 to-blue-50 py-10">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
                Today's Special Deals
            </h2>
            <div className="w-[90%] max-w-[1200px] m-auto">
                {/* First row with 3 copies of the same deal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {featuredDeal && Array(3).fill(0).map((_, index) => (
                        <div
                            key={`featured-${index}`}
                            className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                            style={{ height: "450px" }}
                        >
                            {/* Main Image with Overlay */}
                            <div className="relative h-full w-full">
                                <img
                                    src={featuredDeal.mainImage}
                                    alt={featuredDeal.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                {/* Discount Badge */}
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    {featuredDeal.discountPercentage}% OFF
                                </div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 p-5 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    {featuredDeal.title}
                                </h3>
                                <p className="text-sm mb-2 line-clamp-2">{featuredDeal.description}</p>
                                <p className="text-md font-medium mb-3">
                                    <span className="line-through text-red-300 mr-2">
                                        ${featuredDeal.originalPrice}
                                    </span>
                                    <span>${featuredDeal.discountPrice}</span>
                                </p>
                                <p className="text-xs mb-3">
                                    Valid from:{" "}
                                    {new Date(featuredDeal.startDate).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(featuredDeal.endDate).toLocaleDateString()}
                                </p>
                                <button className="bg-blue-500 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">
                                    Grab Deal
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show remaining deals if any */}
                {deals.length > 1 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {deals.slice(1).map((deal) => (
                                <div
                                    key={deal._id}
                                    className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                                    style={{ height: "450px" }}
                                >
                                    {/* Main Image with Overlay */}
                                    <div className="relative h-full w-full">
                                        <img
                                            src={deal.mainImage}
                                            alt={deal.title}
                                            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        {/* Discount Badge */}
                                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                            {deal.discountPercentage}% OFF
                                        </div>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 p-5 text-white">
                                        <h3 className="text-2xl font-bold mb-2">
                                            {deal.title}
                                        </h3>
                                        <p className="text-sm mb-2 line-clamp-2">{deal.description}</p>
                                        <p className="text-md font-medium mb-3">
                                            <span className="line-through text-red-300 mr-2">
                                                ${deal.originalPrice}
                                            </span>
                                            <span>${deal.discountPrice}</span>
                                        </p>
                                        <p className="text-xs mb-3">
                                            Valid from:{" "}
                                            {new Date(deal.startDate).toLocaleDateString()}{" "}
                                            -{" "}
                                            {new Date(deal.endDate).toLocaleDateString()}
                                        </p>
                                        <button className="bg-blue-500 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">
                                            Grab Deal
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <MoreButton />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default DealsPage;