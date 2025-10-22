import { useEffect } from 'react';
import useFetch from './useFetch';
import { setItems, setSelectedItem } from '../features/demoSlice';
import { useTypedDispatch, useTypedSelector } from '../store/store';

const useDemo = () => {
  const { fetchData } = useFetch();
  const dispatch = useTypedDispatch();
  const items = useTypedSelector(state => state.demo.items);

  const loadItems = async () => {
    try {
      // demo public API — returns posts; limiting to first 5
      const data = await fetchData('https://jsonplaceholder.typicode.com/posts?_limit=5', 'GET');
      const mapped = data.map((d: any) => ({ id: d.id, title: d.title }));
      dispatch(setItems(mapped));
    } catch (err) {
      // keep it simple — log error
      console.warn('loadItems error', err);
    }
  };

  const selectItem = (item: { id: number; title: string }) => {
    dispatch(setSelectedItem(item));
  };

  return { items, loadItems, selectItem };
};

export default useDemo;