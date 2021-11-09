const db = require("../models");
const Formulario = db.formulario;
const Empresa = db.empresa;
const Op = db.Sequelize.Op;

exports.create =async (req, res) => {
  // Validate request
  // if (!req.body.trabajadores_masculinos) {
  //   res.status(400).send({
  //     message: "¡El contenido no puede estar vacío!"
  //   });
  //   return;
  // }

  var form;

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

  return form;
};

exports.findAll = (req, res) => {
  const empresa_id = req.query.empresa_id;
  var condition = empresa_id
    ? { empresa_id: { [Op.like]: `%${empresa_id}%` } }
    : null;

  Formulario.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving formularios."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Formulario.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Formulario with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Formulario.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Formulario was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Formulario with id=${id}. Maybe Formulario was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Formulario with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Formulario.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Formulario was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Formulario with id=${id}. Maybe Formulario was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Formulario with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Formulario.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({ message: `${nums} Formularios were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all formularios."
      });
    });
};

exports.findEmpresa = async (req, res) => {
  const id = req.params.id;
  var empresa_id = 0;

  await Formulario.findByPk(id)
    .then((data) => {
      empresa_id = data.empresa_id;
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Formulario with id=" + id
      });
    });

  Empresa.findByPk(empresa_id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Empresa."
      });
    });
};
