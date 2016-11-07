app = angular.module("application", ['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            template: "Welcome To Application :)"
            // templateUrl: 'pages/main.html',
            // controller: 'mainCtrl'
        })
        .otherwise({
            template: "<h1>404</h1><p>this page not found</p>"
        })
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
})