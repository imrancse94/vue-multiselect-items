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

  data() {
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
    filteredList() {
      return this.data.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }

  },
  methods: {
    updateInput(evt) {
      var value = evt.target.value;

      if (evt.target.checked) {
        this.addValue(value);
      } else {
        this.removeValue(value);
      }

      this.$emit("input", this.checkedFilters);
    },

    selectAll: function () {
      this.checkedFilters = [];

      if (this.selectAllText == "Select All") {
        this.data.filter(item => {
          this.checkedFilters.push(item.id);
        });
      }

      this.selectAllText = this.selectAllText == "Select All" ? "Clear All" : "Select All";
    },
    showDropdown: function () {
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

    close(e) {
      if (!this.$refs.multi_select_area.contains(e.target)) {
        this.dropdown = false;
        this.activeTrigger = false;
        this.showdropdown = "";
      }
    },

    removeValue(value) {
      this.checkedFilters.splice(this.checkedFilters.indexOf(value), 1);
    },

    addValue(value) {
      this.checkedFilters.push(value);
    }

  },

  mounted() {
    this.checkedFilters = this.value;
    document.addEventListener("click", this.close);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.close);
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var this$1$1 = this;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "multi_select_area"
  }, [_c('label', {
    attrs: {
      "for": ""
    }
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('div', {
    staticClass: "checkbox-select"
  }, [_c('div', {
    staticClass: "checkbox-select__trigger form-control",
    class: {
      isActive: _vm.activeTrigger,
      'is-invalid': _vm.errors
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.showDropdown.apply(null, arguments);
      }
    }
  }, [_c('span', {
    staticClass: "checkbox-select__title"
  }, [_vm._v(_vm._s(_vm.checkedFilters.length > 0 && Object.values(this.data).some(function (item) {
    return this$1$1.checkedFilters.some(function (e) {
      return e == item.id;
    });
  }) ? _vm.checkedFilters.length + " Selected" : _vm.title))]), _vm._v(" "), _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 129 129"
    }
  }, [_c('path', {
    attrs: {
      "d": "M121.3 34.6c-1.6-1.6-4.2-1.6-5.8 0l-51 51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l53.9 53.9c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2.1-5.8z"
    }
  })])]), _vm._v(" "), _vm.errors ? _c('ErrorValidation', {
    attrs: {
      "msg": _vm.errors
    }
  }) : _vm._e(), _vm._v(" "), Object.keys(_vm.data).length === 0 ? _c('div', {
    staticClass: "checkbox-select__dropdown pb-0 rounded-0",
    class: {
      activeSearch: _vm.showLoader,
      showdropdown: _vm.showdropdown
    },
    attrs: {
      "id": "dropdown"
    }
  }, [_c('p', {
    staticClass: "text-center text-bold text-gray mt-2"
  }, [_vm._v("No data found")])]) : _vm._e(), _vm._v(" "), Object.keys(_vm.data).length > 0 ? _c('div', {
    staticClass: "checkbox-select__dropdown",
    class: {
      activeSearch: _vm.showLoader,
      showdropdown: _vm.showdropdown
    },
    attrs: {
      "id": "dropdown"
    }
  }, [_c('div', {
    staticClass: "checkbox-select__search-wrapp"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    attrs: {
      "type": "text",
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": _vm.search
    },
    on: {
      "focus": function ($event) {
        _vm.showLoader = false;
      },
      "blur": function ($event) {
        _vm.showLoader = false;
      },
      "input": function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.search = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "checkbox-select__col"
  }, [_c('div', {
    staticClass: "checkbox-select__select-all"
  }, [_c('label', {
    attrs: {
      "for": "selectAll"
    }
  }, [_vm._v(_vm._s(_vm.selectAllText))]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.allSelected,
      expression: "allSelected"
    }],
    attrs: {
      "type": "checkbox",
      "id": "selectAll"
    },
    domProps: {
      "checked": Array.isArray(_vm.allSelected) ? _vm._i(_vm.allSelected, null) > -1 : _vm.allSelected
    },
    on: {
      "click": _vm.selectAll,
      "change": function ($event) {
        var $$a = _vm.allSelected,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.allSelected = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.allSelected = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.allSelected = $$c;
        }
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "checkbox-select__info"
  }, [_vm._v("\n          " + _vm._s(_vm.checkedFilters.length) + " SELECTED\n        ")])]), _vm._v(" "), _c('ul', {
    staticClass: "checkbox-select__filters-wrapp",
    attrs: {
      "id": "customScroll",
      "data-simplebar-auto-hide": "false"
    }
  }, _vm._l(_vm.filteredList, function (filter, index) {
    return _c('li', {
      key: index
    }, [_c('div', {
      staticClass: "checkbox-select__check-wrapp"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.checkedFilters,
        expression: "checkedFilters"
      }],
      staticClass: "conditions-check",
      attrs: {
        "id": index,
        "type": "checkbox"
      },
      domProps: {
        "value": filter.id,
        "checked": Array.isArray(_vm.checkedFilters) ? _vm._i(_vm.checkedFilters, filter.id) > -1 : _vm.checkedFilters
      },
      on: {
        "click": _vm.updateInput,
        "change": function ($event) {
          var $$a = _vm.checkedFilters,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;

          if (Array.isArray($$a)) {
            var $$v = filter.id,
                $$i = _vm._i($$a, $$v);

            if ($$el.checked) {
              $$i < 0 && (_vm.checkedFilters = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.checkedFilters = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.checkedFilters = $$c;
          }
        }
      }
    }), _vm._v(" "), _c('label', {
      attrs: {
        "for": index
      }
    }, [_vm._v(_vm._s(filter.name))])])]);
  }), 0)]) : _vm._e()], 1)]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-7db72a05_0", {
    source: ".checkbox-select .form-control[data-v-7db72a05]{width:100%;height:calc(2.25rem + 2px);padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;box-shadow:inset 0 0 0 transparent;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.checkbox-select .showdropdown[data-v-7db72a05]{visibility:inherit;opacity:1;transform:matrix(1,0,0,1,0,0)}.checkbox-select ul[data-v-7db72a05]{margin:0;padding:0}.checkbox-select ul li[data-v-7db72a05]{list-style:none}.checkbox-select .checkbox-select__search-wrapp input[data-v-7db72a05]{border:none;padding:10px}.checkbox-select input[data-v-7db72a05],.checkbox-select textarea[data-v-7db72a05]{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0}.checkbox-select[data-v-7db72a05]{position:relative;width:100%}@media only screen and (max-width:600px){.checkbox-select[data-v-7db72a05]{margin:0 auto 0}}.checkbox-select__trigger[data-v-7db72a05]{border:1px solid #ced4da;background:#fff;position:relative;z-index:1;display:flex;align-items:center;cursor:pointer;padding:0 10px;transition:all .4s ease;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:4px 4px 4px 4px}@media only screen and (max-width:600px){.checkbox-select__trigger[data-v-7db72a05]{padding:0 15px;height:36px}}.checkbox-select__trigger.isActive[data-v-7db72a05]{border-radius:4px 4px 4px 4px;background:#f2f2f2}.checkbox-select__trigger.isActive svg[data-v-7db72a05]{transform:rotate(-180deg)}.checkbox-select__trigger[data-v-7db72a05]:hover{background:#f4f4f4}.checkbox-select__trigger svg[data-v-7db72a05]{width:15px;stroke:4px;transition:all .4s ease}@media only screen and (max-width:600px){.checkbox-select__trigger svg[data-v-7db72a05]{width:15px}}.checkbox-select__title[data-v-7db72a05]{flex:1;padding:7px;letter-spacing:1px;padding-left:0}.checkbox-select__dropdown[data-v-7db72a05]{opacity:0;visibility:hidden;background:#fff;position:absolute;left:0;right:0;box-shadow:0 12px 15px 6px rgba(0,0,0,.1);border-radius:0 0 8px 8px;overflow:hidden}.checkbox-select__dropdown[data-v-7db72a05]:after,.checkbox-select__dropdown[data-v-7db72a05]:before{position:absolute;content:\"\";top:0;display:block;height:4px;z-index:1}.checkbox-select__dropdown[data-v-7db72a05]:after{opacity:0;background:#000;left:-200px;width:200px;background-color:#2980b9;transition:opacity .3s ease;animation:load-data-v-7db72a05 1.8s linear infinite;background:linear-gradient(135deg,#8f24ed 20%,#8f24ed 20%,#8f24ed 22%,#8f24ed 25%,#107cb3 100%)}.checkbox-select__dropdown[data-v-7db72a05]:before{width:100%}.checkbox-select__dropdown.activeSearch[data-v-7db72a05]:after{opacity:1}.checkbox-select__dropdown .simplebar-scrollbar[data-v-7db72a05]{width:3px;right:1px}.checkbox-select__search-wrapp[data-v-7db72a05]{padding:10px 25px 5px}@media only screen and (max-width:600px){.checkbox-select__search-wrapp[data-v-7db72a05]{padding:10px 15px 5px}}.checkbox-select__search-wrapp input[data-v-7db72a05]{width:100%;height:36px;border:none;font-size:16px;font-family:\"Roboto Slab\",serif;background:0 0}.checkbox-select__search-wrapp[data-v-7db72a05] ::-webkit-input-placeholder{color:#b8b8b8;opacity:1}.checkbox-select__search-wrapp[data-v-7db72a05] ::-moz-placeholder{color:#b8b8b8;opacity:1}.checkbox-select__search-wrapp[data-v-7db72a05] :-ms-input-placeholder{color:#b8b8b8;opacity:1}.checkbox-select__search-wrapp[data-v-7db72a05] :-moz-placeholder{color:#b8b8b8;opacity:1}.checkbox-select__col[data-v-7db72a05]{display:flex;font-size:12px;padding:0 25px;justify-content:space-between;text-transform:uppercase;margin-bottom:10px}@media only screen and (max-width:600px){.checkbox-select__col[data-v-7db72a05]{padding:0 15px}}.checkbox-select__select-all label[data-v-7db72a05]{cursor:pointer}.checkbox-select__select-all input[data-v-7db72a05]{display:none}.checkbox-select__filters-wrapp[data-v-7db72a05]{margin-top:20px;height:161px;overflow-y:auto;margin-bottom:15px!important}.checkbox-select__check-wrapp[data-v-7db72a05]{position:relative;padding:0 25px;margin-bottom:5px}@media only screen and (max-width:600px){.checkbox-select__check-wrapp[data-v-7db72a05]{padding:0 15px}}.checkbox-select__check-wrapp input[type=checkbox][data-v-7db72a05]{display:none}.checkbox-select__check-wrapp input[type=checkbox]+label[data-v-7db72a05]{position:relative;cursor:pointer;font-size:16px;line-height:22px;padding-left:30px;display:inline-block;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:padding .25s ease;font-weight:400}.checkbox-select__check-wrapp input[type=checkbox]+label[data-v-7db72a05]:after{border:solid 2px #5cb85c;content:\"\";width:22px;height:22px;top:0;left:0;position:absolute}.checkbox-select__check-wrapp input[type=checkbox]+label[data-v-7db72a05]:before{width:14px;height:14px;content:\"\";position:absolute;top:4px;left:4px;background-color:#5cb85c;opacity:0;will-change:transform;transform:scale(.5);transition:all .2s ease}.checkbox-select__check-wrapp input[type=checkbox]+label[data-v-7db72a05]:hover{padding-left:32px}.checkbox-select__check-wrapp input[type=checkbox]:checked+label[data-v-7db72a05]:before{opacity:1;transform:scale(1)}@keyframes load-data-v-7db72a05{0%{left:-200px;width:20%}50%{width:40%}70%{width:60%}80%{left:50%}95%{left:120%}100%{left:100%}}.link[data-v-7db72a05]{position:absolute;left:0;bottom:0;padding:20px;z-index:9999}.link a[data-v-7db72a05]{display:flex;align-items:center;text-decoration:none;color:#fff}.link .fa[data-v-7db72a05]{font-size:28px;margin-right:8px;color:#fff}.form-control.is-invalid[data-v-7db72a05]{border-color:#dc3545}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-7db72a05";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var component = __vue_component__;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = component; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueMultiselectItems', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
