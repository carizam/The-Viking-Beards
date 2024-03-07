const Message = require("../models/message");

const messageController = {
  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMessageById: async (req, res) => {
    try {
      const message = await Message.findById(req.params.id);
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createMessage: async (req, res) => {
    try {
      const newMessage = new Message(req.body);
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateMessage: async (req, res) => {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteMessage: async (req, res) => {
    try {
      await Message.findByIdAndDelete(req.params.id);
      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = messageController;
