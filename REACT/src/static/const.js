const subitem = [
    {name: "№\nп/п", data_order: ""},
]
const document_number_field = [
    {name: "Договор\nпоставки №", data_order: "documentNumber"}
]
const truck = [
    {name: "Модель\nтехники", data_order: "truckModel"},
    {name: "Зав. №\nмашины", data_order: "serialNumber"},
    {name: "Модель\nдвигателя", data_order: "engineModel"},
    {name: "Зав. №\nдвигателя", data_order: "engineSerialNumber"},
    {name: "Модель трансмиссии\n(производитель, артикул)", data_order: "transmissionModel"},
    {name: "Зав. №\nтрансмиссии", data_order: "transmissionSerialNumber"},
    {name: "Модель\nведущего моста", data_order: "drivingBridgeModel"},
    {name: "Зав. №\nведущего моста", data_order: "drivingBridgeSerialNumber"},
    {name: "Модель\nуправляемого моста", data_order: "controlledBridgeModel"},
    {name: "Зав. №\nуправляемого моста", data_order: "controlledBridgeSerialNumber"}
]

export const truck_fields = subitem.concat(truck)
export const delivery_agreement_fields = subitem.concat(document_number_field.concat(truck.concat([
    {name: "Дата отгрузки\nс завода", data_order: "dateOfShipment"},
    {name: "Покупатель", data_order: "client__first_name"},
    {name: "Грузополучатель\n(конечный потребитель)", data_order: "consumer"},
    {name: "Адрес поставки\n(эксплуатации)", data_order: "deliveryAddress"},
    {name: "Комплектация\n(доп. опции)", data_order: ""},
    {name: "Сервисная компания", data_order: "service__first_name"}
])))
export const maintenance_fields = subitem.concat([
    {name: "Зав. №\nмашины", data_order: "serialNumber"},
    {name: "Вид ТО", data_order: "type"},
    {name: "Дата\nпроведения ТО", data_order: "maintenanceDate"},
    {name: "Наработка,\nм/час", data_order: "operatingTime"},
    {name: "№ заказ-наряда", data_order: "order"},
    {name: "Дата заказ-наряда", data_order: "orderDate"},
    {name: "Организация,\nпроводившая ТО", data_order: "contractor"}
])
export const reclamation_fields = subitem.concat([
    {name: "Зав. №\nмашины", data_order: "serialNumber"},
    {name: "Дата\nотказа", data_order: "refusalDate"},
    {name: "Наработка,\nм/час", data_order: "operatingTime"},
    {name: "Узел\nотказа", data_order: "failureNode"},
    {name: "Описание\nотказа", data_order: "failureDescription"},
    {name: "Способ\nвосстановления", data_order: "troubleshooting"},
    {name: "Используемые\nзапасные части", data_order: "sparePartsUsed"},
    {name: "Дата\nвосстановления", data_order: "restorationDate"},
    {name: "Время простоя\nтехники", data_order: "downtime"}
])
export const handbook_fields = subitem.concat([
    {name: "Название", data_order: ""},
    {name: "Описание", data_order: ""}
])


export const truck_search_params = [
    {name: "Модель техники", field: "truckModel", type: "text"},
    {name: "Заводской номер", field: "serialNumber", type: "text"},
    {name: "Модель двигателя", field: "engineModel", type: "text"},
    {name: "Зав. № двигателя", field: "engineSerialNumber", type: "text"},
    {name: "Модель трансмиссии", field: "transmissionModel", type: "text"},
    {name: "Зав. № трансмиссии", field: "transmissionSerialNumber", type: "text"},
    {name: "Модель ведущего моста", field: "drivingBridgeModel", type: "text"},
    {name: "Зав. № ведущего моста", field: "drivingBridgeSerialNumber", type: "text"},
    {name: "Модель управляемого моста", field: "controlledBridgeModel", type: "text"},
    {name: "Зав. № управляемого моста", field: "controlledBridgeSerialNumber", type: "text"},
]
export const delivery_agreement_search_params = truck_search_params.concat([
    {name: "Договор поставки №, дата", field: "documentNumber", type: "text"},
    {name: "Дата отгрузки с завода", field: "dateOfShipment", type: "date"},
    {name: "Грузополучатель", field: "consumer", type: "text"},
    {name: "Адрес поставки", field: "deliveryAddress", type: "text"},
    {name: "Клиент", field: "client", type: "text"},
    {name: "Сервисная компания", field: "service", type: "text"},
])
export const maintenance_search_params = delivery_agreement_search_params.concat([
    {name: "Вид ТО", field: "type", type: "text"},
    {name: "Дата проведения ТО", field: "maintenanceDate", type: "date"},
    {name: "Наработка, м/час", field: "operatingTime", type: "number"},
    {name: "№ заказ-наряда", field: "order", type: "text"},
    {name: "Дата заказ-наряда", field: "orderDate", type: "date"},
    {name: "Организация, проводившая ТО", field: "contractor", type: "text"},
])
export const reclamation_search_params = delivery_agreement_search_params.concat([
    {name: "Дата отказа", field: "refusalDate", type: "date"},
    {name: "Наработка, м/час", field: "operatingTime", type: "number"},
    {name: "Узел отказа", field: "failureNode", type: "text"},
    {name: "Описание отказа", field: "failureDescription", type: "text"},
    {name: "Способ восстановления", field: "troubleshooting", type: "text"},
    {name: "Используемые запасные части", field: "sparePartsUsed", type: "text"},
    {name: "Дата восстановления", field: "restorationDate", type: "date"},
    {name: "Время простоя техники", field: "downtime", type: "number"},
])