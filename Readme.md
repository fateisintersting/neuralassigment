Product List Web Application
This is a simple web application that displays a list of products from a CSV file and allows users to filter them by minimum and maximum price.
Features

Display a list of products loaded from a CSV file
Filter products by minimum and maximum price range
Responsive design that works on both desktop and mobile devices

Technologies Used

Backend: Python/Flask
Frontend: React
Additional Libraries: flask-cors

Project Structure
product-list-app/
├── backend/
│   ├── app.py           # Flask application
│   └── products.csv     # Sample product data
└── frontend/
    ├── public/          # Public assets
    └── src/
        ├── App.jsx       # Main React component
        ├── App.css      # Styling
        └── Main.jsx     # Entry point
Setup and Installation
Prerequisites

Python 3.6+
Node.js 14+
npm 

Backend Setup

Navigate to the backend directory:
bashcd backend

Create a virtual environment :
bashpython -m venv venv

Activate the virtual environment:

Windows: venv\Scripts\activate
macOS/Linux: source venv/bin/activate


Install required packages:
pip install flask flask-cors

Make sure the products.csv file is in the same directory as app.py
Start the Flask server:
python app.py
mac/linux python3 app.py
The backend server should now be running on http://localhost:5000

Frontend Setup

Navigate to the frontend directory:
bashcd frontend

Install dependencies:
bashnpm install

Start the development server:
bashnpm start
The React app should now be running on http://localhost:3000

Usage

The application will initially display all products from the CSV file.
Enter minimum and/or maximum price values in the filter inputs.
Click the "Apply Filter" button to filter products within the specified price range.
Click the "Reset" button to clear the filters and display all products again.

API Endpoints

GET /api/products: Returns the complete list of products
GET /api/products/filter?min_price=X&max_price=Y: Returns products filtered by the specified minimum and maximum prices


