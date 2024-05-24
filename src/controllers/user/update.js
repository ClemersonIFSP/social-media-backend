import userModel from "../../models/userModel.js";

import bcrypt from "bcrypt";

const update = async (req, res) => {
  try {
    const id = +req.params.id;
    const user = { ...req.body, id };
    const updatedUser = await userModel.update(user);
    return res.json({
      success: `Usuario ${updatedUser.id} Editado com sucesso.`,
      user: updatedUser
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erro interno do servidor, tente novamente!" });
  }
};
export default update;
