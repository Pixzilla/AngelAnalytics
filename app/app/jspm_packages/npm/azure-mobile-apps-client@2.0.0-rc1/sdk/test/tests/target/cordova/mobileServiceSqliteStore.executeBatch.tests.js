/* */ 
var Platform = require('../../../../src/Platform/index'),
    Query = require('azure-query-js').Query,
    storeTestHelper = require('./storeTestHelper'),
    MobileServiceSqliteStore = require('../../../../src/Platform/cordova/MobileServiceSqliteStore'),
    store;
$testGroup('SQLiteStore - executeBatch tests').beforeEachAsync(function() {
  return storeTestHelper.createEmptyStore().then(function(emptyStore) {
    store = emptyStore;
  });
}).tests($test('basic executeBatch scenario - batch of UPSERTs and DELETEs').checkAsync(function() {
  var row1 = {
    id: 101,
    description: 'original'
  },
      row2 = {
        id: 102,
        description: 'original'
      },
      row3 = {
        id: 103,
        description: 'original'
      },
      row4 = {
        id: 201,
        description: 'new'
      };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.upsert(storeTestHelper.testTableName, [row1, row2, row3]);
  }).then(function() {
    row1.description = 'new';
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: row1
    }, {
      action: 'delete',
      tableName: storeTestHelper.testTableName,
      id: row3.id
    }, {
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: row4
    }]);
  }).then(function(result) {
    return store.read(new Query(storeTestHelper.testTableName).orderBy('id'));
  }).then(function(result) {
    $assert.areEqual(result, [row1, row2, row4]);
  }, function(error) {
    $assert.fail(error);
  });
}), $test('An invalid operation.action should rollback the transaction').checkAsync(function() {
  var row1 = {
    id: 101,
    description: 'original'
  },
      row2 = {
        id: 102,
        description: 'original'
      },
      row3 = {
        id: 103,
        description: 'original'
      };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.upsert(storeTestHelper.testTableName, [row1, row2, row3]);
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: {
        id: row1.id,
        description: 'new'
      }
    }, {
      action: '__invalid__action__',
      tableName: storeTestHelper.testTableName,
      data: {
        id: row2.id,
        description: 'new'
      }
    }, {
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: {
        id: row3.id,
        description: 'new'
      }
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {
    store._editStatement = undefined;
    return store.read(new Query(storeTestHelper.testTableName));
  }).then(function(result) {
    $assert.areEqual(result, [row1, row2, row3]);
  }, function(error) {
    $assert.fail('Something is wrong with the test code. Should never reach here');
  });
}), $test('SQLite error while executing a SQL statement should rollback the transaction').checkAsync(function() {
  var row1 = {
    id: 101,
    description: 'original'
  },
      row2 = {
        id: 102,
        description: 'original'
      },
      row3 = {
        id: 103,
        description: 'original'
      },
      statementCount = 0;
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.upsert(storeTestHelper.testTableName, [row1, row2, row3]);
  }).then(function() {
    store._editStatement = function(statement) {
      ++statementCount;
      if (statementCount == 3) {
        statement = 'invalid sql statement';
      }
      return statement;
    };
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: {
        id: row1.id,
        description: 'new'
      }
    }, {
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: {
        id: row2.id,
        description: 'new'
      }
    }, {
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: {
        id: row3.id,
        description: 'new'
      }
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {
    $assert.areEqual(statementCount, 6);
    store._editStatement = undefined;
    return store.read(new Query(storeTestHelper.testTableName));
  }).then(function(result) {
    $assert.areEqual(result, [row1, row2, row3]);
  }, function(error) {
    $assert.fail('Something is wrong with the test code. Should never reach here');
  });
}), $test('operations parameter containing null operation').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([null, {
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: row
    }]);
  }).then(function(result) {
    return store.read(new Query(storeTestHelper.testTableName));
  }).then(function(result) {
    $assert.areEqual(result, [row]);
  }, function(error) {
    $assert.fail(error);
  });
}), $test('operations parameter containing undefined operation').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([undefined, {
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: row
    }]);
  }).then(function(result) {
    return store.read(new Query(storeTestHelper.testTableName));
  }).then(function(result) {
    $assert.areEqual(result, [row]);
  }, function(error) {
    $assert.fail(error);
  });
}), $test('Missing operation.action').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      tableName: storeTestHelper.testTableName,
      data: row
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT: null data').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: null
    }]);
  }).then(function(result) {}, function(error) {
    $assert.fail('executeBatch should have succeeded');
  });
}), $test('UPSERT: undefined data').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: undefined
    }]);
  }).then(function(result) {}, function(error) {
    $assert.fail('executeBatch should have succeeded');
  });
}), $test('UPSERT error handling - missing tableName').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: {
        id: row1.id,
        description: 'new'
      }
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT error handling - null tableName').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: null,
      data: {
        id: row1.id,
        description: 'new'
      }
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT error handling - invalid tableName').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: {},
      data: {
        id: row1.id,
        description: 'new'
      }
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT error handling - empty tableName string').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: '',
      data: {
        id: row1.id,
        description: 'new'
      }
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT error handling - data is not an object').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: 'invalid data'
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT error handling - data is an array').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: [],
      data: null
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT error handling - data does not have ID').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: {description: 'new'},
      data: null
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT error handling - data has invalid ID').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: {
        id: {},
        description: 'new'
      }
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('DELETE: null ID').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'delete',
      tableName: storeTestHelper.testTableName,
      id: null
    }]);
  }).then(function(result) {}, function(error) {
    $assert.fail('executeBatch should have succeeded');
  });
}), $test('DELETE: undefined ID').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'delete',
      tableName: storeTestHelper.testTableName,
      id: undefined
    }]);
  }).then(function(result) {}, function(error) {
    $assert.fail('executeBatch should have succeeded');
  });
}), $test('DELETE error handling - missing tableName').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'delete',
      id: 101
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('DELETE error handling - null tableName').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'delete',
      id: 101
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('DELETE error handling - invalid tableName').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'delete',
      tableName: {},
      id: 101
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('DELETE error handling - empty tableName string').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'delete',
      tableName: '',
      id: 101
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('DELETE error handling - invalid ID').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'delete',
      tableName: storeTestHelper.testTableName,
      id: {}
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('DELETE error handling - ID is an array').checkAsync(function() {
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'delete',
      tableName: storeTestHelper.testTableName,
      id: [101]
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT error handling - data has null ID').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: {
        id: null,
        description: 'new'
      }
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}), $test('UPSERT error handling - data has undefined ID').checkAsync(function() {
  var row = {
    id: 101,
    description: 'original'
  };
  return store.defineTable({
    name: storeTestHelper.testTableName,
    columnDefinitions: {
      id: MobileServiceSqliteStore.ColumnType.Integer,
      description: MobileServiceSqliteStore.ColumnType.String
    }
  }).then(function() {
    return store.executeBatch([{
      action: 'upsert',
      tableName: storeTestHelper.testTableName,
      data: {
        id: undefined,
        description: 'new'
      }
    }]);
  }).then(function(result) {
    $assert.fail('executeBatch should have failed');
  }, function(error) {});
}));
