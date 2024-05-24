import postModel from "../../models/postModel.js";

const listUserPosts = async (req, res) => {
  const id = +req.params.id;
  try {
    const posts = await postModel.listUserPosts(id);
    console.log(posts)
    return res.json({
      success: "Postagens listadas com sucesso.",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erro interno do servidor, tente novamente!" });
  }
};

export default listUserPosts