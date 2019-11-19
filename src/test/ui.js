define(['pool/util/image'], function (util) {

    util = util && util.hasOwnProperty('default') ? util['default'] : util;

    //
    // use123
    var Comp = {
        name: 'other',
        props:{
            list:{
                default:[]
            }
        },
        data:()=>{
            return {
                txt:util
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
    const __vue_script__ = Comp;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "other" }, [
        _vm._v("\n    " + _vm._s(_vm.txt) + "\n")
      ])
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-2159a724_0", { source: ".footer-setting a,\n.footer-setting img {\n  display: block;\n}\n.footer-setting-wrap {\n  margin: 15px auto 60px;\n  width: 1205px;\n  overflow: hidden;\n}\n.footer-setting-left {\n  float: left;\n}\n.footer-setting-left img {\n  width: 960px;\n  height: 130px;\n}\n.footer-setting-right {\n  float: right;\n}\n.footer-setting-right img {\n  width: 225px;\n  height: 130px;\n}\n", map: {"version":3,"sources":["other.vue"],"names":[],"mappings":"AAAA;;EAEE,cAAc;AAChB;AACA;EACE,sBAAsB;EACtB,aAAa;EACb,gBAAgB;AAClB;AACA;EACE,WAAW;AACb;AACA;EACE,YAAY;EACZ,aAAa;AACf;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;EACZ,aAAa;AACf","file":"other.vue","sourcesContent":[".footer-setting a,\n.footer-setting img {\n  display: block;\n}\n.footer-setting-wrap {\n  margin: 15px auto 60px;\n  width: 1205px;\n  overflow: hidden;\n}\n.footer-setting-left {\n  float: left;\n}\n.footer-setting-left img {\n  width: 960px;\n  height: 130px;\n}\n.footer-setting-right {\n  float: right;\n}\n.footer-setting-right img {\n  width: 225px;\n  height: 130px;\n}\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var other = normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    //
    // use123
    var Comp$1 = {
        name: 'footer-setting',
        components:{
            other
        },
        props:{
            list:{
                default:[]
            }
        },
        data:()=>{
            return {
                txt:util
            }
        },
        computed:{
            leftUrl() {
                let list = this.list;
                if(list.length && list.length>0){
                    return list[0].picUrl;
                }
            },
            leftLink(){
                let list = this.list;
                if(list.length && list.length>0){
                    return list[0].linkUrl;
                }
            },
            rightUrl(){
                let list = this.list;
                if(list.length && list.length>1){
                    return list[1].picUrl;
                }
            },
            rightLink(){
                let list = this.list;
                if(list.length && list.length>1){
                    return list[1].linkUrl;
                }
            }
        },
        filters:{
            changeUrlProtocol:function(url,protocol){
                let _url;
                if(!url) {
                    return '';
                }
                _url = url.replace(/^(http:|https:)/,protocol ? (protocol+':') : '');
                return _url;
            }
        }
    };

    /* script */
    const __vue_script__$1 = Comp$1;

    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { staticClass: "footer-setting" },
        [
          _c("other"),
          _vm._v(" "),
          _vm.list.length
            ? _c("div", { staticClass: "footer-setting-wrap" }, [
                _vm.leftUrl
                  ? _c("div", { staticClass: "footer-setting-left" }, [
                      _c(
                        "a",
                        { attrs: { href: _vm.leftLink, target: "_blank;" } },
                        [
                          _c("img", {
                            attrs: {
                              src: _vm._f("changeUrlProtocol")(_vm.leftUrl),
                              alt: "广告位"
                            }
                          })
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.rightUrl
                  ? _c("div", { staticClass: "footer-setting-right" }, [
                      _c(
                        "a",
                        { attrs: { href: _vm.rightLink, target: "_blank;" } },
                        [
                          _c("img", {
                            attrs: {
                              src: _vm._f("changeUrlProtocol")(_vm.rightUrl),
                              alt: "广告位"
                            }
                          })
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            : _vm._e()
        ],
        1
      )
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = function (inject) {
        if (!inject) return
        inject("data-v-b825fd2c_0", { source: ".footer-setting a,\n.footer-setting img {\n  display: block;\n}\n.footer-setting-wrap {\n  margin: 15px auto 60px;\n  width: 1205px;\n  overflow: hidden;\n}\n.footer-setting-left {\n  float: left;\n}\n.footer-setting-left img {\n  width: 960px;\n  height: 130px;\n}\n.footer-setting-right {\n  float: right;\n}\n.footer-setting-right img {\n  width: 225px;\n  height: 130px;\n}\n", map: {"version":3,"sources":["ui.vue"],"names":[],"mappings":"AAAA;;EAEE,cAAc;AAChB;AACA;EACE,sBAAsB;EACtB,aAAa;EACb,gBAAgB;AAClB;AACA;EACE,WAAW;AACb;AACA;EACE,YAAY;EACZ,aAAa;AACf;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;EACZ,aAAa;AACf","file":"ui.vue","sourcesContent":[".footer-setting a,\n.footer-setting img {\n  display: block;\n}\n.footer-setting-wrap {\n  margin: 15px auto 60px;\n  width: 1205px;\n  overflow: hidden;\n}\n.footer-setting-left {\n  float: left;\n}\n.footer-setting-left img {\n  width: 960px;\n  height: 130px;\n}\n.footer-setting-right {\n  float: right;\n}\n.footer-setting-right img {\n  width: 225px;\n  height: 130px;\n}\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var ui = normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        createInjector,
        undefined,
        undefined
      );

    return ui;

});
