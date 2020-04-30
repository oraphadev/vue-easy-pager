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
  name: 'VueEasyPager',
  props: {
    /**
     * Current page number
     * @default 1
     * @type {Number}
     */
    currentPage: {
      type: Number,
      default: 1
    },

    /**
     * Total number of pages
     * @default 1
     * @type {Number}
     */
    totalPages: {
      type: Number,
      default: 1
    },

    /**
     * Maximum number of pages displayed
     * @default 6
     * @type {Number}
     */
    maxPagesDisplayeds: {
      type: Number,
      default: 6
    }
  },

  data() {
    return {
      page: this.currentPage,
      direction: 1
    };
  },

  methods: {
    decrement() {
      if (this.page > 1) this.page--;
    },

    increment() {
      if (this.page < this.totalPages) this.page++;
    },

    setPage(page) {
      this.page = page;
    }

  },
  computed: {
    paginationsDisplayed() {
      if (this.totalPages <= this.maxPagesDisplayeds) {
        return this.totalPages;
      } else {
        let to = this.page + Math.ceil(this.maxPagesDisplayeds / 2) - this.direction;

        if (to <= this.maxPagesDisplayeds) {
          to = this.maxPagesDisplayeds;
        } else if (to > this.totalPages) {
          to = this.totalPages;
        }

        let from = to - this.maxPagesDisplayeds + 1;
        return Array(to - from + 1).fill().map((item, index) => from + index);
      }
    }

  },
  watch: {
    page(to, from) {
      this.direction = to > from ? 1 : 0;
      this.$emit('changePage', to);
    }

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
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue__easy__pager"
  }, [_c('div', {
    staticClass: "control__page",
    on: {
      "click": function ($event) {
        return _vm.decrement();
      }
    }
  }, [_vm._v("\n    ‹\n  ")]), _vm._v(" "), _vm._l(_vm.paginationsDisplayed, function (pagination) {
    return _c('div', {
      key: pagination,
      staticClass: "page__item__container"
    }, [_c('div', {
      class: {
        'page__item': true,
        'active': pagination == _vm.page
      },
      on: {
        "click": function ($event) {
          return _vm.setPage(pagination);
        }
      }
    }, [_vm._v("\n      " + _vm._s(pagination) + "\n    ")])]);
  }), _vm._v(" "), _c('div', {
    staticClass: "control__page",
    on: {
      "click": function ($event) {
        return _vm.increment();
      }
    }
  }, [_vm._v("\n    ›\n  ")])], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-b8730324_0", {
    source: "*[data-v-b8730324]{box-sizing:border-box;user-select:none;-webkit-user-select:none;font-family:Arial,Helvetica,sans-serif}.vue__easy__pager[data-v-b8730324]{height:40px}.control__page[data-v-b8730324],.page__item[data-v-b8730324],.vue__easy__pager[data-v-b8730324]{display:flex;align-items:center}.control__page[data-v-b8730324],.page__item[data-v-b8730324]{justify-content:center;flex-wrap:nowrap;white-space:nowrap;cursor:pointer}.control__page[data-v-b8730324]{height:20px;min-width:20px;border-radius:20px;padding-bottom:3px;background:#efefef;color:#666;font-size:1.5rem;transition:all .2s}.control__page[data-v-b8730324]:hover{background:#dfdfdf;color:#333}.control__page[data-v-b8730324]:first-child{margin-right:5px}.control__page[data-v-b8730324]:last-child{margin-left:5px}.page__item[data-v-b8730324]{height:30px;min-width:30px;margin:0 2px;border-radius:4px;transition:all .2s ease-in-out;color:#444}.page__item[data-v-b8730324]:hover{background:#efefef}.page__item.active[data-v-b8730324]{background:#328af1;box-shadow:#d7e8fd 0 4px 10px 1px;color:#fff;height:32px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-b8730324";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueEasyPager(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueEasyPager', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
