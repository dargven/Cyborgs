const TOKEN_KEY = 'token';
const UUID_KEY = 'uuid'

const setToken = (access_token: string): void => {
  localStorage.setItem(
    TOKEN_KEY,
    access_token
  );
};

const setUuid = (uuid: string): void => {
  localStorage.setItem(
      UUID_KEY,
      uuid
  )
}

const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

const removeUuid = (): void => {
    localStorage.removeItem(UUID_KEY)
}

const getToken = () => {
  const result = localStorage.getItem(TOKEN_KEY);
  return result;
};

const getUuid = () => {
  const result = localStorage.getItem(UUID_KEY);
  return result
}

export { getToken, getUuid , setToken, setUuid , removeToken, removeUuid };