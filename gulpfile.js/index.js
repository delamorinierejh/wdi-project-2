/*
  Gulp Setup
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulpfile.js/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulpfile.js/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.

  When deploying, ensure that a `postinstall` script has been added to
  your package.json, e.g.

  ```json
  "postinstall": "./node_modules/bower/bin/bower install && gulp deploy"
  ```

  This setup expects that there is a bower.json file with at least ONE package
  installed. This will created a bower_components directory after
  the postinstall script has run.

  When deploying, this setup expects that the NODE_ENV is set to `production`.
  Also that the NPM_CONFIG_PRODUCTION is set to `false`.
  You can do this by running:

  ```bash
  $ heroku config:set NODE_ENV=production
  $ heroku config:set NPM_CONFIG_PRODUCTION=false
  ```
*/

const requireDir = require('require-dir');

// Require lib directory
requireDir('./lib', { recurse: true });

// Require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./tasks', { recurse: true });
