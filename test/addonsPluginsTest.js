var chai = require('chai'),
  assert = chai.assert,
  _ = require('lodash'),
  addonsPluginsModule = require('../lib/addonsPlugins');

// TODO: failing plugin configure, happy export, failing export
// ignore field in heroku API call, pass env vars to librato addon, use field to make call to librato directly
// wiki: Addon has plugins. Plugins provide extensions via configure/export functions

describe('Addon plugin', function () {
  it('should support configuration', function (done) {
    var plugins = {
      addonName: {
        extension: {
          configure: function (config, configVars) {
            return Promise.resolve(config);
          }
        }
      }
    };

    var addonsPlugins = addonsPluginsModule(plugins);
    var addons = {
      addonName: {
        plan: 'librato:development',
        extension: 'alerts_config_placeholder'
      }
    };
    addonsPlugins.configure(addons).then(function (result) {
      assert.equal(result, 'alerts_config_placeholder');
      done();
    }).catch(done);
  });

  it('should support export', function (done) {
    var plugins = {
      addonName: {
        extension: {
          export: function () {
            return Promise.resolve('some value');
          }
        }
      }
    };

    var addonsPlugins = addonsPluginsModule(plugins);

    addonsPlugins.export().then(function (result) {
      assert.deepEqual(result[0], {addonName: {extension: 'some value'}});
      done();
    }).catch(done);
  });

});