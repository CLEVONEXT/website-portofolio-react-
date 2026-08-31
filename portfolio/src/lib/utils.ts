import type { ClassValue } from 'clsx';
import clsx from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateFileSize = (file: File, maxSizeInMB: number) => {
  return file.size <= maxSizeInMB * 1024 * 1024;
};

export const validateFileType = (file: File, allowedTypes: string[]) => {
  return allowedTypes.includes(file.type);
};
