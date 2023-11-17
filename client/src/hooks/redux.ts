import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/types";
import { useCookies } from "react-cookie";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppCookie = (cookieName: string) => {
    const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

    const getCookie = () => {
      return cookies[cookieName] || null;
     };     
   
    const setAppCookie = (value: string) => {
      setCookie(cookieName, value, { path: '/' });
    };
   
    const removeAppCookie = () => {
      removeCookie(cookieName, { path: '/' });
    };
   
    return { getCookie, setAppCookie, removeAppCookie };
   }; 