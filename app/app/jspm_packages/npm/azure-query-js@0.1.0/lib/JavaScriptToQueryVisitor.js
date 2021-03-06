/* */ 
(function() {
  var JS,
      JavaScriptToQueryVisitor,
      Q,
      _,
      extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
      hasProp = {}.hasOwnProperty;
  _ = require('./Utilities');
  JS = require('./JavaScriptNodes');
  Q = require('./QueryNodes');
  exports.JavaScriptToQueryVisitor = JavaScriptToQueryVisitor = (function(superClass) {
    extend(JavaScriptToQueryVisitor, superClass);
    function JavaScriptToQueryVisitor(context) {
      this.context = context;
    }
    JavaScriptToQueryVisitor.prototype.getSource = function(node) {
      var ref,
          ref1;
      return this.context.source.slice(node != null ? (ref = node.range) != null ? ref[0] : void 0 : void 0, +((node != null ? (ref1 = node.range) != null ? ref1[1] : void 0 : void 0) - 1) + 1 || 9e9);
    };
    JavaScriptToQueryVisitor.prototype.invalid = function(node) {
      throw "The expression '" + (this.getSource(node)) + "'' is not supported.";
    };
    JavaScriptToQueryVisitor.prototype.translateUnary = function(node, mapping) {
      var op,
          value;
      op = mapping[node.operator];
      if (op) {
        value = this.visit(node.argument);
        return new Q.UnaryExpression(op, value);
      } else {
        return null;
      }
    };
    JavaScriptToQueryVisitor.prototype.translateBinary = function(node, mapping) {
      var left,
          op,
          right;
      op = mapping[node.operator];
      if (op) {
        left = this.visit(node.left);
        right = this.visit(node.right);
        return new Q.BinaryExpression(op, left, right);
      } else {
        return null;
      }
    };
    JavaScriptToQueryVisitor.prototype.visit = function(node) {
      var visited;
      visited = JavaScriptToQueryVisitor.__super__.visit.call(this, node);
      if (node === visited) {
        this.invalid(node);
      }
      return visited;
    };
    JavaScriptToQueryVisitor.prototype.MemberExpression = function(node) {
      var expr;
      expr = (function() {
        var ref,
            ref1,
            ref2,
            ref3;
        if ((node != null ? (ref = node.object) != null ? ref.type : void 0 : void 0) === 'ThisExpression' && (node != null ? (ref1 = node.property) != null ? ref1.type : void 0 : void 0) === 'Identifier') {
          return new Q.MemberExpression(node.property.name);
        } else if ((node != null ? (ref2 = node.object) != null ? ref2.type : void 0 : void 0) === 'MemberExpression' && ((ref3 = node.object.object) != null ? ref3.type : void 0) === 'ThisExpression' && node.property.type === 'Identifier') {
          if (node.property.name === 'length') {
            return new Q.InvocationExpression(Q.Methods.Length, new Q.MemberExpression(node.object.property.name));
          }
        }
      })();
      return expr != null ? expr : JavaScriptToQueryVisitor.__super__.MemberExpression.call(this, node);
    };
    JavaScriptToQueryVisitor.prototype.Literal = function(node) {
      return new Q.ConstantExpression(node.value);
    };
    JavaScriptToQueryVisitor.prototype.UnaryExpression = function(node) {
      var mapping,
          ref;
      if (node.operator === '+') {
        return this.visit(node.argument);
      } else {
        mapping = {
          '!': Q.UnaryOperators.Not,
          '-': Q.UnaryOperators.Negate
        };
        return (ref = this.translateUnary(node, mapping)) != null ? ref : JavaScriptToQueryVisitor.__super__.UnaryExpression.call(this, node);
      }
    };
    JavaScriptToQueryVisitor.prototype.UpdateExpression = function(node) {
      var mapping,
          ref;
      mapping = {
        '++': Q.UnaryOperators.Increment,
        '--': Q.UnaryOperators.Decrement
      };
      return (ref = this.translateUnary(node, mapping)) != null ? ref : JavaScriptToQueryVisitor.__super__.UpdateExpression.call(this, node);
    };
    JavaScriptToQueryVisitor.prototype.LogicalExpression = function(node) {
      var mapping,
          ref;
      mapping = {
        '&&': Q.BinaryOperators.And,
        '||': Q.BinaryOperators.Or
      };
      return (ref = this.translateBinary(node, mapping)) != null ? ref : JavaScriptToQueryVisitor.__super__.LogicalExpression.call(this, node);
    };
    JavaScriptToQueryVisitor.prototype.BinaryExpression = function(node) {
      var k,
          left,
          mapping,
          properties,
          ref,
          v,
          value;
      mapping = {
        '+': Q.BinaryOperators.Add,
        '-': Q.BinaryOperators.Subtract,
        '*': Q.BinaryOperators.Multiply,
        '/': Q.BinaryOperators.Divide,
        '%': Q.BinaryOperators.Modulo,
        '>': Q.BinaryOperators.GreaterThan,
        '>=': Q.BinaryOperators.GreaterThanOrEqual,
        '<': Q.BinaryOperators.LessThan,
        '<=': Q.BinaryOperators.LessThanOrEqual,
        '!=': Q.BinaryOperators.NotEqual,
        '!==': Q.BinaryOperators.NotEqual,
        '==': Q.BinaryOperators.Equal,
        '===': Q.BinaryOperators.Equal
      };
      return (function() {
        var ref1,
            ref2;
        if ((ref = this.translateBinary(node, mapping)) != null) {
          return ref;
        } else if (node.operator === 'in' && ((ref1 = node.right) != null ? ref1.type : void 0) === 'Literal' && _.isArray((ref2 = node.right) != null ? ref2.value : void 0)) {
          if (node.right.value.length > 0) {
            left = this.visit(node.left);
            return Q.QueryExpression.groupClauses(Q.BinaryOperators.Or, (function() {
              var i,
                  len,
                  ref3,
                  results;
              ref3 = node.right.value;
              results = [];
              for (i = 0, len = ref3.length; i < len; i++) {
                value = ref3[i];
                if (_.isObject(value)) {
                  properties = (function() {
                    var results1;
                    results1 = [];
                    for (k in value) {
                      v = value[k];
                      results1.push(v);
                    }
                    return results1;
                  })();
                  if ((properties != null ? properties.length : void 0) !== 1) {
                    throw "in operator requires comparison objects with a single field, not " + value + " (" + (JSON.stringify(value)) + "), for expression '" + (this.getSource(node)) + "'";
                  }
                  value = properties[0];
                }
                results.push(new Q.BinaryExpression(Q.BinaryOperators.Equal, left, new Q.ConstantExpression(value)));
              }
              return results;
            }).call(this));
          } else {
            return new Q.BinaryExpression(Q.BinaryOperators.Equal, new Q.ConstantExpression(true), new Q.ConstantExpression(false));
          }
        } else {
          return JavaScriptToQueryVisitor.__super__.BinaryExpression.call(this, node);
        }
      }).call(this);
    };
    JavaScriptToQueryVisitor.prototype.CallExpression = function(node) {
      var expr,
          func,
          getSingleArg,
          getTwoArgs,
          member,
          method,
          ref;
      getSingleArg = (function(_this) {
        return function(name) {
          var ref;
          if (((ref = node["arguments"]) != null ? ref.length : void 0) !== 1) {
            throw "Function " + name + " expects one argument in expression '" + (_this.getSource(node)) + "'";
          }
          return _this.visit(node["arguments"][0]);
        };
      })(this);
      getTwoArgs = (function(_this) {
        return function(member, name) {
          var ref;
          if (((ref = node["arguments"]) != null ? ref.length : void 0) !== 2) {
            throw "Function " + name + " expects two arguments in expression '" + (_this.getSource(node)) + "'";
          }
          return [member, _this.visit(node["arguments"][0]), _this.visit(node["arguments"][1])];
        };
      })(this);
      func = node != null ? (ref = node.callee) != null ? ref.value : void 0 : void 0;
      expr = (function() {
        var ref1,
            ref2,
            ref3,
            ref4,
            ref5,
            ref6,
            ref7;
        if (func === Math.floor) {
          return new Q.InvocationExpression(Q.Methods.Floor, [getSingleArg('floor')]);
        } else if (func === Math.ceil) {
          return new Q.InvocationExpression(Q.Methods.Ceiling, [getSingleArg('ceil')]);
        } else if (func === Math.round) {
          return new Q.InvocationExpression(Q.Methods.Round, [getSingleArg('round')]);
        } else {
          if (node.callee.type === 'MemberExpression' && ((ref1 = node.callee.object) != null ? ref1.__hasThisExp : void 0) === true) {
            if ((node != null ? (ref2 = node.callee) != null ? (ref3 = ref2.object) != null ? ref3.type : void 0 : void 0 : void 0) === 'CallExpression') {
              member = this.visit(node.callee.object);
            } else {
              member = new Q.MemberExpression((ref4 = node.callee.object) != null ? (ref5 = ref4.property) != null ? ref5.name : void 0 : void 0);
            }
            method = (ref6 = node.callee) != null ? (ref7 = ref6.property) != null ? ref7.name : void 0 : void 0;
            if (method === 'toUpperCase') {
              return new Q.InvocationExpression(Q.Methods.ToUpperCase, [member]);
            } else if (method === 'toLowerCase') {
              return new Q.InvocationExpression(Q.Methods.ToLowerCase, [member]);
            } else if (method === 'trim') {
              return new Q.InvocationExpression(Q.Methods.Trim, [member]);
            } else if (method === 'indexOf') {
              return new Q.InvocationExpression(Q.Methods.IndexOf, [member, getSingleArg('indexOf')]);
            } else if (method === 'concat') {
              return new Q.InvocationExpression(Q.Methods.Concat, [member, getSingleArg('concat')]);
            } else if (method === 'substring' || method === 'substr') {
              return new Q.InvocationExpression(Q.Methods.Substring, getTwoArgs(member, 'substring'));
            } else if (method === 'replace') {
              return new Q.InvocationExpression(Q.Methods.Replace, getTwoArgs(member, 'replace'));
            } else if (method === 'getFullYear' || method === 'getUTCFullYear') {
              return new Q.InvocationExpression(Q.Methods.Year, [member]);
            } else if (method === 'getYear') {
              return new Q.BinaryExpression(Q.BinaryOperators.Subtract, new Q.InvocationExpression(Q.Methods.Year, [member]), new Q.ConstantExpression(1900));
            } else if (method === 'getMonth' || method === 'getUTCMonth') {
              return new Q.BinaryExpression(Q.BinaryOperators.Subtract, new Q.InvocationExpression(Q.Methods.Month, [member]), new Q.ConstantExpression(1));
            } else if (method === 'getDate' || method === 'getUTCDate') {
              return new Q.InvocationExpression(Q.Methods.Day, [member]);
            }
          }
        }
      }).call(this);
      return expr != null ? expr : JavaScriptToQueryVisitor.__super__.CallExpression.call(this, node);
    };
    return JavaScriptToQueryVisitor;
  })(JS.JavaScriptVisitor);
}).call(this);
