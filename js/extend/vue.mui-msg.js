import Vue from 'vue';
import Main from 'comp/mui/msg.vue';
let MsgConstructor = Vue.extend(Main);

// let instances = [];
const convertOptions = (options) => {
    if (!options) {
        return {};
    }
    if (typeof options === 'string') {
        return {text: options};
    } else if (typeof options === 'number') {
        return {text: options + ''}
    }
    return options;
};
let Msg = function (options) {
    options = convertOptions(options);
    let instance = new MsgConstructor({
        data: options
    });

    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    return instance.vm;
};

['success', 'warning', 'info', 'error'].forEach(type => {
    Msg[type] = function (options) {
        options = convertOptions(options);
        options.type = type;
        return Msg(options);
    };
});

export default Msg;