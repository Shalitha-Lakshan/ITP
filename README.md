### Plastic Recycling System (MERN)

Core flows:
- Collect bottles using smart bins and reward user points
- Track inventory lifecycle: collected → sorted → cleaned → shredded → pelletized → manufactured
- Manufacture and list recycled products
- Sell products via web store and manage orders
- Financial management for transactions and expenses

#### Tech
- Server: Node.js, Express, MongoDB (Mongoose), JWT auth
- Client: React (Vite) — to be scaffolded

#### Quickstart (Server)
1. Copy env file
```
cp server/.env.example server/.env
```
2. Update `server/.env` with your values
3. Install and run
```
cd server
npm install
npm run dev
```
Server will start at `http://localhost:4000`.

#### API Overview
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/bins` (auth), `POST /api/bins` (admin)
- `POST /api/deposits` (user), `GET /api/deposits/mine` (user)
- `GET /api/inventory/summary` (worker/manufacturer/admin)
- `POST /api/inventory/advance` (worker/manufacturer/admin)
- `GET /api/products`, `POST /api/products` (admin/manufacturer)
- `POST /api/orders`, `GET /api/orders/mine`, `PUT /api/orders/:id/status` (admin)
- `GET /api/rewards/balance`, `GET /api/rewards/ledger`
- `GET /api/finance/transactions` (admin), `POST /api/finance/expenses` (admin)

#### Next steps
- Scaffold client with Vite React, implement auth, products, cart/checkout, dashboards
- Add bin device authentication for machine-to-machine deposit events
- Add reports/analytics and role-based dashboards