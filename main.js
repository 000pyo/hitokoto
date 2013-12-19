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

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name == 'hitokotoAlarm') {
        // Do something...
        myTimer();

    }
});

chrome.alarms.get('hitokotoAlarm', function(alarm){
    if (typeof alarm == 'undefined' )
    {
        chrome.storage.sync.get("htkActive", function(val) {
            if(val["htkActive"])
            {
                chrome.storage.sync.get("htkFinishTime", function(val) {
                    var finTime = val["htkFinishTime"];
                    if(finTime <= Date.now())
                    {
                        myTimer();
                    }
                    else
                    {
                        chrome.alarms.create('hitokotoAlarm', {when:finTime});
                    }
                });
            }
        });
    }
});


var htkRinged = false;

var playSound = true;

var lastState = "active";

chrome.idle.onStateChanged.addListener(function(newstate) {
        if(lastState == "locked"){
            //window.webkitNotifications.createNotification('','Test','Test').show();
            //myTimer();
            chrome.storage.sync.get("htkActive", function(val) {
                if(val["htkActive"])
                {
                    if(htkRinged){
                        $("#notifyAudio")[0].currentTime = 0;
                        myTimer();
                    }
                }
            });


        }
        lastState = newstate;
});

function myTimer()
{           htkRinged = true;

            var currentTime = new Date(Date.now());

            var hour = currentTime.getHours();
            if (hour < 10){ hour = "0" + hour;}

            var min = currentTime.getMinutes();
            if (min < 10){ min = "0" + min;}

            var sec = currentTime.getSeconds();
            if (sec < 10){sec = "0" + sec;}

			var notification = window.webkitNotifications.createNotification(
                'img/logo1.png', 'ひとこと送信の時間 - '+ hour + ":" + min + ":" + sec , notifyMessage[randomInt(0, notifyMessage.length - 1)]);

            notification.onclick = function(){stopNotification()};
            //notification.onclose = function(){stopNotification()};

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

function stopNotification()
{
    $('#notifyAudio')[0].pause();
    $("#notifyAudio")[0].currentTime = 0;
    chrome.alarms.clear('hitokotoAlarm');
    chrome.storage.sync.set({"htkActive": false}, function() {});
    htkRinged = false;
}


chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes["chkSound"]) {
      playSound = changes["chkSound"].newValue;
    }

    if (changes["htkActive"]){
        if(!(changes["htkActive"].newValue))
        {
            stopNotification();
        }
    }
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
    

