// controllers/messageController.js

const Message = require("../models/message");

// Controlador para manejar las solicitudes relacionadas con los mensajes
const messageController = {
  // Obtener todos los mensajes
  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un mensaje por su ID
  getMessageById: async (req, res) => {
    const { id } = req.params;
    try {
      const message = await Message.findById(id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo mensaje
  createMessage: async (req, res) => {
    const { user, message } = req.body;
    try {
      const newMessage = await Message.create({ user, message });
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar un mensaje por su ID
  deleteMessageById: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedMessage = await Message.findByIdAndDelete(id);
      if (!deletedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = messageController;
