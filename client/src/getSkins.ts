interface Skin {
    id: number;
    name: string;
    imageUrl: string;
  }
  
  interface GetSkinsResponse {
    skins: Skin[];
    numberOfSkins: number;
  }
  
  interface ErrorResponse {
    code: number;
    text: string;
  }
  async function getSkіns(id: number, token: string): Promise<GetSkinsResponse |null| ErrorResponse> {
    try {
      const response = await fetch(`/api/?method=getSkins&id=${id}&token=${token}`);
      
      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }
  
      const data = await response.json();
  
      if (data.hasOwnProperty('skins') && data.hasOwnProperty('numberOfSkins')) {
        // Это успешный ответ
        return data as GetSkinsResponse;
      } else if (data.code === 1002) {
        // Ошибка авторизации пользователя
        return data as ErrorResponse;
      } else if (data.code === 700) {
        // Ошибка "No skins"
        return data as ErrorResponse;
      } else {
        throw new Error('Неизвестная ошибка');
      }
    } catch (error) {
      return null;
    }
  }
  export default getSkіns;