myapp.controller('indexCtrl', function ($scope, $location,$rootScope,userService) {
	// Authenticate user
	userService.checkAuth();
	// button sign in event 
	$scope.onSignIn = function () {
        $location.path('/login');
	}

	// button sign up event
    $scope.onSignUp = function(){
        $location.path('/registration');
	}

	$scope.onSignOut = function () {
		userService.signOut();
		$location.path('/');
	}
});

// public 
myapp.controller('homeCtrl', function ($scope, $firebaseObject, $location) {	
	//let fireRef = firebase.database().ref().child("Test").child("Users");
	//$firebaseObject(fireRef).$loaded().then(function (data) {
	//	console.log(data);
	//	$scope.todos = data.userID;
	//	console.log($scope.todos);
	//});
});

myapp.service('profileService', function ($cacheFactory) {
	this.getINFO = function () {
		let getcache = $cacheFactory('userInfo');
		let user = firebase.auth().currentUser;
		console.log(user.providerData[0].email.split('@')[0]);
		console.log(getcache.get(user.providerData[0].email.split('@')[0]));
	}
});

// High security
myapp.controller('profileCtrl', function ($scope, userService,profileService) {
	let active_user = firebase.auth().currentUser;
	console.log(active_user);
	console.log('last Signed Time: '+active_user.metadata.lastSignInTime);
	active_user.providerData.forEach(function (profile) {
		console.log("Sign-in provider: " + profile.providerId);
		console.log("  Provider-specific UID: " + profile.uid);
		console.log("  Name: " + profile.displayName);
		console.log("  Email: " + profile.email);
		console.log("  Photo URL: " + profile.photoURL);
	});
	profileService.getINFO();

	//let fireRef = firebase.database().ref().child("Test").child("Users");
	//$firebaseObject(fireRef).$loaded().then(function (data) {
	//	console.log(data);
	//	$scope.todos = data.userID;
	//	console.log($scope.todos);
	//});
});
myapp.controller('notificateCtrl',function($scope){
});
myapp.controller('usageCtrl',function($scope){
});


myapp.controller('registerCtrl', function ($scope, $location, $firebaseObject, userService, $rootScope){
	$scope.onBackLogin = function () {
        $location.path('/login');
	}

	$scope.onValidate_pwd = function (user_password) {
		var REGEX_password = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{,})");
		return REGEX_password.test(user_password);
	}
	$scope.needPwdHint = true;
	$scope.matchPwd = function () {
	
		return ($scope.password_register == $scope.password_repeat_register);
	}
	$scope.onSignUp = function () {
		if ($scope.onValidate_pwd($scope.password_register)) {
			$scope.needPwdHint = false;
		} else {
			$scope.needPwdHint = true;
		}
		let userObj = {
			user_email: $scope.email_register,
			user_password: $scope.password_register,
			user_name: $scope.name_register,
			user_phone: $scope.phonenum_register,
			user_home: $scope.homeAddress_register
		}
		console.log($scope.needPwdHint);
		$rootScope.afterAuth = true;
		userService.signUp(userObj);
	}
});
myapp.controller('loginCtrl', function ($scope, userService, $location, $rootScope) {
	
	$scope.onSignIn = function () {
		let current_user = {
			user_email: $scope.email_login,
			user_password: $scope.password_login
		};
		userService.signIn(current_user);
		$rootScope.afterAuth = true;
		$location.path('/');
	}
});