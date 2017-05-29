import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { InterceptHttpService } from "./intercept-http.service";

export function InterceptHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptHttpService(xhrBackend, requestOptions);
}