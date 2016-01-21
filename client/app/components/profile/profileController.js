angular.module('app.profile', [])
	.controller('ProfileController', ['$scope', '$window', '$state', 'Profile', function ($scope, $window, $state, Profile) {
		$scope.data = {};
		$scope.data.toLearn = {};
		$scope.data.toTeach = {};
		// $scope.data.profilePhoto

		$scope.data.username = $window.localStorage.username;

		$scope.saveEditButton = {};
		$scope.saveEditButton.buttonText = 'Edit';

		//called from within toggleEditShow when save button is clicked 
		$scope.updateProfileSkills = function() {
			console.log('hello inside update skills!');
			var userDataObj = {};
			userDataObj.username = $scope.data.username;
			userDataObj.toLearn = [];
				for(var toLearnKey in $scope.data.toLearn) {
					userDataObj.toLearn.push(toLearnKey);
				}
			userDataObj.toTeach = [];
				for(var toTeachKey in $scope.data.toTeach) {
					userDataObj.toTeach.push(toTeachKey);
				}
			Profile.updateProfileSkills(userDataObj);
		};


		$scope.updateProfileBasics = function() {
			var userDataObj = {}; //this should be scope.data
			Profile.updateProfileBasics(userDataObj);
		};

		//called when the edit/show button is clicked
		$scope.toggleEditShow = function() {
			if($scope.saveEditButton.buttonText === 'Edit') {
				$scope.saveEditButton.buttonText = 'Save';
			} else {
				$scope.saveEditButton.buttonText='Edit';
				$scope.updateProfileSkills(); //call to fn that saves the skills 
			} 
		};

		//called on the initialization of the page
		$scope.getCurrentUserProfile = function() {
			console.log('hello inside get currentUserProfile');
			//var userDataObj = {};
			//userDataObj.username = $window.localStorage.getItem('username');
			Profile.getCurrentUser();//<--pass in userDataObj here
			//SET: $scope.data.location
			// 		 $scope.data.name
			//		 $scope.data.github
			//		 $scope.data.photo
		};

  }]);