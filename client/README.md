# BTC Application Frontend

This is the frontend for the BTC Application, built with **React** and **Vite**.  
It provides user and admin interfaces for managing products, requirements, statistics, and more.

## Features

- Modern React + Vite setup with HMR
- Product management (add, view, delete)
- Admin dashboard with tabs for requirements, demand stats, and product management
- Responsive UI with Tailwind CSS
- API integration using Axios
- Modular component structure

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/btcapplication.git
   cd btcapplication/client
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the `client` folder and set your backend API URL:

   ```
   VITE_API_URL=http://localhost:5000
   ```

### Running the App

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
# or
yarn build
```

## Project Structure

```
client/
  ├── public/
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   │   ├── AddProduct.jsx
  │   │   ├── Contact.jsx
  │   │   ├── Footer.jsx
  │   │   ├── GetAllRequirement.jsx
  │   │   ├── GetStatistics.jsx
  │   │   ├── Navbar.jsx
  │   │   ├── ProductHeroPage.jsx
  │   │   ├── RollingFeature.jsx
  │   │   ├── Services.jsx
  │   │   └── ui/
  │   │       └── Theme-toggle.jsx
  │   ├── context/
  │   ├── lib/
  │   │   └── utils.js
  │   ├── pages/
  │   │   ├── AdminDashboard.jsx
  │   │   ├── Home.jsx
  │   │   ├── Login.jsx
  │   │   ├── ProductList.jsx
  │   │   ├── Register.jsx
  │   │   └── SuperAdminDashboard.jsx
  │   ├── routes/
  │   │   └── routes.js
  │   └── utils/
  │       └── axios.js
  ├── App.jsx
  ├── App.css
  ├── index.css
  ├── main.jsx
  ├── index.html
  ├── vite.config.js
  ├── eslint.config.js
  ├── package.json
  └── README.md
```

## API Integration

- All API calls are handled via Axios (`src/utils/axios.js`).
- Update the `baseURL` in Axios config to match your backend.

## Customization

- Update styles in `App.css` or use Tailwind classes.
- Add new pages/components in the `src/pages` or `src/components` folders.

## Useful Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## License

MIT

---

**Note:**  
For backend setup and API documentation, refer to the backend README in the main project
