# Frontend - Strategy Pattern Demo

React + Vite frontend application for the Strategy Pattern demo.

## Setup

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Cart.jsx              # Display shopping cart
│   ├── StrategySelectors.jsx # Strategy selection UI
│   └── ResultPanel.jsx       # Display checkout results
├── services/
│   └── api.js                # Backend API integration
├── App.jsx                   # Main app component
├── main.jsx                  # Entry point
├── App.css                   # App styles
└── index.css                 # Global styles
```

## Components

- **Cart**: Shows the product list and subtotal
- **StrategySelectors**: Dropdown to select tax and payment strategies
- **ResultPanel**: Displays calculated total with selected strategies

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api`

### Endpoints used:
- `POST /api/checkout` - Calculate total with selected strategies
- `GET /api/checkout/strategies` - Get available strategies

## Environment Variables

Create a `.env.local` file (optional):
```
VITE_API_URL=http://localhost:3000/api
```

## Build

```bash
npm run build
```

Outputs to `dist/` folder
