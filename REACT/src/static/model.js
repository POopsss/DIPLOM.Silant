const truck_filter = [
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
const delivery_agreement_filter = [
    {name: "Договор поставки №, дата", field: "documentNumber", type: "text"},
    {name: "Дата отгрузки с завода", field: "dateOfShipment", type: "date"},
    {name: "Грузополучатель", field: "consumer", type: "text"},
    {name: "Адрес поставки", field: "deliveryAddress", type: "text"},
    {name: "Клиент", field: "client", type: "text"},
    {name: "Сервисная компания", field: "service", type: "text"},
]

export const model = {
    truck: {
        path: "/truck",
        auth: false,
        create: ["managers"],
        lookup: "serialNumber",
        fields: [
            {name: "Модель\nтехники", field: "truckModel", order_by: true, value: "truckModel", handbook: true},
            {name: "Зав. №\nмашины", field: "serialNumber", order_by: true, value: "serialNumber", handbook: false},
            {name: "Модель\nдвигателя", field: "engineModel", order_by: true, value: "engineModel", handbook: true},
            {name: "Зав. №\nдвигателя", field: "engineSerialNumber", order_by: true, value: "engineSerialNumber", handbook: false},
            {name: "Модель трансмиссии\n(производитель, артикул)", field: "transmissionModel", order_by: true, value: "transmissionModel", handbook: true},
            {name: "Зав. №\nтрансмиссии", field: "transmissionSerialNumber", order_by: true, value: "transmissionSerialNumber", handbook: false},
            {name: "Модель\nведущего моста", field: "drivingBridgeModel", order_by: true, value: "drivingBridgeModel", handbook: true},
            {name: "Зав. №\nведущего моста", field: "drivingBridgeSerialNumber", order_by: true, value: "drivingBridgeSerialNumber", handbook: false},
            {name: "Модель\nуправляемого моста", field: "controlledBridgeModel", order_by: true, value: "controlledBridgeModel", handbook: true},
            {name: "Зав. №\nуправляемого моста", field: "controlledBridgeSerialNumber", order_by: true, value: "controlledBridgeSerialNumber", handbook: false}
        ],
        filter: truck_filter,
        form: [
            {name: "Модель\nтехники*", field: "truckModel", type: "select", field_lookup: false, path: "hand_book/?handbookName=Модель техники", lookup: "name"},
            {name: "Зав. №\nмашины*", field: "serialNumber", type: "text"},
            {name: "Модель\nдвигателя*", field: "engineModel", type: "select", field_lookup: false, path: "hand_book/?handbookName=Модель двигателя", lookup: "name"},
            {name: "Зав. №\nдвигателя*", field: "engineSerialNumber", type: "text"},
            {name: "Модель трансмиссии\n(производитель, артикул)*", field: "transmissionModel", type: "select", field_lookup: false, path: "hand_book/?handbookName=Модель трансмиссии", lookup: "name"},
            {name: "Зав. №\nтрансмиссии*", field: "transmissionSerialNumber", type: "text"},
            {name: "Модель\nведущего моста*", field: "drivingBridgeModel", type: "select", field_lookup: false, path: "hand_book/?handbookName=Модель ведущего моста", lookup: "name"},
            {name: "Зав. №\nведущего моста*", field: "drivingBridgeSerialNumber", type: "text"},
            {name: "Модель\nуправляемого моста*", field: "controlledBridgeModel", type: "select", field_lookup: false, path: "hand_book/?handbookName=Модель управляемого моста", lookup: "name"},
            {name: "Зав. №\nуправляемого моста*", field: "controlledBridgeSerialNumber", type: "text"}
        ],
        formInit: {
            "truckModel": "",
            "serialNumber": "",
            "engineModel": "",
            "engineSerialNumber": "",
            "transmissionModel": "",
            "transmissionSerialNumber": "",
            "drivingBridgeModel": "",
            "drivingBridgeSerialNumber": "",
            "controlledBridgeModel": "",
            "controlledBridgeSerialNumber": ""
        }
    },


    delivery_agreement: {
        path: "/delivery_agreement",
        auth: true,
        create: ["managers"],
        lookup: "documentNumber",
        fields: [
            {name: "Модель\nтехники", field: "truck__truckModel", order_by: true, handbook: true},
            {name: "Зав. №\nмашины", field: "truck__serialNumber", order_by: true, handbook: false},
            {name: "Модель\nдвигателя", field: "truck__engineModel", order_by: true, handbook: true},
            {name: "Зав. №\nдвигателя", field: "truck__engineSerialNumber", order_by: true, handbook: false},
            {name: "Модель трансмиссии\n(производитель, артикул)", field: "truck__transmissionModel", order_by: true, handbook: true},
            {name: "Зав. №\nтрансмиссии", field: "truck__transmissionSerialNumber", order_by: true, handbook: false},
            {name: "Модель\nведущего моста", field: "truck__drivingBridgeModel", order_by: true, handbook: true},
            {name: "Зав. №\nведущего моста", field: "truck__drivingBridgeSerialNumber", order_by: true, handbook: false},
            {name: "Модель\nуправляемого моста", field: "truck__controlledBridgeModel", order_by: true, handbook: true},
            {name: "Зав. №\nуправляемого моста", field: "truck__controlledBridgeSerialNumber", order_by: true, handbook: false},
            {name: "Договор поставки\n№, дата", field: "documentNumber", order_by: true, handbook: false},
            {name: "Дата отгрузки\nс завода", field:"dateOfShipment", order_by: true, handbook: false},
            {name: "Покупатель", field: "client__first_name", order_by: true, handbook: false},
            {name: "Грузополучатель\n(конечный потребитель)", field: "consumer", order_by: true, handbook: false},
            {name: "Адрес поставки\n(эксплуатации)", field: "deliveryAddress", order_by: true, handbook: false},
            {name: "Комплектация\n(доп. опции)", field: "equipment", order_by: false, handbook: true},
            {name: "Сервисная компания", field: "service__first_name", order_by: true, handbook: false}
        ],
        filter: truck_filter.concat(delivery_agreement_filter),
        form: [
            {name: "Зав. №\nмашины*", field: "truck", type: "select", field_lookup: true, path: "truck/?order_by=serialNumber", lookup: "serialNumber"},
            {name: "Договор поставки\n№, дата*", field: "documentNumber", type: "text"},
            {name: "Дата отгрузки\nс завода*", field: "dateOfShipment", type: "date"},
            {name: "Грузополучатель\n(конечный потребитель)*", field: "consumer", type: "text"},
            {name: "Адрес поставки\n(эксплуатации)*", field: "deliveryAddress", type: "text"},
            {name: "Комплектация\n(доп. опции)*", field: "equipment", type: "multiple", field_lookup: false, path: "hand_book/?handbookName=Комплектация", lookup: "name"},
            {name: "Покупатель*", field: "client", type: "select", field_lookup: true, path: "username/?group=client", lookup: "first_name"},
            {name: "Сервисная компания*", field: "service", type: "select", field_lookup: true, path: "username/?group=service", lookup: "first_name"},
        ],
        formInit: {
            "truck": "",
            "documentNumber": "", 
            "dateOfShipment": "", 
            "consumer": "", 
            "deliveryAddress": "", 
            "equipment": [], 
            "client": "", 
            "service": ""
        }
    },


    maintenance: {
        path: "/maintenance",
        auth: true,
        create: ["managers", "service", "client"],
        lookup: "id",
        fields: [
            {name: "Договор поставки\n№, дата", field: "truck", order_by: true, handbook: false},
            {name: "Зав. №\nмашины", field: "truck_serial_number", order_by: true, handbook: false},
            {name: "Вид ТО", field: "type", order_by: true, handbook: true},
            {name: "Дата\nпроведения ТО", field: "maintenanceDate", order_by: true, handbook: false},
            {name: "Наработка,\nм/час", field: "operatingTime", order_by: true, handbook: false},
            {name: "№ заказ-наряда", field: "order", order_by: true, handbook: false},
            {name: "Дата заказ-наряда", field: "orderDate", order_by: true, handbook: false},
            {name: "Организация,\nпроводившая ТО", field: "contractor", order_by: true, handbook: true},
        ],
        filter: truck_filter.concat(delivery_agreement_filter).concat([
            {name: "Вид ТО", field: "type", type: "text"},
            {name: "Дата проведения ТО", field: "maintenanceDate", type: "date"},
            {name: "Наработка, м/час", field: "operatingTime", type: "number"},
            {name: "№ заказ-наряда", field: "order", type: "text"},
            {name: "Дата заказ-наряда", field: "orderDate", type: "date"},
            {name: "Организация, проводившая ТО", field: "contractor", type: "text"},
        ]),
        form: [
            {name: "Договор поставки\n№, дата*", field: "truck", type: "select", field_lookup: false, path: "delivery_agreement/", lookup: "documentNumber"},
            {name: "Вид ТО*", field: "type", type: "select", field_lookup: false, path: "hand_book/?handbookName=Вид ТО", lookup: "name"},
            {name: "Дата проведения ТО", field: "maintenanceDate", type: "date"},
            {name: "Наработка, м/час*", field: "operatingTime", type: "number"},
            {name: "№ заказ-наряда*", field: "order", type: "text"},
            {name: "Дата заказ-наряда*", field: "orderDate", type: "date"},
            {name: "Организация, проводившая ТО", field: "contractor", type: "select", field_lookup: false, path: "hand_book/?handbookName=Сервисная компания", lookup: "name"}
        ],
        formInit: {
            "truck": "",
            "type": "",
            "maintenanceDate": "",
            "operatingTime": "",
            "order": "",
            "orderDate": "",
            "contractor": "",
        }
    },


    reclamation: {
        path: "/reclamation",
        auth: true,
        create: ["managers", "service"],
        lookup: "id",
        fields: [
            {name: "Договор поставки\n№, дата", field: "truck", order_by: true, handbook: false},
            {name: "Зав. №\nмашины", field: "truck_serial_number", order_by: false, handbook: false},
            {name: "Дата\nотказа", field: "refusalDate", order_by: true, handbook: false},
            {name: "Наработка,\nм/час", field: "operatingTime", order_by: true, handbook: false},
            {name: "Узел\nотказа", field: "failureNode", order_by: true, handbook: true},
            {name: "Описание\nотказа", field: "failureDescription", order_by: true, handbook: false},
            {name: "Способ\nвосстановления", field: "troubleshooting", order_by: true, handbook: true},
            {name: "Используемые\nзапасные части", field: "sparePartsUsed", order_by: true, handbook: false},
            {name: "Дата\nвосстановления", field: "restorationDate", order_by: true, handbook: false},
            {name: "Время простоя\nтехники", field: "downtime", order_by: true, handbook: false},
        ], 
        filter: truck_filter.concat(delivery_agreement_filter).concat([
            {name: "Дата отказа", field: "refusalDate", type: "date"},
            {name: "Наработка, м/час", field: "operatingTime", type: "number"},
            {name: "Узел отказа", field: "failureNode", type: "text"},
            {name: "Описание отказа", field: "failureDescription", type: "text"},
            {name: "Способ восстановления", field: "troubleshooting", type: "text"},
            {name: "Используемые запасные части", field: "sparePartsUsed", type: "text"},
            {name: "Дата восстановления", field: "restorationDate", type: "date"},
            {name: "Время простоя техники", field: "downtime", type: "number"},
        ]),
        form: [
            {name: "Договор поставки\n№, дата: *", field: "truck", type: "select", field_lookup: false, path: "delivery_agreement/", lookup: "documentNumber"},
            {name: "Дата отказа: *", field: "refusalDate", type: "date"},
            {name: "Наработка, м/час: *", field: "operatingTime", type: "number"},
            {name: "Узел отказа:", field: "failureNode", type: "select", field_lookup: false, path: "hand_book/?handbookName=Узел отказа", lookup: "name"},
            {name: "Описание отказа: *", field: "failureDescription", type: "textarea"},
            {name: "Способ восстановления:", field: "troubleshooting", type: "select", field_lookup: false, path: "hand_book/?handbookName=Способ восстановления", lookup: "name"},
            {name: "Используемые запасные части:", field: "sparePartsUsed", type: "text"},
            {name: "Дата восстановления:", field: "restorationDate", type: "date"}
        ],
        formInit: {
            "truck": "",
            "refusalDate": "",
            "operatingTime": "",
            "failureNode": "",
            "failureDescription": "",
            "troubleshooting": "",
            "sparePartsUsed": "",
            "restorationDate": ""
        }
    },

    handbook: {
        create: ["managers"],
        form: [
            {name: "Заголовок*", field: "handbookName", type: "select", field_lookup: false, path: "hand_book_name/", lookup: "name"},
            {name: "Название*", field: "name", type: "text"},
            {name: "Описание*", field: "description", type: "textarea"},
        ],
        formInit: {
            "handbookName": "",
            "name": "",
            "description": "",
        }
    },
}