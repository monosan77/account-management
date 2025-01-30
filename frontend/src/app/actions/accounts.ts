'use server';
import { revalidatePath } from 'next/cache';

// アカウント削除APIへのリクエスト
export async function actionsDeleteAccount(accountId: string) {
  try {
    const res = await fetch(`http://localhost:3001/account?id=${accountId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('削除できませんでした。');
    }
    revalidatePath('/');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// アカウント追加APIのリクエスト
export async function actionsCreateAccount(
  name: string,
  email: string,
  tel: string
) {
  try {
    const res = await fetch('http://localhost:3001/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        tel: tel,
      }),
    });
    if (res.status === 409) {
      return { status: 409 };
    }
    if (!res.ok) {
      throw new Error('サーバーエラー');
    }
    revalidatePath('/');
    return { status: 201 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
}
