"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intercept_http_service_1 = require("./intercept-http.service");
function InterceptHttpFactory(xhrBackend, requestOptions) {
    return new intercept_http_service_1.InterceptHttpService(xhrBackend, requestOptions);
}
exports.InterceptHttpFactory = InterceptHttpFactory;
//# sourceMappingURL=intercept-http.factory.js.map