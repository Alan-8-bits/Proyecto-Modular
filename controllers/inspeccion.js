const db = require("../models");
const Inspeccion = db.inspeccion;
const Empresa = db.empresa;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // Validate request
  // if (!req.body.fecha) {
  //   res.status(400).send({
  //     message: "¡El contenido no puede estar vacío!"
  //   });
  //   return;
  // }

  var insp;

  // Create a Inspeccion
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

  return insp;
};

exports.findAll = (req, res) => {
  const empresa_id = req.query.empresa_id;
  var condition = empresa_id ? { empresa_id: { [Op.like]: `%${empresa_id}%` } } : null;

  Inspeccion.findAll({ where: condition })
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  Inspeccion.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Inspeccion with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Inspeccion.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Inspeccion was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Inspeccion with id=${id}. Maybe Inspeccion was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Inspeccion with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.body.id;

  Inspeccion.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/agendar-inspecciones');
      } else {
        res.send({
          message: `Cannot delete Inspeccion with id=${id}. Maybe Inspeccion was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Inspeccion with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Inspeccion.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Inspecciones were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all inspecciones."
      });
    });
};

exports.findEmpresa = async (req, res) => {
  const id = req.params.id;
  var empresa_id = 0;

  await Inspeccion.findByPk(id)
    .then(data => {
      empresa_id = data.empresa_id;
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Inspeccion with id=" + id
      });
    });

  Empresa.findByPk(empresa_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Empresa."
      });
    });
};