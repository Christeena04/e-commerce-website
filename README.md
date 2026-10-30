# MyStore

MyStore is a simple e-commerce website built with React. On the website you can view a list of products, open any product to see its details, add a new product, edit a product, and delete a product. The product data comes from the Fake Store API.

## Live Demo

https://christeena04.github.io/e-commerce-website/

## Features

- Shows a list of products fetched from the Fake Store API
- Each product card shows the image, category, title and price
- Add a new product using a form
- Edit an existing product 
- Delete a product from the details page 
- Form validation with error messages 
- Loading message while products are being fetched
- Error message if the API request fails
- Responsive layout for desktop, tablet and mobile

## Technologies Used

- React
- JavaScript
- Vite
- React Router
- HTML and CSS (plain CSS, no CSS framework)
- [Fake Store API](https://fakestoreapi.com/)

## Getting Started

You need Node.js and npm installed on your computer.

1. Clone the repository

```bash
git clone https://github.com/Christeena04/e-commerce-website.git
```

2. Go into the project folder

```bash
cd e-commerce-website
```

3. Install the dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open the link shown in the terminal. It is usually:

```
http://localhost:5173/e-commerce-website/
```
Other commands from `package.json`:

```bash
npm run build     # create a production build
npm run preview   # preview the production build
npm run lint      # check the code with ESLint
```


**Routes used in the website**

| Path | Page |
| --- | --- |
| `/` | Home page with the product list |
| `/add-product` | Add product form |
| `/product/:id` | Product details |
| `/edit-product/:id` | Edit product form |

## Product Data Handling

The initial product list is fetched from the Fake Store API. When a product is added, edited or deleted, the changes are managed using React state on the client side. These changes are not permanently saved to the API, so refreshing the page restores the original API data.



## Project Structure

```
e-commerce-website/
├── public/
│   └── hero.svg              
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx   
│   │   ├── ProductDetails.jsx
│   │   └── ProductForm.jsx  
│   ├── App.jsx               
│   ├── App.css               
│   ├── index.css             
│   └── main.jsx              
├── index.html
├── vite.config.js
└── package.json
```

## What I Learned

 Building this project helped me to understand  the use of `useState` and `useEffect`, fetching data from an API with `async/await`, and handling loading and error states. I used props to pass data and functions between components. Also used React Router for multiple pages, including route parameters with `useParams` and redirecting with `useNavigate`. I built a controlled form with validation and error messages, and reused one form component for both add and edit. For the layout, I used CSS Grid, Flexbox and media queries to make the site work on different screen sizes.
