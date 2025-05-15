import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const applyPriceFilter = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (minPrice !== '') params.append('min_price', minPrice);
      if (maxPrice !== '') params.append('max_price', maxPrice);

      const url = `http://localhost:5000/api/products/filter?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Filter request failed with status ${response.status}`);
      }

      const data = await response.json();
      setFilteredProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(products);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
      </header>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Price Filter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="min-price" className="block font-medium text-gray-700">Min Price ($)</label>
            <input
              id="min-price"
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Min Price"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block font-medium text-gray-700">Max Price ($)</label>
            <input
              id="max-price"
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Max Price"
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex items-end gap-2">
            <button onClick={applyPriceFilter} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Apply Filter
            </button>
            <button onClick={resetFilters} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Products ({filteredProducts.length})</h2>

        {loading && <p className="text-blue-500">Loading products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          filteredProducts.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <div key={index} className="border p-4 rounded-lg shadow hover:shadow-md transition">
                  <h3 className="text-lg font-bold">{product.product_name}</h3>
                  <p className="text-blue-600 font-semibold mt-1">${Number(product.price).toFixed(2)}</p>
                  {product.description && <p className="text-gray-700 mt-2">{product.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products match your filter criteria.</p>
          )
        )}
      </div>
    </div>
  );
}

export default App;
