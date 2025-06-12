// api-lookup.js
const fs = require('fs');
const dict = JSON.parse(fs.readFileSync('dict.json', 'utf-8'));

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const { word } = JSON.parse(body);
    const key = (word || '').trim().toLowerCase();
    if (dict[key]) {
      res.status(200).json({ translation: dict[key] });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });
};
