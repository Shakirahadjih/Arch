export class EggShipment {
    key: string;
    record: EggShipmentRecord
}

export class EggShipmentRecord {
    currentState: string;
    distributorId: string;
    eggIds: string[];
    farmerId: string;
    shipmentCreation: string;
    shipmentId: string;
    shipperId: string;
}