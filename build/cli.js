const path = require('path');
const fs = require('fs');
const config = require('./config.js');
const TEMPLATE_PATH = path.resolve(__dirname, 'templates');
process.stdin.setEncoding('utf8');

const getEntryJSContent = (fileName) => {
    let content = fs.readFileSync(TEMPLATE_PATH + '/entry.js', 'utf-8');
    if (!content) {
        return '';
    }
    return content.replace(/\$\{fileName\}/g, fileName);
};
const getEntryVueContent = (fileName) => {
    let content = fs.readFileSync(TEMPLATE_PATH + '/entry.vue', 'utf-8');
    if (!content) {
        return '';
    }
    return content.replace(/\$\{fileName\}/g, fileName);
};
const getEntryHTMLContent = (fileName) => {
    let content = fs.readFileSync(TEMPLATE_PATH + '/entry.html', 'utf-8');
    if (!content) {
        return '';
    }
    return content.replace(/\$\{fileName\}/g, fileName);
};
const getEntryJSPContent = (fileName) => {
    let content = fs.readFileSync(TEMPLATE_PATH + '/entry.jsp', 'utf-8');
    if (!content) {
        return '';
    }
    return content.replace(/\$\{fileName\}/g, fileName);
};
/**
 * 增加Entry
 */
const addEntry = (fileName) => {
    // js:   config.JS_DIR + '/entry/app.js'
    // vue:  config.JS_DIR + '/pages/app.vue'
    // html: config.SERVER_DIR + '/app.html'
    // jsp:  config.SERVER_DIR + '/app.jsp'
    let jsFile = config.JS_DIR + '/entry/' + fileName + '.js';
    let vueFile = config.JS_DIR + '/pages/' + fileName + '.vue';
    let htmlFile = config.SERVER_DIR + '/' + fileName + '.html';
    let jspFile = config.SERVER_DIR + '/' + fileName + '.jsp';
    fs.writeFile(jsFile, getEntryJSContent(fileName), (err) => {
        if (err) {
            console.log(`生成entry/${fileName}.js文件错误：`);
            console.error(err);
        } else {
            console.log('生成' + jsFile + '完成');
        }
    });
    fs.writeFile(vueFile, getEntryVueContent(fileName), (err) => {
        if (err) {
            console.log(`生成pages/${fileName}.vue文件错误：`);
            console.error(err);
        } else {
            console.log('生成' + vueFile + '完成');
        }
    });
    fs.writeFile(htmlFile, getEntryHTMLContent(fileName), (err) => {
        if (err) {
            console.log(`生成${fileName}.html文件错误：`);
            console.error(err);
        } else {
            console.log('生成' + htmlFile + '完成');
        }
    });
    fs.writeFile(jspFile, getEntryJSPContent(fileName), (err) => {
        if (err) {
            console.log(`生成${fileName}.jsp文件错误：`);
            console.error(err);
        } else {
            console.log('生成' + jspFile + '完成');
        }
    });
};

/////////////////////
// 命令
/////////////////////
const command = process.argv[2];
if (command === 'addentry') {
    console.log('输入文件名 (不要输入扩展名)：');
    const onInput = () => {
        let chunk = process.stdin.read().trim();
        if (chunk) {
            addEntry(chunk);
        } else {
            console.log('必须输入文件名！');
        }
        process.stdin.destroy();
    };
    process.stdin.on('readable', onInput);

} else {
    /////////////////
    /////// help
    /////////////////
    console.log('命令:');
    console.log('cli.js addentry  ----- 生成新js/vue/html/jsp文件');
}
