const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Entry = require('../models/Entry');

// @route   Get api/entries
// @desc    Get all users entries
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(entries);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/entries
// @desc    Add new entry
// @access  Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    date,
    meals,
    stretch,
    bowel,
    cycle,
    pain,
    painLocation,
    painScale
  } = req.body;

  try {
    const newEntry = new Entry({
      date,
      meals,
      stretch,
      bowel,
      cycle,
      pain,
      painLocation,
      painScale,
      user: req.user.id
    });

    const entry = await newEntry.save();

    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const {
    date,
    meals,
    stretch,
    bowel,
    cycle,
    pain,
    painLocation,
    painScale
  } = req.body;

  // Build contact object
  const entryFields = {};
  if (date) entryFields.date = date;
  if (meal) entryFields.meals = meals;
  if (stretch) entryFields.stretch = stretch;
  if (bowel) entryFields.bowel = bowel;
  if (cycle) entryFields.cycle = cycle;
  if (pain) entryFields.pain = pain;
  if (painLocation) entryFields.painLocation = painLocation;
  if (painScale) entryFields.painScale = painScale;

  try {
    let entry = await Entry.findById(req.params.id);

    if (!entry) return res.status(404).json({ msg: 'Entry not found' });

    // Make sure user owns entry
    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Entry.findByIdAndUpdate(
      req.params.id,
      { $set: entryFields },
      { new: true }
    );

    res.json(entry);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/contacts
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let entry = await Entry.findById(req.params.id);

    if (!entry) return res.status(404).json({ msg: 'Entry not found' });

    // Make sure user owns contact
    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Entry.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Entry removed' });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
