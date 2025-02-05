'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// アカウント削除APIへのリクエスト
export async function actionsDeleteAccount(accountId: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    const res = await fetch(`http://localhost:3001/account?id=${accountId}`, {
      method: 'DELETE',
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
    });
    if (res.status === 401) {
      return { status: 401 };
    }
    if (!res.ok) {
      throw new Error('削除できませんでした。');
    }
    revalidatePath('/');

    return { status: 200 };
  } catch (error) {
    console.log(error);
    return { status: 401 };
  }
}

// アカウント追加APIのリクエスト
export async function actionsCreateAccount(
  name: string,
  email: string,
  tel: string
) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    const res = await fetch('http://localhost:3001/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
        tel: tel,
      }),
    });
    // 同じメールアドレス存在する場合
    if (res.status === 409) {
      return { status: 409 };
    } else if (res.status === 401) {
      return { status: 401 };
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

// アカウントの編集APIへのリクエスト
export async function actionsUpdataAccount(
  id: string,
  name: string,
  email: string,
  tel: string
) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    const res = await fetch('http://localhost:3001/account', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      credentials: 'include',
      body: JSON.stringify({ id, name, email, tel }),
    });
    // 同じメールアドレス存在する場合
    if (res.status === 409) {
      return { status: 409 };
    } else if (res.status === 401) {
      return { status: 401 };
    }
    if (!res.ok) {
      throw new Error('サーバーエラーが発生しました。');
    }
    revalidatePath('/');
    revalidatePath('/edit');
    return { status: 200 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
}

// 全てのアカウント情報を取得するAPI
export async function getAccountAllData() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    const res = await fetch('http://localhost:3001/account/allAccount', {
      next: { revalidate: 3600 },
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('データを取得できませんでした。');
    }
    const accountAllData = await res.json();
    return accountAllData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// 特定のアカウントを取得APIへのリクスト
export async function getOneAccount(accountId: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    const res = await fetch(
      `http://localhost:3001/account/oneAccount?id=${accountId}`,
      {
        next: { revalidate: 3600 },
        method: 'GET',
        headers: {
          Cookie: cookieHeader,
        },
        credentials: 'include',
      }
    );
    if (!res.ok) {
      throw new Error('データを取得できませんでした。');
    }
    const accountAllData = await res.json();
    return accountAllData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
