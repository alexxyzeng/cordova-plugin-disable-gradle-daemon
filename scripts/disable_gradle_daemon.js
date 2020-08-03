var android_script = require('./disable_gradle_daemon_android');

module.exports = function (context) {
  var Q = context.require('q');
  var platforms = context.require('cordova-lib/src/cordova/util').listPlatforms(context.opts.projectRoot);
  var ConfigParser = context.require('cordova-common').ConfigParser;
  var cfg = new ConfigParser('config.xml');
  var enableDaemon = false;

  var promises = [];

  if (platforms.indexOf('android') >= 0) {
    var plugin = cfg.getPlugin(context.opts.plugin.id);
    if (plugin) {
      if (plugin.variables) {
        enableDaemon = plugin.variables["ENABLE_DAEMON"] === 'true';
      }
    }
    promises.push(android_script(context, enableDaemon));
  }

  return Q.all(promises);
};
