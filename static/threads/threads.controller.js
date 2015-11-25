(function() {
    'use strict';

    angular
        .module('app.threads')
        .controller('ThreadsController', ThreadsController);

    /* @ngInject */
    function ThreadsController(threads) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Threads';

        vm.threads = threads;
    }
})();