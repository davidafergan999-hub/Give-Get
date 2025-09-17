'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [logged, setLogged] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(async r => {
        if (r.ok) {
          const d = await r.json();
          setLogged(!!d?.user);
          if (d?.user?.credits != null) setCredits(d.user.credits);
        }
      })
      .catch(() => {});
  }, [pathname]);

  return (
    <nav className='border-b bg-white'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-6'>
          <Link href='/' className='font-bold text-xl'>
            GiveHub
          </Link>
          <Link href='/items/new'>מסירת פריט</Link>
          <Link href='/dashboard'>האזור האישי</Link>
        </div>
        <div className='flex items-center gap-3'>
          {credits != null && (
            <span className='badge'>יתרה: {credits}</span>
          )}
          {logged ? (
            <form action='/api/auth/logout' method='post'>
              <button className='btn btn-outline' type='submit'>
                התנתקות
              </button>
            </form>
          ) : (
            <Link href='/signin' className='btn btn-primary'>
              התחברות
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}