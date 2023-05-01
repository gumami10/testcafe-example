import { Selector } from 'testcafe';


class Devices {
    container: Selector;
    listDevices: Selector;
    deviceName: Selector;
    deviceType: Selector;
    deviceCapacity: Selector;
    addDeviceButton: Selector;

    constructor () {
        this.listDevices = Selector('.list-devices')
        this.container = this.listDevices.find('.device-main-box')
        this.addDeviceButton = Selector('.submitButton')
        this.deviceName = Selector('.device-name')
        this.deviceType = Selector('.device-capacity')
        this.deviceCapacity = Selector('.device-type')
    }

    retrieveDevice (iterator: number) {
        return [this.listDevices.find('.device-name').nth(iterator),
        this.listDevices.find('.device-capacity').nth(iterator),
        this.listDevices.find('.device-type').nth(iterator)]
    }

    retrieveEdit (iterator: number) {
        return this.listDevices.find('.device-edit').nth(iterator)
    }

    retrieveDelete (iterator: number) {
        return this.listDevices.find('.device-edit').nth(iterator)
    }

}

export default new Devices();
