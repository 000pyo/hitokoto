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



//=======================
//Global variables field
//=======================
var htktFinishTime;
var htkRinged = false;
var playSound = true;
var lastState = "active";


var notify23 = false;

var notify15;

//--------
//For KoG
//--------
var firstBattleTime;
var firstBattleOn;
var secondBattleTime;
var secondBattleOn;


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
    
    if (alarm.name == 'notify15'){
        //window.webkitNotifications.createNotification('', "Alarm notify15 ringed", "test").show();
        notifyTimer(15);
        //chrome.alarms.clear('notify15');

    }


    if (alarm.name == 'notify23'){
        notifyTimer(23);
        //chrome.alarms.clear('notify23');        
    }


    if (alarm.name == 'KoGFirstBattle'){
        notifyTimer(101);
    }
    if (alarm.name == 'KoGSecondBattle'){
        notifyTimer(102);
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

    if (changes["notify15"])
    {
        window.notify15 = changes["notify15"].newValue;
        //window.webkitNotifications.createNotification('','Notify15',window.notify15).show();
        if(!window.notify15)
        {
            chrome.alarms.clear('notify15');
        }
    }

    if (changes["notify23"])
    {
        window.notify23 = changes["notify23"].newValue;
        //window.webkitNotifications.createNotification('','Notify23',window.notify23).show();
        if(!window.notify23)
        {
            chrome.alarms.clear('notify23');
        }
    }



    //For KoG
    if(changes["firstBattleOn"]){
        window.firstBattleOn = changes["firstBattleOn"].newValue;
        if(!window.firstBattleOn){
            chrome.alarms.clear('KoGFirstBattle');
        }
    }

    if(changes["secondBattleOn"]){
        window.secondBattleOn = changes["secondBattleOn"].newValue;
        if(!window.secondBattleOn){
            chrome.alarms.clear('KoGSecondBattle');
        }
    }

    if(changes["firstBattleTime"]){
        window.firstBattleTime = changes["firstBattleTime"].newValue.value;
        if(window.firstBattleOn){
            chrome.alarms.create('KoGFirstBattle', {when:getAlarmTime(window.firstBattleTime), periodInMinutes:5});
        }
    }

    if(changes["secondBattleTime"]){
        window.secondBattleTime = changes["secondBattleTime"].newValue.value;
        if(window.secondBattleOn){
            chrome.alarms.create('KoGSecondBattle', {when:getAlarmTime(window.secondBattleTime), periodInMinutes:5});
        }
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
//Get: Notify on/off
//-------------------------
chrome.storage.sync.get("notify15", function(val){
    window.notify15 = val["notify15"];
    //window.webkitNotifications.createNotification('', "Test", "test").show();
});


chrome.storage.sync.get("notify23", function(val){
    window.notify23 = val["notify23"];
});



//----------------------------
//Get: KoG Notify On/Off & Time
//----------------------------
chrome.storage.sync.get("firstBattleOn", function(val){
    window.firstBattleOn = val["firstBattleOn"];
});

chrome.storage.sync.get("secondBattleOn", function(val){
    window.secondBattleOn = val["secondBattleOn"];
});

chrome.storage.sync.get("firstBattleTime", function(val){
    window.firstBattleTime = val["firstBattleTime"].value;
});

chrome.storage.sync.get("secondBattleTime", function(val){
    window.secondBattleTime = val["secondBattleTime"].value;
});


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



chrome.alarms.get('notify15', function(alarm){
    //window.webkitNotifications.createNotification('', "Get notify 15", window.notify15).show();
    if (typeof alarm == 'undefined')
    {
        if (window.notify15)
        {   
            chrome.alarms.create('notify15', {when: getAlarmTime(15), periodInMinutes:5});
            window.webkitNotifications.createNotification('', "Set notify15 alarm", window.notify15).show();
        }
    }
});

chrome.alarms.get('notify23', function(alarm){
    //window.webkitNotifications.createNotification('', "Get notify 15", window.notify15).show();
    if (typeof alarm == 'undefined')
    {
        if (window.notify23)
        {   
            chrome.alarms.create('notify23', {when: getAlarmTime(23), periodInMinutes:5});
            window.webkitNotifications.createNotification('', "Set notify23 alarm", window.notify23).show();
        }
    }
});


//--------------
//KoG Alarm
//--------------
chrome.alarms.get('KoGFirstBattle', function(alarm){
    if (typeof alarm == 'undefined')
    {
        if (window.firstBattleOn)
        {
            chrome.alarms.create('KoGFirstBattle', {when: getAlarmTime(window.firstBattleTime), periodInMinutes:5});
        }
    }
});

chrome.alarms.get('KoGSecondBattle', function(alarm){
    if (typeof alarm == 'undefined')
    {
        if (window.secondBattleOn)
        {
            chrome.alarms.create('KoGSecondBattle', {when: getAlarmTime(window.secondBattleTime), periodInMinutes:5});
        }
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
            
    var sound;


    switch(alarmType)
    {   
        //Case 1  = Milimas Hitokoto Alarm
        case 1:
            htkRinged = true;
            notificationIcon = 'img/logo1.png';
            notificationTitle = 'ひとこと送信の時間 - ';
            currentTime = new Date(window.htktFinishTime);
            break;
        case 15:
            notificationIcon = '';
            notificationTitle = 'GMT+9 - ';
            break;
        case 23:
            notificationIcon = '';
            notificationTitle = 'GMT+9 - ';
            break;
        case 101:
            notificationIcon = '';
            notificationTitle = 'Knight of Glory First Battle - ';
            currentTime = new Date(getEpochTime(window.firstBattleTime, 0));
            break;
        case 102:
            notificationIcon = '';
            notificationTitle = 'Knight of Glory Second Battle - ';
            currentTime = new Date(getEpochTime(window.secondBattleTime, 0));
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
            sound = $('#notifyAudio')[0];
            break;
        case 15:
            notification.onclick = function(){stopNotification(15)};
            notification.onclose = function(){stopNotification(15)};
            sound = $('#notifyAudio')[0];
            sound.currentTime = 0;
            break;
        case 23:
            notification.onclick = function(){stopNotification(23)};
            notification.onclose = function(){stopNotification(23)};
            sound = $('#notifyAudio')[0];
            sound.currentTime = 0;
            break;
        case 101:
            notification.onclick = function(){stopNotification(101)};
            notification.onclose = function(){stopNotification(101)};
            sound = $('#notifyAudio')[0];
            sound.currentTime = 0;
            break;
        case 102:
            notification.onclick = function(){stopNotification(102)};
            notification.onclose = function(){stopNotification(102)};
            sound = $('#notifyAudio')[0];
            sound.currentTime = 0;
            break;
        default:
            sound = $('#notifyAudio')[0];
            break;
    }
            
            //notification.onclick = function(){stopNotification("Test")};
    notification.show();
            
            
    if(playSound)
    {
        chrome.idle.queryState(60, function(state){
            if(state != "locked")
            {
                //$('#notifyAudio')[0].play();
                
                
                sound.play();
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
        case 15:
            $('#notifyAudio')[0].pause();
            $("#notifyAudio")[0].currentTime = 0;
            //chrome.alarms.clear('notify15');
            chrome.alarms.create('notify15', {when: getAlarmTime(15), periodInMinutes:5});
            break;
        case 23:
            $('#notifyAudio')[0].pause();
            $("#notifyAudio")[0].currentTime = 0;
            //chrome.alarms.clear('notify23');
            chrome.alarms.create('notify23', {when: getAlarmTime(23), periodInMinutes:5});
            break;
        case 101:
            $('#notifyAudio')[0].pause();
            $("#notifyAudio")[0].currentTime = 0;
            chrome.alarms.create('KoGFirstBattle', {when: getAlarmTime(window.firstBattleTime), periodInMinutes:5});
            break;
        case 102:
            $('#notifyAudio')[0].pause();
            $("#notifyAudio")[0].currentTime = 0;
            chrome.alarms.create('KoGSecondBattle', {when: getAlarmTime(window.secondBattleTime), periodInMinutes:5});
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

function getEpochTime(hour, min){
        var newTime = new Date(Date.now());
        newTime.setHours(hour);
        
        newTime.setMinutes(min);

        newTime.setSeconds(0);


        return newTime.getTime();
    }

function getAlarmTime(hour){
    //var alarmTime = getEpochTime(hour, 0);
    var alarmTime = getEpochTime(hour, 0);

    if(Date.now() > alarmTime)// + 30*60*1000)
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
    

