import {
  connectDatabase,
  findByEmail,
  insertDocument,
} from "@/helpers/db-util";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { nickname, email, password } = req.body;
      const client = await connectDatabase();
      const user = await findByEmail(client, email);

      if (user) {
        throw new Error("이미 가입한 정보입니다...");
      }

      if (password.length > 12 || nickname === "" || email === "") {
        throw new Error("비밀번호는 12글자가 넘어가면 안됩니다...❌");
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      req.body.confirm = hash;
      const result = await insertDocument(client, "user_cred", req.body);
      if (result.acknowledged)
        res.status(200).json("가입이 완료되었습니다...✅");
      else throw new Error("가입에 실패했습니다...😱");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
