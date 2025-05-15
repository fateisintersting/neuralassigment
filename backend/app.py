from flask import Flask, request, jsonify
import csv
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to read product data from CSV
def load_products():
    products = []
    # Assuming the CSV file is in the same directory as this script
    # Replace 'products.csv' with your actual filename if different
    csv_path = os.path.join(os.path.dirname(__file__), 'products.csv')
    
    try:
        with open(csv_path, 'r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                # Ensure price is converted to float for comparison later
                try:
                    row['price'] = float(row['price'])
                    products.append(row)
                except (ValueError, KeyError):
                    # Skip rows with invalid price data
                    continue
    except FileNotFoundError:
        print(f"Error: Could not find CSV file at {csv_path}")
    except Exception as e:
        print(f"Error loading products: {e}")
    
    return products

# Global variable to store products
all_products = load_products()

@app.route('/api/products', methods=['GET'])
def get_products():
    """Return all products"""
    return jsonify(all_products)

@app.route('/api/products/filter', methods=['GET'])
def filter_products():
    """Filter products by price range"""
    min_price = request.args.get('min_price', type=float, default=0)
    max_price = request.args.get('max_price', type=float, default=float('inf'))
    
    filtered_products = [
        product for product in all_products
        if min_price <= product['price'] <= max_price
    ]
    
    return jsonify(filtered_products)

if __name__ == '__main__':
    print(f"Loaded {len(all_products)} products")
    app.run(debug=True, port=5000)