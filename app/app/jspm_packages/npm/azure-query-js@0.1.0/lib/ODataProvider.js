/* */ 
(function() {
  var ODataFilterQueryVisitor,
      ODataProvider,
      Q,
      Query,
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
  Q = require('./QueryNodes');
  Query = require('./Query').Query;
  exports.ODataProvider = ODataProvider = (function() {
    function ODataProvider() {}
    ODataProvider.prototype.toQuery = function(query) {
      var odata,
          s,
          url;
      odata = this.toOData(query, true);
      url = "/" + odata.table;
      s = '?';
      if (odata.filters) {
        url += s + "$filter=" + odata.filters;
        s = '&';
      }
      if (odata.orderClauses) {
        url += s + "$orderby=" + odata.orderClauses;
        s = '&';
      }
      if (odata.skip) {
        url += s + "$skip=" + odata.skip;
        s = '&';
      }
      if (odata.take || odata.take === 0) {
        url += s + "$top=" + odata.take;
        s = '&';
      }
      if (odata.selections) {
        url += s + "$select=" + odata.selections;
        s = '&';
      }
      if (odata.includeTotalCount) {
        url += s + "$inlinecount=allpages";
      }
      if (odata.includeDeleted) {
        url += s + "__includeDeleted=true";
      }
      return url;
    };
    ODataProvider.prototype.toOData = function(query, encodeForUri) {
      var asc,
          components,
          name,
          odata,
          order,
          orderClauses,
          ordering,
          ref,
          ref1;
      if (encodeForUri == null) {
        encodeForUri = false;
      }
      components = (ref = query != null ? query.getComponents() : void 0) != null ? ref : {};
      ordering = (function() {
        var ref1,
            results;
        ref1 = components != null ? components.ordering : void 0;
        results = [];
        for (name in ref1) {
          asc = ref1[name];
          results.push(asc ? name : name + " desc");
        }
        return results;
      })();
      orderClauses = (function() {
        var i,
            len,
            ref1,
            results;
        ref1 = components != null ? components.orderClauses : void 0;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          order = ref1[i];
          results.push(order.ascending ? order.name : order.name + " desc");
        }
        return results;
      })();
      return odata = {
        table: components != null ? components.table : void 0,
        filters: ODataFilterQueryVisitor.convert(components.filters, encodeForUri),
        ordering: ordering != null ? ordering.toString() : void 0,
        orderClauses: orderClauses != null ? orderClauses.toString() : void 0,
        skip: components != null ? components.skip : void 0,
        take: components != null ? components.take : void 0,
        selections: components != null ? (ref1 = components.selections) != null ? ref1.toString() : void 0 : void 0,
        includeTotalCount: components != null ? components.includeTotalCount : void 0,
        includeDeleted: components != null ? components.includeDeleted : void 0
      };
    };
    ODataProvider.prototype.fromOData = function(table, filters, ordering, skip, take, selections, includeTotalCount, includeDeleted) {
      var direction,
          field,
          i,
          item,
          j,
          len,
          len1,
          query,
          ref,
          ref1,
          ref2,
          ref3;
      query = new Query(table);
      if (filters) {
        query.where(filters);
      }
      if (skip || skip === 0) {
        query.skip(skip);
      }
      if (take || take === 0) {
        query.take(take);
      }
      if (includeTotalCount) {
        query.includeTotalCount();
      }
      if (includeDeleted) {
        query.includeDeleted();
      }
      ref1 = (ref = selections != null ? selections.split(',') : void 0) != null ? ref : [];
      for (i = 0, len = ref1.length; i < len; i++) {
        field = ref1[i];
        query.select(field.trim());
      }
      ref2 = (function() {
        var k,
            len1,
            ref2,
            ref3,
            results;
        ref3 = (ref2 = ordering != null ? ordering.split(',') : void 0) != null ? ref2 : [];
        results = [];
        for (k = 0, len1 = ref3.length; k < len1; k++) {
          item = ref3[k];
          results.push(item.trim().split(' '));
        }
        return results;
      })();
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        ref3 = ref2[j], field = ref3[0], direction = ref3[1];
        if ((direction != null ? direction.toUpperCase() : void 0) !== 'DESC') {
          query.orderBy(field);
        } else {
          query.orderByDescending(field);
        }
      }
      return query;
    };
    return ODataProvider;
  })();
  ODataFilterQueryVisitor = (function(superClass) {
    extend(ODataFilterQueryVisitor, superClass);
    function ODataFilterQueryVisitor(encodeForUri1) {
      this.encodeForUri = encodeForUri1;
    }
    ODataFilterQueryVisitor.convert = function(filters, encodeForUri) {
      var ref,
          visitor;
      visitor = new ODataFilterQueryVisitor(encodeForUri);
      return (ref = (filters ? visitor.visit(filters) : void 0)) != null ? ref : null;
    };
    ODataFilterQueryVisitor.prototype.toOData = function(value) {
      var text;
      if ((_.isNumber(value)) || (_.isBoolean(value))) {
        return value.toString();
      } else if (_.isString(value)) {
        value = value.replace(/'/g, "''");
        if ((this.encodeForUri != null) && this.encodeForUri === true) {
          value = encodeURIComponent(value);
        }
        return "'" + value + "'";
      } else if (_.isDate(value)) {
        text = JSON.stringify(value);
        if (text.length > 2) {
          text = text.slice(1, +(text.length - 2) + 1 || 9e9);
        }
        text = text.replace(/(T\d{2}:\d{2}:\d{2})Z$/, function(all, time) {
          var msec;
          msec = String(value.getMilliseconds() + 1000).substring(1);
          return time + "." + msec + "Z";
        });
        return "datetime'" + text + "'";
      } else if (!value) {
        return "null";
      } else {
        throw "Unsupported literal value " + value;
      }
    };
    ODataFilterQueryVisitor.prototype.ConstantExpression = function(node) {
      return this.toOData(node.value);
    };
    ODataFilterQueryVisitor.prototype.MemberExpression = function(node) {
      return node.member;
    };
    ODataFilterQueryVisitor.prototype.UnaryExpression = function(node) {
      if (node.operator === Q.UnaryOperators.Not) {
        return "not " + (this.visit(node.operand));
      } else if (node.operator === Q.UnaryOperators.Negate) {
        return "(0 sub " + (this.visit(node.operand)) + ")";
      } else {
        throw "Unsupported operator " + node.operator;
      }
    };
    ODataFilterQueryVisitor.prototype.BinaryExpression = function(node) {
      var mapping,
          op;
      mapping = {
        And: 'and',
        Or: 'or',
        Add: 'add',
        Subtract: 'sub',
        Multiply: 'mul',
        Divide: 'div',
        Modulo: 'mod',
        GreaterThan: 'gt',
        GreaterThanOrEqual: 'ge',
        LessThan: 'lt',
        LessThanOrEqual: 'le',
        NotEqual: 'ne',
        Equal: 'eq'
      };
      op = mapping[node.operator];
      if (op) {
        return "(" + (this.visit(node.left)) + " " + op + " " + (this.visit(node.right)) + ")";
      } else {
        throw "Unsupported operator " + node.operator;
      }
    };
    ODataFilterQueryVisitor.prototype.InvocationExpression = function(node) {
      var mapping,
          method;
      mapping = {
        Length: 'length',
        ToUpperCase: 'toupper',
        ToLowerCase: 'tolower',
        Trim: 'trim',
        IndexOf: 'indexof',
        Replace: 'replace',
        Substring: 'substring',
        Concat: 'concat',
        Day: 'day',
        Month: 'month',
        Year: 'year',
        Floor: 'floor',
        Ceiling: 'ceiling',
        Round: 'round'
      };
      method = mapping[node.method];
      if (method) {
        return method + "(" + (this.visit(node.args)) + ")";
      } else {
        throw "Invocation of unsupported method " + node.method;
      }
    };
    ODataFilterQueryVisitor.prototype.LiteralExpression = function(node) {
      var ch,
          i,
          inString,
          len,
          literal,
          parenBalance,
          ref;
      literal = '';
      parenBalance = 0;
      inString = false;
      ref = node.queryString;
      for (i = 0, len = ref.length; i < len; i++) {
        ch = ref[i];
        if (parenBalance < 0) {
          break;
        } else if (inString) {
          literal += ch;
          inString = ch !== "'";
        } else if (ch === '?') {
          if ((!node.args) || (node.args.length <= 0)) {
            throw "Too few arguments for " + node.queryString + ".";
          }
          literal += this.toOData(node.args.shift());
        } else if (ch === "'") {
          literal += ch;
          inString = true;
        } else if (ch === '(') {
          parenBalance += 1;
          literal += ch;
        } else if (ch === ')') {
          parenBalance -= 1;
          literal += ch;
        } else {
          literal += ch;
        }
      }
      if (node.args && node.args.length > 0) {
        throw "Too many arguments for " + node.queryString;
      }
      if (parenBalance !== 0) {
        throw "Unbalanced parentheses in " + node.queryString;
      }
      if (literal.trim().length > 0) {
        return "(" + literal + ")";
      } else {
        return literal;
      }
    };
    return ODataFilterQueryVisitor;
  })(Q.QueryExpressionVisitor);
}).call(this);
