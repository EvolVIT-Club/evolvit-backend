const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Received:', email, password);
    console.log('Expected:', process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};