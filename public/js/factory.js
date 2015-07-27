/**
 * Created by shawn on 26/07/15.
 */

function Twitter($resource) {
    return $resource('', {}, {
        get: {method: 'GET', params: {}, isArray: false}
    });
}

function Finance($resource, symbol) {
    return $resource('https://query.yahooapis.com/v1/public/yql?q=' +
        'select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22' +
        '' +
        '%22)&' +
        'format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
        {}, {
        query: {method: 'GET', params: {}, isArray: false}
    });
}

function twitterService($q) {
    var authorizationResult = false;

    return {
        initialize: function () {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('7bO9cAGX15-vJ4-xii977GXCrMI', {
                cache: true

            });
            //try to create an authorization result when the page loads,
            // this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create("twitter");
        },
        isReady: function () {
            return (authorizationResult);
        },
        connectTwitter: function () {
            var deferred = $q.defer();
            OAuth.popup("twitter", {
                cache: true
            }, function (error, result) {
                // cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    console.log(result);
                    deferred.resolve();
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        },
        clearCache: function () {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getTweets: function (param) {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var url = '/1.1/search/tweets.json';
            if (param) {
                url += '?q=' + param;
            }
            var promise = authorizationResult.get(url).done(function (data) {
                // https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                // when the data is retrieved resolve the deferred object
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            //return the promise of the deferred object
            console.log(deferred.promise);
            return deferred.promise;
        }
    }
}

/**
 * Pass all functions into module
 */

angular
    .module('stalker')
    .factory('Twitter', Twitter)
    .factory('Finance', Finance)
    .factory('twitterService', twitterService)
;
