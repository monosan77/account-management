'use server';

import { cookies } from 'next/headers';

// auth ログイン状態の確認
export async function checkLogin() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
  try {
    const res = await fetch('http://localhost:3001/auth', {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
    });

    if (!res.ok) {
      return null;
    } else if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
}
