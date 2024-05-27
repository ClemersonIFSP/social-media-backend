import postModel from "../../models/postModel.js";

const update = async (req, res) => {
    try {
        const post = req.body;
        const id = +req.params.id;
        const result = postModel.validadeToUpdate({ id, ...post });
        if (!result.success) {
            return res.status(400).json({
                error: "Dados inválidos.",
                fields: result.error.flatten().fieldErrors,
            });
        }
        const updatedPost = await postModel.update(id, post);
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