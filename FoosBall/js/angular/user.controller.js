FoosBall.controller('UserController', ['$scope', '$resource', 'session', function ($scope, $resource, session) {
    $scope.user = {};
    $scope.updateMessage;
    $scope.showValidationMessage = false;

    $scope.getPlayer = function () {
        var Player = $resource('Account/GetPlayer');
        var promise = Player.get().$promise;

        promise.then(function (player) {
            $scope.user = preparePlayer(player);
        });
    };

    $scope.submitUserDetails = function() {
        var User = $resource('Account/Edit', {
            email: $scope.user.Email,
            name: $scope.user.Name,
            oldPassword: $scope.user.OldPassword,
            newPassword: $scope.user.NewPassword,
        });

        var promise = User.save().$promise;

        promise.then(function (responseData) {
            if (!!responseData && responseData.Success === true) {
                $scope.getPlayer();
                var sessionPromise = session.getSession(true);

                sessionPromise.then(function (sessionInfo) {
                    angular.forEach(sessionInfo, function (value, key) {
                        $scope.$parent.session[key] = value;
                    });
                });
                
            }
            
            $scope.updateMessage = responseData.Message;
            $scope.showValidationMessage = true;
            //$scope.$apply();
        });
    };

    function preparePlayer(player) {
        player.GravatarUrl = 'http://www.gravatar.com/avatar/' + md5.hex_md5(player.Email) + '?d=mm';
        return player;
    }

    $scope.getPlayer();

}]);
