const { pool, shutdown } = require("../service/dao");
require("dotenv").config();

class DeleteElements {
  static delete(newItemsObject) {
    let pgJsonResult = null;
    const itemObjectArrayLength = newItemsObject.length;
    return new Promise((resolve) => {
      pool.connect((err, client, done) => {
        if (err) {
          throw err;
        }
      newItemsObject.map((item, index) => {
        client.query(
          "delete from elements where id = $1",
          [item.item_id],
          (error, result) => {
            if (result.rowCount > 0) {
              if (itemObjectArrayLength == index + 1) {
                pgJsonResult = { operation: 200 };
                resolve(pgJsonResult);
              }
            } else {
              pgJsonResult = { error: process.env.PROJECT_ALREADY_EXISTS };
              resolve(pgJsonResult);
            }
          }
        );
      });

    })
    });
  }

  static recycle(newItemsObject) {
    let pgJsonResult = null;
    const itemObjectArrayLength = newItemsObject.length;
    return new Promise((resolve) => {
      pool.connect((err, client, done) => {
        if (err) {
          throw err;
        }
      newItemsObject.map((item, index) => {
        client.query(
          "insert into recycle_bin(name, item_id, type, parent_id, parent, date_creation) values($1, $2, $3, $4, $5, NOW())",
          [item.name, item.item_id, item.type, item.parent_id, item.parent],
          (error, result) => {
            if (result.rowCount > 0) {
              if (itemObjectArrayLength === index + 1) {
                pgJsonResult = { operation: 200 };
                resolve(pgJsonResult);
              }
            } else {
              pgJsonResult = { error: process.env.PROJECT_ALREADY_EXISTS };
              resolve(pgJsonResult);
            }
          }
        );
      });

    })
    });
  }
}
module.exports = {
  DeleteElements,
};
