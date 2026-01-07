import useCookie from 'react-use-cookie';

export const useAuthToken = () => {
  const [token, setToken, removeToken] = useCookie('authToken', '');

  return {
    token,
    setToken: (newToken: string) => setToken(newToken, { days: 7 }),
    removeToken: () => removeToken(),
  };
}