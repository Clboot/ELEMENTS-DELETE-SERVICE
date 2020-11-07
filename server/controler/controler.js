//-----------------------------------All required modules-----------------------------------------
const manager = require("../manager/manager");
const remove_offensives = require("./remove_offensives");
const dao = require("../service/dao");
require("dotenv").config();
//-----------------------------------------------------------------------------------------------

//-------------------------------------Create--------------------------------------------------------------//

const recycle = (req, res) => {
  let reponseJSON = { erreur: process.env.UNKNOWN_ERROR };

  //check if our req.body contains all properties we are expecting

  const properties = ["name", "item_id", "type", "parent_id", "parent"];
  const bodyJsonValue = req.body;
  try {
    let newItemsObject = bodyJsonValue.map((item) => {
      if (
        !Object.prototype.hasOwnProperty.call(item, "name") ||
        !Object.prototype.hasOwnProperty.call(item, "item_id") ||
        !Object.prototype.hasOwnProperty.call(item, "type") ||
        !Object.prototype.hasOwnProperty.call(item, "parent_id")
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

    manager.DeleteProject.delete(newItemsObject).then((result) => {
      if (result.operation == "200") {
        manager.DeleteProject.recycle(newItemsObject).then((result) => {
          if (result.operation == "200") {
            sendData(res, result);
          }
        });
      } else {
        pgJsonResult = { error: process.env.PROJECT_ALREADY_EXISTS };
        sendData(res, pgJsonResult);
      }
    });
  } catch (err) {
    sendData(res, reponseJSON);
  }
};

//-----------------------------------Send Data Request to Client-------------------------------------------------//

const sendData = (res, searchJsonData) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(searchJsonData, null, 4));
};

module.exports = {
  recycle,
};
