function timeCtrl($scope,$timeout) {

    $(document).ready(function(){
		$('#counter').hide();
	});

    $scope.counter;
    $scope.displayTime;
    $scope.startTime;
    $scope.finishTime; 
    $scope.clicked = false;
    $scope.currentTime = Date.now();

    var alertNotified = false;

    
    function updateTime(){
    	$scope.currentTime = Date.now();
        $scope.displayTime = {
        	hour:parseInt($scope.counter/60/60/1000), 
        	min:parseInt(($scope.counter/1000)%3600/60), 
        	sec:parseInt(($scope.counter/1000)%60)};
    }



    $scope.onTimeout = function(){
    	
    	mytimeout = $timeout($scope.onTimeout,1000);
    	$scope.counter = $scope.finishTime - Date.now();

    	//Update current time
    	updateTime();

        //Check if button clicked
    	if($scope.clicked && $scope.counter <= 0 && alertNotified == false)
    	{
    		if($('#chkSound').is(':checked'))
    		{
            	$('#notifyAudio')[0].play();
    		}
            
            alert("");




            alertNotified = true;

			
    	}
        
    }




    var mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.reset= function(){
    	if($scope.clicked)
    	{
    		$scope.clicked = false;
    		$('#counter').hide();
        	$('#notifyAudio')[0].pause();
        	alertNotified = false;
        	$('#btnReset').text("Start");
        	$('#btnReset').addClass("btn-success");
        	$('#btnReset').removeClass("btn-danger")
        	$("#notifyAudio")[0].currentTime = 0;
    	}
    	else
    	{
    		var duration = 5*1000;
        	$scope.startTime = Date.now();
        	$scope.finishTime = Date.now() + duration;
        	$scope.clicked = true;
        	$('#counter').show();
        	$('#btnReset').text("Stop");
        	$('#btnReset').addClass("btn-danger");
        	$('#btnReset').removeClass("btn-success")
    	}
    	
    }

}



