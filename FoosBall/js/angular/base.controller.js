function BaseController($scope, $resource, $location, session) {
    $scope.session = {};
    $scope.uiSettings = {};
    $scope.uiSettings.hideMainMenu = true;
    $scope.uiSettings.hideLogonMenu = true;
    $location.path('/').replace();

    session.autoLogin($scope);
    $scope.logout = function() {
        session.logout($scope);
    };

    $scope.showLogonMenu = function () {
        $scope.uiSettings.hideLogonMenu = !$scope.uiSettings.hideLogonMenu;
        $scope.uiSettings.hideMainMenu = true;
    };

    $scope.showMainMenu = function () {
        $scope.uiSettings.hideMainMenu = !$scope.uiSettings.hideMainMenu;
        $scope.uiSettings.hideLogonMenu = true;
    };
}

BaseController.$inject = ['$scope', '$resource', '$location', 'session'];