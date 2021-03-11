const PNotify = require('@pnotify/core');
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
// const PNotifyMobile = require('@pnotify/core');

import { defaultModules } from '@pnotify/core';

import * as PNotifyMobile from '@pnotify/mobile';
defaultModules.set(PNotifyMobile, {});

export function notifyError(title, text) {
    PNotify.error({
        title: title,
        text: text,
    });
}
export function notifyInfo(title, text) {
    PNotify.info({
        title: title,
        text: text,
    });
}

