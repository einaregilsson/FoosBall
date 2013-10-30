﻿// Services
FoosBall.
    service('api', function ($resource) {
        this.getAllMatches = function () {
            var url = '/Matches/GetMatches?numberOfMatches=0'; // "numberOfMatches=0" fetches all matches
            var AllMatches = $resource(url);
            var promise = AllMatches.query().$promise;

            return promise;
        };

        this.getAllPlayers = function () {
            var url = '/Players/GetAllPlayers';
            var AllMatches = $resource(url);
            var promise = AllMatches.query().$promise;

            return promise;
        };

        this.getConfig = function () {
            var url = 'Admin/Config';
            var GetConfig = $resource(url);
            var promise = GetConfig.get().$promise;

            return promise;
        };

        this.setConfig = function (newConfig) {
            var url = 'Admin/Config';
            var SetConfig = $resource(url);
            var promise = SetConfig.save({ config: newConfig }).$promise;

            return promise;
        };
        
        this.replayAllMatches = function () {
            var url = 'Admin/ReplayMatches';
            var Replay = $resource(url);
            var promise = Replay.save().$promise;

            return promise;
        };
    }).
    service('session', function ($resource) {
        var self = this;

        this.getSession = function (refresh) {
            var url = '/Base/GetSession';
            url += (refresh) ? '?refresh=true' : '';

            var Session = $resource(url);
            var promise = Session.get().$promise;

            return promise;
        };
        
        this.login = function (requestParameters) {
            var Login = $resource('Account/Logon');
            var login = new Login(requestParameters);
            var loginPromise = login.$save();

            return loginPromise;
        };

        this.autoLogin = function (scope) {
                var AccountLogon = $resource('/Account/Logon'),
                logonPromise = AccountLogon.get().$promise;

            logonPromise.then(function () {
                var sessionPromise = self.getSession();

                sessionPromise.then(function (sessionInfo) {
                    window.angular.forEach(sessionInfo, function (value, key) {
                        scope.session[key] = value;
                    });
                });
            });
        };

        this.logout = function (scope, callback) {
            var AccoutLogoff = $resource('/Account/LogOff'),
                logoffPromise = AccoutLogoff.get().$promise;

            logoffPromise.then(function () {
                var sessionPromise = self.getSession();

                sessionPromise.then(function (sessionInfo) {
                    window.angular.forEach(sessionInfo, function (value, key) {
                        scope.session[key] = value;
                    });
                });

                if (callback) {
                    callback();
                }
            });
        };

    });
