"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Create a metareducer that sends data to LogRocket */
function createMetaReducer(
/** LogRocket instance, after calling init() */
logrocket, 
/** Sanitizer options, same as LogRocket.reduxMiddleware */
options) {
    var reduxMiddleware = logrocket.reduxMiddleware(options);
    var currentState;
    var store;
    // return a metareducer
    return function (reducer) {
        return function (state, action) {
            var newState = reducer(state, action);
            currentState = state;
            if (!store) {
                store = reduxMiddleware({
                    getState: function () { return currentState; },
                });
            }
            store(function () { return newState; })(action);
            return newState;
        };
    };
}
exports.default = createMetaReducer;
//# sourceMappingURL=index.js.map