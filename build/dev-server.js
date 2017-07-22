require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// ================================================================================================
var appDate = require('../data.json');
var ywList = appDate.ywList;
var topoList = appDate.topoList;
var links = appDate.links;
var nodes = appDate.nodes;
var staLinks = appDate.statistics.links;

var apiRoutes = express.Router();

apiRoutes.get('/ywList', function (req, res) {
	res.json({
		result: ywList
	});
});

apiRoutes.get('/topoList', function (req, res) {
	res.json({
		result: topoList
	});
});

apiRoutes.get('/links', function (req, res) {
	res.json({
		result: links
	});
});

apiRoutes.get('/nodes', function (req, res) {
	res.json({
		result: nodes
	});
});

apiRoutes.get('/node/:id', function (req, res) {
	var id = req.params.id;
	var item = {};
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].id === id) {
			item = nodes[i];
		}
	}
	res.json({
		result: item
	});
});

apiRoutes.get('/link/:id', function (req, res) {
	var id = req.params.id;
	var link = {};
	for (var i = 0; i < links.length; i++) {
		if (links[i].value === id) {
			link = links[i];
		}
	}
	res.json({
		result: link
	});
});

apiRoutes.get('/statistics/links/:num', function (req, res) {
	var num = req.params.num;
	var size = 15;
	var total = staLinks.length;
	var pageTotal = Math.ceil(total / size);
	var links = [];
	for (var i = 0; i < size; i++) {
		links.push(staLinks[(num - 1) * size + i]);
	}
	res.json({
		result: {
			currentPageNum: num,
			count: total,
			totalPageNum: pageTotal,
			links: links
		}
	});
});

app.use('/api', apiRoutes);
// ================================================================================================

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
