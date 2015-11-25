(function() {
    'use strict';

    angular
        .module('app.threads')
        .run(appRun);
    
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/threads');
    }
    
    function getStates() {
        return [
            {
                state: 'threads',
                config: {
                    url: '/threads',
                    views: {
                        "": {
                            templateUrl: 'static/threads/threads.html',
                            controller: 'ThreadsController as vm'
                        },
                        "list@threads": {
                            templateUrl: 'static/threads/threads.list.html',
                            controller: 'ThreadsController as vm'
                        },
                    },
                    resolve: {
                        threads: getThreads
                    }
                }
            },
            {
                state: 'threads.detail',
                config: {
                    url: '/:threadId',
                    views: {
                        "": {
                            templateUrl: 'static/threads/thread-detail.html',
                            controller: 'ThreadDetailController as vm'
                        }
                    },
                    resolve: {
                        thread: getThread
                    }
                }
            }
        ];
    }
    
    function getThreads(Threads) {
        return Threads.all();
    }
    
    function getThread($stateParams, Threads) {
        var threadId = $stateParams.threadId;
        return Threads.get(threadId);
    }
})();