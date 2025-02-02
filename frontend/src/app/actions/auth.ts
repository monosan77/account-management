'use server';

import { SigninModel } from '@/components/Auth/Signin/SigninForm';
import { SignupModel } from '@/components/Auth/Signup/SignupForm';

// サインアップAPIへのリクエスト
export async function actionsAuthSignup(data: SignupModel) {
  try {
    const sendData = {
      name: data.userName,
      email: data.email,
      password: data.password,
    };
    const res = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    });
    if (res.status === 409) {
      return { statsCode: 409 };
    } else if (!res.ok) {
      return { statsCode: 500 };
    }
    return { statsCode: 200 };
  } catch (error) {
    console.log(error);
    return { statsCode: 500 };
  }
}

export async function actionsAuthSignin(data: SigninModel) {
  try {
    const res = await fetch('http://localhost:3001/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status === 401) {
      return { statsCode: 401 };
    } else if (!res.ok) {
      return { statsCode: 500 };
    }
    return { statsCode: 200 };
  } catch (error) {
    console.log(error);
    return { statsCode: 500 };
  }
}
