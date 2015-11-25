(function() {
    'use strict';

    angular
        .module('app.threads')
        .controller('ThreadDetailController', ThreadDetailController);

    /* @ngInject */
    function ThreadDetailController(thread) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Thread';

        vm.thread = thread;
    }
})();