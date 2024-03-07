require("dotenv").config();
console.log(process.env.SESSION_SECRET);
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const productsRoutes = require("./src/routes/productsRoutes");
const cartsRoutes = require("./src/routes/cartsRoutes");
const authRoutes = require("./src/routes/authRoutes");
const viewRoutes = require("./src/routes/viewRoutes");

// Asignar valores de variables de entorno a variables
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URL = process.env.MONGO_URL;

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => console.error(error));

// Crear una instancia de Express
const app = express();

// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configurar la sesión
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
  })
);

// Middleware para verificar la autenticación del usuario
const authenticateUser = (req, res, next) => {
  if (req.session.user) {
    // Si el usuario está autenticado, permitir el acceso
    next();
  } else {
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    res.redirect("/login");
  }
};

// Configurar las rutas de la aplicación
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/", authRoutes);
app.use("/", viewRoutes);

app.get("/", (req, res) => {
  // Renderizar la vista de inicio, que puede ser 'index.handlebars'
  res.render("index");
});

// Validar las rutas de vistas
app.get("/profile", authenticateUser, (req, res) => {
  // Renderizar la vista del perfil
  res.render("profile", { user: req.session.user });
});

app.get(["/login", "/register"], (req, res, next) => {
  // Si el usuario está autenticado, redirigir a la página de inicio
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
});

// Rutas de inicio de sesión y registro
app.get("/login", (req, res) => {
  // Renderizar la vista de inicio de sesión
  res.render("login");
});

app.get("/register", (req, res) => {
  // Renderizar la vista de registro
  res.render("register");
});

// Iniciar el servidor
app.listen(PORT, () =>
  console.log(`Servidor en ejecución en el puerto ${PORT}`)
);
