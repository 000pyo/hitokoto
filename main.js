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


var playSound = true;



function myTimer()
{
			var notification = window.webkitNotifications.createNotification(
                'logo1.png', 'ひとこと送信の時間', notifyMessage[randomInt(0, notifyMessage.length - 1)]);

            notification.onclick = function(){stopNotification()};
            notification.onclose = function(){stopNotification()};

            notification.show();
            if(playSound)
            {
                $('#notifyAudio')[0].play();
            }
}

function stopNotification()
{
    $('#notifyAudio')[0].pause();
    $("#notifyAudio")[0].currentTime = 0;
    chrome.alarms.clear('hitokotoAlarm');
    chrome.storage.sync.set({"htkActive": false}, function() {});
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