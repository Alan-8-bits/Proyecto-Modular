/* Controllers */
const empresaController = require("../controllers/empresa");
const formularioController = require("../controllers/formulario");
const inspeccionController = require("../controllers/inspeccion");
var router = require("express").Router();

module.exports = (app) => {
  // Create a new Empresa
  router.post("/empresas/", empresaController.create);
  // // Retrieve all Empresas
  router.get("/empresas/", empresaController.findAll);
  // // Retrieve all Empresa Formularios
  router.get("/empresas/:id/formularios/", empresaController.findAllForms);
  // // Retrieve all Empresa Inspecciones
  router.get("/empresas/:id/inspecciones/", empresaController.findAllInspections);
  // // Retrieve a single Empresa with id
  router.get("/empresas/:id", empresaController.findOne);
  // // Update a Empresa with id
  router.put("/empresas/:id", empresaController.update);
  // // Delete a Empresa with id
  router.delete("/empresas/:id", empresaController.delete);
  // // Delete all Empresas
  router.delete("/empresas/", empresaController.deleteAll);

  // Create a new Formulario
  router.post("/formularios/", formularioController.create);
  // // Retrieve all Formularios
  router.get("/formularios/", formularioController.findAll);
  // // Retrieve Formulario's Empresa
  router.get("/formularios/:id/empresa", formularioController.findEmpresa);
  // // Retrieve a single Formulario with id
  router.get("/formularios/:id", formularioController.findOne);
  // // Update a Formulario with id
  router.put("/formularios/:id", formularioController.update);
  // // Delete a Formulario with id
  router.delete("/formularios/:id", formularioController.delete);
  // // Delete all Formularios
  router.delete("/formularios/", formularioController.deleteAll);

  // Create a new Inspeccion
  router.post("/inspecciones/", inspeccionController.create);
  // // Retrieve all Inspecciones
  router.get("/inspecciones/", inspeccionController.findAll);
  // // Retrieve Inspeccion's Empresa
  router.get("/inspecciones/:id/empresa", inspeccionController.findEmpresa);
  // // Retrieve a single Inspeccion with id
  router.get("/inspecciones/:id", inspeccionController.findOne);
  // // Update a Inspeccion with id
  router.put("/inspecciones/:id", inspeccionController.update);
  // // Delete a Inspeccion with id
  router.delete("/inspecciones/:id", inspeccionController.delete);
  // // Delete all Inspecciones
  router.delete("/inspecciones/", inspeccionController.deleteAll);

  app.use("/api", router);
};
