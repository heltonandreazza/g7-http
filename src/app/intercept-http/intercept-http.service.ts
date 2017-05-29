import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "app/../environments/environment";

@Injectable()
export class InterceptHttpService extends Http {
  private environment: any;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
    this.environment = environment;
  }

  setEnviroment(environment: any) {
    this.environment = environment;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (!this.environment) return Observable.throw('enviroment property must be configured!');
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (!this.environment) return Observable.throw('enviroment property must be configured!');
    url = this.updateUrl(url);
    return super.get(url, this.getRequestOptionArgs(options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    if (!this.environment) return Observable.throw('enviroment property must be configured!');
    url = this.updateUrl(url);
    return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    if (!this.environment) return Observable.throw('enviroment property must be configured!');
    url = this.updateUrl(url);
    return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (!this.environment) return Observable.throw('enviroment property must be configured!');
    url = this.updateUrl(url);
    return super.delete(url, this.getRequestOptionArgs(options));
  }

  private updateUrl(req: string) {
    let url = "";
    if (this.environment['production']) {
      url = this.getServiceUrl();
    } else {
      url = this.environment['API_URL'];
    }

    return url + req;
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }

    let token: Token = this.getToken();
    if (token) {
      options.headers.append("Authorization", "Bearer " + token.access_token);
    }

    return options;
  }

  private getServiceUrl(): string {
    try {
      return decodeURIComponent(this.getCookieValue("com.senior.pau.services.url"));
    } catch (e) {
      console.log("Erro ao obter Service URL");
    }
    return null;
  }

  private getToken(): Token {
    try {
      return JSON.parse(eval(this.getCookieValue("com.senior.pau.token")));
    } catch (e) {
      console.log("Erro ao obter Token");
    }
    return null;
  }

  private getCookieValue(key: string): string {
    let value = document.cookie.split(";")
      .find(value => value.indexOf(key) >= 0);
    return value.split("=")[1];
  }
}

export class Token {
  access_token: string;
}