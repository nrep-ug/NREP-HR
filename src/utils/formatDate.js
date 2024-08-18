// src/utils/dateUtils.js

import moment from 'moment-timezone';

export const formatDate = (date, format = 'YYYY-MM-DD') => {
    return moment(date).format(format);
};
