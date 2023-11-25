import { TError } from "../modules/Server/types";
const getError = (error: TError) => {
    let errorMesage = "";
    console.log(error.text);
    switch (error.code) {
        case 101:
            errorMesage = "Param method not set";
            break;
        case 102:
            errorMesage = "метод не найден";
            break;
        case 242:
            errorMesage = "параметры установлены не полностью";
            break;
        case 404:
            errorMesage = "страница не найдена";
            break;
        case 555:
            errorMesage = "это Полигон?";
            break;
        case 605:
            errorMesage = "команда заполнена";
            break;
        case 700:
            errorMesage = "нет скинов";
            break;
        case 701:
            errorMesage = "скин не найден";
            break;
        case 705:
            errorMesage = "пользователь не найден";
            break;
        case 706:
            errorMesage = "сообщение не заполнено";
            break;
        case 707:
            errorMesage = "не удалось отправить сообщение";
            break;
        case 708:
            errorMesage = "неверный код подтверждения";
            break;
        case 709:
            errorMesage =
                "сеанс не начат или вам нужно использовать предыдущий метод";
            break;
        case 800:
            errorMesage = "объект не найден";
            break;
        case 801:
            errorMesage = "неизвестное состояние";
            break;
        case 999:
            errorMesage = "Это Треугольник?";
            break;
        case 1001:
            errorMesage = "укажите логин или пароль";
            break;
        case 1002:
            errorMesage = "пользователь не найден";
            break;
        case 1003:
            errorMesage = "это уникальный логин?";
            break;
        case 1004:
            errorMesage = "невозможно найти пользователя";
            break;
        case 9000:
            errorMesage = "неизвестная ошибка";
            break;
        default:
            errorMesage = "одна ошибка и ты ошибся";
            break;
    }
    return errorMesage;
};
export default getError;
