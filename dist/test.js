webpackJsonp([0],[,,,,,function(t,n){t.exports=dll},,,,,,,,function(t,n,e){function s(t){e(55)}var i=e(1)(e(31),e(48),s,"data-v-153b89ed",null);t.exports=i.exports},,function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),new(e(3).a)({el:"#main",components:{"v-main":e(13)}})},,,,,,,,,,,function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s={};s.onCloseClick=function(){this.$emit("close")};var i={},o={},a=function(){},r=function(){},c=function(){},l=function(){return{}};n.default={data:l,created:a,methods:s,computed:i,watch:o,props:[],mounted:r,mixins:[e(9)],beforeDestroy:c,components:{}}},,,function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s={};s.onClick=function(){this.checked=!this.checked,this.$emit("input",this.checked)};var i={};i.statusClass=function(){return!0===this.checked?"checked":""};var o={};o.value=function(t){t!==this.checked&&(this.checked=t)};var a=function(){},r=function(){void 0!==this.value&&(this.checked=this.value)},c=function(){},l=function(){return{checked:!1}};n.default={data:l,created:a,methods:s,computed:i,watch:o,props:{value:{type:Boolean}},mounted:r,mixins:[],beforeDestroy:c,components:{}}},,function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=(e(3),"一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十"),i={};i.layerClose=function(){this.ss=!1},i.msg0=function(){this.$msg(s)},i.msg1=function(){this.$msg.success(s)},i.msg2=function(){this.$msg.warning(s)},i.msg3=function(){this.$msg.error(s)},i.alert=function(){this.$alert("ae一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十")},i.alert2=function(){var t=this;this.$confirm("确定删除吗？","提示",function(n){t.$msg(n)})},i.alertWarning=function(){var t=this;this.$confirm({text:"确定删除吗？",title:"提示",icon:"warning",callback:function(n){t.$msg(n)}})},i.alertInfo=function(){var t=this;this.$prompt(null,"请输入姓名",function(n){t.$msg(n)})},i.alertError=function(){var t=this.$loading();setTimeout(function(){t.remove()},1500)};var o={},a={},r=function(){},c=function(){window.Test=this},l=function(){},u=function(){return{name:+new Date,ss:!1}};n.default={data:u,created:r,methods:i,computed:o,watch:a,props:[],mounted:c,mixins:[],beforeDestroy:l,components:{"v-switch":e(45),"mui-layer":e(42)}}},,function(t,n,e){n=t.exports=e(0)(),n.push([t.i,".mui-msg-content[data-v-1445d2a7]{border-radius:4px;background-color:#fff;text-align:left}.mui-layer-header[data-v-1445d2a7]{font-size:18px;padding:15px 20px 10px;min-height:36px}.mui-layer-header .vx-close-btn[data-v-1445d2a7]{color:#777;position:absolute;top:9px;right:12px;padding:8px}.mui-layer-header .vx-close-btn i.fa[data-v-1445d2a7]{font-size:24px}.mui-layer-content[data-v-1445d2a7]{padding:15px 20px 20px}",""])},function(t,n,e){n=t.exports=e(0)(),n.push([t.i,"",""])},,function(t,n,e){n=t.exports=e(0)(),n.push([t.i,".mui-switch[data-v-67d5c302]{margin:0;display:inline-block;position:relative;width:40px;height:20px;border:1px solid;outline:none;border-radius:10px;box-sizing:border-box;cursor:pointer;transition:border-color .3s,background-color .3s;vertical-align:middle;border-color:#dcdfe6;background-color:#dcdfe6}.mui-switch.checked[data-v-67d5c302]{border-color:#13ce66;background-color:#13ce66}.mui-switch.checked>span[data-v-67d5c302]{left:21px}.mui-switch>span[data-v-67d5c302]{position:absolute;top:1px;left:1px;border-radius:100%;width:16px;height:16px;background-color:#fff;transition:all .3s}",""])},,,,,,function(t,n,e){function s(t){e(54)}var i=e(1)(e(26),e(47),s,"data-v-1445d2a7",null);t.exports=i.exports},,,function(t,n,e){function s(t){e(57)}var i=e(1)(e(29),e(50),s,"data-v-67d5c302",null);t.exports=i.exports},,function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"mui-msg"},[e("div",{staticClass:"mui-msg-content"},[e("div",{staticClass:"mui-layer-header"},[t._t("header"),t._v(" "),e("a",{staticClass:"vx-close-btn",attrs:{href:"javascript:;"},on:{click:t.onCloseClick}},[e("i",{staticClass:"fa fa-times"})])],2),t._v(" "),e("div",{staticClass:"mui-layer-content"},[t._t("default")],2)])])},staticRenderFns:[]}},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"page-test"},[e("form",{staticClass:"p15",on:{submit:function(t){t.preventDefault()}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(n){n.target.composing||(t.name=n.target.value)}}}),t._v(" "),e("p",{domProps:{textContent:t._s(t.name)}}),t._v(" "),e("div",[e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.msg0}},[t._v("\r\n\t\t\t\tmsg 0\r\n\t\t\t")]),t._v(" "),e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.msg1}},[t._v("\r\n\t\t\t\tmsg 1\r\n\t\t\t")]),t._v(" "),e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.msg2}},[t._v("\r\n\t\t\t\tmsg 2\r\n\t\t\t")]),t._v(" "),e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.msg3}},[t._v("\r\n\t\t\t\tmsg 3\r\n\t\t\t")])]),t._v(" "),e("div",{staticClass:"mt20"},[e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.alert}},[t._v("\r\n\t\t\t\tMUI-Alert\r\n\t\t\t")]),t._v(" "),e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.alert2}},[t._v("\r\n\t\t\t\tMUI-Confirm\r\n\t\t\t")]),t._v(" "),e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.alertWarning}},[t._v("\r\n\t\t\t\tMUI-Warning\r\n\t\t\t")]),t._v(" "),e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.alertInfo}},[t._v("\r\n\t\t\t\tMUI-Info\r\n\t\t\t")]),t._v(" "),e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.alertError}},[t._v("\r\n\t\t\t\tMUI-Error\r\n\t\t\t")]),t._v(" "),e("v-switch",{model:{value:t.ss,callback:function(n){t.ss=n},expression:"ss"}})],1)]),t._v(" "),t.ss?e("mui-layer",{on:{close:t.layerClose}},[e("div",{slot:"header"},[t._v("哈哈哈")]),t._v(" "),e("div",{staticStyle:{"min-width":"400px"}},[e("div",{staticClass:"m-row-mid"},[e("label",{attrs:{for:""}},[t._v("姓名：")]),t._v(" "),e("div",[e("input",{staticClass:"form-control",attrs:{type:"text"}})])]),t._v(" "),e("div",{staticClass:"mt15 text-right"},[e("button",{staticClass:"btn btn-primary",on:{click:t.layerClose}},[t._v("确定")])])])]):t._e()],1)},staticRenderFns:[]}},,function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("span",{staticClass:"mui-switch",class:[t.statusClass],on:{click:t.onClick}},[e("span")])},staticRenderFns:[]}},,,,function(t,n,e){var s=e(33);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(2)("1c4888c4",s,!0)},function(t,n,e){var s=e(34);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(2)("b0541b4c",s,!0)},,function(t,n,e){var s=e(36);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(2)("7bbf163f",s,!0)}],[15]);
//# sourceMappingURL=test.js.map