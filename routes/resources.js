const db = require("../models");
const Empresa = db.empresa;
const Formulario = db.formulario;
const Inspeccion = db.inspeccion;
const Op = db.Sequelize.Op;
const axios = require('axios');
var FormData = require('form-data');

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
  app.get("/agendar-inspecciones", async (req, res) => {

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
      var insp = await Inspeccion.findOne({ where: { empresa_id: { [Op.eq]: emp.id } } });
      res.render("showEmpresa.html", {empresa: emp, inspeccion: insp});
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
      var insp = await Inspeccion.findOne({ where: { empresa_id: { [Op.eq]: emp.id } } });
      res.render("showEmpresa.html", {empresa: emp, inspeccion: insp});
    }
  });

  app.post("/submit-forms", async (req, res) => {

    var giro_form = req.body.giro === "otros" ? req.body.otro_giro : req.body.giro;
    var emp,form,insp;

    // var json_request = {
    //   "data": [
    //     {
    //       "Giro": giro_form,
    //     }
    //   ]
    // }
    // // axios request to send form data to the server
    // await axios.post(process.env.API_AZURE,json_request)
    // .then(function (response) {
    //   emp.api = JSON.parse(response.data).result.toString();
    // })
    // .catch(function (error) {
    //   // handle error
    //   res.send(error);
    // })

    req.body.riesgo = 5.0;

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
      giro: giro_form,
      riesgo: req.body.riesgo
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
      senal: req.body.senal ? req.body.senalamiento.toString() : '',
      medidas: req.body.medidas ? req.body.recursos.toString() : '',
  
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

    const inspeccion = {
      fecha: null,
      estatus: "En revision",
      empresa_id: req.body.empresa_id,
    };

    await Inspeccion.create(inspeccion)
    .then((data) => {
      insp = data;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Se produjo un error al crear formulario."
      });
    });

    res.redirect('/mostrar-empresa?rfc=' + emp.rfc);
  });
};
