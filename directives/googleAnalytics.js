/*
Google Analytics Tracking

// Requirements
//// google's tracking code must be loaded before this is executed
//// something like <script src="/path/to/my/googleanalyticsobject.js"></script>

//// This file usually looks like this:
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-##########-1', 'auto');

//// End File


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
            if (!window.ga) { 
                // We are returning empty functions for unit testing purposes where
                // we would never include the google analytics object
                return {
                    page: function() {},
                    event: function() {}
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
