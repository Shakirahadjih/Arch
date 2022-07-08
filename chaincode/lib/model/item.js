/*
 * Representation of an item Asset
 * Author: team shak
 */

'use strict';

const State = require('./state.js');

class Item extends State {

    constructor(itemId, description, owner) {
        super('Item');
        this.setItemId(itemId);
        this.setDescription(description);
        this.setOwner(owner);
    }

    /* Basic Getters */

    getItemId() {
        return this.itemId;
    }

    getDescription() {
        return this.description;
    }

    getOwner() {
        return this.owner;
    }

    /** basic setters */
    
    setItemId(itemId) {
        this.itemId = itemId;
    }

    setDescription(description) {
        this.description = description;
    }

    setOwner(owner) {
        this.owner = owner;
    }
    
    /**
     * Returns an object from a buffer. Normally called after a getState
     * @param {*} buffer
     */
    static deserialise(buffer) {
        const values = JSON.parse(buffer.toString());
        const item = new Item();
        Object.assign(item,values);  
        return item;
    }
}

module.exports = Item;
