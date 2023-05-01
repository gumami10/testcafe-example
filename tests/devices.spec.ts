import devices from './pages/devices';
import newDevice from './pages/newDevice';

import { Selector } from 'testcafe';

fixture `Devices`
    .page `http://localhost:3001/`;



test('check devices to see if all there', async t => {
    const devicesList = (await t.request(`http://localhost:3000/devices`)).body as Array<{id: string, system_name: string, type: string, hdd_capacity: string}>
    const devicesCount = await devices.container.count
    for(let i = 0; i < devicesCount; i++) {
        const [deviceName, deviceCapacity, deviceType] = devices.retrieveDevice(i)
        const editButton = devices.retrieveEdit(i)
        const deleteButton = devices.retrieveDelete(i)

        const deviceNameText = await deviceName.innerText;
        const deviceApi = devicesList.filter(e => e.system_name === deviceNameText)[0]
        await t
            .expect(deviceName.innerText).eql(deviceApi.system_name)
            .expect(deviceCapacity.innerText).contains(deviceApi.hdd_capacity)
            .expect(deviceType.innerText).eql(deviceApi.type)
            .expect(editButton.visible).ok()
            .expect(deleteButton.visible).ok()
    }
    
})


test('should add device and be visible', async t => {
    const systemName = 'ERIC-LENOVO'
    const hddCapacity = '256'
    const type = 'MAC'
    await t
            .click(devices.addDeviceButton)
            .typeText(newDevice.systemNameInput, systemName)
            .click(newDevice.typeSelect)
            .click(newDevice.retrieveOption(type))
            .typeText(newDevice.hddInput, hddCapacity)
            .click(newDevice.saveButton)
        
    const savedElement = devices.deviceName.withText(systemName).parent()
    await t
            .expect(savedElement.find('.device-name').innerText).contains(systemName)
            .expect(savedElement.find('.device-type').innerText).contains(type)
            .expect(savedElement.find('.device-capacity').innerText).contains(hddCapacity)
})

test('rename device should be updated and visible', async t => {
    const devicesList = (await t.request(`http://localhost:3000/devices`)).body as Array<{id: string, system_name: string, type: string, hdd_capacity: string}>
    const options:RequestOptions = {
        method: 'PUT',
        body: {
            'system_name': 'Renamed Device',
            'type': devicesList[0].type,
            'hdd_capacity': devicesList[0].hdd_capacity
        }
    }
    const response = await t.request(`http://localhost:3000/devices/${devicesList[0].id}`, options)
    await t.navigateTo('http://localhost:3001/')
    const savedElement = devices.deviceName.withText('Renamed Device').parent()
    await t
            .expect(savedElement.find('.device-name').innerText).contains('Renamed Device')
            .expect(savedElement.find('.device-type').innerText).contains(devicesList[0].type)
            .expect(savedElement.find('.device-capacity').innerText).contains(devicesList[0].hdd_capacity)
})

test('delete device and shouldnt be visible', async t => {
    const devicesList = (await t.request(`http://localhost:3000/devices`)).body as Array<{id: string, system_name: string, type: string, hdd_capacity: string}>
    const options:RequestOptions = {
        method: 'DELETE',
    }
    await t.request(`http://localhost:3000/devices/${devicesList[devicesList.length - 1].id}`, options)
    await t.navigateTo('http://localhost:3001/')
    const deletedDevice =  devices.deviceName.withText(devicesList[devicesList.length - 1].system_name)
    await t.expect(deletedDevice.exists).notOk()
})