jQuery(document).ready(function () {
    
});

function toggleOverlay() {
    var overlay = $('#overlay');

    if (overlay.size() === 0) {

        var htmlHeight = $('html').innerHeight();
        $('body').append('<div id="overlay"></div>');

        overlay = $('#overlay');

        overlay.css({
            'height': htmlHeight + 'px',
            'background-color': 'rgba(0, 0, 0, 0.6)',
            'left': '0',
            'position': 'absolute',
            'top': '0',
            'width': '100%',
            'z-index': '1000',
        });

        overlay.append('<img src="https://s3-eu-west-1.amazonaws.com/images.trustpilot.com/static/foosball/ajax-loader.gif"/>');

        overlay.on('click', function () {
            toggleOverlay();
        });

    } else {
        overlay.remove();
    }
}

function buildNotificationText(eventData) {
    if (!eventData) {
        return undefined;
    }
    var matchResult = JSON.parse(eventData);

    var redPlayer1Name = prettyPlayerName(matchResult.RedPlayer1);
    var redPlayer2Name = prettyPlayerName(matchResult.RedPlayer2);
    var bluePlayer1Name = prettyPlayerName(matchResult.BluePlayer1);
    var bluePlayer2Name = prettyPlayerName(matchResult.BluePlayer2);

    var redTeam = (redPlayer2Name.length === 0) ? redPlayer1Name : redPlayer1Name + " & " + redPlayer2Name;
    var blueTeam = (bluePlayer2Name.length === 0) ? bluePlayer1Name : bluePlayer1Name + " & " + bluePlayer2Name;

    var redScore = matchResult.RedScore;
    var blueScore = matchResult.BlueScore;

    if (redScore > blueScore) {
        return redTeam + "\ngave a beating to \n" + blueTeam + "\n" + redScore + " - " + blueScore;
    } else {
        return blueTeam + "\ngave a beating to \n" + redTeam + "\n" + blueScore + " - " + redScore;
    }
}

function prettyPlayerName(playerName) {
    var space = playerName.indexOf(" ");
    if (space < 0) {
        return playerName;
    }
    return playerName.substr(0, space);
}

function onMatchResolved(event, eventData) {
    // Fix to avoid duplicate mysterious notifications
    if (!$.globals.notificationTimeout) {
        var icon = 'https://s3-eu-west-1.amazonaws.com/images.trustpilot.com/static/foosball/icon_football.png';
        var title = 'FoosBall Fight resolved';
        var body = buildNotificationText(eventData);
        if (!body) {
            return;
        }
        var notification = window.webkitNotifications.createNotification(icon, title, body);
        $.globals.notificationTimeout = setTimeout(function() {
            notification.show();
            $.globals.notificationTimeout = null;
        }, 500);
    }
}
