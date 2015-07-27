/**
 * Stalk Stalker Directives
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'Stalk Stalker | Search Trending Stocks';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'Stock Stalker | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}


/**
 * Pass all functions into module
 */
angular
    .module('stalker')
    .directive('pageTitle', pageTitle)
;