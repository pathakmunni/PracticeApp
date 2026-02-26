import content from '../assets/newContent.json';
import { AppContent } from '../types/contentTypes';

export const fetchContent = async (): Promise<AppContent> => {
  // FUTURE: replace with axios.get()
  return new Promise(resolve => {
    setTimeout(() => resolve(content as AppContent), 500);
  });
};