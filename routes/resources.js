const db = require("../models");
const Empresa = db.empresa;
const Formulario = db.formulario;
const Inspeccion = db.inspeccion;
const Users = db.Administracion;
const Op = db.Sequelize.Op;

const empresaController = require("../controllers/empresa");
const formularioController = require("../controllers/formulario");
const inspeccionController = require("../controllers/inspeccion");
const axios = require('axios');
const bcrypt = require('bcrypt');

module.exports = (app, root_dirname) => {
  app.get("/dataset", (req, res) => {
    res.sendFile(root_dirname + "/dataset.json");
  });
  app.get("/MLmodel.json", (req, res) => {
    res.sendFile(root_dirname + "/MLmodel/MLmodel.json");
  });
  app.get("/model_meta.json", (req, res) => {
    res.sendFile(root_dirname + "/MLmodel/MLmodel_meta.json");
  });
  app.get("/MLmodel.weights.bin", (req, res) => {
    res.sendFile(root_dirname + "/MLmodel/MLmodel.weights.bin");
  });
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
  app.post("/login-agendar", async (req, res) => {

    var usuario = await Users.findOne({ where: { username: { [Op.eq]: req.body.username } } });
    
    if (!usuario) {
      res.render(root_dirname + "/views/loginAgendar.html", {mensaje: "No existe usuario con ese username"});
    }

    var auth = await bcrypt.compare(req.body.password, usuario.password);

    if (auth) {
      agendar = await Empresa.findAll({
          where: {
            '$inspeccions.estatus$': { [Op.eq]: 'En revision' }
          },
          include: [{
            model: Inspeccion, 
            as: "inspeccions"
          }]
      });

      proximas = await Empresa.findAll({
          where: {
            '$inspeccions.estatus$': { [Op.eq]: 'Agendada' }
          },
          include: [{
            model: Inspeccion, 
            as: "inspeccions"
          }],
          order: [
            ['inspeccions', 'fecha', 'ASC']
          ]
      });

      res.render(root_dirname + "/views/setInspeccion.html", {agendar: agendar, proximas: proximas});
    }
    else {
      res.render(root_dirname + "/views/loginAgendar.html", {mensaje: "Credenciales invalidas"});
    }
  });
  app.get("/agendar-inspecciones", async (req, res) => {
    res.render(root_dirname + "/views/loginAgendar.html", {mensaje: null});
  });
  app.get("/form_styles", (req, res) => {
    res.sendFile(root_dirname + "/styles/form_styles.css");
  });
  app.get("/img/logo", (req, res) => {
    res.sendFile(root_dirname + "/img/logo.png");
  });

  app.get("/font_awesome", (req, res) => {
    res.sendFile(root_dirname + "/vendor/fontawesome-free/all.min.css");
  });
  app.get("/sb-admin-css", (req, res) => {
    res.sendFile(root_dirname + "/vendor/sb-admin/sb-admin-2.min.css");
  });
  app.get("/jquery", (req, res) => {
    res.sendFile(root_dirname + "/vendor/jquery/jquery.min.js");
  });
  app.get("/bootstrap", (req, res) => {
    res.sendFile(root_dirname + "/vendor/bootstrap/bootstrap.bundle.min.js");
  });
  app.get("/jquery-easing", (req, res) => {
    res.sendFile(root_dirname + "/vendor/jquery-easing/jquery.easing.min.js");
  });
  app.get("/sb-admin-js", (req, res) => {
    res.sendFile(root_dirname + "/vendor/sb-admin/sb-admin-2.min.js");
  });

  app.post("/formOrAlreadySaved", async (req, res) => {
    const rfc = req.body.rfc;
    var condition = rfc ? { rfc: { [Op.eq]: rfc } } : null;
    
    var emp = await Empresa.findOne({ where: condition });

    if (emp !== null) {
      var insp = await Inspeccion.findOne({ where: { empresa_id: { [Op.eq]: emp.rfc } } });
      var form = await Formulario.findOne({ where: { empresa_id: { [Op.eq]: emp.rfc } } });
      res.render("showEmpresa.html", {empresa: emp, inspeccion: insp, formulario: form});
    }
    else{
      res.render("form.html", { rfc: rfc });
    }
  });

  app.post("/set-fecha", async (req, res) => {

    var inspeccion = await Inspeccion.findOne({ 
      where: {
        empresa_id: { [Op.eq]: req.query.empresa} 
      }});

    inspeccion.fecha = req.body.fecha;
    inspeccion.estatus = 'Agendada';
    await inspeccion.save();

    res.redirect("/agendar-inspecciones");
  });

  app.get("/mostrar-empresa", async (req, res) => {
    const rfc = req.query.rfc;
    var condition = rfc ? { rfc: { [Op.eq]: rfc } } : null;
    
    var emp = await Empresa.findOne({ where: condition });

    if (emp !== null) {
      var insp = await Inspeccion.findOne({ where: { empresa_id: { [Op.eq]: emp.rfc } } });
      var form = await Formulario.findOne({ where: { empresa_id: { [Op.eq]: emp.rfc } } });
      res.render("showEmpresa.html", {empresa: emp, inspeccion: insp, formulario: form});
    }
  });

  app.post("/submit-forms", async (req, res) => {

    var emp;

    emp = await empresaController.create(req,res);
    req.body.empresa_id = emp.rfc;
    
    await formularioController.create(req,res);
    
    await inspeccionController.create(req,res);

    res.redirect('/mostrar-empresa?rfc=' + emp.rfc);
  });
};
