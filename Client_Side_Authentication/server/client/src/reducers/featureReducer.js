import { FETCH_MESSAGE } from '../actions/types';

export default function(state = '', action) {
    switch (action.type) {
    case FETCH_MESSAGE: {
        return action.payload;
    }
    }
    return state;
}
