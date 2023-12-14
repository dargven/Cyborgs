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
  let result = null;
  const storedToken = localStorage.getItem(TOKEN_KEY);

  if(storedToken !== null)
      result = storedToken;

  return result;
};

const getUuid = () => {
    let result = null;
    const storedUuid = localStorage.getItem(UUID_KEY);

    if(storedUuid !== null)
        result = storedUuid

    return result
}


export { getToken, getUuid , setToken, setUuid , removeToken, removeUuid };

// type StoredToken = {
//     value: string;
//     timeStamp: number;
//   };
  

// //   23 часа 59 минут
//   const TOKEN_TTL_MS = 86340000; 
  
//   const isExpired = (timeStamp?: number): boolean => {
//     if (!timeStamp) return false;

//     const now = new Date().getTime();
//     const diff = now - timeStamp;
  
//     return diff > TOKEN_TTL_MS;
//   };
  