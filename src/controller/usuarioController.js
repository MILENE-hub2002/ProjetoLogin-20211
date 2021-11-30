const Usuario = require("../model/Usuario");
const { Op } = require("sequelize");

async function abreadd(req, res) {
  res.render("usuario/add.ejs", { msg: req.flash("msg"), logado: req.user });
}

async function add(req, res) {
  const { modelo, placa, senha } = req.body;

  if (req.file != undefined) {
    var foto = req.file.filename;
  }

  await Usuario.create({ modelo, placa, senha, foto }).then((usuario) => {
    req.flash("msg", "O veículo " + usuario.modelo + " foi criado com sucesso!");
    res.redirect("/admin/usuario/add");

    //res.send("O Usuario " + usuario.nome + " foi criado com sucesso!");
  });
}

async function list(req, res) {
  const usuarios = await Usuario.findAll();
  res.render("usuario/list.ejs", { Usuarios: usuarios, msg: req.flash("msg"), logado: req.user });
}

async function filtro(req, res) {
  const usuarios = await Usuario.findAll({
    where: {
      nome: {
        [Op.iLike]: "%" + req.body.pesquisar + "%",
      },
    },
  });
  res.render("usuario/list.ejs", { Usuarios: usuarios, msg: req.flash("msg"), logado: req.user});
}

async function abreedit(req, res) {
  const usuario = await Usuario.findByPk(req.params.id);
  res.render("usuario/edt.ejs", { usuario: usuario, logado: req.user});
}

async function edit(req, res) {
    const usuario = await Usuario.findByPk(req.params.id);

    usuario.modelo = req.body.modelo;
    usuario.placa = req.body.placa;
    usuario.senha = req.body.senha;

    if(req.file!=undefined) {

      usuario.foto = req.file.filename;
    }

    usuario.save().then((usuario)=>{
      req.flash('msg', "O veículo "+usuario.modelo+" foi alterado com sucesso!");
      res.redirect('/admin/usuario')
    })

}

async function del(req, res) {
  const deletar = req.params.id;

  if(deletar==req.user.id){
    req.flash("msg", "O veículo registrado não pode ser deletado!");
    res.redirect("/admin/usuario");

  } else{
    Usuario.destroy({ where: { id: req.params.id } }).then((usuario) => {
      req.flash("msg", "O veículo foi deletado com sucesso!");
      res.redirect("/admin/usuario");
    });
  }

}

module.exports = {
  abreadd,
  add,
  list,
  filtro,
  abreedit,
  edit,
  del,
};