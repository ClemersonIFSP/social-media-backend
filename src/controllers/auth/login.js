import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_EXPIRES_IN } from "../../config.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = userModel.validadeToLogin({ email, password });
    if (!result.success) {
      return res.status(400).json({
        error: "Dados inválidos.",
        fields: result.error.flatten().fieldErrors,
      });
    }

    const userFound = await userModel.getByEmail(email);
    if (!userFound) {
      return res.status(401).json({
        error: "Email ou senha inválida.",
      });
    }
    const user = {
      id: userFound.id,
      email: userFound.email,
      name: userFound.name,
      perfil_image: userFound.perfil_image,
      banner_image: userFound.banner_image,
    };

    const passwordIsValid = await bcrypt.compare(password, userFound.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        error: "Email ou senha inválida",
      });
    }

    const token = jwt.sign(
      {
        id: userFound.id,
        name: userFound.name,
        perfil_image: userFound.perfil_image,
        banner_image: userFound.banner_image,
      },
      SECRET_KEY,
      {
        expiresIn: TOKEN_EXPIRES_IN,
      }
    );

    let date = new Date();
    date.setHours(date.getHours() - 3);
    console.log(req.cookies);
    return res.json({
      message: "Usuario Logado!",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Opsss erro no servidor, tente novamente!",
    });
  }
};

export default login;
