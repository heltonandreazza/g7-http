"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var environment_1 = require("app/../environments/environment");
var InterceptHttpService = (function (_super) {
    __extends(InterceptHttpService, _super);
    function InterceptHttpService(backend, defaultOptions) {
        var _this = _super.call(this, backend, defaultOptions) || this;
        _this.environment = environment_1.environment;
        return _this;
    }
    InterceptHttpService.prototype.setEnviroment = function (environment) {
        this.environment = environment;
    };
    InterceptHttpService.prototype.request = function (url, options) {
        if (!this.environment)
            return Rx_1.Observable.throw('enviroment property must be configured!');
        return _super.prototype.request.call(this, url, options);
    };
    InterceptHttpService.prototype.get = function (url, options) {
        if (!this.environment)
            return Rx_1.Observable.throw('enviroment property must be configured!');
        url = this.updateUrl(url);
        return _super.prototype.get.call(this, url, this.getRequestOptionArgs(options));
    };
    InterceptHttpService.prototype.post = function (url, body, options) {
        if (!this.environment)
            return Rx_1.Observable.throw('enviroment property must be configured!');
        url = this.updateUrl(url);
        return _super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options));
    };
    InterceptHttpService.prototype.put = function (url, body, options) {
        if (!this.environment)
            return Rx_1.Observable.throw('enviroment property must be configured!');
        url = this.updateUrl(url);
        return _super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options));
    };
    InterceptHttpService.prototype.delete = function (url, options) {
        if (!this.environment)
            return Rx_1.Observable.throw('enviroment property must be configured!');
        url = this.updateUrl(url);
        return _super.prototype.delete.call(this, url, this.getRequestOptionArgs(options));
    };
    InterceptHttpService.prototype.updateUrl = function (req) {
        var url = "";
        if (this.environment['production']) {
            url = this.getServiceUrl();
        }
        else {
            url = this.environment['API_URL'];
        }
        return url + req;
    };
    InterceptHttpService.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        var token = this.getToken();
        if (token) {
            options.headers.append("Authorization", "Bearer " + token.access_token);
        }
        return options;
    };
    InterceptHttpService.prototype.getServiceUrl = function () {
        try {
            return decodeURIComponent(this.getCookieValue("com.senior.pau.services.url"));
        }
        catch (e) {
            console.log("Erro ao obter Service URL");
        }
        return null;
    };
    InterceptHttpService.prototype.getToken = function () {
        try {
            return JSON.parse(eval(this.getCookieValue("com.senior.pau.token")));
        }
        catch (e) {
            console.log("Erro ao obter Token");
        }
        return null;
    };
    InterceptHttpService.prototype.getCookieValue = function (key) {
        var value = document.cookie.split(";")
            .find(function (value) { return value.indexOf(key) >= 0; });
        return value.split("=")[1];
    };
    return InterceptHttpService;
}(http_1.Http));
InterceptHttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.ConnectionBackend, http_1.RequestOptions])
], InterceptHttpService);
exports.InterceptHttpService = InterceptHttpService;
var Token = (function () {
    function Token() {
    }
    return Token;
}());
exports.Token = Token;
//# sourceMappingURL=intercept-http.service.js.map