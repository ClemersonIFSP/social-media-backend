import postModel from "../../models/postModel.js";

const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await postModel.remove(id);
        return res.json({
            success: `Postagem ${id} removida com sucesso.`,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Erro interno do servidor, tente novamente!" });
    }
};
export default remove;