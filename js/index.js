var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "ESL_SC2", "OgamingSC2", "sheevergaming", "cretetion"];

function getInfo() {
  streamers.forEach(function(streamer) {
    function createURL(type, name) {
      return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?';
    };
    $.getJSON(createURL("streams", streamer), function(data) {
      var game, status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      $.getJSON(createURL("channels", streamer), function(data) {
        var logo = data.logo != null ? data.logo : "http://crashthebot.net/freecodecamp/twitch/img/honnold.jpg",
            name = data.display_name != null ? data.display_name : streamer,
            description = status === "online" ? ': ' + data.status : "",
            url = data.url;
            var template = $("#userInfo").html();
            var templateScript = Handlebars.compile(template);
            var context = { name: name,
                            logo: logo,
                            game: game,
                            status: status,
                            url: url
                            };
            var html = templateScript(context);
            status === "online" ? $(".mainContent").prepend(html) : $(".mainContent").append(html);
      });
    });
  });
};

$(document).ready(function() {
  getInfo();
});
