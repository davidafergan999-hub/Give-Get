'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get('q') || '');

  useEffect(() => setQ(params.get('q') || ''), [params]);

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        const next = new URLSearchParams(params as any);
        if (q) next.set('q', q);
        else next.delete('q');
        router.push(`/?${next.toString()}`);
      }} 
      className='flex gap-2'
    >
      <input 
        value={q} 
        onChange={e => setQ(e.target.value)} 
        className='input' 
        placeholder='חיפוש לפי שם, תיאור, מיקום...'
      />
      <button className='btn btn-primary' type='submit'>
        חיפוש
      </button>
    </form>
  );
}