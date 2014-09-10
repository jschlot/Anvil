angular
    .module('myApp', [])
    .factory('myUtil', [function(){
        return {
            sayHello: function() {
                return "Hello, World!"
            }
        };
    }])
    .service('myService', [function(){
        this.sayHello = function() {
            return "Hello, World!"
        };
    }])
    .directive('myDirective',
        [ // insertion here
            function(){
                function linkingFunction(scope, element, attrs){
                    
                }
                    
                function controller($scope){
        
                    // destroy ////////////////////////////////
                    $scope.$on("$destroy", function(){
                    });
                }
                controller.$inject = ['$scope'];
                return {
                    restrict: 'E',
                    replace: true,
                    transclude: false,
                    controller: controller,
                    scope: {
                        messageList: "="
                    },
                    template: "<ul>"+
                    "<li ng-repeat='msg in messageList'>{{msg.text}}</li>" + 
                    "</ul>",
                    link: linkingFunction
                };
            }
        ]
    )
    .controller('myController',
        ['$scope', 'myUtil', 'myService',
        function($scope, myUtil, myService){            
            $scope.hellos = [
                 { text: myUtil.sayHello() },
                 { text: myService.sayHello() }
            ];
        }]
    );
