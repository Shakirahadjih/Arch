/*
 * Representation of an Egg Shipment Asset
 * Author: MFK
 */

'use strict'

// const shipmentStatus = {
//     READY: 'READY',
//     LOADED: 'LOADED',
//     DELIVERED: 'DELIVERED'
// };

const State = require('./state.js');

class Shipment extends State {

    constructor(sourceId, destination, itemId, shipmentCreation, shipmentId) {
        super('Shipment');
        this.setSource(sourceId);
        this.setDestination(destination);
        this.setItem(itemId);
        this.setShipmentCreation(shipmentCreation);
        this.setShipmentId(shipmentId);
        // this.setReady();
        this.itemIds = [];
    }

    /* basic setters */

    setSource(sourceId) {
        this.sourceId = sourceId;
    }

    setDestination(destination) {
        this.destination = destination;
    }

    setItemId(itemId) {
        this.itemId = itemId;
    }

    setShipmentCreation(shipmentCreation) {
        this.shipmentCreation = shipmentCreation;
    }

    setShipmentId(shipmentId) {
        this.shipmentId = shipmentId;
    }

    // setLoadTimestamp(loadTimestamp) {
    //     this.loadTimestamp = loadTimestamp;
    // }

    addItemId(itemId) {
        this.itemIds.push(itemId);
    }

    /* basic getters */
    getSource() {
        return this.sourceId;
    }

    getDestination() {
        return this.destination;
    }

    getItemId() {
        return this.itemId;
    }

    getShipmentCreation() {
        return this.shipmentCreation;
    }

    // getLoadTimestamp() {
    //     return this.loadTimestamp;
    // }

    getItemIds() {
        return this.itemIds;
    }

    // /* Basic methods to encapsulate shipment status */

    // setReady() {
    //     this.currentState = shipmentStatus.READY;
    // }

    // setLoaded() {
    //     this.currentState = shipmentStatus.LOADED;
    // }

    // setDelivered() {
    //     this.currentState = shipmentStatus.DELIVERED;
    // }

    // isReady() {
    //     return this.currentState === shipmentStatus.READY;
    // }

    // isLoaded() {
    //     return this.currentState === shipmentStatus.LOADED;
    // }

    // isDelivered() {
    //     return this.currentState === shipmentStatus.DELIVERED;
    // }    

    /**
     * Returns an object from a buffer. Normally called after a getState
     * @param {*} buffer
     */
    static deserialise(buffer) {
        const values = JSON.parse(buffer.toString());
        const shipment = new Shipment();
        Object.assign(shipment,values);  
        return shipment;
    }


}

module.exports = Shipment;

