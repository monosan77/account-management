// アカウント追加編集フォームの入力型
export type Inputs = {
  userName: string;
  email: string;
  tel: string;
};

// APIから返却されるアカウントのデータ型
export type AccountDataModel = {
  id: string;
  name: string;
  email: string;
  tel: string;
};
