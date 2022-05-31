import User from "../../models/user";
import { connectDB } from "../../middleware/mongodb";
import { createHash } from "crypto";
import ReqLog from "../../middleware/reqLog";
import userActive from "../../models/userActive";

export default async function handler(req, res) {
  // request log and DB connection
  await ReqLog(req);
  await connectDB();
  const { method } = req;
  try {
    //find the user in our DB and check weather user is verified or not
    if (method === "GET") {
      const { name, password } = req.body;
      if (name && password) {
        const finduser = await User.find({ name });
        if (finduser.length) {
          const verifyUser = await userActive.find({ userid: finduser[0]._id });
          if (verifyUser[0].active) {
            let hashpassword = createHash("sha256")
              .update(password)
              .digest("hex");
            if (finduser[0].password === hashpassword) {
              res.status(200).send({
                success: true,
                message: "user signed and verified user",
                data: [{ id: finduser[0]._id, name: finduser[0].name },],
              });
            } else {
              throw new Error("username or password Incorrect");
            }
          } else {
            throw new Error(
              "User not verified.please check your email or press resend option to verify your account"
            );
          }
        } else {
          throw new Error("User not found");
        }
      } else {
        throw new Error("request all fields");
      }
    } else {
      throw new Error("request method not support for this route");
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
}
