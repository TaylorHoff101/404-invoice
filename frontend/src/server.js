const express = require('express');
const app = express();
const path = require('path');

// Provide a static data
app.use(express.static(path.join(__dirname, 'public')));

// Provide index.html when entering root route 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}.`);
});
