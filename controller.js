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


            var notification = window.webkitNotifications.createNotification(
                'logo1.png', 'ひとこと送信の時間', notifyMessage[randomInt(0, notifyMessage.length - 1)]);

            notification.onclick = function(){if($scope.clicked){$('#btnReset').click()}};
            notification.onclose = function(){if($scope.clicked){$('#btnReset').click()}};

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

    function randomInt(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var notifyMessage = new Array();
    notifyMessage[0] = "ほ？";
    notifyMessage[1] = "ffdy";
    notifyMessage[2] = "解体のアイドルnkcdy4649";
    notifyMessage[3] = "ﾓﾁｮｶﾜｲｲﾈｰ";
    notifyMessage[4] = "ｾﾘｶｶﾜｲｲﾈｰ";
    notifyMessage[5] = "モチョカワイイネー";
    notifyMessage[6] = "もちょかわいいねー";
    notifyMessage[7] = "闇に飲まれよ";
    notifyMessage[8] = "煩わしい太陽ね";
    notifyMessage[9] = "天空の光よ!!";
    notifyMessage[10] = "クックック…闇に飲まれよ！";
    notifyMessage[11] = "まぁまぁ眼鏡どうぞ";
    notifyMessage[12] = "まぁまぁ猫耳どうぞ♪";
    notifyMessage[13] = "わかるわ";
    notifyMessage[14] = "わからないわ";
    notifyMessage[15] = "ハピハピしてるぅ？";
    notifyMessage[16] = "!すでのな";
    notifyMessage[17] = "なのです!";
    notifyMessage[18] = "にょわー☆";
    notifyMessage[19] = "にょわにょわにょわにょわ";
    notifyMessage[20] = "หยวยๆๆๆ";



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






