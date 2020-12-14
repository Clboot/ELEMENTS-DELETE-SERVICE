const { pool, shutdown } = require("../service/dao");
require("dotenv").config();

let poolConnection = {}
pool.connect((err, client, done) =>{
    if (err) {
        throw err;
      }
    poolConnection = {client: client, done: done}
})

class DeleteElements {
  static delete(newItemsObject) {
    let pgJsonResult = null;
    const itemObjectArrayLength = newItemsObject.length;
    return new Promise((resolve) => {
      newItemsObject.map((item, index) => {
        poolConnection.client.query(
          "delete from elements where id = $1",
          [item.item_id],
          (error, result) => {
            if (result.rowCount > 0) {
              if (itemObjectArrayLength == index + 1) {
                pgJsonResult = { operation: process.env.HTTP_OK };
                resolve(pgJsonResult);
              }
            } else {
              pgJsonResult = { error: process.env.DELETION_ERROR };
              resolve(pgJsonResult);
            }
          }
        );
      });

    });
  }

  static recycle(newItemsObject) {
    let pgJsonResult = null;
    const itemObjectArrayLength = newItemsObject.length;
    return new Promise((resolve) => {
      newItemsObject.map((item, index) => {
        poolConnection.client.query(
          "insert into recycle_bin(name, item_id, type, parent_id, parent, date_creation) values($1, $2, $3, $4, $5, NOW())",
          [item.name, item.item_id, item.type, item.parent_id, item.parent],
          (error, result) => {
            if (result.rowCount > 0) {
              if (itemObjectArrayLength === index + 1) {
                pgJsonResult = { operation: process.env.HTTP_OK };
                resolve(pgJsonResult);
              }
            } else {
              pgJsonResult = { error: process.env.CREATION_ERROR };
              resolve(pgJsonResult);
            }
          }
        );
      });

    });
  }
}
module.exports = {
  DeleteElements,
};
