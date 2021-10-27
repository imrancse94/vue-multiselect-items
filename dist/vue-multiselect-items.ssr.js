'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    title: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    data: {
      default: {},
      required: true
    },
    value: {
      required: true
    },
    label: {
      type: String,
      required: true
    },
    errors: {
      type: String
    }
  },
  data: function data() {
    return {
      search: "",
      checkedFilters: [],
      allSelected: false,
      selectAllText: "Select All",
      activeTrigger: false,
      dropdown: false,
      showLoader: false,
      showdropdown: ""
    };
  },
  computed: {
    filteredList: function filteredList() {
      var _this = this;

      return this.data.filter(function (item) {
        return item.name.toLowerCase().includes(_this.search.toLowerCase());
      });
    }
  },
  methods: {
    updateInput: function updateInput(evt) {
      var value = evt.target.value;

      if (evt.target.checked) {
        this.addValue(value);
      } else {
        this.removeValue(value);
      }

      this.$emit("input", this.checkedFilters);
    },
    selectAll: function selectAll() {
      var _this2 = this;

      this.checkedFilters = [];

      if (this.selectAllText == "Select All") {
        this.data.filter(function (item) {
          _this2.checkedFilters.push(item.id);
        });
      }

      this.selectAllText = this.selectAllText == "Select All" ? "Clear All" : "Select All";
    },
    showDropdown: function showDropdown() {
      if (this.dropdown == false) {
        this.dropdown = true;
        this.activeTrigger = true;
        this.showdropdown = "showdropdown";
      } else {
        this.dropdown = false;
        this.activeTrigger = false;
        this.showdropdown = "";
      }
    },
    close: function close(e) {
      if (!this.$refs.multi_select_area.contains(e.target)) {
        this.dropdown = false;
        this.activeTrigger = false;
        this.showdropdown = "";
      }
    },
    removeValue: function removeValue(value) {
      this.checkedFilters.splice(this.checkedFilters.indexOf(value), 1);
    },
    addValue: function addValue(value) {
      this.checkedFilters.push(value);
    }
  },
  mounted: function mounted() {
    this.checkedFilters = this.value;
    document.addEventListener("click", this.close);
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener("click", this.close);
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var this$1$1 = this;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "multi_select_area"
  }, [_vm._ssrNode("<label for data-v-126c1407>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label> <div class=\"checkbox-select\" data-v-126c1407><div" + _vm._ssrClass("checkbox-select__trigger form-control", {
    isActive: _vm.activeTrigger,
    'is-invalid': _vm.errors
  }) + " data-v-126c1407><span class=\"checkbox-select__title\" data-v-126c1407>" + _vm._ssrEscape(_vm._s(_vm.checkedFilters.length > 0 && Object.values(this.data).some(function (item) {
    return this$1$1.checkedFilters.some(function (e) {
      return e == item.id;
    });
  }) ? _vm.checkedFilters.length + " Selected" : _vm.title)) + "</span> <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 129 129\" data-v-126c1407><path d=\"M121.3 34.6c-1.6-1.6-4.2-1.6-5.8 0l-51 51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l53.9 53.9c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2.1-5.8z\" data-v-126c1407></path></svg></div> " + (_vm.errors ? "<div class=\"invalid-feedback\" data-v-126c1407>" + _vm._ssrEscape("\n      " + _vm._s(_vm.errors) + "\n    ") + "</div>" : "<!---->") + " " + (Object.keys(_vm.data).length === 0 ? "<div id=\"dropdown\"" + _vm._ssrClass("checkbox-select__dropdown pb-0 rounded-0", {
    activeSearch: _vm.showLoader,
    showdropdown: _vm.showdropdown
  }) + " data-v-126c1407><p class=\"text-center text-bold text-gray mt-2\" data-v-126c1407>No data found</p></div>" : "<!---->") + " " + (Object.keys(_vm.data).length > 0 ? "<div id=\"dropdown\"" + _vm._ssrClass("checkbox-select__dropdown", {
    activeSearch: _vm.showLoader,
    showdropdown: _vm.showdropdown
  }) + " data-v-126c1407><div class=\"checkbox-select__search-wrapp\" data-v-126c1407><input type=\"text\"" + _vm._ssrAttr("placeholder", _vm.placeholder) + _vm._ssrAttr("value", _vm.search) + " data-v-126c1407></div> <div class=\"checkbox-select__col\" data-v-126c1407><div class=\"checkbox-select__select-all\" data-v-126c1407><label for=\"selectAll\" data-v-126c1407>" + _vm._ssrEscape(_vm._s(_vm.selectAllText)) + "</label> <input type=\"checkbox\" id=\"selectAll\"" + _vm._ssrAttr("checked", Array.isArray(_vm.allSelected) ? _vm._i(_vm.allSelected, null) > -1 : _vm.allSelected) + " data-v-126c1407></div> <div class=\"checkbox-select__info\" data-v-126c1407>" + _vm._ssrEscape("\n          " + _vm._s(_vm.checkedFilters.length) + " SELECTED\n        ") + "</div></div> <ul id=\"customScroll\" data-simplebar-auto-hide=\"false\" class=\"checkbox-select__filters-wrapp\" data-v-126c1407>" + _vm._ssrList(_vm.filteredList, function (filter, index) {
    return "<li data-v-126c1407><div class=\"checkbox-select__check-wrapp\" data-v-126c1407><input" + _vm._ssrAttr("id", index) + " type=\"checkbox\"" + _vm._ssrAttr("value", filter.id) + _vm._ssrAttr("checked", Array.isArray(_vm.checkedFilters) ? _vm._i(_vm.checkedFilters, filter.id) > -1 : _vm.checkedFilters) + " class=\"conditions-check\" data-v-126c1407> <label" + _vm._ssrAttr("for", index) + " data-v-126c1407>" + _vm._ssrEscape(_vm._s(filter.name)) + "</label></div></li>";
  }) + "</ul></div>" : "<!---->") + "</div>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-126c1407_0", {
    source: ".checkbox-select .form-control[data-v-126c1407]{width:100%;height:calc(2.25rem + 2px);padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;box-shadow:inset 0 0 0 transparent;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.checkbox-select .invalid-feedback[data-v-126c1407]{display:none;width:100%;margin-top:.25rem;font-size:16px!important;color:#dc3545}.checkbox-select .is-invalid~.invalid-feedback[data-v-126c1407]{display:block}.checkbox-select .showdropdown[data-v-126c1407]{visibility:inherit;opacity:1;transform:matrix(1,0,0,1,0,0)}.checkbox-select ul[data-v-126c1407]{margin:0;padding:0}.checkbox-select ul li[data-v-126c1407]{list-style:none}.checkbox-select .checkbox-select__search-wrapp input[data-v-126c1407]{border:none;padding:10px}.checkbox-select input[data-v-126c1407],.checkbox-select textarea[data-v-126c1407]{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0}.checkbox-select[data-v-126c1407]{position:relative;width:100%}@media only screen and (max-width:600px){.checkbox-select[data-v-126c1407]{margin:0 auto 0}}.checkbox-select__trigger[data-v-126c1407]{border:1px solid #ced4da;background:#fff;position:relative;z-index:1;display:flex;align-items:center;cursor:pointer;padding:0 10px;transition:all .4s ease;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:4px 4px 4px 4px}@media only screen and (max-width:600px){.checkbox-select__trigger[data-v-126c1407]{padding:0 15px;height:36px}}.checkbox-select__trigger.isActive[data-v-126c1407]{border-radius:4px 4px 4px 4px;background:#f2f2f2}.checkbox-select__trigger.isActive svg[data-v-126c1407]{transform:rotate(-180deg)}.checkbox-select__trigger[data-v-126c1407]:hover{background:#f4f4f4}.checkbox-select__trigger svg[data-v-126c1407]{width:15px;stroke:4px;transition:all .4s ease}@media only screen and (max-width:600px){.checkbox-select__trigger svg[data-v-126c1407]{width:15px}}.checkbox-select__title[data-v-126c1407]{flex:1;padding:7px;letter-spacing:1px;padding-left:0}.checkbox-select__dropdown[data-v-126c1407]{opacity:0;visibility:hidden;background:#fff;position:absolute;left:0;right:0;box-shadow:0 12px 15px 6px rgba(0,0,0,.1);border-radius:0 0 8px 8px;overflow:hidden}.checkbox-select__dropdown[data-v-126c1407]:after,.checkbox-select__dropdown[data-v-126c1407]:before{position:absolute;content:\"\";top:0;display:block;height:4px;z-index:1}.checkbox-select__dropdown[data-v-126c1407]:after{opacity:0;background:#000;left:-200px;width:200px;background-color:#2980b9;transition:opacity .3s ease;animation:load-data-v-126c1407 1.8s linear infinite;background:linear-gradient(135deg,#8f24ed 20%,#8f24ed 20%,#8f24ed 22%,#8f24ed 25%,#107cb3 100%)}.checkbox-select__dropdown[data-v-126c1407]:before{width:100%}.checkbox-select__dropdown.activeSearch[data-v-126c1407]:after{opacity:1}.checkbox-select__dropdown .simplebar-scrollbar[data-v-126c1407]{width:3px;right:1px}.checkbox-select__search-wrapp[data-v-126c1407]{padding:10px 25px 5px}@media only screen and (max-width:600px){.checkbox-select__search-wrapp[data-v-126c1407]{padding:10px 15px 5px}}.checkbox-select__search-wrapp input[data-v-126c1407]{width:100%;height:36px;border:none;font-size:16px;font-family:\"Roboto Slab\",serif;background:0 0}.checkbox-select__search-wrapp[data-v-126c1407] ::-webkit-input-placeholder{color:#b8b8b8;opacity:1}.checkbox-select__search-wrapp[data-v-126c1407] ::-moz-placeholder{color:#b8b8b8;opacity:1}.checkbox-select__search-wrapp[data-v-126c1407] :-ms-input-placeholder{color:#b8b8b8;opacity:1}.checkbox-select__search-wrapp[data-v-126c1407] :-moz-placeholder{color:#b8b8b8;opacity:1}.checkbox-select__col[data-v-126c1407]{display:flex;font-size:12px;padding:0 25px;justify-content:space-between;text-transform:uppercase;margin-bottom:10px}@media only screen and (max-width:600px){.checkbox-select__col[data-v-126c1407]{padding:0 15px}}.checkbox-select__select-all label[data-v-126c1407]{cursor:pointer}.checkbox-select__select-all input[data-v-126c1407]{display:none}.checkbox-select__filters-wrapp[data-v-126c1407]{margin-top:20px;height:161px;overflow-y:auto;margin-bottom:15px!important}.checkbox-select__check-wrapp[data-v-126c1407]{position:relative;padding:0 25px;margin-bottom:5px}@media only screen and (max-width:600px){.checkbox-select__check-wrapp[data-v-126c1407]{padding:0 15px}}.checkbox-select__check-wrapp input[type=checkbox][data-v-126c1407]{display:none}.checkbox-select__check-wrapp input[type=checkbox]+label[data-v-126c1407]{position:relative;cursor:pointer;font-size:16px;line-height:22px;padding-left:30px;display:inline-block;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:padding .25s ease;font-weight:400}.checkbox-select__check-wrapp input[type=checkbox]+label[data-v-126c1407]:after{border:solid 2px #5cb85c;content:\"\";width:22px;height:22px;top:0;left:0;position:absolute}.checkbox-select__check-wrapp input[type=checkbox]+label[data-v-126c1407]:before{width:14px;height:14px;content:\"\";position:absolute;top:4px;left:4px;background-color:#5cb85c;opacity:0;will-change:transform;transform:scale(.5);transition:all .2s ease}.checkbox-select__check-wrapp input[type=checkbox]+label[data-v-126c1407]:hover{padding-left:32px}.checkbox-select__check-wrapp input[type=checkbox]:checked+label[data-v-126c1407]:before{opacity:1;transform:scale(1)}@keyframes load-data-v-126c1407{0%{left:-200px;width:20%}50%{width:40%}70%{width:60%}80%{left:50%}95%{left:120%}100%{left:100%}}.link[data-v-126c1407]{position:absolute;left:0;bottom:0;padding:20px;z-index:9999}.link a[data-v-126c1407]{display:flex;align-items:center;text-decoration:none;color:#fff}.link .fa[data-v-126c1407]{font-size:28px;margin-right:8px;color:#fff}.form-control.is-invalid[data-v-126c1407]{border-color:#dc3545}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-126c1407";
/* module identifier */

var __vue_module_identifier__ = "data-v-126c1407";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);

var component$1 = __vue_component__;// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = component$1; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('VueMultiselectItems', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;