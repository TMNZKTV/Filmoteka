const PNotify = require('@pnotify/core');
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

export function notifyError(text) {
    PNotify.error({
        text: text,
    });
}
export function notifyInfo(title, text) {
    PNotify.info({
        title: title,
        text: text,
    });
}