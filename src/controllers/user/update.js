import userModel from "../../models/userModel.js";

import bcrypt from "bcrypt";

const update = async (req, res) => {
  try {
    const id = +req.params.id;
    const user = { ...req.body, id };
    user.password = await bcrypt.hash(user.password, 10);
    const updatedUser = await userModel.update(user);
    return res.json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erro interno do servidor, tente novamente!" });
  }
};
export default update;
