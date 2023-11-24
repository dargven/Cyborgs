import "./erore.css";
function ErrorNotification(message: string) {
    const notification = document.createElement("div");
    notification.className = "error-notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 1000);
}
export default ErrorNotification;
