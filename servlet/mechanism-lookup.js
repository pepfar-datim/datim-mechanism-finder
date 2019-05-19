var fastcsv = require('fast-csv');
var http = require('http');
var sync = require('synchronize');
var url = require('url');
var fs = require('fs');
var os = require('os');

var fileCache = [];
if (os.hostname() == 'test.sync.datim.org') {
    var dir = '/home/ingest/test/archive';
} else {
    var dir = '/home/ingest/prod/archive';
}

/**
 * Adjusts for Windows-1252 characters from 8-bit ASCII read from a file.
 *
 * @param {string} s Characters read as 8-bit ASCII from a Windows file.
 * @returns {string} The string, adjusted for the differences.
 */
function windows1252(s) { // Adjust for Windows-1252 characters from 8-bit ASCII.
    for (var i = 0; i < s.length; i++) {
        var code = s.charCodeAt(i);
        if (code >= 0x80 && code <= 0x9f) {
            var c = '€_‚ƒ„…†‡ˆ‰Š‹Œ_Ž_‘’“”•–—˜™š›œ_žŸ'.substr(code - 0x80 - 1, 1);
            s = s.substr(0, i) + c + s.substr(i + 1);
        }
    }
    return s;
}

function loadFileLines(fileName) {
    var body = windows1252( fs.readFileSync(dir + '/' + fileName, {encoding: 'binary'}));
    return body.split('\r\n');
}

function refreshFileCache() {
    var files = fs.readdirSync(dir);
    var earliest = files.length > 90 ? files.length - 90 : 0; // How far back to go, 90 days max
    files = files.slice(earliest);
    if (fileCache[0] && fileCache[0].name == files[0]) {
        return; // Cache up to date
    }

    // Add one or more new entries to file cache:
    var newCache = [];
    for (var i in files) {
        newCache[i] = {};
        newCache[i].name = files[i];
        newCache[i].date = files[i].substr(26, 10);
        for (var j in fileCache) {
            if (fileCache[j].name == files[i]) {
                newCache[i].lines = fileCache[j].lines;
                break;
            }
        }
        if (!newCache[i].lines) {
            newCache[i].lines = loadFileLines(files[i]);
        }
    }
    fileCache = newCache;
}

function readCsvLine(line, callback) {
    var val;
    fastcsv.fromString(line)
        .on('data', function (data) {
            callback(null, data);
        })
    return val;
}

function readCsvLineSync(line) {
    return sync.await(readCsvLine(line, sync.defer()));
}

/**
 * Searches through the archived FACTS Info import .csv files in reverse
 * chronoligical order for a regular expression (case insensitive).
 *
 * @param {string} arg the regular expression
 * @returns {string} .csv-format string with search results
 */
function search(searchArg) {
    var results = [];
    results.push(readCsvLineSync('Date,OU,FY,Reporting Cycle,HQ ID,Legacy ID,IM,Agency,Legacy Partner Name,Legacy Partner ID,Start Date,End Date,Active,Award Number,Partner DUNS,Partner Country,Indigenous Partner,Organization Type,Legacy Partner Organization Type ID,OU Country Code,Partner Name')); // Header line.
    if (searchArg) {
        refreshFileCache();
        var lineCount = 0;
        var reg = new RegExp(searchArg, 'i'); // Case-insensitive regular expression.
        for (var i = fileCache.length-1; i >= 0; i--) {
            var cache = fileCache[i];
            for (var j = 0; j < cache.lines.length; j++) {
                if ( reg.test(cache.lines[j]) ) {
                    results.push(readCsvLineSync(cache.date + ',' + cache.lines[j]));
                    if (++lineCount == 90) {
                        return results; // Limit output to 90 lines.
                    }
                }
            }
        }
    }
    return results;
}

/**
 * Creates a web server; listens for and processes search requests.
 */
refreshFileCache();
http.createServer(function (req, res) {
    sync.fiber(function() {
        searchArg = url.parse(req.url, true).query.search;
        if (searchArg) {
            res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify(search(searchArg)));
        } else {
            res.writeHead(404);
            res.end();
        }
    });
}).listen(1777, '0.0.0.0'); // Listen on any IP address
console.log('\nServer running at http://0.0.0.0:1777/');
