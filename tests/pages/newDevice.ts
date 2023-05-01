import { Selector } from 'testcafe';


class NewDevice {
    systemNameInput: Selector;
    typeSelect: Selector;
    hddInput: Selector;
    saveButton: Selector;

    constructor () {
        this.systemNameInput = Selector('#system_name')
        this.typeSelect = Selector('#type')
        this.hddInput = Selector('#hdd_capacity')
        this.saveButton = Selector('.submitButton')
    }

    retrieveOption (value: string) {
        return this.typeSelect.find('option').withText(value)
    }

}

export default new NewDevice();
