const db = require("../models");
const Empresa = db.empresa;
const Formulario = db.formulario;
const Inspeccion = db.inspeccion;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Create a Empresa
  const empresa = {
      nombre: req.body.nombre,
      correo: req.body.correo,
      direccion: req.body.direccion,
      giro: req.body.giro,
  };

  // Save Empresa in the database
  Empresa.create(empresa)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al crear la empresa."
      });
    });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Empresa.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving empresas."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Empresa.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Empresa with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Empresa.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Empresa was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Empresa with id=${id}. Maybe Empresa was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Empresa with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Empresa.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Empresa was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Empresa with id=${id}. Maybe Empresa was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Empresa with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Empresa.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all empresas."
      });
    });
};

exports.findAllForms = (req, res) => {
  Formulario.findAll({ where: { empresa_id: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving formularios."
      });
    });
};

exports.findAllForms = (req, res) => {
  Inspeccion.findAll({ where: { empresa_id: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving inspecciones."
      });
    });
};