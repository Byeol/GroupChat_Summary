(function() {
    'use strict';

    angular
        .module('app.threads')
        .factory('Threads', Threads);

    /* @ngInject */
    function Threads($resource, $q) {
        var threads = new Array();
		var threadMap = new Map();
        
        return {
            all: all,
            get: get,
            retrieve: retrieve
        };

        function all() {
            var deferred = $q.defer();
            retrieve(function() {
                console.log(threads);
                deferred.resolve(threads);
            })
            return deferred.promise;
        }

        function get(threadId) {
            if (threadMap.has(threadId)) {
                return threadMap.get(threadId);
            }
            var deferred = $q.defer();
            retrieve(function() {
                deferred.resolve(threadMap.get(parseInt(threadId)));
            })
            return deferred.promise;
        }
        
        function retrieve(cb) {
            var actions = {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data) {
                        return angular.fromJson(data).results;
                    }
                }
            };
            
            var resource = $resource('/api/threads', {}, actions);
            resource.query().$promise.then(saveThreads);
            return resource.query().$promise;
            
            function saveThreads(results) {
                threads = results;
                results.forEach(saveThread);

                function saveThread(thread) {
                    threadMap.set(thread.id, thread)
                }
                
                if (typeof cb === "function") {
                    cb(results);
                }
            }
        }
	}
})();