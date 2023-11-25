import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext } from "../App";
import "./erore.css";

const ErrorNotification = async () => {
    const server = useContext(ServerContext);
    const error = await server.request;
    //     if(error==="ok"){
    // };
};
export default ErrorNotification;
