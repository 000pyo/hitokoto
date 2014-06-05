function timeCtrl($scope,$timeout) {
<<<<<<< HEAD

    //Finish time of 
    $scope.finishTime;
    //Time remaining, calculate from minus finishTime and Date.now()
    $scope.timeRemaining;
=======
    //------------------------
    //Global variables field
    //------------------------
    var notID = 0;

    $scope.counter;
    $scope.displayTime;
    $scope.startTime;
    $scope.finishTime; 
    $scope.htkActive = false;
    $scope.currentTime = Date.now();

    $scope.editHr = 0;
    $scope.editMin = 0;
    $scope.editSec = 2;

    $scope.chkSound = true;

    


    //==========
    //On load
    //==========
    $(document).ready(function(){
        $('#debug_1').hide();
        $('#btnTest').hide();

        $('#counter').hide();
        $('#htktEdit').hide();
        $('#editError').hide();
    });


    //=========================
    //
    //       Methods
    //
    //=========================

    function updateTime(){
    	$scope.currentTime = Date.now();
        $scope.displayTime = {
        	hour:parseInt($scope.counter/60/60/1000), 
        	min:parseInt(($scope.counter/1000)%3600/60), 
        	sec:parseInt(($scope.counter/1000)%60)};
    }
>>>>>>> FETCH_HEAD

    var remain;

    /*
    *For edit time remaining
    */
    $scope.editHr = 0;
    $scope.editMin = 0;
    $scope.editSec = 2;

    $scope.onTimeout = function(){
    	
    	mytimeout = $timeout($scope.onTimeout,1000);
<<<<<<< HEAD
        remain = $scope.finishTime - Date.now();
        $scope.timeRemaining = {
            hour:parseInt(remain/60/60/1000), 
            min:parseInt((remain/1000)%3600/60), 
            sec:parseInt((remain/1000)%60)};

        if ($scope.timeRemaining.hour + $scope.timeRemaining.min + $scope.timeRemaining.sec <=0)
        {
            updateButton();
        }

    }
        

        
    

    var mytimeout = $timeout($scope.onTimeout,1000);
    



=======
    	$scope.counter = $scope.finishTime - Date.now();

    	//Update current time
    	updateTime();
        
    }
>>>>>>> FETCH_HEAD

    var mytimeout = $timeout($scope.onTimeout,1000);

    //Handled start button clicked
    $scope.startLucky= function(){

<<<<<<< HEAD
        //Get whether alarm is set or not
        chrome.alarms.get('lucky', function(alarm){
            //In case not
            if (typeof alarm == 'undefined')
            {
                $scope.finishTime = Date.now() + 1000*60*60*12;
                chrome.alarms.create('lucky', {when: $scope.finishTime});
                chrome.alarms.get('lucky', function(alarm){console.log("Alarm at " + new Date(alarm.scheduledTime) + " created.");});
                updateButton();
            }
            else{
                chrome.alarms.clear('lucky');
                console.log("lucky Alarm cleared");
                updateButton();
            }
        });
        //chrome.notifications.create('lucky', {type:"basic", title:"test", message:"Test", iconUrl:"/img/white-64x64.png"}, function(){console.log("Succesfully created notification");});

    }

=======
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


   

    function chkSoundChanged(){
        var newValue = ($('#chkSound').is(':checked'));
        //$('#debug_1').append("Test2");
        chrome.storage.sync.set({"chkSound": newValue}, function() {});
        //$('#debug_1').append("Test3");
    }



//=========================
//
//       Get Value
//
//=========================

    chrome.storage.sync.get("chkSound", function(val) {
        //$('#debug_1').append(val["chkSound"])
        $('#chkSound').prop("checked", val["chkSound"]);
    });
>>>>>>> FETCH_HEAD

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

    //For update buttpn appearance
    function updateButton(){
        chrome.alarms.get('lucky', function(alarm){
            if(typeof alarm == 'undefined')
            {
                $('#btnReset').text("Start");
                $('#btnRest').addClass("btn-success");
                $('#btnReset').removeClass("btn-danger");
                $('#showRemain').hide();
            }
            else
            {
                $('#btnReset').text("Stop");
                $('#btnRest').removeClass("btn-success");
                $('#btnReset').addClass("btn-danger");
                $('#showRemain').show();
            }
        });
    }

    //To handle when save edit is clicked
    $scope.editLuckyTime = function(){
        if($scope.editHr < 12 && $scope.editMin < 60 && $scope.editSec < 60)
        {

            //Clear lucky alarm            
            chrome.alarms.clear('lucky');
            console.log("lucky alarm cleared");

            //set new finish time
            $scope.finishTime = Date.now() + $scope.editHr*1000*60*60 + $scope.editMin*1000*60 + $scope.editSec*1000;
            
            chrome.alarms.create('lucky', {when: $scope.finishTime});
            console.log("new lucky alarm created");

            $('#editError').hide();
            $('#editLucky').hide();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            updateButton();
            
        }
        else{
            $('#editError').show();    
        }
    }

<<<<<<< HEAD
    //To handle when cancel edit is clicked
    $scope.editLuckyCancel = function(){
        $('#editError').hide();
        $('#editLucky').hide();
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }

    //To handle when showEdit button is clicked
    $scope.showEdit = function(){
        $('#editLucky').show();
    }




    //On Document Load
    $(document).ready(function(){
        updateButton();
        
        $('#editError').hide();
        $('#editLucky').hide();

        chrome.alarms.get('lucky', function(alarm){
            if (typeof alarm != 'undefined')
            {
                $scope.finishTime = alarm.scheduledTime;
            }
        });
=======


//=========================
//
//       Listener
//
//=========================
    
    
     $('#txtChkSound').click(function(){
        $('#chkSound').prop("checked", !($('#chkSound').is(':checked')));
        chkSoundChanged();
    });

    $('#chkSound').change(function(){
        //$('#debug_1').append("Test1");
        chkSoundChanged();
    });

    //------------------------------
    //Listener: On storage changed
    //------------------------------
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

    
    /*
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
    });*/
>>>>>>> FETCH_HEAD

    });


}







