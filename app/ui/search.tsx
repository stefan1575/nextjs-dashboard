'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // Using Client Component Hooks
  const searchParams = useSearchParams(); // retrieve the current query parameters
  const pathname = usePathname(); // returns the current path
  const { replace } = useRouter(); // method to update the URL

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams); // { query: <user input here>}

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`); // "dashboard/invoices" + "?" + "query=<...>"
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // update the searchParams 
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      // defaultValue is used since using querysearchparams uses native input as state
      // defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}