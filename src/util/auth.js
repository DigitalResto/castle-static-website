export const checkAdminAuth = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin') === 'true';
    }
    return false;
  };