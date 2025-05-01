const express = require('express');
const multer = require('multer');
const Member = require('../models/Member');
const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST /api/members
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Received data:', req.body);
    console.log('Uploaded file:', req.file);

    const { name, role, email } = req.body;
    const newMember = new Member({
      name,
      role,
      email,
      image: req.file.filename,
    });

    await newMember.save();
    res.status(201).send('Member added');
  } catch (error) {
    console.error('Error saving member:', error);
    res.status(500).send('Server error');
  }
});

// GET /api/members
router.get('/', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

// GET /api/members/:id
router.get('/:id', async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.json(member);
});

module.exports = router;
