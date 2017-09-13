
import { WS_ON_OPEN, WS_ON_CLOSE } from '../actions/request';

export default function (state=false, action) {
    switch (action.type) {
    case WS_ON_OPEN:
        return true;
    case WS_ON_CLOSE:
        return false;
    default:
        return state;
    }
}