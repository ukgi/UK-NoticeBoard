import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDatabase, insertDocument } from '@/helpers/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        throw new Error('로그인이 필요합니다...로그인해주세요');
      }

      console.log(req.body);
      if (req.body.comment.length <= 0 || req.body.comment.length > 30) {
        throw new Error('코멘트의 길이가 맞지 않습니다...30글자 이하로 적어주세요!');
      }

      // req.body

      req.body.userEmail = session.user.email;

      const client = await connectDatabase();
      const result = await insertDocument(client, 'comment', req.body);

      if (!result.acknowledged) {
        throw new Error('코멘트가 저장되지 않았습니다...😢');
      }

      client.close();
      res.status(200).json({ message: '성공!', data: result });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}
