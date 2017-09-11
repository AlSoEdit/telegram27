'use strict';

import * as user from './user';
import * as error from './error';
import * as dialog from './dialog';
import * as request from './request';

export default {
    ...user,
    ...error,
    ...dialog,
    ...request
};