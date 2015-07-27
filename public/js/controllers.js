/**
 * Stock Stalker
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($scope, $http, twitterService) {
    $scope.searchSymbol = {symbol: ''};

    twitterService.initialize();
    twitterService.connectTwitter();

    this.helloText = 'Welcome to Stock Stalker';
    this.descriptionText = 'The Application for keeping up with the latest Stock Trends';

    $scope.search = function() {
        console.log($scope.searchSymbol.symbol);

        twitterService.getTweets('%23' + $scope.searchSymbol.symbol + '&count=100');

        $http.get('https://query.yahooapis.com/v1/public/yql?q=' +
            'select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22' +
            $scope.searchSymbol.symbol +
            '%22)&' +
            'format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', {
            params: {}
        }).success(function(data) {
                console.log(data);
                $scope.result = data;
            }
        );
    };

    /*
    $http.get('https://api.twitter.com/1.1/search/tweets.json',
        { params: {}
        }).success(function(data) {
            console.log(data)
        });
    */


}

function SearchCtrl($scope, Finance) {

}




angular
    .module('stalker')
    .controller('MainCtrl', MainCtrl)
    .controller('SearchCtrl', SearchCtrl)
;