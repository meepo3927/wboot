
let env = '';

try {
    let o = process.env || {};
    env = env.RUN_ENV;
} catch(e) {
    LOG('get env error.', e);
}

const LOG = function () {
    if (window.console && window.console.log) {
        var len = arguments.length;
        for (var i = 0; i < len; i++) {
            window.console.log(arguments[i]);
        }
    }
};


const tripNodes = () => {
    let list = document.querySelectorAll('[only-prod]');
    for (let i = 0; i < list.length; i++) {
        let node = list[i];
        (node.parentNode || node.parentElement).removeChild(node);
    }
};

const processEnv = function () {
    if (env !== 'production') {
        tripNodes();
    }
};

exports.env = env;
exports.LOG = LOG;
exports.processEnv = processEnv;