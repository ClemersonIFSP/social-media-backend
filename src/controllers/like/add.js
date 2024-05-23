import likeModel from '../../models/likeModel.js';

const add = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.userId;
        await likeModel.add({ postId, userId });
        return res.json({
            success: `Like adicionado com sucesso.`,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Erro interno do servidor, tente novamente!" });
    }
};
export default add;