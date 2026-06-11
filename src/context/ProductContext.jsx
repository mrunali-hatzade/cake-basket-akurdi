import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Mango Cheesecake", price: 650, category: "Signature Cakes", image: "/hero1.jpg", rating: 4.8 },
  { id: 2, name: "Chocolate Truffle", price: 550, category: "Signature Cakes", image: "/chocolate-cake.png", rating: 4.9 },
  { id: 3, name: "Strawberry Shortcake", price: 600, category: "Signature Cakes", image: "/strawberry-cake.png", rating: 4.7 },
  { id: 4, name: "Vanilla Bean Cupcakes", price: 350, category: "Cupcakes", image: "/3d_cupcake.png", rating: 4.6 },
  { id: 5, name: "Red Velvet Fantasy", price: 700, category: "Signature Cakes", image: "/hero2.jpg", rating: 4.9 },
  { id: 6, name: "Assorted Macarons", price: 450, category: "Cupcakes", image: "/3d_macaron.png", rating: 4.8 },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load from localStorage or use defaults
    const stored = localStorage.getItem('bakery_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem('bakery_products', JSON.stringify(DEFAULT_PRODUCTS));
    }
  }, []);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      rating: 5.0, // Default for new products
      image: product.image || "/chocolate-cake.png"
    };
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('bakery_products', JSON.stringify(updated));
  };

  const removeProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('bakery_products', JSON.stringify(updated));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
