/* */ 
(function(process) {
  (function() {
    if (!window.WL) {
      var Hf = "download",
          n = "interface_method",
          Yd = "WL.Internal.jsonp.",
          Ke = 2000,
          fc = "body",
          K = "callback",
          gc = "code",
          Xe = "element",
          bc = "error",
          Be = "error_description",
          Qb = "logging",
          nd = "tracing",
          Rb = "message",
          w = "method",
          Mb = "file_input",
          Wc = "stream_input",
          P = "file_name",
          O = "file_output",
          o = "overwrite",
          q = "path",
          ud = "pretty",
          ff = "result",
          gf = "status",
          Vc = "return_ssl_resources",
          Pe = "success",
          hf = "error",
          Pc = "suppress_redirects",
          wb = "suppress_response_codes",
          t = "x_http_live_library",
          cc = 0,
          Gb = 1,
          b = "access_token",
          Lf = "appstate",
          r = "authentication_token",
          mc = "client_id",
          Nf = "display",
          Sd = "code",
          k = "error",
          V = "error_description",
          qc = "expires",
          jc = "expires_in",
          Pf = "locale",
          ac = "redirect_uri",
          td = "response_type",
          yf = "request_ts",
          H = "scope",
          Kd = "session",
          ef = "secure_cookie",
          Pd = "state",
          y = "status",
          sf = [b, r, H, jc, qc],
          B = "connected",
          zd = "notConnected",
          If = "unchecked",
          X = "unknown",
          Id = "expiring",
          Of = "expired",
          dc = "live-sdk-upload",
          Tb = "live-sdk-download",
          Qf = "appId",
          Af = "channelUrl",
          Mf = "wl_auth",
          Bf = "wl_upload",
          Hd = "page",
          Cf = "touch",
          C = "none",
          jf = "none",
          Yb = "auth.login",
          Vb = "auth.logout",
          db = "auth.sessionChange",
          Eb = "auth.statusChange",
          tc = "wl.log",
          A = "access_denied",
          ne = "connection_failed",
          Re = "invalid_cookie",
          Kb = "invalid_request",
          ib = "request_canceled",
          h = "request_failed",
          Dd = "timed_out",
          gb = "unknown_user",
          Le = "user_canceled",
          ie = "METHOD: Failed to get the required user permission to perform this operation.",
          je = "The request could not be completed due to browser issues.",
          ke = "The request could not be completed due to browser limitations.",
          hb = "METHOD: The operation has been canceled.",
          fe = "The 'wl_auth' cookie is not valid.",
          ee = "The 'wl_auth' cookie has been modified incorrectly. Ensure that the redirect URI only modifies sub-keys for values received from the OAuth endpoint.",
          ae = "The 'wl_auth' cookie has multiple values. Ensure that the redirect URI specifies a cookie domain and path when setting cookies.",
          Rc = "METHOD: The input property 'PARAM' does not reference a valid DOM element.",
          Yc = "METHOD: An exception was received for EVENT. Detail: MESSAGE",
          Sc = "METHOD: The WL object must be initialized with WL.init() prior to invoking this method.",
          Nc = "A connection to the server could not be established.",
          de = "The user could not be identified.",
          oe = "The pending login request has been canceled.",
          Bc = "Logging out the user is not supported in current session because the user is logged in with a Microsoft account on this computer. To logout, the user may quit the app or log out from the computer.",
          Jc = "METHOD: The input value for parameter/property 'PARAM' is not valid.",
          Kc = "METHOD: The input parameter/property 'PARAM' must be included.",
          Cc = "METHOD: The type of the provided value for the input parameter/property 'PARAM' is not valid.",
          Z = "METHOD: There is a pending METHOD request, the current call will be ignored.",
          tb = Z.replace(/METHOD/g, "WL.login"),
          Wd = Z.replace(/METHOD/g, "WL.fileDialog"),
          Zd = Z.replace(/METHOD/g, "WL.upload"),
          ce = "METHOD: The input property 'redirect_uri' is required if the value of the 'response_type' property is 'code'.",
          yc = "WL.init: The redirect_uri value should be the same as the value of 'Redirect Domain' of your registered app. It must begin with 'http://' or 'https://'.",
          be = "METHOD: The api call is not supported on this platform.",
          wc = "WL.init: The response_type value 'code' is not supported on this platform.",
          Se = "METHOD: The input property 'redirect_uri' must use https: to match the scheme of the current page.",
          le = "The auth request is timed out.",
          qe = "The popup is closed without receiving consent.",
          Ye = 0,
          ge = 1,
          me = 2,
          Te = 3,
          S = "GET",
          wd = "POST",
          Bd = "PUT",
          kd = "DELETE",
          kf = "COPY",
          lf = "MOVE",
          pe = 30000,
          Ud = "METHOD",
          f = "onSuccess",
          g = "onError",
          m = "onProgress",
          Df = "redirect_type",
          Ue = "auth",
          Ee = "upload",
          Ve = "code",
          Me = "token",
          ob = "https:",
          rb = "http:",
          D = "wl.signin",
          tf = "wl.skydrive",
          ve = "wl.skydrive_update",
          Wb = /\s|,/,
          W = "boolean",
          Rf = "dom",
          j = "function",
          Jd = "number",
          c = "string",
          F = "object",
          Pb = "string_or_array",
          lb = "undefined",
          Ff = "name",
          of = "element",
          vf = "brand",
          Gf = "type",
          we = "sign_in_text",
          re = "sign_out_text",
          wf = "theme",
          Oe = "onloggedin",
          Ge = "onloggedout",
          pf = "onerror",
          We = "messenger",
          mf = "hotmail",
          cf = "skydrive",
          nf = "windows",
          Fe = "windowslive",
          Ef = "none",
          Od = "signin",
          Ae = Od,
          Je = "login",
          se = "connect",
          ze = "custom",
          He = "blue",
          ye = "white",
          Ie = "dark",
          xe = "light",
          qf = "id",
          xf = "auth_server",
          df = "apiservice_uri",
          rf = "skydrive_uri",
          pc = "sdk_root",
          Sf = "wl_trace";
      window.WL = {
        getSession: function() {
          try {
            return a.getSession();
          } catch (b) {
            M(b.message);
          }
        },
        getLoginStatus: function() {
          try {
            return a.getLoginStatus({
              callback: Ob(arguments, j, 2),
              internal: false
            }, Ob(arguments, W, 2));
          } catch (d) {
            return u("WL.getLoginStatus", d);
          }
        },
        logout: function(b) {
          try {
            U(b, z, "WL.logout");
            return a.logout({callback: b});
          } catch (c) {
            return u("WL.logout", c);
          }
        },
        canLogout: function() {
          return a.canLogout();
        },
        api: function() {
          try {
            var b = Xc(arguments);
            L(b, [{
              name: q,
              type: c,
              optional: false
            }, {
              name: w,
              type: c,
              optional: true
            }, z], "WL.api");
            return a.api(b);
          } catch (f) {
            return u("WL.api", f);
          }
        }
      };
      var kc = [Yb, Vb, db, Eb, tc];
      WL.Event = {
        subscribe: function(b, a) {
          try {
            U([b, a], [{
              name: "event",
              type: c,
              allowedValues: kc,
              caseSensitive: true,
              optional: false
            }, Gc], "WL.Event.subscribe");
            d.subscribe(b, a);
          } catch (e) {
            M(e.message);
          }
        },
        unsubscribe: function(b, a) {
          try {
            U([b, a], [{
              name: "event",
              type: c,
              allowedValues: kc,
              caseSensitive: true,
              optional: false
            }, z], "WL.Event.unsubscribe");
            d.unsubscribe(b, a);
          } catch (e) {
            M(e.message);
          }
        }
      };
      WL.Internal = {};
      var d = {
        subscribe: function(a, b) {
          s("Subscribe " + a);
          var c = d.getHandlers(a);
          c.push(b);
        },
        unsubscribe: function(c, f) {
          s("Unsubscribe " + c);
          var b = d.getHandlers(c),
              e = [];
          if (f != null) {
            var g = false;
            for (var a = 0; a < b.length; a++)
              if (g || b[a] != f)
                e.push(b[a]);
              else
                g = true;
          }
          d._eHandlers[c] = e;
        },
        getHandlers: function(b) {
          if (!d._eHandlers)
            d._eHandlers = {};
          var a = d._eHandlers[b];
          if (a == null)
            d._eHandlers[b] = a = [];
          return a;
        },
        notify: function(c, e) {
          s("Notify " + c);
          var b = d.getHandlers(c);
          for (var a = 0; a < b.length; a++)
            b[a](e);
        }
      },
          a = {
            _status: cc,
            _statusRequests: [],
            _rpsAuth: false
          };
      a.appInit = function(c) {
        if (a._status == Gb) {
          var e = a._session.getNormalStatus();
          return J("WL.init", true, c.callback, e);
        }
        var b = WL[pc];
        if (b) {
          if (b.charAt(b.length - 1) !== "/")
            b += "/";
          a[pc] = b;
        }
        var d = c[Qb];
        if (d === false)
          a._logEnabled = d;
        if (a.testInit)
          a.testInit(c);
        a._status = Gb;
        return Mc(c);
      };
      a.onloadInit = function() {
        Cd();
        Fd();
      };
      function x(b) {
        if (a._status === cc)
          throw new Error(Sc.replace("METHOD", b));
      }
      function sb() {
        return WL.Internal.tApp || a;
      }
      a.api = function(a) {
        x("WL.api");
        var c = a[fc];
        if (c) {
          a = E(kb(c), a);
          delete a[fc];
        }
        var b = a[w];
        a[w] = (b != null ? G(b) : S).toUpperCase();
        return (new rc(a)).execute();
      };
      var Zc = function() {
        var b = a.api.lastId,
            c;
        b = b === undefined ? 1 : b + 1;
        c = "WLAPI_REQ_" + b + "_" + (new Date).getTime();
        a.api.lastId = b;
        return c;
      },
          rc = function(b) {
            var c = this;
            c._properties = b;
            c._completed = false;
            c._id = Zc();
            b[ud] = false;
            b[Vc] = a._isHttps;
            b[t] = a[t];
            var d = b[q];
            c._url = Zb() + (d.charAt(0) === "/" ? d.substring(1) : d);
            c._promise = new e("WL.api", null, null);
          };
      rc.prototype = {
        execute: function() {
          qd(this);
          return this._promise;
        },
        onCompleted: function(a) {
          if (this._completed)
            return;
          this._completed = true;
          l(this._properties.callback, a, true);
          if (a[k])
            this._promise[g](a);
          else
            this._promise[f](a);
        }
      };
      function ld(e, c, a, d) {
        a = a ? G(a) : "";
        var b = a !== "" ? ec(a) : null;
        if (b === null) {
          b = {};
          if (c / 100 !== 2)
            b[bc] = pd(c, d);
        }
        e.onCompleted(b);
      }
      function pd(c, b) {
        var a = {};
        a[gc] = h;
        a[Rb] = b || Nc;
        return a;
      }
      function Lb() {
        var d = null;
        if (!a._rpsAuth) {
          var c = sb()._session.getStatus();
          if (c.status === Id || c.status === B)
            d = c.session[b];
        }
        return d;
      }
      function kb(i) {
        var c = {};
        for (var b in i) {
          var a = i[b],
              j = typeof a;
          if (a instanceof Array)
            for (var d = 0; d < a.length; d++) {
              var f = a[d],
                  l = typeof f;
              if (j == F && !(a instanceof Date)) {
                var h = kb(f);
                for (var e in h)
                  c[b + "." + d + "." + e] = h[e];
              } else
                c[b + "." + d] = f;
            }
          else if (j == F && !(a instanceof Date)) {
            var k = kb(a);
            for (var g in k)
              c[b + "." + g] = k[g];
          } else
            c[b] = a;
        }
        return c;
      }
      function ad(c) {
        if (!Qd())
          return false;
        var b = sd(c),
            a = new XMLHttpRequest;
        a.open(b.method, b.url, true);
        var d = c._properties[w];
        if (b.method != S)
          a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        a.onreadystatechange = function() {
          if (a.readyState == 4)
            ld(c, a.status, a.responseText);
        };
        a.send(b.body);
        return true;
      }
      function sd(e) {
        var a = od(e._properties, null, [K, q, w]),
            f = e._properties[w],
            g = Nb(e._url, {"ts": (new Date).getTime()}),
            h = Lb(),
            d,
            c;
        a[Pc] = "true";
        a[wb] = "true";
        if (h != null)
          a[b] = h;
        if (f === S || f === kd) {
          d = null;
          c = S;
          g += "&" + fb(a);
        } else {
          d = fb(a);
          c = wd;
        }
        g += "&method=" + f;
        return {
          url: g,
          method: c,
          body: d
        };
      }
      a.download = function(a) {
        Fc(a);
        x("WL.download");
        return (new Ub(a)).execute();
      };
      function Hb(c, f) {
        var d = f || {},
            g = Zb();
        if (!mb(c))
          c = g + (c.charAt(0) === "/" ? c.substring(1) : c);
        var e = Lb();
        if (e)
          d[b] = e;
        d[t] = a[t];
        return Nb(c, d);
      }
      function yb(a, b) {
        b.downloadComplete(false, p(h, "WL.download: " + a));
      }
      var xb = "notStarted",
          Ib = "ready",
          Y = "downloadCompleted",
          vb = "downloadFailed",
          zb = "canceled",
          Ec = "completed";
      function Ub(a) {
        this._properties = a;
        this._status = xb;
      }
      Ub.prototype = {
        execute: function() {
          this._promise = new e("WL.download", this, null);
          this._process();
          return this._promise;
        },
        cancel: function() {
          this._status = zb;
          if (this._cancel)
            try {
              this._cancel();
            } catch (a) {}
          else {
            this._result = p(ib, hb.replace("METHOD", "WL.download"));
            this._process();
          }
        },
        downloadComplete: function(b, c) {
          var a = this;
          a._result = c;
          a._status = b ? Y : vb;
          a._process();
        },
        downloadProgress: function(a) {
          this._promise[m](a);
        },
        _process: function() {
          switch (this._status) {
            case xb:
              this._start();
              break;
            case Ib:
              this._download();
              break;
            case Y:
            case vb:
            case zb:
              this._complete();
          }
        },
        _start: function() {
          var b = this;
          a.getLoginStatus({
            internal: true,
            callback: function() {
              b._status = Ib;
              b._process();
            }
          });
        },
        _download: function() {
          var a = this;
          Ad(a);
        },
        _complete: function() {
          var a = this,
              c = a._result,
              d = a._status === Y ? f : g;
          a._status = Ec;
          var b = a._properties[K];
          if (b)
            b(c);
          a._promise[d](c);
        }
      };
      a.login = function(b, d) {
        x("WL.login");
        dd(b);
        if (!jd(d))
          return J("WL.login", false, null, p(h, tb));
        var c = a._session.tryGetResponse(b.normalizedScope);
        if (c != null)
          return J("WL.login", true, b.callback, c);
        a._pendingLogin = id(b, Tc);
        return a._pendingLogin.execute();
      };
      function Tc(c, b) {
        a._pendingLogin = null;
        var d = b[k];
        if (d)
          I("WL.login: " + b[V]);
        else
          l(c.callback, b, true);
      }
      function ed(b) {
        var a = b || "";
        if (a instanceof Array)
          a = a.join(" ");
        return G(a);
      }
      a.getSession = function() {
        x("WL.getSession");
        return a._session.getStatus()[Kd];
      };
      a.getLoginStatus = function(b, f) {
        x("WL.getLoginStatus");
        b = b || {};
        if (!f) {
          var d = a._session.tryGetResponse();
          if (d)
            return J("WL.getLoginStatus", true, b.callback, d);
        }
        s("wl_app:getLoginStatus");
        var e = a._statusRequests,
            c = null;
        if (!a._pendingStatusRequest) {
          c = Ic(b, Hc);
          a._pendingStatusRequest = c;
        }
        e.push(b);
        if (c != null)
          c.execute();
        return a._pendingStatusRequest._promise;
      };
      function Hc(h, b) {
        var f = a._statusRequests;
        a._pendingStatusRequest = null;
        s("wl_app:onGetLoginStatusCompleted");
        var d = b[k],
            e = false;
        while (f.length > 0) {
          var c = f.shift(),
              g = E(b);
          if (!d || c.internal)
            l(c.callback, g, true);
          if (!c.internal)
            e = true;
        }
        if (d)
          if (e && d !== Dd)
            I("WL.getLoginStatus: " + b[V]);
          else
            s("wl_app-onGetLoginStatusCompleted: " + b[V]);
      }
      a.logout = function(i) {
        var b = "WL.logout";
        x(b);
        var d = new e(b, null, null),
            c = function(c) {
              qb(function() {
                var e,
                    h = f;
                if (c) {
                  M(c.message);
                  h = g;
                  e = eb(b, b, c);
                } else
                  e = a._session.getNormalStatus();
                l(i.callback, e, false);
                d[h](e);
              });
            },
            h = function() {
              var b = a._session;
              if (b.isSignedIn())
                if (a.canLogout()) {
                  b.updateStatus(X);
                  rd(c);
                } else
                  c(new Error(Bc));
              else
                c();
            };
        if (a._pendingStatusRequest != null)
          a.getLoginStatus({
            internal: true,
            callback: h
          }, false);
        else
          h();
        return d;
      };
      a.upload = function(a) {
        var b = a[n];
        x(b);
        L(a, [{
          name: q,
          type: c,
          optional: false
        }, z], b);
        Ac(a);
        Oc(a);
        return (new jb(a)).execute();
      };
      function Oc(a) {
        var b = a[Mb],
            c = a[P];
        if (b)
          a[P] = c || b.name;
      }
      function Dc(a, h, i) {
        var c = a.indexOf("?"),
            e = c !== -1,
            g = "";
        if (e) {
          g = a.substring(c + 1);
          a = a.substring(0, c);
        }
        var f = typeof h !== lb,
            j = a.charAt(a.length - 1) === "/";
        if (f && !j)
          a += "/";
        var b = a,
            d = {};
        if (f)
          b += encodeURIComponent(h);
        if (i === "rename")
          d[o] = "choosenewname";
        else
          d[o] = i;
        if (e)
          b = Sb(b, g);
        return cb(b, d);
      }
      function Nd(a) {
        return /^(file|\/file)/.test(a.toLowerCase());
      }
      function cb(b, a) {
        a = a || {};
        a[wb] = "true";
        return Hb(b, a);
      }
      function Ac(a) {
        if (o in a) {
          var b = a[n],
              d = a[o],
              f = typeof d,
              h = f === W,
              e = f === c;
          if (!(h || e))
            throw v(o, b);
          if (e) {
            var g = /^(true|false|rename)$/i.test(d);
            if (!g)
              throw Cb(o, b);
          }
        } else
          a[o] = false;
      }
      var Ab = 0,
          Bb = 1,
          bb = 2,
          ab = 3,
          N = 4,
          Fb = 5,
          Lc = 6;
      function jb(a) {
        this._props = a;
        this._status = Ab;
      }
      jb.prototype = {
        execute: function() {
          var a = this;
          a._strategy = a._getStrategy(a._props);
          a._promise = new e(a._props[n], a, null);
          a._process();
          return a._promise;
        },
        cancel: function() {
          var a = this;
          a._status = Fb;
          if (a._cancel)
            try {
              a._cancel();
            } catch (c) {}
          else {
            var b = hb.replace(Ud, a._props[n]);
            a._result = p(ib, b);
            a._process();
          }
        },
        uploadProgress: function(a) {
          this._promise[m](a);
        },
        uploadComplete: function(b, c) {
          var a = this;
          a._result = c;
          a._status = b ? ab : N;
          a._process();
        },
        onErr: function(c) {
          var a = this._props[n] + ":" + c,
              b = p(h, a);
          this.uploadComplete(false, b);
        },
        onResp: function(a) {
          a = a ? G(a) : "";
          var b = a !== "" ? ec(a) : null;
          b = b || {};
          this.uploadComplete(b.error == null, b);
        },
        setFileName: function(a) {
          this._props[P] = a;
        },
        _process: function() {
          switch (this._status) {
            case Ab:
              this._start();
              break;
            case Bb:
              this._getUploadPath();
              break;
            case bb:
              this._upload();
              break;
            case ab:
            case N:
            case Fb:
              this._complete();
          }
        },
        _start: function() {
          var a = this;
          sb().getLoginStatus({
            internal: true,
            callback: function() {
              a._status = Bb;
              a._process();
            }
          });
        },
        _getUploadPath: function() {
          var a = this,
              c = a._props,
              b = c[q];
          if (mb(b)) {
            a._uploadPath = cb(b);
            a._status = bb;
            a._process();
            return;
          }
          sb().api({path: b}).then(function(i) {
            var d = i.upload_location;
            if (d) {
              var e = yd(b);
              d = Sb(d, e);
              var f = c[P],
                  g = c[o];
              if (Nd(b))
                a._uploadPath = cb(d);
              else
                a._uploadPath = Dc(d, f, g);
              a._status = bb;
            } else {
              a._result = p(h, "WL.upload: Failed to get upload_location of the resource.");
              a._status = N;
            }
            a._process();
          }, function(b) {
            a._result = b;
            a._status = N;
            a._process();
          });
        },
        _upload: function() {
          this._strategy.upload(this._uploadPath);
        },
        _complete: function() {
          var a = this,
              c = a._result,
              d = a._status === ab ? f : g;
          a._status = Lc;
          var b = a._props[K];
          if (b)
            b(c);
          a._promise[d](c);
        }
      };
      function G(a) {
        return a.replace(/^\s+|\s+$/g, "");
      }
      function E(b, d) {
        var c = d || {};
        if (b != null)
          for (var a in b)
            c[a] = b[a];
        return c;
      }
      function od(e, d, b) {
        var c = E(e, d);
        for (var a = 0; a < b.length; a++)
          delete c[b[a]];
        return c;
      }
      function Ld(d, e) {
        var c = [],
            b = {},
            a = function(d) {
              for (var a = 0; a < d.length; a++) {
                arrElm = d[a];
                if (arrElm != "" && !b[arrElm]) {
                  b[arrElm] = true;
                  c.push(arrElm);
                }
              }
            };
        a(d);
        a(e);
        return c;
      }
      function sc(a) {
        return Array.prototype.slice.call(a);
      }
      function T(b, a) {
        return function() {
          if (typeof a === j)
            return a.apply(b, arguments);
        };
      }
      function vc(a, e) {
        a = "[WL]" + a;
        var b = window.console;
        if (b && b.log)
          switch (e) {
            case "warning":
              b.warn(a);
              break;
            case "error":
              b.error(a);
              break;
            default:
              b.log(a);
          }
        var d = window.opera;
        if (d)
          d.postError(a);
        var c = window.debugService;
        if (c)
          c.trace(a);
      }
      function mb(a) {
        return a.indexOf("https://") === 0 || a.indexOf("http://") === 0;
      }
      function s(b) {
        if (a._traceEnabled)
          vc(b);
      }
      function I(b, c) {
        if (a._logEnabled || a._traceEnabled)
          vc(b, c);
        d.notify(tc, b);
      }
      if (window.WL && WL.Internal) {
        WL.Internal.trace = s;
        WL.Internal.log = I;
      }
      function M(a) {
        I(a, "error");
      }
      function ic(a) {
        return document.getElementById(a);
      }
      function yd(b) {
        var a = b.indexOf("?");
        if (a === -1)
          return "";
        var c = b.indexOf("#", a + 1);
        if (c !== -1)
          return b.substring(a + 1, c);
        return b.substring(a + 1);
      }
      function Sb(a, b) {
        if (typeof b === lb || b === null || b === "")
          return a;
        var c = a.indexOf("?");
        if (c === -1)
          return a + "?" + b;
        if (a.charAt(a.length - 1) !== "&")
          a += "&";
        return a + b;
      }
      function Vd(a) {
        E(uc(a), this);
      }
      Vd.prototype = {
        toString: function() {
          var a = this,
              b = (a.scheme != "" ? a.scheme + "//" : "") + a.host + (a.port != "" ? ":" + a.port : "") + a.path;
          return b;
        },
        resolve: function() {
          var a = this;
          if (a.scheme == "") {
            var b = window.location.port,
                c = window.location.host;
            a.scheme = window.location.protocol;
            a.host = c.split(":")[0];
            a.port = b != null ? b : "";
            if (a.path.charAt(0) != "/")
              a.path = fd(a.host, window.location.href, a.path);
          }
        }
      };
      function uc(c) {
        var e = c.indexOf(ob) == 0 ? ob : c.indexOf(rb) == 0 ? rb : "",
            h = "",
            i = "",
            f;
        if (e != "")
          var b = c.substring(e.length + 2),
              a = b.indexOf("/"),
              g = a > 0 ? b.substring(0, a) : b,
              d = g.split(":"),
              h = d[0],
              i = d.length > 1 ? d[1] : "",
              f = a > 0 ? b.substring(a) : "";
        else
          f = c;
        return {
          scheme: e,
          host: h,
          port: i,
          path: f
        };
      }
      function Gd(a) {
        return uc(a.toLowerCase()).host;
      }
      function fd(e, b, h) {
        var d = function(a, c) {
          charIdx = b.indexOf(c);
          a = charIdx > 0 ? a.substring(0, charIdx) : a;
          return a;
        };
        b = d(d(b, "?"), "#");
        var f = b.indexOf(e),
            a = b.substring(f + e.length),
            g = a.indexOf("/"),
            c = a.lastIndexOf("/");
        a = c >= 0 ? a.substring(g, c) : a;
        return a + "/" + h;
      }
      function l(a, b, d, c) {
        if (a != null) {
          if (c)
            b[Pd] = c;
          if (d)
            a(b);
          else
            qb(function() {
              a(b);
            });
        }
      }
      function ec(a) {
        if (window.JSON)
          return JSON.parse(a);
        else
          return eval("(" + a + ")");
      }
      function Td(b, c) {
        var d = b.length;
        for (var a = 0; a < d; a++)
          c(b[a]);
      }
      function R(c, b) {
        var a = {};
        a[k] = c;
        a[V] = b;
        return a;
      }
      function p(d, c) {
        var a = {},
            b = {};
        a[gc] = d, a[Rb] = c;
        b[bc] = a;
        return b;
      }
      function eb(a, b, c) {
        return p(h, Yc.replace("METHOD", a).replace("EVENT", b).replace("MESSAGE", c.message));
      }
      function Uc(b) {
        var a = b.split(".");
        return a[0] + "." + a[1];
      }
      function qb(a, b) {
        if (window.wlUnitTests)
          wlUnitTests.delayInvoke(a);
        else
          window.setTimeout(a, b || 1);
      }
      function Cd() {
        var b = Ed(navigator.userAgent, document.documentMode),
            c = a[t];
        a._browser = b;
        a[t] = c.replace("DEVICE", b.device);
      }
      function Ed(a, e) {
        a = a.toLowerCase();
        var c = "other",
            b = {
              "firefox": /firefox/.test(a),
              "firefox1.5": /firefox\/1\.5/.test(a),
              "firefox2": /firefox\/2/.test(a),
              "firefox3": /firefox\/3/.test(a),
              "firefox4": /firefox\/4/.test(a),
              "ie": (/msie/.test(a) || /trident/.test(a)) && !/opera/.test(a),
              "ie6": false,
              "ie7": false,
              "ie8": false,
              "ie9": false,
              "ie10": false,
              "ie11": false,
              "opera": /opera/.test(a),
              "webkit": /webkit/.test(a),
              "chrome": /chrome/.test(a),
              "mobile": /mobile/.test(a) || /phone/.test(a)
            };
        if (b["ie"]) {
          var d = 0;
          if (e)
            d = e;
          else if (/msie 7/.test(a))
            d = 7;
          d = Math.min(11, Math.max(d, 6));
          c = "ie" + d;
          b[c] = true;
        } else if (b.firefox)
          c = "firefox";
        else if (b.chrome)
          c = "chrome";
        else if (b.webkit)
          c = "webkit";
        else if (b.opera)
          c = "opera";
        if (b.mobile)
          c += "mobile";
        b.device = c;
        return b;
      }
      function fb(b) {
        var a = "";
        if (b != null)
          for (var c in b) {
            var d = a.length == 0 ? "" : "&",
                e = b[c];
            a += d + encodeURIComponent(c) + "=" + encodeURIComponent(gd(e));
          }
        return a;
      }
      function gd(a) {
        if (a instanceof Date) {
          var b = function(a, b) {
            switch (b) {
              case 2:
                return a < 10 ? "0" + a : a;
              case 3:
                return (a < 10 ? "00" : a < 100 ? "0" : "") + a;
            }
          };
          return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1, 2) + "-" + b(a.getUTCDate(), 2) + "T" + b(a.getUTCHours(), 2) + ":" + b(a.getUTCMinutes(), 2) + ":" + b(a.getUTCSeconds(), 2) + "." + b(a.getUTCMilliseconds(), 3) + "Z";
        }
        return "" + a;
      }
      function Nb(a, b) {
        return a + (a.indexOf("?") < 0 ? "?" : "&") + fb(b);
      }
      var z = {
        name: K,
        type: j,
        optional: true
      },
          Gc = {
            name: K,
            type: j,
            optional: false
          };
      function U(a, c, d) {
        if (a instanceof Array)
          for (var b = 0; b < a.length; b++)
            lc(a[b], c[b], d);
        else
          lc(a, c, d);
      }
      function lc(c, a, b) {
        Xb(c, a, b);
        if (a.type === "properties")
          L(c, a.properties, b);
      }
      function Xb(f, e, b) {
        var d = e.name,
            a = typeof f,
            g = e.type;
        if (a === "undefined" || f == null)
          if (e.optional)
            return;
          else
            throw Db(d, b);
        switch (g) {
          case "string":
            if (a !== c)
              throw v(d, b);
            if (!e.optional && G(f) === "")
              throw Db(d, b);
            break;
          case "properties":
            if (a != F)
              throw v(d, b);
            break;
          case "function":
            if (a != j)
              throw v(a, b);
            break;
          case "dom":
            if (a == c) {
              if (ic(f) == null)
                throw new Error(Rc.replace("METHOD", b).replace("PARAM", d));
            } else if (a != F)
              throw v(d, b);
            break;
          case "string_or_array":
            if (a !== c && !(f instanceof Array))
              throw v(a, b);
            break;
          default:
            if (a !== g)
              throw v(d, b);
        }
        if (e.allowedValues != null)
          bd(f, e.allowedValues, e.caseSensitive, d, b);
      }
      function L(g, c, f) {
        var d = g || {};
        for (var b = 0; b < c.length; b++) {
          var a = c[b],
              e = d[a.name] || d[a.altName];
          Xb(e, a, f);
        }
      }
      function bd(d, a, e, f, h) {
        var g = typeof a[0] === c;
        for (var b = 0; b < a.length; b++)
          if (g && !e) {
            if (d.toLowerCase() === a[b].toLowerCase())
              return;
          } else if (d === a[b])
            return;
        throw Cb(f, h);
      }
      function v(a, b) {
        return new Error(Cc.replace("METHOD", b).replace("PARAM", a));
      }
      function Db(a, b) {
        return new Error(Kc.replace("METHOD", b).replace("PARAM", a));
      }
      function Cb(c, d, a) {
        var b = Jc.replace("METHOD", d).replace("PARAM", c);
        if (typeof a !== lb)
          b += " " + a;
        return new Error(b);
      }
      function Ob(b, d, c) {
        if (b)
          for (var a = 0; a < c && a < b.length; a++)
            if (d === typeof b[a])
              return b[a];
        return undefined;
      }
      function Q(h, g) {
        var e = sc(h),
            a = null,
            b = null;
        for (var d = 0; d < e.length; d++) {
          var c = e[d],
              f = typeof c;
          if (f === F && a === null)
            a = E(c);
          else if (f === j && b === null)
            b = c;
        }
        a = a || {};
        if (b)
          a.callback = b;
        a[n] = g;
        return a;
      }
      function Xc(e) {
        var a = sc(e),
            d = null,
            b = null;
        if (typeof a[0] === c) {
          d = a.shift();
          if (typeof a[0] === c)
            b = a.shift();
        }
        normalizedArgs = Q(a);
        if (d !== null) {
          normalizedArgs[q] = d;
          if (b != null)
            normalizedArgs[w] = b;
        }
        return normalizedArgs;
      }
      function u(a, b) {
        var c = eb(a, a, b);
        M(b.message);
        return J(a, false, null, c);
      }
      var e = function(b, c, a) {
        this._name = b;
        this._op = c;
        this._uplinkPromise = a;
        this._isCompleted = false;
        this._listeners = [];
      };
      e.prototype = {
        then: function(d, h, c) {
          var b = new e(null, null, this),
              a = {};
          a[f] = d;
          a[g] = h;
          a[m] = c;
          a.chainedPromise = b;
          this._listeners.push(a);
          return b;
        },
        cancel: function() {
          if (this._isCompleted)
            return;
          if (this._uplinkPromise && !this._uplinkPromise._isCompleted)
            this._uplinkPromise.cancel();
          else {
            var a = this._op ? this._op.cancel : null;
            if (typeof a === j)
              this._op.cancel();
            else
              this.onError(p(ib, hb.replace("METHOD", this._getName())));
          }
        },
        _getName: function() {
          if (this._name)
            return this._name;
          if (this._op && typeof this._op._getName === j)
            return this._op._getName();
          if (this._uplinkPromise)
            return this._uplinkPromise._getName();
          return "";
        },
        _onEvent: function(b, a) {
          if (this._isCompleted)
            return;
          this._isCompleted = a !== m;
          this._notify(b, a);
        },
        _notify: function(b, a) {
          var c = this;
          Td(this._listeners, function(i) {
            var j = i[a],
                d = i.chainedPromise,
                h = a !== m;
            if (j)
              try {
                var e = j.apply(i, b);
                if (h && e && e.then) {
                  d._op = e;
                  e.then(function(a) {
                    d[f](a);
                  }, function(a) {
                    d[g](a);
                  }, function(a) {
                    d[m](a);
                  });
                }
              } catch (k) {
                if (h)
                  d.onError(eb(c._getName(), a, k));
              }
            else if (h)
              d[a].apply(d, b);
          });
        }
      };
      e.prototype[f] = function() {
        this._onEvent(arguments, f);
      };
      e.prototype[g] = function() {
        this._onEvent(arguments, g);
      };
      e.prototype[m] = function() {
        this._onEvent(arguments, m);
      };
      function J(h, d, b, i) {
        var a = new e(h, null, null),
            c = d ? f : g;
        if (typeof b === j)
          a.then(function(a) {
            b(a);
          });
        qb(function() {
          a[c](i);
        });
        return a;
      }
      var sf = [b, r, H, jc, qc],
          hc = "apiservice_uri",
          nc = "auth_server",
          Xd = -2147023579;
      WL.init = function(d) {
        try {
          var b = E(d);
          U(b, {
            name: "properties",
            type: "properties",
            optional: false,
            properties: [{
              name: H,
              type: Pb,
              optional: true
            }, {
              name: ac,
              type: c,
              optional: true
            }, {
              name: Qb,
              type: W,
              optional: true
            }]
          }, "WL.init");
          return a.appInit(b);
        } catch (e) {
          return u("WL.init", e);
        }
      };
      WL.login = function() {
        try {
          var b = Q(arguments);
          L(b, [{
            name: H,
            type: Pb,
            optional: true
          }, z], "WL.login");
          return a.login(b);
        } catch (e) {
          return u("WL.login", e);
        }
      };
      WL.backgroundDownload = function() {
        try {
          var b = "WL.backgroundDownload",
              c = Q(arguments, b);
          return a.download(c);
        } catch (f) {
          return u(b, f);
        }
      };
      WL.backgroundUpload = function() {
        try {
          var b = "WL.backgroundUpload",
              c = Q(arguments, b);
          return a.upload(c);
        } catch (f) {
          return u(b, f);
        }
      };
      function Mc(b) {
        a._authScope = ed(b[H]);
        if (b[td] === Sd)
          throw new Error(wc);
        a._isHttps = true;
        a._authScope = Qc(a._authScope);
        if (b[nd])
          a._traceEnabled = true;
        a._domain = md(b);
        var d = Windows.Security.Authentication.Web.WebAuthenticationBroker.getCurrentApplicationCallbackUri().absoluteUri;
        b[mc] = d;
        xc();
        a._session = new oc(d);
        var c = new e("WL.init");
        a.getLoginStatus({
          internal: true,
          callback: function(a) {
            var b = !!a.error ? g : f;
            c[b](a);
          }
        }, true);
        return c;
      }
      function md(c) {
        var a = c[ac],
            b = null;
        if (a != null)
          if (a.indexOf(rb) === 0 || a.indexOf(ob) === 0)
            b = Gd(a);
          else
            throw new Error(yc);
        return b;
      }
      function Fd() {
        a._logEnabled = true;
        a._traceEnabled = false;
        hd(function() {
          var a = window.wlAsyncInit;
          if (a && typeof a === j)
            a.call();
        });
      }
      function Qc(a) {
        a = a || D;
        if (a.indexOf(D) < 0)
          a = a + " " + D;
        return G(a);
      }
      function xc() {
        var b = Windows.Networking.BackgroundTransfer,
            a = function(a) {
              try {
                var b = a.attachAsync().then(function() {}, function() {}, function() {});
              } catch (c) {}
            };
        b.BackgroundDownloader.getCurrentDownloadsAsync(Tb).then(function(b) {
          if (b && b.size > 0)
            for (i = 0; i < b.size; i++)
              a(b[i]);
        });
        b.BackgroundUploader.getCurrentUploadsAsync(dc).then(function(b) {
          if (b && b.size > 0)
            for (i = 0; i < b.size; i++)
              a(b[i]);
        });
      }
      function jd(c) {
        var b = a._pendingLogin;
        if (b != null) {
          if (!c)
            I(tb);
          return false;
        }
        return true;
      }
      function dd(d) {
        var b = d[H] || [],
            e = a._authScope.split(Wb);
        if (typeof b === c)
          b = b.split(Wb);
        d.normalizedScope = Ld(e, b).join(" ");
      }
      function id(a, b) {
        return new pb(Hd, a.normalizedScope, a, b);
      }
      function Ic(c, b) {
        return new pb(C, a._authScope, c, b);
      }
      a.canLogout = function() {
        return Windows.Security.Authentication.OnlineId.OnlineIdAuthenticator().canSignOut;
      };
      function rd(a) {
        try {
          var c = Windows.Security.Authentication.OnlineId,
              b = new c.OnlineIdAuthenticator,
              d = b.signOutUserAsync().then(function() {
                a();
              }, a);
        } catch (e) {
          I(e);
          a(e);
        }
      }
      var pb = function(b, g, c, d) {
        var a = this;
        a._display = b;
        a._completed = false;
        a._requestFired = false;
        a._properties = c;
        a._callback = d;
        a._scope = g;
        var f = b === C ? "WL.login" : "WL.getLoginStatus";
        a._promise = new e(f, null, null);
      };
      pb.prototype = {
        execute: function() {
          return this._sendRequest(this._scope);
        },
        _sendRequest: function(b) {
          var a = this,
              d = T(a, a._onResponse),
              c = Windows.Security.Authentication.OnlineId,
              e = a._display === C ? c.CredentialPromptType.doNotPrompt : c.CredentialPromptType.promptIfNeeded;
          a._currentScope = b;
          vd(e, b, d);
          return a._promise;
        },
        _onResponse: function(b) {
          var a = this;
          if (a._display === C && b[k] === A && a._currentScope !== D)
            a._sendRequest(D);
          else
            a._onComplete(b);
        },
        _onComplete: function(c) {
          var e = this;
          if (!e._completed) {
            e._completed = true;
            if (e._display === C && e._scope === D && (c[k] === A || c[k] === gb)) {
              var i = c[k] === A ? zd : X;
              a._session.updateStatus(i);
            } else
              a._session.onAuthResponse(c);
            var h = false,
                d = a._session.getStatus();
            if (this._display !== C)
              if (c[b] == null) {
                h = true;
                d = c;
              } else
                a._authScope = this._scope;
            else if (c[k])
              switch (c[k]) {
                case gb:
                case A:
                  break;
                default:
                  h = true;
                  d = c;
              }
            this._callback(this._properties, d);
            if (h)
              this._promise[g](d);
            else
              this._promise[f](d);
          }
        }
      };
      function vd(g, n, c) {
        var d = "The authentication process failed with error: ",
            e = " To configure your app correctly, please follow the instructions on http://go.microsoft.com/fwlink/?LinkId=220871.",
            j = -2147023579,
            i = -2138701812,
            m = -2138701821,
            k = -2138701823;
        try {
          var f = a._authMethod ? a._authMethod : xd;
          f(g, n, "DELEGATION").then(function(m) {
            var j = m.tickets[0].value,
                i = null;
            if (j && j !== "")
              if (a._domain)
                f(g, a._domain, "JWT").then(function(a) {
                  var d = a.tickets[0].value;
                  i = {};
                  i[b] = j;
                  i[r] = d;
                  l(c, i, false);
                }, function(a) {
                  var b = h,
                      f = d + a.message;
                  if (a.name === "WinRTError" && a.number === k) {
                    b = Kb;
                    f += e;
                  }
                  i = R(b, f);
                  l(c, i, false);
                });
              else {
                i = {};
                i[b] = j;
              }
            else
              i = R(h, d + "Unable to get access token.");
            if (i)
              l(c, i, false);
          }, function(b) {
            var a = h,
                f = d + b.message;
            switch (b.name) {
              case "Canceled":
                a = A;
                break;
              case "WinRTError":
                switch (b.number) {
                  case j:
                    a = gb;
                    break;
                  case i:
                    a = A;
                    break;
                  case m:
                    a = Kb;
                    f += e;
                    break;
                  default:
                    a = h;
                }
            }
            var g = R(a, f);
            l(c, g, false);
          });
        } catch (p) {
          var o = R(h, d + p.message);
          l(c, o, false);
        }
      }
      function xd(c, f, e) {
        var a = Windows.Security.Authentication.OnlineId,
            b = new a.OnlineIdAuthenticator,
            d = new a.OnlineIdServiceTicketRequest(f, e);
        return b.authenticateUserAsync([d], c);
      }
      var oc = function(c) {
        var a = this;
        a._state = {};
        a._state[mc] = c;
        a._state[y] = X;
        a._state[b] = null;
      };
      oc.prototype = {
        isSignedIn: function() {
          return this._state[y] === B;
        },
        getStatus: function() {
          var a = null,
              c = this._state[y];
          if (c === B) {
            a = {};
            a[b] = this._state[b];
            a[r] = this._state[r];
          }
          return {
            status: c,
            session: a
          };
        },
        getNormalStatus: function() {
          return this.getStatus();
        },
        updateStatus: function(a) {
          var c = this._state[y],
              e = this._state[b];
          if (c != a) {
            this._state[y] = a;
            this._stateDirty = true;
            this.onStatusChanged(c, a);
            if (e != this._state[b])
              d.notify(db, this.getNormalStatus());
          }
        },
        tryGetResponse: function() {
          return null;
        },
        onAuthResponse: function(i) {
          var g = false,
              a = this._state,
              h = a[y],
              c = i[b],
              e = i[r];
          if (c && a[b] != c || e && a[r] != e) {
            a[b] = c;
            a[r] = e;
            g = true;
          }
          var f = a[b] ? B : X;
          if (h != f) {
            this._statusChecked = true;
            a[y] = f;
            this.onStatusChanged(h, f);
          }
          if (g)
            d.notify(db, this.getNormalStatus());
        },
        onStatusChanged: function(c, a) {
          s("AuthSession: Auth status changed: " + c + "=>" + a);
          if (c != a) {
            var f = c == B,
                e = a == B;
            if (!e)
              if (this._state[b])
                delete this._state[b];
            if (c != a)
              d.notify(Eb, this.getStatus());
            if (e != f)
              if (e)
                d.notify(Yb, this.getStatus());
              else
                d.notify(Vb, this.getStatus());
          }
        }
      };
      function qd(b) {
        var c = function() {
          ad(b);
        };
        a.getLoginStatus({
          internal: true,
          callback: c
        });
      }
      function Qd() {
        return true;
      }
      function Zb() {
        return a._settings[a._env][hc];
      }
      function Fc(a) {
        var b = a[n];
        L(a, [{
          name: q,
          type: c,
          optional: false
        }, {
          name: O,
          type: F,
          optional: true
        }, z], b);
        if (a[O] && !(a[O] instanceof Windows.Storage.StorageFile))
          throw new Error(b + ": unsupported file_output object type");
      }
      function Ad(b) {
        var a = b._properties,
            d = a[q],
            c = a[O];
        zc(d, c, b);
      }
      function zc(b, g, a) {
        var e = mb(b) ? b : Hb(b),
            f = new Windows.Foundation.Uri(e);
        try {
          var c = new Windows.Networking.BackgroundTransfer.BackgroundDownloader;
          c.group = Tb;
          var h = c.createDownload(f, g),
              d = h.startAsync().then(function(b) {
                var c = {
                  content_type: b.getResponseInformation().headers.lookup("Content-Type"),
                  stream: b.getResultStreamAt(0)
                };
                a.downloadComplete(true, c);
              }, function(b) {
                yb(b.message, a);
              }, function(d) {
                var b = d.progress,
                    c = {
                      bytesTransferred: b.bytesReceived,
                      totalBytes: b.totalBytesToReceive,
                      progressPercentage: b.totalBytesToReceive == 0 ? 0 : b.bytesReceived / b.totalBytesToReceive * 100
                    };
                a.downloadProgress(c);
              });
          a._cancel = T(d, d.cancel);
        } catch (i) {
          yb(i.message, a);
        }
      }
      jb.prototype._getStrategy = function(a) {
        var c = a[n],
            b = a[Mb],
            d = a[Wc];
        if (b)
          if (b instanceof Windows.Storage.StorageFile)
            return new ub(this, b);
          else
            throw new Error(c + ": unsupported file_input object type");
        else if (d)
          return new ub(this, d);
        else
          throw new Error(c + ": file_input or stream_input must be specified.");
      };
      function ub(a, b) {
        this.upload = function(i) {
          var h = new Windows.Foundation.Uri(i),
              c = new Windows.Networking.BackgroundTransfer.BackgroundUploader,
              g = function(f) {
                var c = "",
                    d = f.getResultStreamAt(0);
                if (d) {
                  var b = new Windows.Storage.Streams.DataReader(d),
                      e = function(d) {
                        if (d)
                          c = b.readString(d);
                        a.onResp(c);
                        b.close();
                      };
                  b.loadAsync(100000).then(e, e);
                } else
                  a.onResp(c);
              },
              d = function(b) {
                a.onErr(b.message);
              },
              f = function(d) {
                var b = d.progress,
                    c = {
                      bytesTransferred: b.bytesSent,
                      totalBytes: b.totalBytesToSend,
                      progressPercentage: b.totalBytesToSend == 0 ? 0 : b.bytesSent / b.totalBytesToSend * 100
                    };
                a.uploadProgress(c);
              },
              e = function(b) {
                try {
                  b();
                } catch (c) {
                  a.onErr(c.message);
                }
              };
          c.group = dc;
          c.method = Bd;
          e(function() {
            var i;
            if (b instanceof Windows.Storage.StorageFile)
              i = c.createUpload(h, b).startAsync().then(g, d, f);
            else
              i = c.createUploadFromStreamAsync(h, b).then(function(b) {
                e(function() {
                  i = b.startAsync().then(g, d, f);
                  a._cancel = T(i, i.cancel);
                });
              }, d);
            a._cancel = T(i, i.cancel);
          });
        };
      }
      function hd(a) {
        var b = document.readyState;
        if (b === "complete" || document.body !== null)
          a();
        else
          window.addEventListener("DOMContentLoaded", a, false);
      }
      a[t] = "Windows/HTML8_" + Uc("5.5.3502.1014");
      if (!a._settings)
        a._settings = {};
      var Rd = a._settings,
          nb = {},
          Md = "login.live.com";
      nb[hc] = "https://apis.live.net/v5.0/";
      nb[nc] = Md;
      Rd["PROD"] = nb;
      a._env = "PROD";
      a.onloadInit();
    }
  })();
})(require('process'));
