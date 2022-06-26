import { generateToken } from '../middleware/auth.js';
import Register from '../models/register.model.js';
import mailing from '../lib/mailing.js';
import bcrypt from 'bcrypt';


export const home_register = async (req, res, next) => {

   try {

      const users = await Register.getAllUsers();
      if (!users[0].length) {
         throw Error

      } else {
         return res.status(200).send(users[0]);
      };

   } catch (error) {
      console.log(error)
   };
};



export const log_user = async (req, res, next) => {

   try {

      const userBeLogin = await Register.setValidateUser(req.body.emailLog);
      if (!userBeLogin[0].length) {
         return res.json({
            status: 404,
            msg: "Utilisateur inccorect.",
         });
      };

      const compPass = await bcrypt.compare(req.body.passwordLog, userBeLogin[0][0].password);
      if (compPass) {
         const accessToken = generateToken({ datas: userBeLogin[0] });

         return res.json({
            status: 200,
            token: accessToken,
            datas: userBeLogin[0][0],
            msg: 'Authentification réussi !',
         });

      } else {
         return res.json({
            status: 401,
            msg: 'Mot de passe incorrect.',
         });
      };

   } catch (error) {
      console.log(error);
   };
};



export const add_user = async (req, res, next) => {

   const hased = await bcrypt.hash(req.body.password, 10);

   const datas = {

      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: hased,
      adress: req.body.adress,
      city: req.body.city,
      zip_code: req.body.zip_code,
   };

   try {
      await Register.setUser(datas);
      return res.json({
         status: 200,
         msg: "Un email de vérification va vous être envoyé",
      });

   } catch (error) {
      console.log(error);
   };
};


export const send_user_mail = async (req, res, next) => {

   try {

      mailing(req.body.email, "Bienvenue sur Beer's Shop !", "Confirmation de votre email", `
      <body>
      <header>
      <h1><i class="fa-solid fa-beer-mug-empty"></i>Bienvenue sur le site Beer's Shop !</h1>
      <hr>
      <p>Vous n'avez plus qu'à cliquer sur le lien et votre compte sera activé.</p>
      <a href="http://localhost:3000/validate/${req.body.email}">Lien d'activation</a>
      </header>
      </body>`);

      return res.status(200).end();

   } catch (error) {
      console.log(error);
   };
};



export const user_validate = async (req, res, next) => {

   const email = req.params.email;

   try {

      const recupDatauser = await Register.setValidateUser(email);

      if (!recupDatauser[0].length) {
         throw Error;

      } else {
         return res.status(200).send(recupDatauser);
      };

   } catch (error) {
      console.log(error);
   };
};
