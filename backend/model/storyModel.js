const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  generatedStory: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
