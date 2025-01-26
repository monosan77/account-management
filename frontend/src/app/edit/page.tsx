import EditAccountForm from '@/components/EditAccountForm/EditAccountForm';
import Frame from '@/components/Frame/Frame';
import React from 'react';

// API作成したときに削除する。
const mockData = {
  userName: '山田太郎',
  email: 'yamada@example.com',
  TellNum: '09012345678',
};

const EditPage = () => {
  return (
    <Frame title="アカウント追加" width="500px">
      <EditAccountForm formData={mockData} />
    </Frame>
  );
};

export default EditPage;
