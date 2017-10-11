export default function({ dispatch }) {
    return next => action => {
        // if action doesnot have a payload
        // or a .then()
        // this action.payload is NOT a promise
        if (!action.payload || !action.payload.then) {
            return next(action);
        }

        // Make sure action promise resolves
        action.payload.then(res => {
            // create a new action with the old type
            // but replace the promise payload with
            // the resolved data
            const newAction = { ...action, payload: res.data };
            dispatch(newAction);
        });
    };
}
