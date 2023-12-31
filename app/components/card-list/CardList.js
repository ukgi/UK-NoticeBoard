'use client';

import { Row } from 'antd';
import NoticeCard from '../notice-card/NoticeCard';
import CardListLayout from './layout';

export default function CardList({ allPosts }) {
  return (
    <CardListLayout>
      <Row gutter={16}>{allPosts && allPosts.map((postData) => <NoticeCard key={postData._id} post={postData} />)}</Row>
    </CardListLayout>
  );
}
