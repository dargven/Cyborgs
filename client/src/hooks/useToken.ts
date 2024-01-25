const TOKEN_KEY = 'token';
const UUID_KEY = 'uuid'

const setToken = (access_token: string): void => {
  sessionStorage.setItem(
    TOKEN_KEY,
    access_token
  );
};

const setUuid = (uuid: string): void => {
  sessionStorage.setItem(
      UUID_KEY,
      uuid
  )
}

const removeToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};

const removeUuid = (): void => {
  sessionStorage.removeItem(UUID_KEY)
}

const getToken = () => {
  const result = sessionStorage.getItem(TOKEN_KEY);
  return result;
};

const getUuid = () => {
  const result = sessionStorage.getItem(UUID_KEY);
  return result
}

export { getToken, getUuid , setToken, setUuid , removeToken, removeUuid };