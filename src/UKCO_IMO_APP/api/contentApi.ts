import data from '../assets/newContent.json';
import { AppContent } from '../types/contentTypes';

export const fetchContent = async (): Promise<AppContent> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data as AppContent), 500);
  });
};