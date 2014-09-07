/*
Google Analytics Tracking

PAGE VIEW TRACKING // "path" must start with a '/'
 gaTrack.page(); // uses default location and page title
 gaTrack.page({path: "/mandalorians", title: "Boba & Jango Fett" });

EVENT TRACKING (Event Delegation Model)
 gaTrack.event({category: "button", action: "click", label: "export CSV" });
 gaTrack.event({category: "link", action: "click", label: "Remove" });
 gaTrack.event({category: "dropdown", action: "selected", label: "contract selected" });

EVENT TRACKING (AJAX Request Model)
 gaTrack.event({category: "ajax", action: "post", label: "Save Account Data" });

 // 'value' is # of tries (optional)
 gaTrack.event({category: "ajax", action: "get", label: "Fetch Contract", value: 1 });

*/
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
