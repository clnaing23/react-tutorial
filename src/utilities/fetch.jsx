import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw response;
    return response.json();
  };
  
  export const useJsonQuery = (url) => {
    const { data, isLoading, error } = useQuery([url], () => fetchJson(url));
    return [ data, isLoading, error ];
  };
  