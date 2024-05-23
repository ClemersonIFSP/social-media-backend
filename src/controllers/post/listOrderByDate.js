import postModel from "../../models/postModel.js";

const listOrderByDate = async (req, res) => {
    try {
        const posts = await postModel.listOrderByDate();
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
export default listOrderByDate;