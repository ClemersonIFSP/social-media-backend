import postModel from "../../models/postModel.js";

const create = async (req, res) => {
    try {
        const post = req.body;
        const result = postModel.validadeToCreate(post);
        if (!result.success) {
            return res.status(400).json({
                error: "Dados inválidos.",
                fields: result.error.flatten().fieldErrors,
            });
        }
        const newPost = await postModel.create(post);
        return res.json({
            success: `Postagem ${newPost.id} criada com sucesso.`,
            post: newPost,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Erro interno do servidor, tente novamente!" });
    }
};
export default create;