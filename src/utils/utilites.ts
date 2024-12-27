export const capitalizeWords = (category: string | undefined) => {
  if (!category) return '';
  return category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
