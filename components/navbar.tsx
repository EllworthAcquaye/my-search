import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Navbar() {
  const [query, setQuery] = useState('');

  const router = useRouter();

  const submitHandler = (e: any) => {
    e.preventDefault();
    router.push(`?query=${query}`);
  };

  return (
    <div className="justify-center items-center mt-10">
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          className=" rounded-full bg-slate-50 text-sm font-normal h-10 px-2 pl-4 w-[700px] focus:outline-0 "
          placeholder="Search"
        />
      </form>
    </div>
  );
}
