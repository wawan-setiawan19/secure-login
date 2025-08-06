const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute');
const productRoutes = require('./routes/productRoute');

dotenv.config();

const app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});