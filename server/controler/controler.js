//-----------------------------------All required modules-----------------------------------------
const manager = require("../manager/manager");
require("dotenv").config();
//-----------------------------------------------------------------------------------------------

//-------------------------------------Create--------------------------------------------------------------//

const recycle = (req, res) => {
  let reponseJSON = { erreur: process.env.UNKNOWN_ERROR };

  const bodyJsonValue = req.body;
  try {
    let newItemsObject = bodyJsonValue.map((item) => {
      if (
        !Object.prototype.hasOwnProperty.call(item, "name") ||
        !Object.prototype.hasOwnProperty.call(item, "item_id") ||
        !Object.prototype.hasOwnProperty.call(item, "type") ||
        !Object.prototype.hasOwnProperty.call(item, "parent_id") ||
        !Object.prototype.hasOwnProperty.call(item, "parent")
      ) {
        reponseJSON = { erreur: process.env.PROPERTY_NOT_FOUND };
        throw new Error("Property not found");
      }

      return {
        name: item.name.trim(),
        item_id: item.item_id,
        type: item.type.trim(),
        parent_id: item.parent_id,
        parent: item.parent,
      };
    });

    manager.DeleteElements.delete(newItemsObject).then((result) => {
      if (result.operation == process.env.HTTP_OK) {
        manager.DeleteElements.recycle(newItemsObject).then((result) => {
            sendData(res, result);
        });
      } else {
        reponseJSON = { error: process.env.DELETION_ERROR };
        sendData(res, reponseJSON);
      }
    });
  } catch (err) {
    console.log(err)
    sendData(res, reponseJSON);
  }
};

//-----------------------------------Send Data Request to Client-------------------------------------------------//

const sendData = (res, searchJsonData) => {
  res.writeHead(process.env.HTTP_OK, { "Content-Type": "application/json" });
  res.end(JSON.stringify(searchJsonData, null, 4));
};

module.exports = {
  recycle,
};
