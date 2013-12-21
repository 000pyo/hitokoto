function timeCtrl($scope,$timeout) {
    var notID = 0;

    $scope.counter;
    $scope.displayTime;
    $scope.startTime;
    $scope.finishTime; 
    $scope.htkActive = false;
    $scope.currentTime = Date.now();

    $scope.editHr = 0;
    $scope.editMin = 1;
    $scope.editSec = 2;



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
        
    }


    var mytimeout = $timeout($scope.onTimeout,1000);
    

    $scope.reset= function(){
    	if(!($scope.htkActive))
    	{

            var duration = 8*60*60*1000;
            $scope.startTime = Date.now();
            $scope.finishTime = Date.now() + duration;
            chrome.storage.sync.set({"htkStartTime": $scope.startTime}, function() {});
            chrome.storage.sync.set({"htkFinishTime": $scope.finishTime}, function() {});
            chrome.alarms.create('hitokotoAlarm', {when: $scope.finishTime});

            //$scope.htkActive = true;
            chrome.storage.sync.set({"htkActive": true}, function() {});
            $('#counter').show();
            $('#btnReset').text("Stop");
            $('#btnReset').addClass("btn-danger");
            $('#btnReset').removeClass("btn-success")

            //$('#debug_1').append($scope.htkActive);

    	}
    	else
    	{
            
    		chrome.storage.sync.set({"htkActive": false}, function() {});
            $('#htktEdit').hide();
            //$('#debug_1').append($scope.htkActive);
    	}
    	
    }


    $('#txtChkSound').click(function(){
        $('#chkSound').prop("checked", !($('#chkSound').is(':checked')));
        chkSoundChanged();
    });

    $('#chkSound').change(function(){
        //$('#debug_1').append("Test1");
        chkSoundChanged();
    });

    function chkSoundChanged(){
        var newValue = ($('#chkSound').is(':checked'));
        //$('#debug_1').append("Test2");
        chrome.storage.sync.set({"chkSound": newValue}, function() {});
        //$('#debug_1').append("Test3");
    }


    chrome.storage.sync.get("chkSound", function(val) {
        //$('#debug_1').append(val["chkSound"])
        $('#chkSound').prop("checked", val["chkSound"]);
    });

    chrome.storage.sync.get("htkActive", function(val) {
        //$('#debug_1').append(val["htkActive"]);
        $scope.htkActive = val["htkActive"];
        if(val["htkActive"])
        {
            $('#counter').show();
            $('#btnReset').text("Stop");
            $('#btnReset').addClass("btn-danger");
            $('#btnReset').removeClass("btn-success")

            chrome.storage.sync.get("htkFinishTime", function(val) {
                $scope.finishTime = val["htkFinishTime"];
            });

            chrome.storage.sync.get("htkStartTime", function(val) {
                $scope.startTime = val["htkStartTime"];
            });
        }
    });

    



    $(document).ready(function(){
        $('#debug_1').hide();
        $('#btnTest').hide();

        $('#counter').hide();
        $('#htktEdit').hide();
        $('#editError').hide();
    });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
      if (changes["htkActive"]){
        //$('#debug_1').append(changes["clicked"]);
        $scope.htkActive = changes["htkActive"].newValue;
        $('#debug_1').append($scope.htkActive);

        //$('#debug_1').append($scope.clicked);
        //$('#debug_1').append($scope.clicked);
        if(!$scope.htkActive)
        {
            //$('#debug_1').append($scope.htkActive);
            $('#counter').hide();
            $('#btnReset').text("Start");
            $('#btnReset').addClass("btn-success");
            $('#btnReset').removeClass("btn-danger")
            $scope.htkActive = false;
        }
      }
  });

    $scope.showEdit = function(){
        $('#htktEdit').toggle();
    }


    $scope.editHtktTime = function(){
        $('#debug_1').append($scope.editHr + " ");
        $('#debug_1').append($scope.editMin + " ");
        $('#debug_1').append($scope.editSec + " ");
        
        if($scope.editHr < 8 && $scope.editMin < 60 && $scope.editSec < 60)
        {

            
            chrome.alarms.clear('hitokotoAlarm');

            $scope.startTime = Date.now();
        
            $scope.finishTime = Date.now() + $scope.editHr*1000*60*60 + $scope.editMin*1000*60 + $scope.editSec*1000;
            chrome.storage.sync.set({"htkStartTime": $scope.startTime}, function() {});
            chrome.storage.sync.set({"htkFinishTime": $scope.finishTime}, function() {});
            chrome.alarms.create('hitokotoAlarm', {when: $scope.finishTime});
            $('#editError').hide();
            $('#htktEdit').hide();
            
        }
        else{
            $('#editError').show();    
        }
        

        

    }

    

    //For Testing
    $('#btnTest').click(function(){
        //chrome.alarms.create('hitokotoAlarm', {when: Date.now() + 10000});
        chrome.alarms.get('hitokotoAlarm', function(alarm){
            $('#debug_1').append(alarm);
            if (typeof alarm == 'undefined' )
            {
                $('#debug_1').append("undefined");
                chrome.alarms.create('hitokotoAlarm', {when: Date.now() + 2000});
            }
        });
    });



}






