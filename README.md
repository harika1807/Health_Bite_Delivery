# Health Bite Delivery (Hangry)

Health Bite Delivery, branded as **Hangry**, is an AI-powered food delivery platform that helps users make healthier choices when ordering meals. It integrates **Supabase** for backend services and uses **AI** to provide health ratings for dishes and restaurants.

## Features
- AI-powered health filter for restaurants and dishes
- Health ratings displayed on each meal
- Supabase integration for authentication, database, and storage
- User profile with order history and preferences
- Cart and checkout flow with estimated delivery times
- Search and category-based browsing

## Tech Stack
- **Frontend**: TypeScript (React)
- **Styling**: CSS
- **Database & Authentication**: Supabase
- **Backend Queries**: PLpgSQL

## Prerequisites
- Node.js (LTS recommended)
- npm (or yarn)
- Supabase project with API keys

## Environment Variables
Create a `.env` file in the root directory and add:
```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-publishable-key
SUPABASE_PROJECT_ID=your-supabase-project-id
```

## Installation & Execution
```bash
# Clone the repository
git clone https://github.com/<your-username>/Health_Bite_Delivery.git

# Navigate to the project folder
cd Health_Bite_Delivery

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: [http://localhost:8080](http://localhost:8080)

## Screenshots
- Homepage
- Categories
- Featured Restaurants
- Cart
- Profile & Order History

## Folder Structure
```
Health_Bite_Delivery/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── public/
├── .env
├── package.json
└── README.md
```

## Usage
1. Browse restaurants and categories.
2. View health ratings powered by AI.
3. Add items to the cart and proceed to checkout.
4. Manage your orders from your profile page.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any changes.

## License
MIT License
