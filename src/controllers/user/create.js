import userModel from "../../models/userModel.js";

import bcrypt from "bcrypt";

const create = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await userModel.create(user);
    return res.json({
      success: `Usuario ${newUser.id} cadastrado com sucesso.`,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erro interno do servidor, tente novamente!" });
  }
};
export default create;
