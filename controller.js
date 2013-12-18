




function timeCtrl($scope,$timeout) {
    var notID = 0;

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
            
<<<<<<< HEAD
            //alert("");
=======
            alert("");
            
            
            <!-- Call chrome.notifications -->
>>>>>>> 7d5903f9c63716977b5691bda4fc5e1d44c88b64

            var notification = window.webkitNotifications.createNotification(
                'logo1.png', 'ひとこと送信の時間', 'ほ？');

            notification.onclick = function(){$('#btnReset').click()};
            notification.onclose = function(){$('#btnReset').click()};

            notification.show();


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
    		var duration = 8*60*60*1000;
        	$scope.startTime = Date.now();
        	$scope.finishTime = Date.now() + duration;
        	$scope.clicked = true;
        	$('#counter').show();
        	$('#btnReset').text("Stop");
        	$('#btnReset').addClass("btn-danger");
        	$('#btnReset').removeClass("btn-success")
    	}
    	
    }

    $('#txtChkSound').click(function(){
        $('#chkSound').prop("checked", !($('#chkSound').is(':checked')));
    });


    


    $(document).ready(function(){
        $('#counter').hide();
    });


/*
document.querySelector('#btnTest').addEventListener('click', function() {
    
    $('#debug_1').append("Test1");
    var havePermission = window.webkitNotifications.checkPermission();
    

  if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
    // function defined in step 2
    //alert(havePermission);
    window.webkitNotifications.createNotification(
        'logo1.png', 'Notification Title', 'Notification content...').show();


  } else {
    window.webkitNotifications.requestPermission();
  }
}, false);*/




}






