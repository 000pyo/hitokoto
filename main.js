/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
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
    

