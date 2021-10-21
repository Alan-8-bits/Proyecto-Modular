module.exports = (app, root_dirname) => {
  app.get("/datos-generales", (req, res) => {
    res.sendFile(root_dirname + "/views/datos_generales.html");
  });
  app.get("/giro", (req, res) => {
    res.sendFile(root_dirname + "/views/giro.html");
  });
  app.get("/trabajadores", (req, res) => {
    res.sendFile(root_dirname + "/views/trabajadores.html");
  });
  app.get("/inmueble", (req, res) => {
    res.sendFile(root_dirname + "/views/inmueble.html");
  });
  app.get("/form_styles", (req, res) => {
    res.sendFile(root_dirname + "/styles/form_styles.css");
  });
  app.get("/img/logo", (req, res) => {
    res.sendFile(root_dirname + "/img/logo.png");
  });
};
