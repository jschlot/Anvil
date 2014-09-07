angular.module('anvil.googleAnalytics', [])
    .factory('gaTrack', [
        function(){
            if (!window.ga)
            { 
                // We are returning empty functions for unit testing purposes where
                // we would never include the google analytics object
                return {
                    page: function() {}
                    , event: function() {}
                }; 
            }
            var gaTrack = {
                page: function(obj) {
                    var requestObject = {
                        'hitType': 'pageview'
                    };

                    if (obj.path) {
                        requestObject.page = obj.path;
                    }

                    if (obj.title) {
                        requestObject.title = obj.title;
                    }

                    ga('send', requestObject);
                    return requestObject;
                }
                , event: function(obj) {
                    if (!obj.category || !obj.action) { return false; }
                    var requestObject = {
                        'hitType': 'event',
                        'eventCategory': obj.category,
                        'eventAction': obj.action
                    };

                    if (obj.label) {
                        requestObject.eventLabel = obj.label;
                    }

                    if (obj.value) {
                        requestObject.eventValue = obj.value;
                    }

                    ga('send', requestObject);
                    return requestObject;
                }
            };

            return gaTrack;
        }
    ])
;
