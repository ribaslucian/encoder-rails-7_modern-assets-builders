// header
const chokidar = require("chokidar");
const http = require("http");
const execSync = require("child_process").execSync;
const { build } = require("esbuild");
const execAsync = require('node-async-exec');
const configs = {
    'esbuild': {
        'entryFile': 'app/assets/javascripts/application.jsx',
        'outFile': 'app/assets/dist/application.js',
    },
    'sass': {
        'entryFile': 'app/assets/stylesheets/application.scss',
        'outFile': 'app/assets/dist/application-sass.css',
    },
    'tail': {
        'entryFile': 'app/assets/stylesheets/tailwind.css',
        'outFile': 'app/assets/dist/application-tailwind.css',
    }
};


// Building all when server is initialize
l('start-server> all:builds');
buildStyleSass();
buildJsEsbuild();
// buildStyleTail();

// Listening to files for building on events.
(async () => {
    chokidar.watch([
        "app/assets/stylesheets/**/*.{scss}",
        "app/assets/javascripts/**/*.{js,jsx}",
        // "app/views/**/*.{html,erb}",
    ], {
        interval: 0,
        ignoreInitial: true
    }).on("all", (event, fileRelativePath) => {
        var extension = getExtensionByFileName(fileRelativePath);

        // // building tailwind styles as 'build:styles:tail'.
        // if (fileRelativePath.includes('tail')) {
        //     // buildStyleTail();
        //     sleep(500);
        //     refreshClients();
        // }

        // building other styles as 'build:styles:sass'.
        // else
        if (extension == 'scss') {
            buildStyleSass();
            refreshClients();
        }

        // building JS as 'build:js:esbuild'.
        else if (['js', 'jsx'].includes(extension)) {
            buildJsEsbuild();
            refreshClients();
        }

        // building JS as 'build:js:esbuild'.
        // else if (['erb', 'html'].includes(extension)) {
        //     buildStyleTail();
        //     refreshClients();
        // }
    });
})();



/**
 * FUNCTIONS
 */


/**
 * Create a serve to notify refresh.
 */
clients = [];
http.createServer((req, res) => {
    return clients.push(
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
            Connection: "keep-alive",
        }),
    );
}).listen(8082);


/**
 * Get de extension on file name.
 * @param {string} fileName 
 * @returns {string}
 */
function getExtensionByFileName(fileName) {
    fileName = (fileName + '').split('.');
    return fileName[Object.keys(fileName).length - 1];
}


/**
 * Console log.
 * @param {string} str 
 */
function l(str) {
    console.log(str);
}

/**
 * Sleep function.
 * 
 * @param {double} ms 
 * @returns 
 */
function sleep(ms) {
    const now = Date.now();
    const limit = now + ms;
    let execute = true;
    while (execute) {
        if (limit < Date.now()) {
            execute = false;
        }
    }
    return;
}


/**
 * Notify clients to refresh pages.
 */
function refreshClients() {
    // l('<refresh:clients>')
    clients.forEach((res) => res.write('data: update\n\n'))
    clients.length = 0
}



/**
 * Build App JS by ESBuild.
 */
async function buildJsEsbuild() {
    l('build:js:esbuild> start')

    const builder = await build({
        bundle: true,
        entryPoints: [configs.esbuild.entryFile],
        incremental: true,
        minify: true,
        outfile: configs.esbuild.outFile,
        banner: {
            js: "(() => new EventSource('http://localhost:8082').onmessage = () => location.reload())();",
        },
    })

    l('build:js:esbuild> end')
}


/**
 * Build App Style by Node SASS.
 */
function buildStyleSass() {
    l('build:style:sass> start')
    execSync(`npx sass ${configs.sass.entryFile} ${configs.sass.outFile} --load-path node_modules/ --style compressed`);
    l('build:style:sass> end')
}


/**
 * Build App Style by TailWind CSS.
 */
function buildStyleTail() {
    l('build:style:tail> start')
    execAsync({ cmd: `npx tailwindcss -i ${configs.tail.entryFile} -o ${configs.tail.outFile} --minify --watch` });

    l('build:style:tail> end')
}