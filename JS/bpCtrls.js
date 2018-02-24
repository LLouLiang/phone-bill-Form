myapp.controller('indexCtrl',function($scope,$location){
    $scope.onSignIn = function(){
        $location.path('/login');
    }
    $scope.onSignUp = function(){
        $location.path('/registration');
    }
});
myapp.controller('homeCtrl',function($scope,$firebaseArray){
    var config = {
        apiKey: "AIzaSyAjTuNufDPCMvEjcDvLZKgG1aTb0l9IvMc",
        authDomain: "phone-bill-ed919.firebaseapp.com",
        databaseURL: "https://phone-bill-ed919.firebaseio.com",
        projectId: "phone-bill-ed919",
        storageBucket: "phone-bill-ed919.appspot.com",
        messagingSenderId: "291426985660"
        };
    firebase.initializeApp(config);
    let fireRef = firebase.database().ref().child("Test");
    $scope.todos = $firebaseArray(fireRef);
    
});
myapp.controller('profileCtrl',function($scope){

});
myapp.controller('notificateCtrl',function($scope){
    
});
myapp.controller('usageCtrl',function($scope){

});
myapp.controller('registerCtrl',function($scope,$location){
    $scope.onBackLogin = function(){
        $location.path('/login');
    }
});
myapp.controller('loginCtrl',function($scope){

});