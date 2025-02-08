'use client';

import { useRouter } from 'next/navigation';

const LogoutBtn = () => {
  const router = useRouter();
  async function handleLogout() {
    try {
      const res = await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (res.ok) {
        alert('ログアウトしました。');
        return router.push('/auth/signin');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-end mt-3">
      <button
        className="text-[#00B3FF] underline hover:text-red-500"
        onClick={handleLogout}
      >
        ログアウト
      </button>
    </div>
  );
};

export default LogoutBtn;
