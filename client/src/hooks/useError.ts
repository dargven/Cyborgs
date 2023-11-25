import { TError } from "../modules/Server/types";
const useError = (error: TError) => {
    let errorMesage = "";
    switch (error.code) {
        case 101:
            errorMesage = "";
            break;
        case 102:
            errorMesage = "метод не найден";
            break;
        case 242:
            errorMesage = "";
            break;
        case 404:
            errorMesage = "";
            break;
        case 555:
            errorMesage = "";
            break;
        case 605:
            errorMesage = "";
            break;
        case 700:
            errorMesage = "";
            break;
        case 701:
            errorMesage = "";
            break;
        case 705:
            errorMesage = "";
            break;
        case 706:
            errorMesage = "";
            break;
        case 707:
            errorMesage = "";
            break;
        case 708:
            errorMesage = "";
            break;
        case 709:
            errorMesage = "";
            break;
        case 800:
            errorMesage = "";
            break;
        case 801:
            errorMesage = "";
            break;
        case 999:
            errorMesage = "";
            break;
        case 1001:
            errorMesage = "";
            break;
        case 1002:
            errorMesage = "ddddd";
            break;
        case 1003:
            errorMesage = "";
            break;
        case 1004:
            errorMesage = "";
            break;
        case 9000:
            errorMesage = "";
            break;
    }
    return errorMesage;
};
export default useError;
