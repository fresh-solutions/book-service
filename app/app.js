;(function(){
    configTemplate.$inject = ["$logProvider", "$urlRouterProvider", "$provide"];
    runTemplate.$inject = ["$rootScope", "$q", "$log"];
 
 angular
    .module('template', [
      'template.repeat'
    ])
    .config(configTemplate)
    .run(runTemplate)

    function configTemplate($logProvider, $urlRouterProvider, $provide){
      $logProvider.debugEnabled(true);
    }

    function runTemplate($rootScope, $q, $log){
      $log.debug('template::run', $rootScope);
    }
    
})();