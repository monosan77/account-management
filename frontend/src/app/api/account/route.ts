import { AccountDataModel } from '@/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// ****************
// 全てのアカウントを取得
// ****************
export async function GET() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    const res = await fetch('http://localhost:3001/account/allAccount', {
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('データを取得できませんでした。');
    }
    const accountAllData: AccountDataModel[] = await res.json();

    return NextResponse.json(accountAllData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'ok' });
  }
}
// ****************
// アカウントを削除
// ****************
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get('id');
  const imageId = searchParams.get('imageId');
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    const res = await fetch(
      `http://localhost:3001/account?id=${accountId}&imageId=${imageId}`,
      {
        method: 'DELETE',
        headers: {
          Cookie: cookieHeader,
        },
        credentials: 'include',
      }
    );
    if (res.status === 401) {
      return NextResponse.json({ status: 401 });
    }
    if (!res.ok) {
      throw new Error('削除できませんでした。');
    }
    revalidatePath('/');

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
// ****************
// アカウントを追加
// ****************
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');

    const res = await fetch('http://localhost:3001/account', {
      method: 'POST',
      headers: { Cookie: cookieHeader },
      credentials: 'include',
      body: formData,
    });
    // 同じメールアドレス存在する場合
    if (res.status === 409) {
      return NextResponse.json({ status: 409 });
    } else if (res.status === 401) {
      return NextResponse.json({ status: 401 });
    }
    if (!res.ok) {
      console.log(res);
      throw new Error('サーバーエラー');
    }
    revalidatePath('/');
    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
// ****************
// アカウントの更新
// ****************
export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    const res = await fetch('http://localhost:3001/account', {
      method: 'PUT',
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
      body: formData,
    });
    // 同じメールアドレス存在する場合
    if (res.status === 409) {
      return NextResponse.json({ status: 409 });
    } else if (res.status === 401) {
      return NextResponse.json({ status: 401 });
    }
    if (!res.ok) {
      console.log(res);
      throw new Error('サーバーエラーが発生しました。');
    }
    revalidatePath('/');
    revalidatePath('/edit');
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
