const User = require("../models/userModel");

const authController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, age, password } = req.body;
      const newUser = new User({ firstName, lastName, email, age, password });
      await newUser.save();
      res.status(201).json({
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        age: newUser.age,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      req.session.user = user;
      res.status(200).json({ message: "Inicio de sesión exitoso", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
