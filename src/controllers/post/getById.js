import postModel from "../../models/postModel.js";

const getById = async (req, res) => {
  const id = +req.params.id;
  try {
    const post = await postModel.getByid(id);
    return res.json({
      success: "Postagem encontrada com sucesso.",
      post,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erro interno do servidor, tente novamente!" });
  }
}

export default getById;