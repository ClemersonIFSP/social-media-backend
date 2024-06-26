import postModel from "../../models/postModel.js";

const listOldPosts = async (req, res) => {
    try {
        const posts = await postModel.listOldPosts();
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
export default listOldPosts;