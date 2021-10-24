const db = require("../models");
const Empresa = db.empresa;
const Formulario = db.formulario;
let ejs = require('ejs');

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
  app.get("/show-empresa", (req, res) => {
    res.render(root_dirname + "/views/showEmpresa.html", {name:req.body});
  });
  app.post("/submit-forms", async (req, res) => {

    var giro_form = req.body.giro === "otros" ? req.body.otro_giro : req.body.giro;
    var emp,form;

    // Create Empresa
    const empresa = {
      razon_social: req.body.razon_social,
      nombre_rep_legal: req.body.nombre_rep_legal,
      rfc: req.body.rfc,
      correo: req.body.correo,
      direccion: req.body.direccion,
      colonia: req.body.colonia,
      codigo_postal: req.body.codigo_postal,
      calle_1: req.body.calle_1,
      calle_2: req.body.calle_2,
      giro: giro_form
    };

    // Save Empresa in the database
    await Empresa.create(empresa)
    .then((data) => {
      req.body.empresa_id = data.id;
      emp = data;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Se produjo un error al crear la empresa."
      });
    });
    
    const formulario = {
      trabajadores_masculinos: req.body.trabajadores_masculinos,
      trabajadores_femeninos: req.body.trabajadores_femeninos,
      rengo_edad: req.body.rengo_edad,
  
      mtrs: req.body.mtrs,
      niveles: req.body.niveles,
      aforo: req.body.aforo,
  
      dispositivo: req.body.dispositivo ? req.body.dispositivo.toString() : '',
      senal: req.body.senal ? req.body.senal.toString() : '',
      medidas: req.body.medidas ? req.body.medidas.toString() : '',
  
      material: req.body.material ? req.body.material.toString() : '',
      riesgo: req.body.riesgo ? req.body.riesgo.toString() : 'no_especificado',
  
      empresa_id: req.body.empresa_id,
    };

    await Formulario.create(formulario)
    .then((data) => {
      form = data;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Se produjo un error al crear formulario."
      });
    });

    res.send("se guardo la empresa y el formulario");
  });
};
