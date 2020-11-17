const dao = require("../service/dao");
require("dotenv").config();

class DeleteElements {
  static delete(newItemsObject) {
    let pgJsonResult = null;
    const itemObjectArrayLength = newItemsObject.length;
    return new Promise((resolve) => {
      dao.connect();
      newItemsObject.map((item, index) => {
        dao.query(
          "delete from elements where id = $1",
          [item.item_id],
          (result) => {
            if (result.rowCount > 0) {
              if (itemObjectArrayLength == index + 1) {
                pgJsonResult = { operation: 200 };
                resolve(pgJsonResult);
                dao.disconnect();
              }
            } else {
              pgJsonResult = { error: process.env.PROJECT_ALREADY_EXISTS };
              resolve(pgJsonResult);
              dao.disconnect();
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
      dao.connect();
      newItemsObject.map((item, index) => {
        dao.query(
          "insert into recycle_bin(name, item_id, type, parent_id, parent, date_creation) values($1, $2, $3, $4, $5, NOW())",
          [item.name, item.item_id, item.type, item.parent_id, item.parent],
          (result) => {
            if (result.rowCount > 0) {
              if (itemObjectArrayLength === index + 1) {
                pgJsonResult = { operation: 200 };
                resolve(pgJsonResult);
                dao.disconnect();
              }
            } else {
              pgJsonResult = { error: process.env.PROJECT_ALREADY_EXISTS };
              resolve(pgJsonResult);
              dao.disconnect();
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
