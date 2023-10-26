import md5 from 'md5-ts';

const useAutoRegData:any = () => {
    const login = 'USER_' + Math.round(Math.random() * Date.now());
    const hash = md5(login + Math.round(Math.random() * Date.now()))+ Math.round(Math.random() * Date.now());
    const token = md5(hash + Math.round(Math.random() * Date.now()));
    localStorage.setItem('token', token);
    return { login, hash };
}
export default useAutoRegData;