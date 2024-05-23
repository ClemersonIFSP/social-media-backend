import postModel from "../../models/postModel.js";

const update = async (req, res) => {
    try {
        const post = req.body;
        const updatedPost = await postModel.update(post);
        return res.json({
            success: `Postagem ${updatedPost.id} atualizada com sucesso.`,
            post: updatedPost,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Erro interno do servidor, tente novamente!" });
    }
};
export default update;