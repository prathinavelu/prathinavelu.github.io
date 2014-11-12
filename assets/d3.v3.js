!function() {
    var d3 = {
	version: "3.4.13"
    };
    if (!Date.now) Date.now = function() {
	    return +new Date();
	};
    var d3_arraySlice = [].slice, d3_array = function(list) {
	return d3_arraySlice.call(list);
    };
    var d3_document = document, d3_documentElement = d3_document.documentElement, d3_window = window;
    try {
	d3_array(d3_documentElement.childNodes)[0].nodeType;
    } catch (e) {
	d3_array = function(list) {
	    var i = list.length, array = new Array(i);
	    while (i--) array[i] = list[i];
	    return array;
	};
    }
    try {
	d3_document.createElement("div").style.setProperty("opacity", 0, "");
    } catch (error) {
	var d3_element_prototype = d3_window.Element.prototype, d3_element_setAttribute = d3_element_prototype.setAttribute, d3_element_setAttributeNS = d3_element_prototype.setAttributeNS, d3_style_prototype = d3_window.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
	d3_element_prototype.setAttribute = function(name, value) {
	    d3_element_setAttribute.call(this, name, value + "");
	};
	d3_element_prototype.setAttributeNS = function(space, local, value) {
	    d3_element_setAttributeNS.call(this, space, local, value + "");
	};
	d3_style_prototype.setProperty = function(name, value, priority) {
	    d3_style_setProperty.call(this, name, value + "", priority);
	};
    }
    d3.ascending = d3_ascending;
    function d3_ascending(a, b) {
	return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }
    d3.descending = function(a, b) {
	return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
    };
    d3.min = function(array, f) {
	var i = -1, n = array.length, a, b;
	if (arguments.length === 1) {
	    while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
	    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
	} else {
	    while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
	    while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
	}
	return a;
    };
    d3.max = function(array, f) {
	var i = -1, n = array.length, a, b;
	if (arguments.length === 1) {
	    while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
	    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
	} else {
	    while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
	    while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
	}
	return a;
    };
    d3.extent = function(array, f) {
	var i = -1, n = array.length, a, b, c;
	if (arguments.length === 1) {
	    while (++i < n && !((a = c = array[i]) != null && a <= a)) a = c = undefined;
	    while (++i < n) if ((b = array[i]) != null) {
		    if (a > b) a = b;
		    if (c < b) c = b;
		}
	} else {
	    while (++i < n && !((a = c = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
	    while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
		    if (a > b) a = b;
		    if (c < b) c = b;
		}
	}
	return [ a, c ];
    };
    function d3_number(x) {
	return x === null ? NaN : +x;
    }
    function d3_numeric(x) {
	return !isNaN(x);
    }
    d3.sum = function(array, f) {
	var s = 0, n = array.length, a, i = -1;
	if (arguments.length === 1) {
	    while (++i < n) if (d3_numeric(a = +array[i])) s += a;
	} else {
	    while (++i < n) if (d3_numeric(a = +f.call(array, array[i], i))) s += a;
	}
	return s;
    };
    d3.mean = function(array, f) {
	var s = 0, n = array.length, a, i = -1, j = n;
	if (arguments.length === 1) {
	    while (++i < n) if (d3_numeric(a = d3_number(array[i]))) s += a; else --j;
	} else {
	    while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) s += a; else --j;
	}
	return j ? s / j : undefined;
    };
    d3.quantile = function(values, p) {
	var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
	return e ? v + e * (values[h] - v) : v;
    };
    d3.median = function(array, f) {
	var numbers = [], n = array.length, a, i = -1;
	if (arguments.length === 1) {
	    while (++i < n) if (d3_numeric(a = d3_number(array[i]))) numbers.push(a);
	} else {
	    while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) numbers.push(a);
	}
	return numbers.length ? d3.quantile(numbers.sort(d3_ascending), .5) : undefined;
    };
    function d3_bisector(compare) {
	return {
	    left: function(a, x, lo, hi) {
		if (arguments.length < 3) lo = 0;
		if (arguments.length < 4) hi = a.length;
		while (lo < hi) {
		    var mid = lo + hi >>> 1;
		    if (compare(a[mid], x) < 0) lo = mid + 1; else hi = mid;
		}
		return lo;
	    },
		right: function(a, x, lo, hi) {
		if (arguments.length < 3) lo = 0;
		if (arguments.length < 4) hi = a.length;
		while (lo < hi) {
		    var mid = lo + hi >>> 1;
		    if (compare(a[mid], x) > 0) hi = mid; else lo = mid + 1;
		}
		return lo;
	    }
	};
    }
    var d3_bisect = d3_bisector(d3_ascending);
    d3.bisectLeft = d3_bisect.left;
    d3.bisect = d3.bisectRight = d3_bisect.right;
    d3.bisector = function(f) {
	return d3_bisector(f.length === 1 ? function(d, x) {
		return d3_ascending(f(d), x);
	    } : f);
    };
    d3.shuffle = function(array) {
	var m = array.length, t, i;
	while (m) {
	    i = Math.random() * m-- | 0;
	    t = array[m], array[m] = array[i], array[i] = t;
	}
	return array;
    };
    d3.permute = functionn, zip = zips[i] = new Array(n); ++j < n; ) {
    zip[j] = arguments[j][i];
}
}
return zips;
};
function d3_zipLength(d) {
    return d.length;
}
d3.transpose = function(matrt, stop, step) {
    if (arguments.length < 3) {
	step = 1;
	if (arguments.length < 2) {
	    stop = start;
	    start = 0;
	}
    }
    if ((stop - start) / step === Infinity) throw new Error("infinit[key]);
    return map;
  };
  function d3_Map() {
    this._ = Object.create(null);
  }
  var d3_map_proto = "__proto__", d3_map_zero = "\x00";
  d3_class(d3_Map, {
    has: d3_map_has,
    get: function(key) {
   function d3_map_unescape(key) {
    return (key += "")[0] === d3_map_zero ? key.slice(1) : key;
  }
  function d3_map_has(key) {
    return d3_map_escape(key) in this._;
  }
  function d3_map_remove(key) uesByKey.get(keyValue = key(object = array[i]))) {
          values.push(object);
        } else {
          valuesByKey.set(keyValue, [ object ]);
        }
      }
      if (mapType) {
      };
    nest.entries = function(array) {
      return entries(map(d3.map, array, 0), 0);
    };
    nest.key = function(d) {
      keys.push(d);
      return nest;
    };
    nest.sortKeys = function(order)  }
  });
  d3.behavior = {};
  d3.rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  }function d3_dispatch() {}
  d3_dispatch.prototype.on = function(type, listener) {
    var i = type.i));
        listenerByName.remove(name);
      }
      if (listener) listeners.push(listenerByName.set(name, {
        on: listener
      }));
      return dispatch;
    };
    r\+\?\|\[\]\(\)\.\{\}]/g;
  var d3_subclass = {}.__proto__ ? function(object, prototype) {
    object.__proto__ = prototype;
  } : function(object, prototype) {
    for (var property in prototype) object[property] ionPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, group, node;
    selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgrar group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
       : name;
    }
  };
  d3_selectionPrototype.attr = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.te(name, x);
    }
    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
    }
    return value == nume) this.each(d3_selection_classed(value, name[value]));
      return this;
    }
    return this.each(d3_selection_classed(name, value));
  };
  function d3_selection_classedRe(name) {
    return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)"de.getAttribute("class") || "";
      if (value) {
        re.lastIndex = 0;
        if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
      } else {
        node.setAttribute("class", d3_collapse(alue.apply(this, arguments);
      if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
t = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    } : value == null ? function() {
      this.textContent = "";
    }qualify(name)).local ? function() {
      return this.ownerDocument.createElementNS(name.space, name.local);
    } : function() {
      return this.ownerDocument.createElementNS(this.namespaceUgroupData) {
      var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
      if (key) {
        var nodeByKe!== true) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (i = -1; ++i < n0; ) {
          node =  i));
      }
    } else {
      while (++i < n) {
      function d3_selection_filter(selector) {
    return function() {
      return d3_selectMatches(this, selector);
    };
  }
  d3_selectionPrototype.order = function() {
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) h(this, function(node, i, j) {
      callback.call(node, node.__data__, i, j);
    });
  };
  function d3_selection_each(groups, callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
        if (node = group[i]) callback(node, ction) {
    d3_subclass(selection, d3_selection_enterPrototype);
    return selection;
  }
  var d3_selection_enterPrototype = [];
  d3.selection.enter = d3_selection_enter;
  d3.selection.enter.prototype = d3_selection_enterPrototype;
  d3_selection_enterPrototype.append = d3_selectionPrototype.append;
  d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
  d3_selection_enterPrototype.node = d3_selectionPrototype.node;
  d3_selection_enterPrototype.call = d3_searentNode, node.__data__, i, j));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  d3_selection_enterPrototype.insert = function(name, before) {
    if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
    return d3_selectionPrototype.insert.call(this, name, before);
  };
  function d3_selection_enterInsertBefore(enter) {
    var i0, j0;
    return function(j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) d3_transitionNode(node, i, id, transition);
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, id);
  };
  d3_selectionPrototype.interrupt = function() {
    return this.each(d3_selection_interrupt);
  };
  function d3_selection_interrupt() {
    var lock = this.__transition__;
    if (lock) ++loc   var n = arguments.length;
    if (n < 3) {
      if (typeof type !== "string") {
        if (n < 2) listener = false;
        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
        return this;
      }
      if (n < 2) return (n = this.node()["__on" + type]) && n._;
      capture = false;
    }
    return this.each(d3_selection_on(type, listener, capture));
  };
  function d3_selection_on(type, listener, capture) {
    var name = "__on" + type, i = ty   l._ = listener;
    }
    function removeAll() {
      var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"), match;
      for (var name in this) {
        if (match = name.match(re)) {
          var l = this[name];
          this.removeEventListener(match[1], l, l.$);
          delete this[name];
        }
      }
    }
    return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
  }
  var d3_selection_onFilters = d3.map({
    mouseenter: "mouseover",
    mouseleave: "mouseou);
    return function(e) {
	var target = this, related = e.relatedTarget;
	if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
	    l.call(target, e);
	}
    };
}
    var d3_event_dragSelect = "onselectstart" in d3_document ? null : d3_vendorSymbol(d3_documentElement.style, "userSelect"), d3_event_dragId = 0;
function d3_event_dragSuppress() {
    var name = ".dragsuppress-" + ++d3_      }
w.on(click, function() {
	d3_eventPreventDefault();
	off();
    }, true);
setTimeout(off, 0);
}
};
}
d3.mouse = function(container) {
    return d3_mousePoint(container, d3_eventSource());
};
var d3_mouse_bug44083 = /WebKit/.test(d3_window.navigator.userAgent) ? -1 : 0;
functio = e.pageY; else point.x = e.clientX, 
			    point.y = e.clientY;
point = point.matrixTransform(container.getScreenCTM().inverse());
return [ point.x, point.y ];
}
var rect = container.getBoundingClientRect();
return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
}
d3.touch = fu    function drag() {
    this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart);
}
    function dragstart(id, position, subject, move, end) {
	return function() {
	    var that = this, target = d3.event.target, parent = that.parentNode, dispatch = event.of(that, arguments), dragged = 0, dragId = id(),     dy = position1[1] - position0[1];
	    dragged |= dx | dy;
	    position0 = position1;
	    dispatch({
		    type: "drag",
			x: position1[0] + dragOffset[0],
			y: position1[1] + dragOffset[1],
			dx: dx,
			dy: dy
			});
        }
        function ended() {
	    if (!position(parent, dragId)) return;
	    dragSubject.on(move + dragName, null).on(end + dragName, null);
	    dragRestore(dragged && d3.event.target === target);
	    dispatch({
		    type: "dragend"
			})unction(container, touches) {
		if (arguments.length < 2) touches = d3_eventSource().touches;
		return touches ? d3_array(touches).map(function(touch) {
			var point = d3_mousePoint(container, touch);
			point.identifier = touch.identifier;
			return point;
		    }) : [];
	    };
	    var π = Math.PI, τ = 2 * π, halfπ = π / 2, ε = 1e-6, ε2 = ε * ε, d3_radians = π / 180, d3_degrees = 180 / π;
	    function d3_sgn(x) {
		return x > 0 ? 1 : x < 0 ? -1 : 0;
	    }
	    Math.sin(x / 2)) * x;
    }
var ρ = Math.SQRT2, ρ2 = 2, ρ4 = 4;
d3.interpolateZoom = function(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2];
    var dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + ρ4 * d2) / (2 * w0 * ρ2 * d1), b1 = (w1 * w1 - w0 * w0 - ρ4 * d2) / (2 * w1 * ρ2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(M }, translate0, center0, center, size = [ 960, 500 ], scaleExtent = d3_behavior_zoomInfinity, mousedown = "mousedown.zoom", mousemove = "mousemove.zoom", mouseup = "mouseup.zoom", mousewheelTimer, touchstart = "touchstart.zoom", touchtime, event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"), x0, x1, y0, y1;
    function zoom(g) {
	g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted);
    }
    zew.x) / view.k, (cy - view.y) / view.k, dx / view.k ], [ (cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k ]);
return function(t) {
    var l = i(t), k = dx / l[2];
    this.__chart__ = view = {
	x: cx - l[0] * k,
	y: cy - l[1] * k,
	k: k
    };
    zoomed(dispatch);
};
}).each("e rescale();
      return zoom;
    };
    zoom.scaleExtent = function(_) {
      if (!arguments.length) return scaleExtent;
      scaleExtent = _ == null ? d3_behavior_zoomInfinity : [ +_[0], +_[1] ];
      return zoom;
    };
    zoom.center = function(_) {
      if (!argumenturn [ l[0] * view.k + view.x, l[1] * view.k + view.y ];
    }
    function scaleTo(s) {
      view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
    }
    function translateTo(p, l) {
      l = point(l);
      view.x += p[0] - l[0];
      view.y += p[ = 0, subject = d3.select(d3_window).on(mousemove, moved).on(mouseup, ended), location0 = location(d3.mouse(that)), dragRestore = d3_event_dragSuppress();
      d3_selection_interrupt.call(that);
      zoomstarted(dispatch);
      function moved() {
  ;
      function relocate() = touches[1], dx = p[0] {
            delete locations0[changed[i].identifier];
          }
          for (var identifier in locations0) {
            return void relocate();
          }
        }
 ocation(p), k = Math.log(view.k) / Math.LN2;
      zoomstarted(dispatch);
      scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
      translateTo(p, l);
      zng (240 - h) / 60;
      return m1;
    }
    function vv(h) {
      return Math.round(v(h) * 255);
    }
 
    if (isNaN(c)) c = 0;
    return n(0,3_rgb, d3_hsl_rgb) : new d3_rgb(r, g, b);
  }
  function d3_rgbNumber(value)  function d3_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
  }
  function d3_rgb_parse(format, rgb, hsl) {
    var r = 0, g = 0, b = 0, (color & 16711680) >> 16;
        g = (color & 65280) >> 8;
        b = color & 255;
      }
    }
    return rgb(r, g, b);
  }
  function d3_rgb_hsl(r, g, b) {
    v (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
  }
  function d3_rgb_parseNumber(c) {
    var f = parseFloat(c);
    return c.charAt(c.length - 1n: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoi,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 167119,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandyb d3_xhrType(d3_identity);
  function d3_xhrType(response) {
    return function(url, mimeType, callback) {
      if (arg
        } catch (e) {
          dispatch.error.call(xhr, e);
          return;
        }
        dispatch.load.call(xhr, result);
      } else {
        dispatch.errrn xhr;
    };
    [ "get", "post" ].forEach(function(method) {
      xhr[method] = function() {
        return xhr.send.apply(xhr, [ method ].concat(d3_array(arguments)));
      };
    });
    xhr.send = function(method, data, callback) {
      if (arguments.length === 2 && typeot.abort();
      return xhr;
    };
    d3.rebind(xhr, dispatch, "on");
    return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
  }
  function d3_xhr_fixCallback(callback) {
    return callback.length === 1 ? function(error, request) {
      callback(error == null ? request : null);
    } : callbacif (arguments.length < 3) callback eturn dsv.parse(request.responseText);
    }
    function typedResponse(f) {
      return func          }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          ifrows);
      var fieldSet = new d3_Set(), fields = []window, "requestAnimationFrame")] || functon() {
    d3_timer_mark();
    ) g = Math.  suffix = "%";
        type = "r";
        break;

       case "b":
       case "o":
       sign === "-" ? "" : sign;
        if (scale < 0) {
          var unit = d3.formatPrefix(value, precision);
          value = unit.scal      negative += prefix;
        value = before + after;
        return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + mat_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
    }
  });
  function d3_format_typeDefault(x) {
    return x + "";
  }
  var d3_time = d3.time = {}, d3_date = Date;
  function d3_date_utc() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }
  d3_date_utc.prototype = {
    getDate: function() {
      return this._.getUTCDate();
    },
   neOffset: function() {
      return 0;
    },
    valueOf: function() {
      return this._.valueOf();
    },
    setDate: function() {
      d3_time_prototype.setUTCDate.apply(this._, arguments);
    },
    setDay: function() {
      d3_time_prototype.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function() {
      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function() {
      d3_time_prototype.setUTCHoure.prototype;
  function d3_time_interval(local, step, number) {
    function round(date) {
      var d0 = local(date), d1 = offset(d0, 1);
      return date - d0 < d1 - date ? d0 : d1;
    }
    function ceil(date) {
      step(date = local(new d3_date(date - 1)), 1);
      return date;
    }
    function offset(date, k) {
      step(date = new d3_date(+date), k);
      return date;
    }
    function range(t0, t1, dt) {
      var time = ceil(t0), til = ceil;
    local.offset = offset;
    local.range = range;
    var utc = local.utc = d3_time_interval_utc(local);
    utc.floor = utc;
    utc.round = d3_time_interval_utc(round);
    utc.ceil = d3_time_interval_utc(ceil);
    utc.offset = d3_time_interval_utc(offset);
    utc.range = range_utc;
    return local;
  }
  function d3_time_interval_utc(method) {
    return function(date, k) {
      try {
        d3_date = d3_date_utc;
        var utc = new d3_date_utc();
        utc._ = date;
        return method(utc   day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return day;
  }, function(date, offset) {
    date.setDate(date.getDate() + offset);
  }, function(date) {
    return date.getDate() - 1;
  });
  d3_time.days = d3_time.day.range;
  d3_time.days.utc = d3_time.day.utc.range;
  d3_time.dayOfYear = fy !== i);
    });
    d3_time[day + "s"] = interval.range;
    d3_time[day + "s"].utc = interval.utc.range;
    d3_time[day + "OfYear"] = function(date) {
      var day = d3_time.year(date).getDay();
      return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7);
    };
  });
  d3_time.week = d3_time.sunday;
  d3_time.weeks = d3_time.sunday.range;
  d3_time.weeks.utc = d3_, i));
            if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
            if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
            string.push(c);
            j = i + 1;
          }
        }
        string.push(template.slice(j, i));
        return string.join("");
      }
      format.parse = function(string) {
        var d = {
          y: 1900,
          m: 0,
          d: 1,
          H: 0,
          M: 0,
          S: 0,
          L: 0,
          Z: null
     Day() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
        } else date.setFullYear(d.y, d.m, d.d);
        date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);
        return localZ ? date._ : date;
      };
      format.to       var utc = new d3_date();
          utc._ = date;
          return local(utc);
        } finally {
          d3_date = Date;
        }
      }
      format.parse = function(string) {
        try {
          d3_date = d3_date_utc;
          var date = local.parse(string);
          return date && date._;
        } finally {
          d3_date = Date;
        }
      };
      format.toString = local.toString;
      return format;
    };
    d3_time_format.multi = d3_time_format.utc.multiths);
    locale_periods.forEach(function(p, i) {
      d3_time_periodLookup.set(p.toLowerCase(), i);
    });
    var d3_time_formats = {
      a: function(d) {
        return locale_shortDays[d.getDay()];
      },
      A: function(d) {
        return locale_days[d.getDay()];
      },
      b:econds(), p, 3);
      },
      m: function(d, p) {
        return d3_time_formatPad(d.getMonth() + 1, p, 2);
s = {
      a: d3_time_parseWeekdayAbbrev,
      A: d3_time_parseWeekday,
      b: d3_time_parseMonthAbbrev,
      B: d3_time_parseMonth,
      c: d3_time_parseLocaleFull,
      d: d3_time_parseDay,
      e: d3_time_parseDay,
      H: d3_time_parCase()), i + n[0].length) : -1;
    }
    function d3_time_parseWeekday(date, string, i) {
      d3_time_dayRe.lastIndex = 0;
      var n = d3_time_dayRe.exec(string.slice(i));
      return n ? (date.w = d3_time_dayLookup.get(n[0].toLowemats.x.toString(), string, i);
    }
    function d3_time_parseLocaleTime(date, string, i) {
      return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
    }
    function d3_time_parase(), i);
    return map;
  }
  function d3_time_parseWeekdayNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 1));
    return n ? (date.w = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseWeekNumberSunday(date,ate.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
  }
  function d3_time_parseZone(date, string, i) {
    return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5)) ? (date.Z = -string, 
    i + 5) : -1;
  }
  function d3_time_expandYear(d) {
    return d + (d > 68 ? 1900 : 2e3);
  }
  function d3_time_parseMonthNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.m berRe.exec(string.slice(i, i + 2));
    return n ? (date.H = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMinutes(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.M = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseSeconds(date, string, i) {
    d3_time_num   var n = d3_time_percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }
  function ctober", "November", "December" ],
       shortMonths: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",try(geometry, listener) {
	       if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
		   d3_geo_streamGeometryType[geometry.type](geometry, listener);
	       }
	   }
	   var d3_geo_streamObjectType = {
	       Feature: funcates;
	       listn(object, listener) {
		   d3_geo_streamLine(object.coordinates, listener, 0);
	       },
	       MultiLineString: function(object, listener) {
		   var coordinates = object.coordinates, i = -1, n = coordinates.length;
		   while (++i < n) d3_geo_streamLine(coordinates[i]inate[0], coordinate[1], coordinate[2]);
		   listener.lineEnd();
	       }
	       function d3_geo_streamPolygon(coordinates, listener) {
		   var i = -1, n = coordinates.length;
		   listener.polygonStart();
		   while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
		   listener.polygonEnd();
	       }
	       d3.geo.area = function(object) {
		   d3_g λ00, φ00, λ0, cosφ0, sinφ0;
		   d3_geo_area.point = function(λ, φ) {
		       d3_geo_area.point = nextPoint;
		       λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + ction d3_geo_cartesianCross(a, b) {
			       return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
			   }
			   function d3_geo_cartesianAdd(a, b) {
			       a[0] += b[0];
			       a[1] += b[1];
			       a[2] += b[2];
			   }
			   function d3_geo_cartesianScale(vector, k) {
			       bound.lineEnd = ringEnd;
			       dλSum = 0;
			       d3_geo_area.polygonStart();
			   },
			   polygonEnd: function() {
			       d3_geo_area.polygonEnd();
			       bound.point = point;
			       bound.lineStart = lineStart;
			       bound.lineEnd = lineEnd;
			       if (d3_geo_areaRingSum < 0) λ0 = -(λ1 = 180), φ0 = -(φ1 = 90); else if (dλSum= inflection[0] * d3_degrees * s, antimeridian = abs(dλ) > 180;
												       if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
													   var φi = inflection[1] * d3_degrees;
													   if (φi > φ1) φ1 = φi;
												       } else if (λi = (λi + 360) % 360 - 180, antimeridian ^     }
												       }
			   } else {
			       point(λ, φ);
			   }
			   p0 = p, λ_ = λ;
			   }
		       function lineStart() {
			   bound.point = linePoint;
		       }
		       function lineEnd() {
			   range[0] = λ0, range[1] = λ1;
			   bound.point = point;
			   p0 = null;
		       }
		       function ringPoint(λ, φ) {
			   if (p0) {
			       var dλ = λ - λ_;
			       ange[1] : x < range[0] || range[1] < x;
			   }
			   return function(feature) {
			       φ1 = λ1 = -(λ0 = φ0 = Infinity);
			       ranges = [];
			       d3.geo.stream(feature, bound);
			   };
		       }();
		       d3.geo.centroid = function(object) {
			   d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
			   d3.geo.stream(object, d3_roid = {
				   sphere: d3_noop,
				   point: d3_geo_centroidPoint,
				   lineStart: d3_geo_centroidLineStart,
				   lineEnd: d3_geo_centroidLineEnd,
				   polygonStart: function() {
				       d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
				   },
				   polygonEnd: function() {
				       d3_geo_centroid.lineStart = d3_geo_centroih.cos(λ);
				       y0 = cosφ * Math.sin(λ);
				       z0 = Math.sin(φ);
				       d3_geo_centroid.point = nextPoint;
				       d3_geo_centroidPointXYZ(x0, y0, z0);
				   };
				   function nextPoint(λ, φ) {
				       λ *= d3_radians;
				       var cosφ = Math.ta2a.r) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0os(φ *= d3_radians);
			       x0 = cosφ * Math.cos(λ);
			       y0 = cosφ * Math.sin(λ);
			       z0 = Math.sin(φ);
			       d3_geo_centroidPointXYZ(x0, y0, z0);
			       };
			   d3_geo_centroid.lineEnd = function(), y0, z0);
		   }
	       }
	       function d3_true() {
		   return true;
	       }
	       function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
		   var subject = [], clip = [];
		   segments.forEach(function(segment) {
			   if ((n = segment.length - 1) <= 0) return;
			   var n, p0 = segment[0], p1 = segment[n];
			   if (d3_geo_sphericalkCircular(clip);
			       if (!subjeip.lineStart();
				   ction rÂ1 > 0  φ0, Ã    ve(listener) {
				       clean: fun= z;
				       < tclipExten      if (po         x: x,
							     y: y
							     }
				   };
				   ] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
			       }
		       }
		       function d3_geo_compose(a,  - y;
					       return [ Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n)) ];
					       };
		       return forward;
		       }
		   (d3.geo.conicEqualArea = function() {
		       return d3_geo_conic(d3_geo_conicEqualArea);
		   }).raw = d3_geo_conicEqualArea;
		   d3.geo.albers = function() {
		       return d3.geo.conicEqualArea().rotate([ 96, 0 ]).      return point;
		   }
		   albersUsa.invert = function(coordinates) {
		       var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
		       return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x <          lower48Stream.lineEnd();
			       alaskaStream.lineEnd();
			       hawaiiStream.lineEnd();
			       },
		       polygonStart: function() {
			   lower48Stream.polygonStart();
			   alaskaStream.polygonStart();
			   hawaiiStream.polygonStart();
		       }, y = +_[1];
		       lower48Point = lower48.translate(_).clipExtent([ [ x - .455 * k, y - .238 * k ], [ x + .455 * k, y + .238 * k ] ]).stream(pointStream).point;
		       alaskaPoint = alaska.translate([ x - .307 * k, y + .201 * k ]).clipExtent([ [ x - .425 * k + ε, y + .12 * k + εpathAreaSum += abs(d3_geo_pathAreaPolygon / 2);
												     }
												   };
												 function d3_geo_pathAreaRingStart() {
												     var x00, y00, x0, y0;
												     d3_geo_pathArea.point = function(x, y) {
													 d3_geo_pathArea.point = nextPointle = d3_geo_pathBufferCircle(4.5), buffer = [];
													 var stream = {
													     point: point,
													     lineStart: function() {
														 stream.point = pointLineStart;
													     },
													     lineEnd: lineEnd,
													     polygonStart: function() {
														 stream.lineEnd = lineEndPolygon;
													     },
													     polygonEnd: function() {
														 stream.lineEnd = lineEnd;
														 stream.point = point;
													     },
													     pointRadius: function(_) {
														 pointCircle = d3_geo_pathBufferCircle(_);
														 return stream;
													     },
													     result: function() {
														 if (buffer.length) {
														     var result = buffer.join("");
														     buffer = [];
														     return result;
														 }
													     }
													 };
													 function point(x, y) {
													     buffer.push("M", x, ",", y, pointCircle);
													 }
													 function pointLineStart(x, y) {
													     buffer.push("M", x, ",", y);
													     stream.point = pointLine;
													 }
													 function pointLine(x, y) {
													     buffer.push("L", x, ",", y);
													 }
													 function lineEnd() {
													     stream.point = point;
													 }
													 function lineEndPolygon() {
													     buffer.push("Z");
													 }
													 return stream;
												     }
												     function d3_geo_pathBufferCircle(radius) {
													 return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
												     }
												     var d3_geo_pathCentroid = {
													 point: d3_geo_pathCentroidPoint,
													 lineStart: d3_geo_pathCentroidLineStart,
													 lineEnd: d3_geo_pathCentroidLineEnd,
													 polygonStart: function() {
													     d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
													 },
													 polygonEnd: function() {
													     d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
													     d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
													     d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
													 }
												     };
												     function d3_geo_pathCentroidPoint(x, y) {
													 d3_geo_centroidX0 += x;
													 d3_geo_centroidY0 += y;
													 ++d3_geo_centroidZ0;
												     }
												     function d3_geo_pathCentroidLineStart() {
													 var x0, y0;
													 d3_geo_pathCentroid.point = function(x, y) {
													     d3_geo_pathCentroid.point = nextPoint;
													     d3_geo_pathCentroidPoint(x0 = x, y0 = y);
													 };
													 function nextPoint(x, y) {
													     var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
													     d3_geo_centroidX1 += z * (x0 + x) / 2;
													     d3_geo_centroidY1 += z * (y0 + y) / 2;
													     d3_geo_centroidZ1 += z;
													     d3_geo_pathCentroidPoint(x0 = x, y0 = y);
													 }
												     }
												     function d3_geo_pathCentroidLineEnd() {
													 d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
												     }
												     function d3_geo_pathCentroidRingStart() {
													 var x00, y00, x0, y0;
													 d3_geo_pathCentroid.point = function(x, y) {
													     d3_geo_pathCentroid.point = nextPoint;
													     d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
													 };
													 function nextPoint(x, y) {
													     var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
													     d3_geo_centroidX1 += z * (x0 + x) / 2;
													     d3_geo_centroidY1 += z * (y0 + y) / 2;
													     d3_geo_centroidZ1 += z;
													     z = y0 * x - x0 * y;
													     d3_geo_centroidX2 += z * (x0 + x);
													     d3_geo_centroidY2 += z * (y0 + y);
													     d3_geo_centroidZ2 += z * 3;
													     d3_geo_pathCentroidPoint(x0 = x, y0 = y);
													 }
													 d3_geo_pathCentroid.lineEnd = function() {
													     nextPoint(x00, y00);
													 };
												     }
												     function d3_geo_pathContext(context) {
													 var pointRadius = 4.5;
													 var stream = {
													     point: point,
													     lineStart: function() {
														 stream.point = pointLineStart;
													     },
													     lineEnd: lineEnd,
													     polygonStart: function() {
														 stream.lineEnd = lineEndPolygon;
													     },
													     polygonEnd: function() {
														 stream.lineEnd = lineEnd;
														 stream.point = point;
													     },
													     pointRadius: function(_) {
														 pointRadius = _;
														 return stream;
													     },
													     result: d3_noop
													 };
													 function point(x, y) {
													     context.moveTo(x, y);
													     context.arc(x, y, pointRadius, 0, τ);
													 }
													 function pointLineStart(x, y) {
													     context.moveTo(x, y);
													     stream.point = pointLine;
													 }
													 function pointLine(x, y) {
													     context.lineTo(x, y);
													 }
													 function lineEnd() {
													     stream.point = point;
													 }
													 function lineEndPolygon() {
													     context.closePath();
													 }
													 return stream;
												     }
												     function d3_geo_resample(project) {
													 var δ2 = .5, cosMinDistance = Math.cos(30 * d3_radians), maxDepth = 16;
													 function resample(stream) {
													     return (maxDepth ? resampleRecursive : resampleNone)(stream);
													 }
													 function resampleNone(stream) {
													     return d3_geo_transformPoint(stream, function(x, y) {
														     x = project(x, y);
														     stream.point(x[0], x[1]);
														 });
													 }
													 function resampleRecursive(stream) {
													     var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0;
													     var resample = {
														 point: point,
														 lineStart: lineStart,
														 lineEnd: lineEnd,
														 polygonStart: function() {
														     stream.polygonStart();
														     resample.lineStart = ringStart;
														 },
														 polygonEnd: function() {
														     stream.polygonEnd();
														     resample.lineStart = lineStart;
														 }
													     };
													     function point(x, y) {
														 x = project(x, y);
														 stream.point(x[0], x[1]);
													     }
													     function lineStart() {
														 x0 = NaN;
														 resample.point = linePoint;
														 stream.lineStart();
													     }
													     function linePoint(λ, φ) {
														 var c = d3_geo_cartesian([ λ, φ ]), p = project(λ, φ);
														 resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
														 stream.point(x0, y0);
													     }
													     function lineEnd() {
														 resample.point = point;
														 stream.lineEnd();
													     }
													     function ringStart() {
														 lineStart();
														 resample.point = ringPoint;
														 resample.lineEnd = ringEnd;
													     }
													     function ringPoint(λ, φ) {
														 linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
														 resample.point = linePoint;
													     }
													     function ringEnd() {
														 resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
														 resample.lineEnd = lineEnd;
														 lineEnd();
													     }
													     return resample;
													 }
													 function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
													     var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
													     if (d2 > 4 * δ2 && depth--) {
														 var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
														 if (dz * dz / d2 > δ2 || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
														     resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
														     stream.point(x2, y2);
														     resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
														 }
													     }
													 }
													 resample.precision = function(_) {
													     if (!arguments.length) return Math.sqrt(δ2);
													     maxDepth = (δ2 = _ * _) > 0 && 16;
													     return resample;
													 };
													 return resample;
												     }
												     d3.geo.path = function() {
													 var pointRadius = 4.5, projection, context, projectStream, contextStream, cacheStream;
													 function path(object) {
													     if (object) {
														 if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
														 if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
														 d3.geo.stream(object, cacheStream);
													     }
													     return contextStream.result();
													 }
													 path.area = function(object) {
													     d3_geo_pathAreaSum = 0;
													     d3.geo.stream(object, projectStream(d3_geo_pathArea));
													     return d3_geo_pathAreaSum;
													 };
													 path.centroid = function(object) {
													     d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
													     d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
													     return d3_geo_centroidZ2 ? [ d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2 ] : d3_geo_centroidZ1 ? [ d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1 ] : d3_geo_centroidZ0 ? [ d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0 ] : [ NaN, NaN ];
													 };
													 path.bounds = function(object) {
													     d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
													     d3.geo.stream(object, projectStream(d3_geo_pathBounds));
													     return [ [ d3_gn pjSem = (projection = _) ? _.stream || dointRadius);
														      return reset();
														      };
													     path.pointRadius = function(_) {
														 if (!arguments.length) return pointRadius;
														 pointRadius = typeof _ === "function" ? _ : (cont this.stream.point(x, y);
																			      },
														 sphere: function() {
														     this.stream.sphere();
														 },
														 lineStart: function() {
														     this.stream.lineStart();
														 },
														 this.stream.l3_geo_projectionMutator(projectAt) {
														     var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
															     x = project(x, y);
															     return _) {
															     if (!arguments.length) return clipAngle;
															     preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
															     return invalidaφ * d3_degrees, δγ * d3_degrees ];
															 δλ = _[0] % 360 * d3_radians;
															 δφ = _[1] % 360 * d3_radians;
															 equirectangular = function() {
															     return d3_geo_projection(d3_geo_equirectangular);
															 }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
														     d3.geo.rotation = functio δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_identityRotation;
														 }
														 function d3_g     var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
														 return [nts.length) return angle;
														 interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
														 return circle;
													     };
													     circle.precision = th.cos(t), -sr * Math.sin(t) ]))[0], point[1]);
		   }
	       };
	   }
	   function d3_geo_circleAngle(cr, point) {
	       var a = d3_geo_cartesian(point);
	       a[0] -= cr;
	       d3_geo_cartesianNormalize(a);
	       var angle = d3_acounction lines() {
		   return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceiY0 ], [ X1, Y1 ] ];
		   X0 = +_[0][0], X1 = +_[1][0];
		   Y0 = +_[0][1], Y1 = +_[1][1];
		   if (X0 > X1) _ = X0, X0 = X1, X1 = _;
		   function(_) {
		       if (!arguments.length) return precision;
		       precision = +_;
		       x = d3_geo_graticuleX(y0, y1, 90);
		       y = d3_geo_graticuleY(x0, x1, precision);
		       X = d3   function greatArc() {
			   return {
			       type: "LineString",
			       coordinates: [ source_ || source.apply(this, arguments), target_ || targetate(x0, y0, x1, y1) {
				       var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1  polygonStart: d3_noop,
																								    polygonEnd: d3_noop
																								    };
				       function d3_geo_lengthLineStart() {
					   var λ0, sinφ0, cosφ0;
					   d3_geo_length.point = function(λ, φ) {
					       λ0 = λ * d3_radians,   }
					   azimuthal.invert = function(x, y) {
					       var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
					       n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cosφ0 * Math.pow(t(φ0), n) / n;
					       _equirectangular;
					       function forward(λ, φ) {
						   var ρ = G - φ;
						   return [ ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ) ];
					       }
					       forward.invert = function(x, y) {
						   var ρ0_y = G - y;
						   return [ Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y) ];
					       };
					       return forward;
					   }
					   (d3.geo.conicEquidistant = function() {
					       return d3_geo_conic(d3_geo_conicEquidlipExtent, clipAuto;
								   m.scale = function() {
								       var v = scale.apply(m, arguments);
								       return v === m ? clipAuto ? m.clipExtent(null) : m : v;
								   };
								   m.translate = function() {
								       var v = translate.apply(m, arguments);
								       return v === m ? clipAuto ? m.clipExtent(null) : m : v;
								   };
								   m.clipExtent = function(_) {
								       var v = clipE_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
									       return 1 / (1 + cosλcosφ);
									   }, function(ρ) {
									       return 2 * Math.atan(ρ);
									   });
								       (d3.geo.stereographic = function() {
									   return d3_geo_projection(d3_geo_stereographic);
								       }).rawator;
								       d3.geom = {};
								       function d3_geom_pointX(d) {
									   return d[0];
								       }
								       function d3_geom_pointY(d) {
									   return d[1];
								       }
								       d3.geom.hull = function(vertices) {
									   var x = d3_geom_pointX, y = d3_geom_pointY;
									   if (arguments.length) returht; ++i) polygon.push(data[points[lower[i]][2]]);
								       return polygon;
								   }
								   hull.x = function(_) {
								       return arguments.length ? (x = _, hull) : x;
								   };
								   hull.y = function(_) {
								       return arguments.length ? (y = _, hull) : - a[0] * b[1];
								   }
								   return area * .5;
								   };
					       d3_geom_polygonPrototype.centroid = function(k) {
						   var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
						   if (!arguments.length) k = -1 / (6 * this.are     } else if (d3_geom_polygonInside(c, a, b)) {
							   subject.push(d3_geom_polygonIntersect(c, d, a, b));
						       }
						   c = d;
					       }
					       if (closed) subject.push(subject[0]);
					       a = b;
					   }
					       return subject;
					       };
					   function d3_geom_polygonInside(p, a, b) {
					       return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
					   }
					   function d3_geom_polygonIntersect(c, d, a, b) {
					       var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
					       return [ x1 + ua * x21, y1 + ua * y21 ];
					   }
					   function d3_geom_polygonClosed(coordinates) {
					       var a = coordinates[0], b = coordinates[coordinates.length - 1];
					       return !(a[0] - b[0] || a[1] - b[1]);
					   }
					   var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiBeachPool = [], d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiCirclePool = [];
					   function d3_geom_voronoiBeach() {
					       d3_geom_voronoiRedBlackNode(this);
					       this.edge = this.site = this.circle = null;
					   }
					   function d3_geom_voronoiCreateBeach(site) {
					       var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach();
					       beach.site = site;
					       return beach;
					   }
					   function d3_geom_voronoiDetachBeach(beach) {
					       d3_geom_voronoiDetachCircle(beach);
					       d3_geom_voronoiBeaches.remove(beach);
					       d3_geom_voronoiBeachPool.push(beach);
					       d3_geom_voronoiRedBlackNode(beach);
					   }
					   function d3_geom_voronoiRemoveBeach(beach) {
					       var circle = beach.circle, x = circle.x, y = circle.cy, vertex = {
						   x: x,
						   y: y
					       }, previous = beach.P, next = beach.N, disappearing = [ beach ];
					       d3_geom_voronoiDetachBeach(beach);
					       var lArc = previous;
					       while (lArc.circle && abs(x - lArc.circle.x) < ε && abs(y - lArc.circle.cy) < ε) {
						   previous = lArc.P;
						   disappearing.unshift(lArc);
						   d3_geom_voronoiDetachBeach(lArc);
						   lArc = previous;
					       }
					       disappearing.unshift(lArc);
					       d3_geom_voronoiDetachCircle(lArc);
					       var rArc = next;
					       while (rArc.circle && abs(x - rArc.circle.x) < ε && abs(y - rArc.circle.cy) < ε) {
						   next = rArc.N;
						   disappearing.push(rArc);
						   d3_geom_voronoiDetachBeach(rArc);
						   rArc = next;
					       }
					       disappearing.push(rArc);
					       d3_geom_voronoiDetachCircle(rArc);
					       var nArcs = disappearing.length, iArc;
					       for (iArc = 1; iArc < nArcs; ++iArc) {
						   rArc = disappearing[iArc];
						   lArc = disappearing[iArc - 1];
						   d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
					       }
					       lArc = disappearing[0];
					       rArc = disappearing[nArcs - 1];
					       rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);
					       d3_geom_voronoiAttachCircle(lArc);
					       d3_geom_voronoiAttachCircle(rArc);
					   }
					   function d3_geom_voronoiAddBeach(site) {
					       var x = site.x, directrix = site.y, lArc, rArc, dxl, dxr, node = d3_geom_voronoiBeaches._;
					       while (node) {
						   dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
						   if (dxl > ε) node = node.L; else {
						       dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);
						       if (dxr > ε) {
							   if (!node.R) {
							       lArc = node;
							       break;
							   }
							   node = node.R;
						       } else {
							   if (dxl > -ε) {
							       lArc = node.P;
							       rArc = node;
							   } else if (dxr > -ε) {
							       lArc = node;
							       rArc = node.N;
							   } else {
							       lArc = rArc = node;
							   }
							   break;
						       }
						   }
					       }
					       var newArc = d3_geom_voronoiCreateBeach(site);
					       d3_geom_voronoiBeaches.insert(lArc, newArc);
					       if (!lArc && !rArc) return;
					       if (lArc === rArc) {
						   d3_geom_voronoiDetachCircle(lArc);
						   rArc = d3_geom_voronoiCreateBeach(lArc.site);
						   d3_geom_voronoiBeaches.insert(newArc, rArc);
						   newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
						   d3_geom_voronoiAttachCircle(lArc);
						   d3_geom_voronoiAttachCircle(rArc);
						   return;
					       }
					       if (!rArc) {
						   newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
						   return;
					       }
					       d3_geom_voronoiDetachCircle(lArc);
					       d3_geom_voronoiDetachCircle(rArc);
					       var lSite = lArc.site, ax = lSite.x, ay = lSite.y, bx = site.x - ax, by = site.y - ay, rSite = rArc.site, cx = rSite.x - ax, cy = rSite.y - ay, d = 2 * (bx * cy - by * cx), hb = bx * bx + by * by, hc = cx * cx + cy * cy, vertex = {
						   x: (cy * hb - by * hc) / d + ax,
						   y: (bx * hc - cx * hb) / d + ay
					       };
					       d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
					       newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
					       rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
					       d3_geom_voronoiAttachCircle(lArc);
					       d3_geom_voronoiAttachCircle(rArc);
					   }
					   function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
					       var site = arc.site, rfocx = site.x, rfocy = site.y, pby2 = rfocy - directrix;
					       if (!pby2) return rfocx;
					       var lArc = arc.P;
					       if (!lArc) return -Infinity;
					       site = lArc.site;
					       var lfocx = site.x, lfocy = site.y, plby2 = lfocy - directrix;
					       if (!plby2) return lfocx;
					       var hl = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl / plby2;
					       if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
					       return (rfocx + lfocx) / 2;
					   }
					   function d3_geom_voronoiRightBreakPoint(arc, directrix) {
					       var rArc = arc.N;
					       if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
					       var site = arc.site;
					       return site.y === directrix ? site.x : Infinity;
					   }
					   function d3_geom_voronoiCell(site) {
					       this.site = site;
					       this.edges = [];
					   }
					   d3_geom_voronoiCell.prototype.prepare = function() {
					       var halfEdges = this.edges, iHalfEdge = halfEdges.length, edge;
					       while (iHalfEdge--) {
						   edge = halfEdges[iHalfEdge].edge;
						   if (!edge.b || !edge.a) halfEdges.splice(iHalfEdge, 1);
					       }
					       halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
					       return halfEdges.length;
					   };
					   function d3_geom_voronoiCloseCells(extent) {
					       var x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], x2, y2, x3, y3, cells = d3_geom_voronoiCells, iCell = cells.length, cell, iHalfEdge, halfEdges, nHalfEdges, start, end;
					       while (iCell--) {
						   cell = cells[iCell];
						   if (!cell || !cell.prepare()) continue;
						   halfEdges = cell.edges;
						   nHalfEdges = halfEdges.length;
						   iHalfEdge = 0;
						   while (iHalfEdge < nHalfEdges) {
						       end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
						       start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;
						       if (abs(x3 - x2) > ε || abs(y3 - y2) > ε) {
							   halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0)  > ε ? {
									   x: x1,
									       y: abs(x2 - x1) < ε ? y2 : y0
									       } : abs(y3 - y0) < ε && x3 - x0 > ε ? {
									   x: abs(y2 - y0) < ε ? x2 : x0,
											   y: y0
											   } : null) circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle();
								   circle.arc = arc;
								   circle.site = cSite;
								   circle.x = x + bx;
								   circle.y = cy + Math.sqrt(x * x + y * y);
								   circle.cy = cy;
								   arc.circle = circle;
								   var before = null, node = d3_geom_voronoiCircles._;
								   while (node) {
								       if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
									   ;
								       }
								   }
								   function d3_geom_voronoiClipEdges(extent) {
								       var edges = d3_geom_voronoiEdges, clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]), i = edges.length, e;
								       while (i--) {
									   e = edges[i];
									   if (!d3_geom_vva) va = {
										   x: fx,
										   y: y1
									       }; else if (va.y < y0) return;
									   vb = {
									       x: fx,
									       y: y0
									   };
								       }
								   } else {
								       fm = (lx - rx) / (ry - ly);
								       fb = fy - fm * fx;
								       if (fm < -1 || fm > 1) {
									   if (lx > rx) {
									       if (!va) va = {
										   }; else if (va.x < x0) return;
									       vb = {
										   x: x0,
										   y: fm * x0 + fb
									       };
									   }
								       }
								   }
								   edge.a = va;
								   edge.b = vb;
								   return true;
								   }
							       function d3_geom_voronoiEdge(lSite, rSite) {
								   this.l = lSite;
								   oronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
								       if (!edge.a && !edge.b) {
									   edge.a = vertex;
									   edge.l = lSite;
									   edge.r = rSite;
								       } else if (edge.l === rSite) {
									   insert: function(after, node) {
									       var parent, grandpa, uncle;
									       if (after) {
										   after = grandpa;
									       } else {
										   if (after === parent.R) {
										       d3_geom_voronoiRedBode.P.N = node.N;
										       node.N = node.P = null;
										       var parent = node.U, sibling, left = node.L, right = node.R, next, red;
										       ifbreak;
										       if (node === parent.L) {
											   sibling = parent.R;
											   if (sibling.C) {
											       sibling.C = false;
											       parent.C = true;
											       d3_geom_voronoiRedBlackRotateLesibling.L.C || sibling.R && sibling.R.C) {
											       if (!sibling.L || !sibling.L.C) {
												   sibling.R.C = false;
												   sibling.C = true;
												   d3_geom_voronoiRedBlackRotateLeft(this, sibling);
												   sibling = parent.L;
												   p.U;
												   if (parent) {
												       if (parent.L === p) parent.L = q; else parent.R = q;
												   } else {
												       tree._ = q;
												   }
												   q.U = parent;
												   p.U = q;
												   p.L = q.R;
												   if (p.L) p.L.U = p;
												   q.R = p;
											       }
											       fs.pop();
											   } else if (circle) {
											       d3_geom_voronoiRemoveBeach(circle.arc);
											   } else {
											       break;
											   }
										       }
										       if (bbox) d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);
										       var diagram = {
											   cells: d3edges.length ? edges.map(function(e) {
												   var s = e.start();
												   return [ s.x, s.y ];
											       }) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [ [ x0, y1 ], [ x1, y1 ], [ x1, y0 ], [ x0, y0 ] ] : [];
											   polygon.point = data[i];
										       });
										   return polygons;
									       }
									       function sites(data) {
										   return, j = -1, m = edges.length, e0, s0, e1 = edges[m - 1].edge, s1 = e1.l === site ? e1.r : e1.l;
										   while (++j < m) {
										       e0 = e1;
										       s0 = s1;
										       e1 = edges[j].edge;
										       s1 = e1.l === site ? e1.r : e1.l;
										       if (i < s0.i && i <clipExtent[1];
											   return voronoi.clipExtent(_ && [ [ 0, 0 ], _ ]);
											   };
										       return voronoi;
										   };
										   var d3_geom_voronoiClipExtent = [ [ -1e6, -1e6 ], [ 1e6, 1e6 ] ];
										   funa.length;
										   if (compat) for (i = 0; i < n; ++i) {
											   d = data[i];
											   if (d.x < x1_) x1_ = d.x;
											   if (d.y < y1_) y1_ = d.y;
											   if (d.x > x2_) x2_ = d.x;
											   if (d.y > y2_) y2_ = d.y;
											   xs.push(d.x);
											   ys.pu.x = n.y = n.point = null;
											   insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
											   insertChild(n, d, x, y, x1, y1, x2, y2);
										       }
									       } else {
										   n.x = x, i < n) {
										   insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
									       }
									   }
									   function d3_geom_quadtreeNode() {
									       return {
										   leaf: true,
										       neObject = d3_interpolateObject;
										   function d3_interpolateObject(a, b) {
										       var i       if ((am = am[0]) === (bm = bm[0])) {
											   if (s[i]) s[i] += bm; else s[++i] = bm;
										       } else {
											   s[++i] = null;
											   q.push({
												   i: i,
												       x: d3_interpolateNumber(am, bm)
												       });
										       }
										       bi = d3_interpolate_numberB.las= typeof b;
										       return (t === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : t === "object" && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b);
										   } ];
									       d3.interpolateArray = d3_interpolateArray;
									       function d3_interpolateArray(a, b) {
										   var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
										   for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
										   for (;i < na; ++i) c[i] = a[i];
										   for (;i < nb; ++i) c[i] = b[i];
										   return function(t) {
										       for (i = 0; i < n0; ++i) c[i] = x[i](t);
										       return c;
										   };
									       }
									       var d3_ease_default = function() {
										   return d3_identity;
									       };
									       var d3_ease = d3.map({
										       linear: d3_ease_default,
										       poly: d3_ease_poly,
										       quad: function() {
											   return d3_ease_quad;
										       },
										       cubic: function() {
											   return d3_ease_cubic;
										       },
										       sin: function() {
											   return d3_ease_sin;
										       },
										       exp: function() {
											   return d3_ease_exp;
										       },
										       circle: function() {
											   return d3_ease_circle;
										       },
										       elastic: d3_ease_elastic,
										       back: d3_ease_back,
										       bounce: function() {
											   return d3_ease_bounce;
										       }
										   });
									       var d3_ease_mode = d3.map({
										       "in": d3_identity,
										       out: d3_ease_reverse,
										       "in-out": d3_ease_reflect,
										       "out-in": function(f) {
											   return d3_ease_reflect(d3_ease_reverse(f));
										       }
										   });
									       d3.ease = function(name) {
										   var i = name.indexOf("-"), t = i >= 0 ? name.slice(0, i) : name, m = i >= 0 ? name.slice(i + 1) : "in";
										   t = d3_ease.get(t) || d3_ease_default;
										   m = d3_ease_mode.get(m) || d3_identity;
										   return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))));
									       };
									       function d3_ease_clamp(f) {
										   return function(t) {
										       return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
										   };
									       }
									       function d3_ease_reverse(f) {
										   return function(t) {
										       return 1 - f(1 - t);
										   };
									       }
									       function d3_ease_reflect(f) {
										   return function(t) {
										       return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
										   };
									       }
									       function d3_ease_quad(t) {
										   return t * t;
									       }
									       function d3_ease_cubic(t) {
										   return t * t * t;
									       }
									       function d3_ease_cubicInOut(t) {
										   if (t <= 0) return 0;
										   if (t >= 1) return 1;
										   var t2 = t * t, t3 = t2 * t;
										   return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
									       }
									       function d3_ease_poly(e) {
										   return function(t) {
										       return Math.pow(t, e);
										   };
									       }
									       function d3_ease_sin(t) {
										   return 1 - Math.cos(t * halfπ);
									       }
									       function d3_ease_exp(t) {
										   return Math.pow(2, 10 * (t - 1));
									       }
									       function d3_ease_circle(t) {
										   return 1 - Math.sqrt(1 - t * t);
									       }
									       function d3_ease_elastic(a, p) {
										   var s;
										   if (arguments.length < 2) p = .45;
										   if (arguments.length) s = p / τ * Math.asin(1 / a); else a = 1, s = p / 4;
										   return function(t) {
										       return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p);
										   };
									       }
									       function d3_ease_back(s) {
										   if (!s) s = 1.70158;
										   return function(t) {
										       return t * t * ((s + 1) * t - s);
										   };
									       }
									       function d3_ease_bounce(t) {
										   return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
									       }
									       d3.interpolateHcl = d3_interpolateHcl;
									       function d3_interpolateHcl(a, b) {
										   a = d3.hcl(a);
										   b = d3.hcl(b);
										   var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
										   if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
										   if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
										   return function(t) {
										       return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
										   };
									       }
									       d3.interpolateHsl = d3_interpolateHsl;
									       function d3_interpolateHsl(a, b) {
										   a = d3.hsl(a);
										   b = d3.hsl(b);
										   var ah = a.h, as = a.s, al = a.l, bh = b.h - ah, bs = b.s - as, bl = b.l - al;
										   if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
										   if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
										   return function(t) {
										       return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
										   };
									       }
									       d3.interpolateLab = d3_interpolateLab;
									       function d3_interpolateLab(a, b) {
										   a = d3.lab(a);
										   b = d3.lab(b);
										   var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
										   return function(t) {
										       return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
										   };
									       }
									       d3.interpolateRound = d3_interpolateRound;
									       function d3_interpolateRound(a, b) {
										   b -= a;
										   return function(t) {
										       return Math.round(a + b * t);
										   };
									       }
									       d3.transform = function(string) {
										   var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
										   return (d3.transform = function(string) {
											   if (string != null) {
											       g.setAttribute("transform", string);
											       var t = g.transform.baseVal.consolidate();
											   }
											   return new d3_transform(t ? t.matrix : d3_transformIdentity);
										       })(string);
									       };
									       function d3_transform(m) {
										   var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
										   if (r0[0] * r1[1] < r1[0] * r0[1]) {
										       r0[0] *= -1;
										       r0[1] *= -1;
										       kx *= -1;
										       kz *= -1;
										   }
										   this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
										   this.translate = [ m.e, m.f ];
										   this.scale = [ kx, ky ];
										   this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
									       }
									       d3_transform.prototype.toString = function() {
										   return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
									       };
									       function d3_transformDot(a, b) {
										   return a[0] * b[0] + a[1] * b[1];
									       }
									       function d3_transformNormalize(a) {
										   var k = Math.sqrt(d3_transformDot(a, a));
										   if (k) {
										       a[0] /= k;
										       a[1] /= k;
										   }
										   return k;
									       }
									       function d3_transformCombine(a, b, k) {
										   a[0] += k * b[0];
										   a[1] += k * b[1];
										   return a;
									       }
									       var d3_transformIdentity = {
										   a: 1,
										   b: 0,
										   c: 0,
										   d: 1,
										   e: 0,
										   f: 0
									       };
									       d3.interpolateTransform = d3_interpolateTransform;
									       function d3_interpolateTransform(a, b) {
										   var s = [], q = [], n, A = d3.transform(a), B = d3.transform(b), ta = A.translate, tb = B.translate, ra = A.rotate, rb = B.rotate, wa = A.skew, wb = B.skew, ka = A.scale, kb = B.scale;
										   if (ta  s.push(s.pop() + "rotate(" + rb + ")");
										       }
										   if (wa != wb) {
										       q.push({
											       i: s.push(s.pop() + "skewX(", null, ")") - 2,
												   x: d3_interax(0, Math.min(1, (x - a) / b));
											   };
											   }
											   d3.layout = {};
										       d3.layout.bundle = function() {
											   return function(links) {
											       var paths = [], i = -1, n = links.length;
											       while (++i < n) paths.push(dout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
															  while (ad.sort(function(a, b) {
																      return sortSubgroups(matrix[i][a], matrix[i][b]);
																  });
															      });
											   }
											   k = (τ - padding * n) / k;
											   x = 0, i = -1;
      whisource
										       } : {
											   source: source,
											       target: target
											       });
									       }
									   }
								       }
								       if (sortChords) resort();
								   }
								   function resort() {
								       chords.sort(function(a, b) {
									       return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
									   });
								   }
								   chord.matrix = function(x) {
								       if (!arguments.length) return matrix;
								       n = (matrix = x) && matrix.length;
								       chords = groups = null;
								       return chord;
								   };
								   chord.padding = function(x) {
								       if (!arguments.length) return padding;
								       padding = x;
								       chords = groups = null;
								       return chord;
								   };
								   chord.sortGroups = function(x) {
								       if (!arguments.length) return sortGroups;
								       sortGroups = x;
								       chords = groups = null;
								       return chord;
								   };
								   chord.sortSubgroups = function(x) {
								       if (!arguments.length) return sortSubgroups;
								       sortSubgroups = x;
								       chords = null;
								       return chord;
								   };
								   chord.sortChords = function(x) {
								       if (!arguments.length) return sortChords;
								       sortChords = x;
								       if (chords) resort();
								       return chord;
								   };
								   chord.chords = function() {
								       if (!chords) relayout();
								       return chords;
								   };
								   chord.groups = function() {
								       if (!groups) relayout();
								       return groups;
								   };
								   return chord;
							       };
							       d3.layout.force = function() {
								   var force = {}, event = d3.dispatch("start", "tick", "end"), size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, chargeDistance2 = d3_layout_forceChargeDistance2, gravity = .1, theta2 = .64, nodes = [], links = [], distances, strengths, charges;
								   function repulse(node) {
								       return function(quad, x1, _, x2) {
									   if (quad.point !== node) {
									       var dx = quad.cx - node.x, dy = quad.cy - node.y, dw = x2 - x1, dn = dx * dx + dy * dy;
									       if (dw * dw / theta2 < dn) {
										   if (dn < chargeDistance2) {
										       var k = quad.charge / dn;
										       node.px -= dx * k;
										       node.py -= dy * k;
										   }
										   return true;
									       }
									       if (quad.point && dn && dn < chargeDistance2) {
										   var k = quad.pointCharge / dn;
										   node.px -= dx * k;
										   node.py -= dy * k;
									       }
									   }
									   return !quad.charge;
								       };
								   }
								   force.tick = function() {
								       if ((alpha *= .99) < .005) {
									   event.end({
										   type: "end",
										   alpha: alpha = 0
									       });
									   return true;
								       }
								       var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
								       for (i = 0; i < m; ++i) {
									   o = links[i];
									   s = o.source;
									   t = o.target;
									   x = t.x - s.x;
									   y = t.y - s.y;
									   if (l = x * x + y * y) {
									       l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
									       x *= l;
									       y *= l;
									       t.x -= x * (k = s.weight / (t.weight + s.weight));
									       t.y -= y * k;
									       s.x += x * (k = 1 - k);
									       s.y += y * k;
									   }
								       }
								       if (k = alpha * gravity) {
									   x = size[0] / 2;
									   y = size[1] / 2;
									   i = -1;
									   if (k) while (++i < n) {
										   o = nodes[i];
										   o.x += (x - o.x) * k;
										   o.y += (y - o.y) * k;
									       }
								       }
								       if (charge) {
									   d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
									   i = -1;
									   while (++i < n) {
									       if (!(o = nodes[i]).fixed) {
										   q.visit(repulse(o));
									       }
									   }
								       }
								       i = -1;
								       while (++i < n) {
									   o = nodes[i];
									   if (o.fixed) {
									       o.x = o.px;
									       o.y = o.py;
									   } else {
									       o.x -= (o.px - (o.px = o.x)) * friction;
									       o.y -= (o.py - (o.py = o.y)) * friction;
									   }
								       }
								       event.tick({
									       type: "tick",
									       alpha: alpha
									   });
								   };
								   force.nodes = function(x) {
								       if (!arguments.length) return nodes;
								       nodes = x;
								       return force;
								   };
								   force.links = function(x) {
								       if (!arguments.length) return links;
								       links = x;
								       return force;
								   };
								   force.size = function(x) {
								       if (!arguments.length) return size;
								       size = x;
								       return force;
								   };
								   force.linkDistance = function(x) {
								       if (!arguments.length) return linkDistance;
								       linkDistance = typeof x === "function" ? x : +x;
								       return force;
								   };
								   force.distance = force.linkDistance;
								   force.linkStrength = function(x) {
								       if (!arguments.length) return linkStrength;
								       linkStrength = typeof x === "function" ? x : +x;
								       return force;
								   };
								   force.friction = function(x) {
								       if (!arguments.length) return friction;
								       friction = +x;
								       return force;
								   };
								   force.charge = function(x) {
								       if (!arguments.length) return charge;
								       charge = typeof x === "function" ? x : +x;
								       return force;
								   };
								   force.chargeDistance = function(x) {
								       if (!arguments.length) return Math.sqrt(chargeDistance2);
								       chargeDistance2 = x * x;
								       return force;
								   };
								   force.gravity = function(x) {
								       if (!arguments.length) return gravity;
								       gravity = +x;
								       return force;
								   };
								   force.theta = function(x) {
								       if (!arguments.length) return Math.sqrt(theta2);
								       theta2 = x * x;
								       return force;
								   };
								   force.alpha = function(x) {
								       if (!arguments.length) return alpha;
								       x = +x;
								       if (alpha) {
									   if (x > 0) alpha = x; else alpha = 0;
								       } else if (x > 0) {
									   event.start({
										   type: "start",
										   alpha: alpha = x
									       });
									   d3.timer(force.tick);
								       }
								       return force;
								   };
								   force.start = function() {
								       var i, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
								       for (i = 0; i < n; ++i) {
									   (o = nodes[i]).index = i;
									   o.weight = 0;
								       }
								       for (i = 0; i < m; ++i) {
									   o = links[i];
									   if (typeof o.source == "number") o.source = nodes[o.source];
									   if (typeof o.target == "number") o.target = nodes[o.target];
									   ++o.source.weight;
									   ++o.target.weight;
								       }
								       for (i = 0; i < n; ++i) {
									   o = nodes[i];
									   if (isNaN(o.x)) o.x = position("x", w);
									   if (isNaN(o.y)) o.y = position("y", h);
									   if (isNaN(o.px)) o.px = o.x;
									   if (isNaN(o.py)) o.py = o.y;
								       }
								       distances = [];
								       if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i); else for (i = 0; i < m; ++i) distances[i] = linkDistance;
								       strengths = [];
								       if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i); else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
								       charges = [];
								       if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i); else for (i = 0; i < n; ++i) charges[i] = charge;
								       function position(dimension, size) {
									   if (!neighbors) {
									       neighbors = new Array(n);
									       for (j = 0; j < n; ++j) {
										   neighbors[j] = [];
									       }
									       for (j = 0; j < m; ++j) {
										   var o = links[j];
										   neighbors[o.source.index].push(o.target);
										   neighbors[o.target.index].push(o.source);
									       }
									   }
									   var candidates = neighbors[i], j = -1, m = candidates.length, x;
									   while (++j < m) if (!isNaN(x = candidates[j][dimension])) return x;
									   return Math.random() * size;
								       }
								       return force.resume();
								   };
								   force.resume = function() {
								       return force.alpha(.1);
								   };
								   force.stop = function() {
								       return force.alpha(0);
								   };
								   force.drag = function() {
								       if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
								       if (!arguments.length) return drag;
								       this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
								   };
								   function dragmove(d) {
								       d.px = d3.event.x, d.py = d3.event.y;
								       force.resume();
								   }
								   return d3.rebind(force, event, "on");
							       };
							       function d3_layout_forceDragstart(d) {
								   d.fixed |= 2;
							       }
							       function d3_layout_forceDragend(d) {
								   d.fixed &= ~6;
							       }
							       function d3_layout_forceMouseover(d) {
								   d.fixed |= 4;
								   d.px = d.x, d.py = d.y;
							       }
							       function d3_layout_forceMouseout(d) {
								   d.fixed &= ~4;
							       }
							       function d3_layout_forceAccumulate(quad, alpha, charges) {
								   var cx = 0, cy = 0;
								   quad.charge = 0;
								   if (!quad.leaf) {
								       var nodes = quad.nodes, n = nodes.length, i = -1, c;
								       while (++i < n) {
									   c = nodes[i];
									   if (c == null) continue;
									   d3_layout_forcad.pointCharge = k;
									   cx += k * quad.point.x;
									   cy += k * quad.point.y;
								       }
								       quad.cx = cx / quad.charge;
								       quad.cy = cy / quad.charge;
								   }
								   var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1, d3_layout_forceChargeDistane, node.depth) || 0;
							       delete node.children;
							       }
						       }
						       d3_layout_hierarchyVisitAfter(root, function(node) {
							       var childs, parent;
							       if (sort && (childs = node.children)) childs.sort(sort);
							       if (value && (parent = node.parent)) parent= +value.call(hierarchy, node, node.depth) || 0;
							       if (parent = node.parent) parent.value += node.value;
							   });
						   }
						   return root;
					       };
					       return hierarchy;
					       ;
					   }
				       }
				       while ((node = nodes2.pop()) != null) {
					   callback(node);
				       }
				   }
				   function d3_layout_hierarchyChildren(d) {
				       return d.children;
				   }
				   function d3_layout_hierarchyValue(d) {
				       return d.value;
				   }
				   function d3_layout_ * dx, dy);
			       x += d;
			   }
		       }
		   }
		   function depth(node) {
		       var children = node.children, d = 0;
		       if (children && (n = children.length)) {
			   var i = -1, n;
			   while (++i < n) d = Munction" ? endAngle.apply(this, arguments) : endAngle) - a) / d3.sum(values);
      var index = d3.range(data.length);
      if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
        return values[j] - values[i];
      } : function(i, j) {
        return;
      return pie;
    };
    return pie;
  };
  var d3_layout_pieSortByValue = {};
  d3.layout.stack = function() {
    var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3all(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
        }
      }
      return data;
    }
    stack.values = function(x) {
      if (!arguments.length) return values;
      values = x;
      return stack;
    };
    stack.order = function(x) {
      if (!arguments.length) return order;
      order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
      return stack;
    };
    stack.offset = function(x) {
      if (!arguments.length) return offset;
      offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
      return stack;
    };
    stack.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      return stack;
    };
    stack.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      return stack;
    };
    stack.out = function(z) {
      if (!arguments.length) return out;
      out = z;
      return stack;
    };
    return stack;
  };
  function d3_layout_stackX(d) {
    return d.x;
  }
  function d3_layout_stackY(d) {
    return d.y;
  }
  function d3_layout_stackOut(d, y0, y) {
    d.y0 = y0;
    d.y = y;
  }
  var d3_layout_stackOrders = d3.map({
    "inside-out": function(data) {
      var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
        return max[a] - max[b];
      }), top = 0, bottom = 0, tops = [], bottoms = [];
      for (i = 0; i < n; ++i) {
        j = index[i];
        if (top < bottom) {
          top += sums[j];
          tops.push(j);
        } else {
          bottom += sums[j];
          bottoms.push(j);
        }
      }
      return bottoms.reverse().concat(tops);
    },
    reverse: function(data) {
      return d3.range(data.length).reverse();
    },
    "default": d3_layout_stackOrderDefault
  });
  var d3_layout_stackOffsets = d3.map({
    silhouette: function(data) {
      var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o > max) max = o;
        sums.push(o);
      }
      for (j = 0; j < m; ++j) {
        y0[j] = (max - sums[j]) / 2;
      }
      return y0;
    },
    wiggle: function(data) {
      var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
      y0[0] = o = o0 = 0;
      for (j = 1; j < m; ++j) {
        for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
        for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
          for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
            s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
          }
          s2 += s3 * data[i][j][1];
        }
        y0[j] = o -= s1 ? s2 / s1 * dx : 0;
        if (o < o0) o0 = o;
      }
      for (j = 0; j < m; ++j) y0[j] -= o0;
      return y0;
    },
    expand: function(data) {
      var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
      }
      for (j = 0; j < m; ++j) y0[j] = 0;
      return y0;
    },
    zero: d3_layout_stackOffsetZero
  });
  function d3_layout_stackOrderDefault(data) {
    return d3.range(data.length);
  }
  function d3_layout_stackOffsetZero(data) {
    var j = -1, m = data[0].length, y0 = [];
    while (++j < m) y0[j] = 0;
    return y0;
  }
  function d3_layout_stackMaxIndex(array) {
    var i = 1, j = 0, v = array[0][1], k, n = array.length;
    for (;i < n; ++i) {
      if ((k = array[i][1]) > v) {
        j = i;
        v = k;
      }
    }
    return j;
  }
  function d3_layout_stackReduceSum(d) {
    return d.reduce(d3_layout_stackSum, 0);
  }
  function d3_layout_stackSum(p, d) {
    return p + d[1];
  }
  d3.layout.histogram = function() {
    var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
    function histogram(data, i) {
      var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
      while (++i < m) {
        bin = bins[i] = [];
        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
        bin.y = 0;
      }
      if (m > 0) {
        i = -1;
        while (++i < n) {
          x = values[i];
          if (x >= range[0] && x <= range[1]) {
            bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
            bin.y += k;
            bin.push(data[i]);
          }
        }
      }
      return bins;
    }
    histogram.value = function(x) {
      if (!arguments.length) return valuer;
      valuer = x;
      return histogram;
    };
    histogram.range = function(x) {
      if (!arguments.length) return ranger;
      ranger = d3_functor(x);
      return histogram;
    };
    histogram.bins = function(x) {
      if (!arguments.length) return binner;
      binner = typeof x === "number" ? function(range) {
        return d3_layout_histogramBinFixed(range, x);
      } : d3_functor(x);
      return histogram;
    };
    histogram.frequency = function(x) {
      if (!arguments.length) return frequency;
      frequency = !!x;
      return histogram;
    };
    return histogram;
  };
  function d3_layout_histogramBinSturges(range, values) {
    return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
  }
  function d3_layout_histogramBinFixed(range, n) {
    var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
    while (++x <= n) f[x] = m * x + b;
    return f;
  }
  function d3_layout_histogramRange(values) {
    return [ d3.min(values), d3.max(values) ];
  }
  d3.layout.pack =k(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], w = size[0], h = size[1], r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() {
        return radius;
      };
      root.x = root.y = 0;
      d3_layout_hierarchyVisitAfter(root, function(d) {
        d.r  pack.radius = function(_) {
      if (!arguments.length) return radius;
      radius = _ == null || typeof _ === "function" ? _ : +_;
      return pack;
    };
    pack.padding = function(_) {
      if (!arguments.length) return padding;
      padding = +_;
      return pack;
    };
    return d3_layout_hierarchyRebind(pack, hierarchy);
  };
  function d3_layout_pak, n;
    function bound(node) {
      xMin = Math.min(node.x - node.r, xMin);
      xMax = Math.max(node.x + node.r, xMax);
      yMin = Math.min(node.y - node.r, yMin);
      yMax = Math.max(node.y + node.r, yMax);
    }
    nodes.forEach(d3_layout_packLink);
    a = nodes[0];
    a.x = -a.ev; k = k._pack_prev, s2++) {
              if (d3_layout_packIntersects(k, c)) {
                break;
              }
            }
          }
          if (isect) {
            if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = e.x;
    node.y = y += k * node.y;
    node.r *= k;
    if (children) {
      var i = -1, n = children.length;
      while (++i < n) d3_layout_packTransform(children[i], x, y, k);
    }
  }
  function d3_layout_packPlace(a, b, c) {
    var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
    if (db && (dx || dy)) {
      var da = b.r + c.r, dc = dx * dx + dy * dy;.z;
      d3_layout_hierarchyVisitBefore(root1, secondWalk);
      if (nodeSize) d3_layout_hierarchyVisitBefore(root0, sizeNode); else {
        var left = root0, right = root0, bottom = root0;
        d3_layout_hierarchyVisitBefore(root0, function(node) {
          if (node.x < left.x) left = node;
          if (nod         queue.push((children[i] = child = {
            _: children[i],
            parent: node1,
            children: (child = children[i].children) && child.slice() || [],
            A: null,
            a: null,
            z: 0,
            m: 0,
            c: 0,
            s: 0,
            t: null,
            i: i
          }).a = chi;
      v.m += v.parent.m;
    }
    function apportion(v, w, ancestor) {
      if (w) {
        var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
          vom = d3_layout_treeLeft(v   return ancestor;
    }
    function sizeNode(node) {
      node.x *= size[0];
      node.y = node.depth * size[1];
    }
    tree.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return tree;
    };
    tree.size = function(x) {
      if (!arguments.eeMove(wm, wp, shift) {
    var change = shift / (wp.i - wm.i);
    wp.c -= change;
    wp.s += shift;
    wm.c += change;
    wp.z += shift;
    wp.m += shift;
  }
  function d3_layout_treeShift(v) {
    var shift = 0, change = 0, children = v.children, i = children.length, w;
    while (--i >= 0) {
      w = children[i];
      w.z += shift;
      w.m += shift;
      shift += w.s + (change += w.c);
    }
  }
  function d3_layout_treeAncestor(vim, v, ancestor) d3_layout_clusterY(children);
        } else {
          node.x = previousNeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) != null;
      return cluster;
    };
    return d3_layout_hierarchyRebind(cluster, hierarchy);
  };
  function d3_layout_clusterY(children) {
    return 1 + d3.max(children, function(child) {
    ayout_clusterX(childsquarify", ratio = .5 * (1 + Math.sqrt(5));
			   function scale(children, k) {
			       var i = -1, n = children.length, child, area;
			       while (++i < n) {
				   area = (child = children[i]).value * (k < 0 ? 0 = row.pop().area;
									 position(row, u, rect, false);
									 u = Math.min(rect.dx, rect.dy);
									 row.length = row.area = 0;
									 best = Infinity;
									 }
			       }
			       if (row.length) {
				   position(row, u, rect, true);
				   nfinity, i = -1, n = row.length;
				   while (++i < n) {
				       if (!(r = row[i].area)) continue;
				       if (r < rmin) rmin = r;
				       if (r > rmax) rma? round(o.area / v) : 0);
			       }
			       o.z = false;
			       o.dy += rect.y + rect.dy - y;
			       rect.x += v;
			       rect.dx -= v;
			   }
		       }
		       function treemap(d) {
			   var nodes = eemapPad(node, x);
		       }
		       var type;
		       pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], 
																		      padConstant) : padCoon d3_layout_treemapPad(node, padding) {
			   var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
			   if (dx < 0) {
			       x += dx / 2;
			       dx = 0;
			   }
			   if (dy < 0) {
			       y +={
				   return random() / m;
			       };
			   },
			   irwinHall: function(m) {
			       return function() {
				   for (var s = 0, j = 0; j < m; j++) s += Math.random();
				   return s;
			       };
			   }
		       };
		       d3function d3_scale_niceStep(step) {
			   return step ? {
			       floor: function(x) {
				   return Math.floor(x / step) * step;
			       },
				   ceil: function(x) {
				   return Math.cei   var output, input;
				   function rescale() {
				       var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
				       output = linear(domain, range, uninterpolate, interpolate);
				       input = linear(range, dom(x) {
					       if (!arguments.length) return interpolate;
					       interpolate = x;
					       return rescale();
					   };
					   scale.ticks = function(m) {
					       return d3_scale_linearTicks(domain, m);
					   };
					   scale.tickFormat = function(m, format) {
					       return d3_scale_linearTickFormat(domain, m, format);
					   };
					   scale.nice = function(m) {
					       d3_scale_linearNice(domain, m);
					       err = m / span * step;
					       if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
					       extent[0] = MaPrecision(match[8], range);
					       format = match.join("");
					   } else {
					       format = ",." + d3_scale_linearPrecision(range[2]) + "f";
					   }
					   return d3.format(format);
					   }
					   var d3_scale_linearFormatSignificant = {
					   s: 1,
					   g: 1,
					   p: 1,
					   r: 1,
					   e: 1
				       };
				       function d3_scale_linearPase, x) : -Math.pow(base, -x);
			       }
			       function scale(x) {
				   return linear(log(x));
			       }
			       scale.invert = function(x) {
				   return pow(linear.invert(x));
			       };
			       scale.d )o( =; ;++) ticks.push(pow(i) * k);
			   ticks.push(pow(i));
		       } else {
			   ticks.push(pow(i));
			   for (;i++ < j; ) for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k);
		       }
		       for (i = 0; ticks[i] < u; i++) {}
		       for (j = ticks.length; ticks[j - 1] > v; j--) {}
		       ticks = ticks.slice(i, j);
		   }
		   return ticks;
	       };
	       s d3_scale_logNiceNegative = {
		   floor: function(x) {
		       return -Math.ceil(-x);
		   },
		   ceil: function(x) {
		       return -Math.floor(-x);
		   }
	       };
	       d3.scale.pow = function() {
		   return d3_scale_pow(d3.scale.linear(), 1, [ 0, 1 ]);
	       };
	       function d3_scale_pow(linear, exponent, domain) {
		   var powp = dents.length) return exponent;
	       powp = d3_scale_powPow(exponent = x);
	       powb = d3_scale_powPow(1 / exponent);
	       linear.domain(domain.map(powp));
	       return scale;
	   };
	   scale.copy = function() {
	       return d3_scale_pow(linear.copy(), expoe.domain = function(x) {
		       if (!arguments.length) return domain;
		       domain = [];
		       index = new d3_Map();
		       var i = -1, n = x.length, xi;
		       while if (arguments.length < 3) outerPadding = padding;
		       var reverse = x[1] < x[0], start = x[reverse -uments
							    };
		       return scale;
		   };
		   scale.rangeBand = function() {
		       return rangeBand;
		   };
		   scale.rangeExtent = function() {
		       return d3_scaleExtent(ranger.a[0]);
		   };
		   scale.copy = function() {
		       return d3_scale_ordinal(domain, 14408589, 1556175, 10410725 ].map(d3_rgbString);
		       var d3_category20b = [ 3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 113   domain = x.map(d3_number).filter(d3_numeric).sort(d3_ascending);
					      return rescale();
					      };
		       scale.range = function(x) {
			   if (!arguments.length) return range;
			   range = x;
			   return rescale();  if (!arguments.length) retur(y);
			   return [ domain[y - 1], domain[y] ];
		       };
		       scale.copy = functio  function arc() {
			   var r0 = innerRadius.apply(this, arguments), r1 = outerRa * c1 + "," + r1 * s1 + "L0,0" + "Z";
		       }
		       arc.innerRadius = function(v) {
			   if (!arguments.length) return innerRadius;
			   d.innerRadius;
		       }
		       function d3_svg_arcOuterRadius(d) {
			   return d.outerRadius;
		       }
		       function d3_svg_arcStartAngle(d) {
			   return d.startAngle;
		       }
		       function d3_sents.length) return x;
		   x = _;
		   return line;
		   };
	       line.y = function(_) {
		   if (!: d3_svg_lineBasis,
		       "basis-open": d3_svg_lineBasisOpen,
		       "basis-closed": d3_svg_lineBasisClosed,
		       bundle: d3_svg_lineBundle,
		       ts[i])[1], "H", p[0]);
	       return path.join("");
	   }
	   function d3_svg_lineStepAfter(points) {
	       var i = 0, n = ts, tangents) {
	       if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
		   return d3_svg_lineLinear(points);
	       }
	       var quad = poin  }
	   return path;
	   }
       function d3_svg_lineCardinalTangents(points, tension) {
	   var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
	   while (++i < n) {
	       p0 = p1;
	       p1 = p2;
	       p2 = points[i];
	       tangend3_svg_lineBasisOpen(points) {
		   if (points.length < 4) return d3_svg_lineLinear(points);
		   var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
		   while (++i < 3) {
		       pi = points[i];
		       px.push(pi[0]);
		       py.push(pi[1]);
		   }
		   path.push(d3_svg_lineDot4(d3_svg_lhift();
					     py.push(pi[1]);
					     d3_svg_lineBasisBezier(path, px, py);
					     }
			     return path.join("");
			     }
		       function d3_svg_lineBundle(points, tension) {
		       var n = points.length - 1;
		       if (n) {
			   var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
			   while (++i <=isBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_l     m[i + 1] = s * b;
		       }
		   }
	       }
	       i = -1;
	       while (++i <= j) {
		   s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (om_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpo();
											  return segments.length ? segments.joy = (interpolate = d3_svg_lineInterpolatorsAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEnd   }
											  chord.radius = function(v) {
											      if (!arguments.length) retu= [ p0, {
													  x: p0.x,
													  y: return diagon"," + r + " 0 1,1 0," + r + "Z";
												      }
												  var d3_svg_symbols = d3.map({
													  lSqrt3), ry = ar id = this.id, subgroups = [], subnsition__[id];
												      subnodes = selector.call(nodode().__tra
															       this.removeAttributeNS(n  function attrTweenNS(d, i) {
																       var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local)) d3_transition_tween(this, "style." + name, value, styleString);
																   };
																   d3_transitionPrototype.styleTween = function(name,rguments.length < 1) return this.node().__transition_ax(1, value), function(node) {
																       node.__troups.push(subgroup = []);
																       for (var group = th        timer.t = delay + time;
																	    i  if (--lock.count) delete lock[id]; else delete node.__transition__;
																	    return 1;
																	    }
																   }, 0, time);
															       }
												      }
												  d3.svg.axis = function() {
												      var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, innerTickSize = 6, outerTickSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_;
												      function axis(g) {
													  g.each(function() {
														  vastyle("opacity", 1), tickSpacing = Math.max(innerTickSize, 0) + tickPadding, tickTransform;
														  var range = d3_scaleRange(scale1), path = g.selectAll(".domain").data([ 0 ]), pathUpdate = (path.enter().append("path").attr("class", "domain"), 
																									      d3.transition(pathg_axisY, x1 = "y", y1 = "x", x2 = "y2", y2 = "x2";
																											    text.attr("dy", ".32em").style("text-anchor", sign < 0 ? "end" : "start");
																											    pathUpdate.attr("d", "M" + sign * outerTickSize + = x;
																													    return axis;
																													    };
																											    axis.orient = function(x) {
																												if (!arguments.length) return orient;
																												orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
																												return axis;
																											    };
																											    axis.ticks = function() {
																												if (!arguments.length) return turn outerTickSize;
																												outerTickSize = +x;
																												return axis;
																											    };
																											    axis.tickPadding = function(x) {
																												if (!arguments.length) return tickPadding;
																												tickPadding = +x;
																												return axis;
																											    };
																											    axis.tickSubdivide = function() {
																												return arguments.length && axis;
																											    };
																											    true, yClamp = true, resizes = d3_svg_brushResizes[0];
																											    function brush(g) {
																												g.each(function() {
																													var g = d  return /^[ns]/.test(d) ? -3 : null;
																												    }).attr("width", 6).attr("height", 6).style("visibility", "his).transition().each("start.brush", function() {
            xExte         event_({
            type: "brushstart"
          });
          event_({
            type: "brush",
   st(resizing) && y, dragging = eventTarget.classed("extent"), dragRestore = d3_event_dragSuppress(), center, origin = d3.mouse(target), offset;
      var w = d3.  origiarguments= tion(d) {
        retur
        }
      }, 30 ], [l: d3_identity
  };
  d3_time_sc;
  };
  d3.text = d3_xhrT