/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */


chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
<<<<<<< HEAD
        width: 350,
        height: 450
    });
});



var AT1Time = 12;
var AT2Time = 22;

/*
*For first run
*/
chrome.alarms.create('AT1', {when:getEpochTime(AT1Time, 0)});
console.log('AT1 Created at ' + new Date(Date.now()));

chrome.alarms.create('AT2', {when:getEpochTime(AT2Time, 0)});
console.log('AT2 Created at ' + new Date(Date.now()));

chrome.alarms.create('midnight', {when:getEpochTime(0, 0) + 1000*60*60*24 });
console.log('midnight Created at ' + new Date(Date.now()));



/*
*Handled onAlarm
*/
chrome.alarms.onAlarm.addListener(function(alarm){

    if (alarm.name == 'AT1')
    {
        chrome.notifications.create("AT", {type:"basic", title:"Assault Time", message:"Assault Time 1 " + new Date(Date.now()), iconUrl:"/img/stamp11.png"}, function(){console.log("AT1 ringed at " + new Date(Date.now()));});
    }
    else if (alarm.name == 'AT2')
    {
        chrome.notifications.create("AT", {type:"basic", title:"Assault Time", message:"Assault Time 2" + new Date(Date.now()), iconUrl:"/img/stamp11.png"}, function(){console.log("AT2 ringed at " + new Date(Date.now()));});    
    }
    else if (alarm.name == 'lucky')
    {
        chrome.notifications.create("lucky", {type:"basic", title:"Lucky Gacha Time", message:"Lucky Gacha Time " + new Date(Date.now()), iconUrl:"/img/stamp2.png"}, function(){console.log("lucky ringed at " + new Date(Date.now()));});    
    }
    else if (alarm.name == 'midnight')
    {
        console.log("Midnight ringed");
        
        chrome.alarms.create('midnight', {when:getEpochTime(0, 0) + 1000*60*60*24 });
        console.log("Set new midnight alarm");

        chrome.alarms.create('AT1', {when:getEpochTime(AT1Time, 0)});
        console.log('AT1 Created at ' + new Date(Date.now())); 

        chrome.alarms.create('AT2', {when:getEpochTime(AT2Time, 0)});
        console.log('AT2 Created at ' + new Date(Date.now()));
    }
    else
    {
    }
    //Add listener to notifications
    chrome.notifications.onClicked.addListener(notificationClicked);

    
});


/**
 *Utilities Function
*/

function getEpochTime(hour, min){
        var newTime = new Date(Date.now());
        newTime.setHours(hour);
        
        newTime.setMinutes(min);

        newTime.setSeconds(0);


        return newTime.getTime();
    }

function getAlarmTime(hour, min){
    if (Date.now() - getEpochTime(hour, min) > 1000*60*60*24)
    {
        return getEpochTime(hour, min) + 1000*60*60*24;
    }
    else
    {
        return getEpochTime(hour, min);
    }
}

function getAlarmTimeWTimeZone(hour, min){

    var alarmTime = getEpochTime(hour, 0);

    if(Date.now() > alarmTime + 24*60*60*1000)
    {
        alarmTime += 24*60*60*1000;
    }

    var timeZone = (new Date(Date.now()).getTimezoneOffset()) / (-60);
    var timeDiff = 0;
    if (timeZone != 9)
    {
        timeDiff = (9 - timeZone);
    }

    alarmTime -= timeDiff*1000*60*60;

    return alarmTime;
}


/*
*Notification methods
*/
function notificationClosed(notID, bByUser) {
    console.log("The notification '" + notID + "' was closed" + (bByUser ? " by the user" : ""));
}

function notificationClicked(notID) {
    console.log("The notification '" + notID + "' was clicked");
    //Clear the clicked notifications
    chrome.notifications.clear(notID, function(){});
}

function notificationBtnClick(notID, iBtn) {
    console.log("The notification '" + notID + "' had button " + iBtn + " clicked");
}
=======
    width: 350,
    height: 450
  });
});


//------------------------
//Global variables field
//------------------------
var htktFinishTime;
var htkRinged = false;
var playSound = true;
var lastState = "active";


//=========================
//
//       Listener
//
//=========================

//===================
//Listener: On Alarm
//===================
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name == 'hitokotoAlarm') {
        // Do something...
        notifyTimer(1);

    }
});

//====================================
//Litsener: On storage value changes
//====================================
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes["chkSound"]) {
      window.playSound = changes["chkSound"].newValue;
      //window.webkitNotifications.createNotification('','Chksound Value',window.playSound).show();

    }

    if (changes["htkActive"]){
        if(!(changes["htkActive"].newValue))
        {
            stopNotification(1);
        }
    }

    if (changes["htkFinishTime"])
    {
        window.htktFinishTime = changes["htkFinishTime"].newValue;
    }
});

//=============================
//Listener: idle state changed
//=============================
chrome.idle.onStateChanged.addListener(function(newstate) {
        if(lastState == "locked"){
            //window.webkitNotifications.createNotification('','Test','Test').show();
            //notifyTimer();
            chrome.storage.sync.get("htkActive", function(val) {
                if(val["htkActive"])
                {
                    if(htkRinged){
                        $("#notifyAudio")[0].currentTime = 0;
                        notifyTimer(1);
                    }
                }
            });


        }
        lastState = newstate;
});



//=========================
//
//       Get Values
//
//=========================


//-------------------------
//Get: Alarm values
//-------------------------
chrome.alarms.get('hitokotoAlarm', function(alarm){
    if (typeof alarm == 'undefined' )
    {
        chrome.storage.sync.get("htkActive", function(val) {
            if(val["htkActive"])
            {
                chrome.storage.sync.get("htkFinishTime", function(val) {
                    //var finTime = val["htkFinishTime"];
                    window.htktFinishTime = val["htkFinishTime"];
                    //window.webkitNotifications.createNotification('','Test','Test').show();
                    if(finTime <= Date.now())
                    {
                        notifyTimer(1);
                    }
                    else
                    {
                        chrome.alarms.create('hitokotoAlarm', {when:window.htktFinishTime});
                    }
                });
            }
        });
    }
});







//=========================
//
//       Methods
//
//=========================

function notifyTimer(alarmType)
{           
    var notificationIcon;
    var notificationTitle;

    var currentTime = new Date(Date.now());
            
    


    switch(alarmType)
    {   
        //Case 1  = Milimas Hitokoto Alarm
        case 1:
            htkRinged = true;
            notificationIcon = 'img/logo1.png';
            notificationTitle = 'ひとこと送信の時間 - ';
            currentTime = new Date(window.htktFinishTime);
            break;
        default:
            notificationIcon = '';
            notificationTitle = 'Untitled - ';
            break;
    }


    var hour = currentTime.getHours();
    if (hour < 10){ hour = "0" + hour;}

    var min = currentTime.getMinutes();
    if (min < 10){ min = "0" + min;}

    var sec = currentTime.getSeconds();
    if (sec < 10){sec = "0" + sec;}


    var notification = window.webkitNotifications.createNotification(
        notificationIcon,  notificationTitle + hour + ":" + min + ":" + sec , notifyMessage[randomInt(0, notifyMessage.length - 1)]);


    switch(alarmType)
    {
        case 1:
            notification.onclick = function(){chrome.storage.sync.set({"htkActive": false}, function() {});};
            break;
        default:
            break;
    }
            
            //notification.onclick = function(){stopNotification("Test")};
    notification.show();
            
            
    if(playSound)
    {
        chrome.idle.queryState(60, function(state){
            if(state != "locked")
            {
                $('#notifyAudio')[0].play();
            }
        });            
    }
}



function stopNotification(alarmType)
{   
    switch(alarmType)
    {
        //Case1 = Milimas Hitokoto Alarm
        case 1:
            //window.webkitNotifications.createNotification('', "Stop Hitooto Alarm", "test").show();
            $('#notifyAudio')[0].pause();
            $("#notifyAudio")[0].currentTime = 0;
            chrome.alarms.clear('hitokotoAlarm');
            //chrome.storage.sync.set({"htkActive": false}, function() {});
            htkRinged = false;
            break;

        default:
            break;
    }

    
}





//===================
//Utilities Function
//===================


function randomInt(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

function isPlaying(audelem) {
    return !audelem.paused && !audelem.ended && 0 < audelem.currentTime;
}


//---------------------
//Notification Message
//---------------------
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
    notifyMessage[21] = "orz<踏み台でう";
    notifyMessage[22] = "ﾙ*'ヮ')ﾙふひひ★";
    notifyMessage[23] = "ζ*'ヮ')ζ＜うっう～";
    notifyMessage[24] = "のヮののヮののヮののヮの";
    notifyMessage[25] = "ﾉﾟヮﾟﾉノ";
    notifyMessage[26] = "|イ-_-Y|";
    notifyMessage[27] = "ﾙ*'ヮ')ﾙ 幼女可愛いじゃあ～";
    notifyMessage[28] = "うどん、うどんはいかがですか？";
    notifyMessage[29] = "今日は、うどんのことを、一番好きになっていってくださいね♪";
    notifyMessage[30] = "(*ﾟ∀ﾟ)o彡ﾟﾐﾐﾐﾝ！ﾐﾐﾐﾝ！ｳｰｻﾐﾝ!!";
    

>>>>>>> FETCH_HEAD
