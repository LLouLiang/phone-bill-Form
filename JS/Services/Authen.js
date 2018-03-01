myapp.factory("userService", function ($rootScope, $location, $window, $cacheFactory) {
	let authService = {};
	authService.authUser = function (email,password) {
		console.log(email+" "+password);
	};

	authService.checkAuth = function () {
		let storageChecking = localStorage.getItem('security_authed_user');
		(storageChecking != null) ? $rootScope.afterAuth = true : $rootScope.afterAuth = false;

		firebase.auth().onAuthStateChanged(function (user) {
			if (user != null) {
				// User has authentication
				authService.hasAuth = true;
				localStorage.setItem('security_authed_user',user);
				$rootScope.afterAuth = true;
				console.log("has authentication ");
			} else {
				// User has no authentication
				authService.hasAuth = false;
				$rootScope.afterAuth = false;
				console.log("has no authentication ");
			}
		});
	}

	authService.signOut = function () {
		firebase.auth().signOut().then(function () {
			localStorage.clear();
		}).catch(function (error) {
			// relocate to the error page
		});
		$rootScope.afterAuth = false;
	}
	authService.signIn = function (user) {
		firebase.auth().signInWithEmailAndPassword(user.user_email, user.user_password).then(function () {
			alert("you already signed in");
		}).catch(function (error) {
			// Handle Errors here.
			if (error != null) {
				alert("You password or login name incorrect!");
			}
		});
	}
	authService.signUp = function (userObj) {
		firebase.auth().createUserWithEmailAndPassword(userObj.user_email, userObj.user_password).catch(function (error) {
		});
		let cache = $cacheFactory('userInfo');
		let name = "users/" + userObj.user_email.split('@')[0];
		cache.put(name, JSON.stringify(userObj));
		firebase.database().ref(name).set({
			username: userObj.user_name,
			email: userObj.user_email,
			phone: userObj.user_phone,
			home:userObj.user_home,
		});

	}
	authService.checkIsLogin = function () {
		let auth_user = firebase.auth().currentUser;
		if (auth_user != null) {
			// User log in
			authService.hasLogin = true;
			console.log("has login");
		} else {
			// User has no logging in
			authService.hasLogin = false;
			console.log("has no login");
		}
	}
	


	return authService;
	//sign up new user with email and password
	//firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
	//	// Handle Errors here.
	//	var errorCode = error.code;
	//	var errorMessage = error.message;
	//	// ...
	//});

	// sign in with email and password
	//firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
	//	// Handle Errors here.
	//	var errorCode = error.code;
	//	var errorMessage = error.message;
	//	// ...
	//});

});
