webpackJsonp([2],{10:function(t,n,e){var o=e(1)(e(32),e(65),function(t){e(76)},"data-v-a9e921f2",null);t.exports=o.exports},13:function(t,n,e){(function(t){new t({el:"#main",components:{"v-main":e(10)}})}).call(n,e(3))},32:function(e,t,o){(function(t){o(8);var n={alert:function(){this.$msg(this.name),t.ajax({url:"/api/m",dataType:"json"}).then(function(t){LOG(t)})}};e.exports={data:function(){return{name:"meepo"}},created:function(){},methods:n,computed:{},watch:{},props:[],mounted:function(){},mixins:[],beforeDestroy:function(){},components:{}}}).call(t,o(5))},4:function(t,n){t.exports=dll},45:function(t,n,e){(t.exports=e(0)()).push([t.i,"",""])},65:function(t,n){t.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"page-index"},[e("form",{staticClass:"p15",on:{submit:function(t){t.preventDefault()}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:n.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:n.name},on:{input:function(t){t.target.composing||(n.name=t.target.value)}}}),n._v(" "),e("p",{domProps:{textContent:n._s(n.name)}}),n._v(" "),e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:n.alert}},[n._v("\r\n            确定\r\n        ")])])])},staticRenderFns:[]}},76:function(t,n,e){var o=e(45);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(2)("70b7d36a",o,!0,{})}},[13]);