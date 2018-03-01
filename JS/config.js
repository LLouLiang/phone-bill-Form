myapp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider,firebaseArray){
	var config = {
		apiKey: "AIzaSyAjTuNufDPCMvEjcDvLZKgG1aTb0l9IvMc",
		authDomain: "phone-bill-ed919.firebaseapp.com",
		databaseURL: "https://phone-bill-ed919.firebaseio.com",
		projectId: "phone-bill-ed919",
		storageBucket: "phone-bill-ed919.appspot.com",
		messagingSenderId: "291426985660"
	};
	firebase.initializeApp(config);
	$locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("!");
    $routeProvider.when("/",{
        templateUrl:"../Clients/home.html",
        controller:"homeCtrl"
    })
    .when("/notification",{
        templateUrl:"../Clients/Notification.html",
        controller:"notificateCtrl"
    })
    .when("/usage",{
        templateUrl:"../Clients/usage.html",
        controller:"usageCtrl"
    })
    .when("/profile",{
		templateUrl: "../Clients/profile.html",
		controller: "profileCtrl"
    })
    .when("/registration",{
        templateUrl:"../Clients/register.html",
        controller:"registerCtrl"
    })
    .when("/login",{
        templateUrl:"../Clients/login.html",
        controller:"loginCtrl"
    });
}]);

myapp.run(function ($rootScope, $location,$window, userService) {
	$rootScope.$on('$locationChangeStart', function () {
		let user_request_path = $location.url();
		// The pages that can be accessed with no authentication
		let wrapped_path = ['/', '/login', '/registration'];
		// The pages that cannot be accessed with authentication
		let wrapped_unregister_path = ['/login', '/registration'];
		let isDefault = false;
		if (userService.hasAuth) {
			// has authentication
			angular.forEach(wrapped_unregister_path, function (value, key) {
				if (user_request_path == value) {
					isDefault = true;
				}
			});
			if (isDefault) {
				$location.path('/');
			}
		} else {
			// has no authentication
			angular.forEach(wrapped_path, function (item, key) {
				if (user_request_path == item) {
					isDefault = true;
				}
			});
			if (!isDefault) {
				$location.path('/');
			}
		}
	})
});