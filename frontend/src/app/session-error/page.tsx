import Frame from '@/components/Frame/Frame';
import Link from 'next/link';
import React from 'react';

const SessionErrorPage = () => {
  return (
    <Frame title="セッションエラー" width="400px">
      <div className="text-center">
        <p>セッションエラーが発生しました。</p>
        <p className="mb-8">下記ボタンからログインをお願いします。</p>
        <Link
          href={'/auth/signin'}
          className="text-[#00B3FF] underline hover:text-red-500"
        >
          ログインページへ
        </Link>
      </div>
    </Frame>
  );
};

export default SessionErrorPage;
