import { SAVE } from "../constants/constants";



const savedReducer = (saved = [], action) => {
    switch (action.type) {
        case SAVE:
            break;
        default:
            return saved;
    }
};

export default savedReducer;