# Data Package Store - Simple E-commerce

A simple e-commerce application for buying data packages, managing transactions, and user authentication.
START 14 juli 10:30 - END 14 juli 13:34

## Features

- User authentication login
- Browse available data packages
- Purchase data packages
- View transaction history
- Edit purchased packages
- Delete transactions
- Responsive user interface

## Technologies Used

- **Frontend:**
  - React.js
  - SweetAlert2 (notifications)
  
- **Backend:**
  - JSON Server (mock API)

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd data-package-store
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start JSON Server (backend):
   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. Start the React application:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
data-package-store/
├── public/
├── src/
│   ├── components/
│   │   ├── TransactionList.jsx  # Transaction management
│   │   ├── Login.jsx            # User authentication
│   │   └── ...
│   ├── App.js
│   └── index.js
├── db.json                      # JSON Server database
└── package.json
```

## API Endpoints

- `GET /packages` - Get all available packages
- `GET /transactions?userId={id}&_expand=package` - Get user transactions
- `POST /transactions` - Create a new transaction
- `PATCH /transactions/{id}` - Update a transaction
- `DELETE /transactions/{id}` - Delete a transaction

## Usage

1. login to your account
2. Browse available data packages on the home page
3. Select a package and click "Buy" to purchase
4. View your transaction history
5. Edit or delete transactions as needed

## Note

This project uses a local JSON Server as a mock backend. In a production environment, you would replace this with a real backend service.# simple-ecommerce
# simple-ecommerce
# simple-ecommerce
