/**
 * Stock Stalker Configuration File
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $resourceProvider) {
    $urlRouterProvider.otherwise("/index/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    // Strip trailing slashes from resource provider
    $resourceProvider.defaults.stripTrailingSlashes = false;

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content_top_navigation.html"
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Index' }
        })
}
angular
    .module('stalker')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
