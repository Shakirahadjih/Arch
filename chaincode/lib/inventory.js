/*
 * Inventory Smart Contract
 */

'use strict';

//import Hyperledger Fabric SDK
const { Contract } = require('fabric-contract-api');

// import Item resources
const Item = require('./model/item.js');

// import Shipment
const Shipment = require('./model/shipment.js');

// import Participant
const Participant = require('./model/participant.js');

class InventoryContract extends Contract {

  /**
   * createItem
   * 
   * @param itemId
   * @param description
   * @param owner
   * @returns the new item
   */
  async createItem(ctx, itemId, description, owner) {

    // create an item representation
    let item = new Item(itemId, description, owner);

    // generate the key for the item
    let key = item.getType() + ":" + item.getItemId()

    // check if the item already exists in the ledger
    let itemExists = await this.assetExists(ctx, key);

    if (itemExists) {
      throw new Error(`Item with key ${key} already exists`);
    }

    // update state with new item
    await ctx.stub.putState(key, item.serialise())

    // create a itemCreated event
    const event = {
      eventName: 'itemCreated',
      targetAudience: [item.getOwner()], // suggested targetAudience
      itemId: item.itemId
    };

    await ctx.stub.setEvent(event.eventName, Buffer.from(JSON.stringify(event)));

    // Return the newly created item
    return JSON.stringify(item);

  }

  /**
   * Utility function checking if a user is an admin
   * @param {*} idString - the identity object
   */
  isAdmin(identity) {
    var match = identity.getID().match('.*CN=(.*)::');
    return match !== null && match[1] === 'admin';
  }

  /**
   * Utility function to get the id of the participant
   * @param {*} id - the id of the participant
   */
  getParticipantId(identity) {
    return identity.getAttributeValue('id');
  }

  /**
   *
   * assetExists
   *
   * Checks to see if a key exists in the world state. 
   * @param assetId - the key of the asset to read
   * @returns boolean indicating if the asset exists or not. 
   */
  async assetExists(ctx, assetId) {

    const buffer = await ctx.stub.getState(assetId);
    return (!!buffer && buffer.length > 0);
  }

  /**
   * Create Participant
   * 
   * This transaction is started by the participant during sign-up
   *     
   * @param id - The participant identifier
   * @param name - The participant name
   * @returns the newly created participant
   */
  async createParticipant(ctx, id, name) {

    let identity = ctx.clientIdentity;

    if (!this.isAdmin(identity)) {
      throw new Error(`Only administrators can create participants`);
    }

    // Generate a participant representation
    let participant = new Participant(id, name);

    // generate the key for the participant
    let key = participant.getType() + ":" + participant.getId();

    // check if the participant already exists
    let exists = await this.assetExists(ctx, key);

    if (exists) {
      throw new Error(`Participant with id ${key} already exists`);
    }

    // update state with new participant
    await ctx.stub.putState(key, participant.serialise())

    // Return the newly created participant
    return JSON.stringify(participant);
  }

  /**
   * Get participant
   *    *     
   * @param id - The participant identifier
   * @returns the participant
   */
  async getParticipant(ctx, id) {

    let identity = ctx.clientIdentity;

    if (!id === this.getParticipantId(identity) && !this.isAdmin(identity)) {
      throw new Error(`Only administrators can query other participants. Regular participants can get information of their own account`);
    }

    // get participant
    const buffer = await ctx.stub.getState('Participant:'+id);

    // if participant was not found
    if (!buffer || buffer.length == 0) {
      throw new Error(`Participant with id ${id} was not found`);
    }

    // get object from buffer
    const participant = Participant.deserialise(buffer);

    // Return the newly created participant
    return JSON.stringify(participant);
  }

   /**
   * Query Items
   * 
   * Used to get a list of items
   *     
   * @param id - The participant identifier
   * @returns a list of items
   */
    async queryItems(ctx, id) {

      let queryString = {
        selector: {
          type: 'Item',
          $or: [{ originId: id }, { holderId: id }]
        }
      };
  
      let resultsIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
  
      let allResults = [], count = 0;
  
      while (true) {
        let res = await resultsIterator.next();
        if (res.value && res.value.value.toString()) {
          let jsonRes = {};
          jsonRes.key = res.value.key;
          jsonRes.record = JSON.parse(res.value.value.toString('utf8'));
          allResults.push(jsonRes);
        }
  
        if (res.done) {
          await resultsIterator.close();
          break;
        }
      }
      return JSON.stringify(allResults);
    }
  
     /**
   * Transfer ownership
   * 
   * This transaction is executed by the owner to change ownership from one participant to another
   *     
   * @param itemId - The unique identifier of the item
   * @param deliveryDate - the timestamp of the event
   * @returns none
   */



  async transferOwnership(ctx, itemId, deliveryDate) {
    // get id from praticipant

    const identity = ctx.clientIdentity;
    const id = await this.getParticipantId(identity)

    // make key-pair for participant
    let key = participant.getType() + "Participant:" + participant.getId();
    
    // retrieve item
    const items = await this.queryItems()

    // make key-pair for item
    let keyItem = Item.getType() + "Item:" + Item.getItemId()

    // create transfer
    let transfer = new transfer(id, itemId, deliveryDate);

    // object die wallet owner toekent
    await ctx.clientIdentity.putState(key, participant.serialise())
    await ctx.clientIdentity.putState(keyItem, item.serialise())


    // Return the newly created transfer
    return JSON.stringify(transfer);
  
  }
  

}

module.exports = InventoryContract;