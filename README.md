# Data Dashboard

This is a full-stack web app built with **Next.js** on the frontend and **Django API** on the backend. When you get it running, you'll see Line, Bar, Pie, and Candlestick charts, using data fetched from the Django API. 
## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v14.x or later)
- **Python** (v3.8 or later)
- **PostgreSQL** (if applicable, for Django)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/Data-Dashboard.git
   cd Data-Dashboard
   ```

2. **Set up the frontend (Next.js)**:
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Set up the backend (Django API)**:
   - Create a virtual environment:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run migrations:
     ```bash
     python manage.py migrate
     ```
   - Start the Django server:
     ```bash
     python manage.py runserver
     ```
   - The API should be available at [http://localhost:8000](http://localhost:8000).

4. **Frontend and Backend Integration**:
   Make sure the frontend is running on port `3000` and the backend on port `8000` to allow the Next.js frontend to fetch data from the Django API.

### Libraries and Tools Used

#### Frontend:
- **Next.js**:
- **React Chart.js**: Renders the Line, Bar, and Pie charts.
- **ApexCharts**: Renders the Candlestick chart.
- **Axios**: Makes API requests to the Django backend.

#### Backend:
- **Django**: Handles the API.

### Approach 

The goal is to create a clean and modular dashboard that fetches data from a backend API and visualizes it with charting libraries. First, I set up a **Next.js** frontend that dynamically fetches data from a **Django API** using `axios`, and displays that data using **React Chart.js** and **ApexCharts**. The plan was to use strictly **React Chart.js**, but I also needed candlestick chart functionality, so I added  **ApexCharts**. 

Sub-goals:
- **Modular Design**: The codebase is structured into reusable components, each handling a specific chart.
- **API Integration**: The Django API is responsible for serving hardcoded JSON data for different chart types.
- **Error Handling**: Basic error handling is implemented to manage failed API requests.
- **Responsive Layout**: The charts adjust their size based on the screen size for a responsive user experience.

## Running Tests

To run any tests, you should be able to use these commands: 
```bash
npm test  # For frontend testing
python manage.py test  # For Django backend testing
```

---