require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const productsRoutes = require("./src/routes/productsRoutes");
const cartsRoutes = require("./src/routes/cartsRoutes");
const authRoutes = require("./src/routes/authRoutes");
const viewRoutes = require("./src/routes/viewRoutes");

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Conectar a MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => console.error(error));

const app = express();

// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static("public"));

app.get("/favicon.ico", (req, res) => res.status(204).end());

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar la sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
  })
);

app.use(viewRoutes);

// Middleware para verificar la autenticación del usuario
const authenticateUser = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Configurar las rutas de la aplicación
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use(authRoutes);

// Rutas de vistas específicas

app.get("/profile", authenticateUser, (req, res) => {
  res.render("profile", { user: req.session.user });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("login");
  }
});

app.get("/register", (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("register");
  }
});

app.get("/test", (req, res) => {
  res.send("This is a test route.");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
