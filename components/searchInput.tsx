"use client"

import { useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import Input from './input';

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue
    };
    const url = qs.stringifyUrl({
      url: '/search',
      query
    });

    router.push(url);
  }, [debouncedValue, router]);
  return (
    <Input
    placeholder='What do you want to listen?'
    value={value}
    onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default SearchInput;