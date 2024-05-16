import userModel from "../../models/userModel.js";

const remove = async (req, res) => {
  try {
    const id = +req.params.id;
    const deletedUser = await userModel.remove(id);
    return res.json({
      success: `Usuario ${id} deletado com sucesso.`,
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erro interno do servidor, tente novamente!" });
  }
};
export default remove;
