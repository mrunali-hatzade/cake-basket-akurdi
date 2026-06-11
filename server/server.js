const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'products.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// GET all products
app.get('/api/products', (req, res) => {
  try {
    const products = readDB();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products' });
  }
});

// POST a new product (from Admin Dashboard)
app.post('/api/products', (req, res) => {
  try {
    const { name, price, category, image, syncToAggregators } = req.body;
    const products = readDB();

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      category,
      image: image || '/chocolate-cake.png', // Fallback image
      rating: 5.0 // Default rating
    };

    products.push(newProduct);
    writeDB(products);

    // Simulated Aggregator Webhook (Zomato/Swiggy via UrbanPiper)
    if (syncToAggregators) {
      console.log('==============================================');
      console.log('🚀 [AGGREGATOR SYNC INITIATED]');
      console.log(`Sending payload for "${name}" to UrbanPiper API...`);
      console.log(`Payload:`, JSON.stringify(newProduct));
      
      setTimeout(() => {
        console.log('✅ [SUCCESS] UrbanPiper received item.');
        console.log('✅ [SUCCESS] Item queued for Zomato mapping.');
        console.log('✅ [SUCCESS] Item queued for Swiggy mapping.');
        console.log('==============================================');
      }, 1500);
    }

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save product' });
  }
});

app.listen(PORT, () => {
  console.log(`🎂 Cake Basket Backend running on http://localhost:${PORT}`);
  console.log(`Data stored at ${DB_PATH}`);
});
