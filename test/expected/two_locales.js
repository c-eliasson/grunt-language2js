angular.module("language-properties", []).config(["$translateProvider", function ($translateProvider) {$translateProvider.translations("en", {"onekey":"Some value"} );$translateProvider.translations("de", {"onekey":"Einen gewissen Wert"} );}]);