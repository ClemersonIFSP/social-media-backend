import userModel from "../../models/userModel.js";

const update = async (req, res) => {
  try {
    const id = +req.params.id;
    const user = { ...req.body, id };
    const result = userModel.validadeToUpdate(user);
    if (!result.success) {
      return res.status(400).json({
        error: "Dados inválidos.",
        fields: result.error.flatten().fieldErrors
      });
    }
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
