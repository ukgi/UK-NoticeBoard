import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import List from './list/page';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    return <List />;
  }
  return (
    <>
      <h1>홈 화면</h1>
    </>
  );
}
