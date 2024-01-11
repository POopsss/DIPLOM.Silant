from django.contrib.auth.models import User
from django.db import models


class Truck(models.Model):
    truckModel = models.ForeignKey('HandBook', on_delete=models.CASCADE, unique=False, related_name='truckModel', verbose_name='Модель техники')
    serialNumber = models.CharField(max_length=64, unique=True, verbose_name='Зав. № машины')
    engineModel = models.ForeignKey('HandBook', on_delete=models.CASCADE, unique=False, related_name='engineModel', verbose_name='Модель двигателя')
    engineSerialNumber = models.CharField(max_length=64, unique=True, verbose_name='Зав. № двигателя')
    transmissionModel = models.ForeignKey('HandBook', on_delete=models.CASCADE, unique=False, related_name='transmissionModel', verbose_name='Модель трансмиссии')
    transmissionSerialNumber = models.CharField(max_length=64, unique=True, verbose_name='Зав. № трансмиссии')
    drivingBridgeModel = models.ForeignKey('HandBook', on_delete=models.CASCADE, unique=False, related_name='drivingBridgeModel', verbose_name='Модель ведущего моста')
    drivingBridgeSerialNumber = models.CharField(max_length=64, unique=True, verbose_name='Зав. № ведущего моста')
    controlledBridgeModel = models.ForeignKey('HandBook', on_delete=models.CASCADE, unique=False, related_name='controlledBridgeModel', verbose_name='Модель управляемого моста')
    controlledBridgeSerialNumber = models.CharField(max_length=64, unique=True, verbose_name='Зав. № управляемого моста')

    # def __str__(self):
    #     return self.serialNumber


class DeliveryAgreement(models.Model):
    truck = models.OneToOneField('Truck', on_delete=models.CASCADE, related_name='truck', verbose_name='Машина')
    documentNumber = models.CharField(max_length=64, unique=True, verbose_name='Договор поставки №, дата')
    dateOfShipment = models.DateField(verbose_name='Дата отгрузки с завода')
    consumer = models.CharField(max_length=64, verbose_name='Грузополучатель (конечный потребитель)')
    deliveryAddress = models.CharField(max_length=64, verbose_name='Адрес поставки (эксплуатации)')
    equipment = models.ManyToManyField('HandBook', through='TruckEquipment', related_name='TruckEquipment')
    client = models.ForeignKey(User, on_delete=models.CASCADE, unique=False, related_name='client', verbose_name='Клиент')
    service = models.ForeignKey(User, on_delete=models.CASCADE, unique=False, related_name='service', verbose_name='Сервисная компания')

    def __str__(self):
        return self.documentNumber


class Maintenance(models.Model):
    type = models.ForeignKey('HandBook', on_delete=models.CASCADE, related_name='type', verbose_name='Вид ТО')
    maintenanceDate = models.DateField(blank=True, null=True, verbose_name='Дата проведения ТО')
    operatingTime = models.IntegerField(verbose_name='Наработка, м/час')
    order = models.CharField(max_length=64, verbose_name='№ заказ-наряда')
    orderDate = models.DateField(verbose_name='Дата заказ-наряда')
    contractor = models.ForeignKey('HandBook', blank=True, null=True, on_delete=models.SET_NULL, related_name='contractor', verbose_name='Организация, проводившая ТО')
    truck = models.ForeignKey('DeliveryAgreement', on_delete=models.CASCADE, verbose_name='Машина')


class Reclamation(models.Model):
    refusalDate = models.DateField(verbose_name='Дата отказа')
    operatingTime = models.IntegerField(verbose_name='Наработка, м/час')
    failureNode = models.ForeignKey('HandBook', on_delete=models.SET_NULL, blank=True, null=True, related_name='failureNode', verbose_name='Узел отказа')
    failureDescription = models.TextField(verbose_name='Описание отказа')
    troubleshooting = models.ForeignKey('HandBook', on_delete=models.SET_NULL, blank=True, null=True, related_name='troubleshootingMethod', verbose_name='Способ восстановления')
    sparePartsUsed = models.CharField(max_length=64, blank=True, null=True, verbose_name='Используемые запасные части')
    restorationDate = models.DateField(blank=True, null=True, verbose_name='Дата восстановления')
    downtime = models.IntegerField(blank=True, null=True, editable=False, verbose_name='Время простоя техники')
    truck = models.ForeignKey('DeliveryAgreement', on_delete=models.CASCADE, verbose_name='Mашина')

    def save(self, *args, **kwargs):
        if self.restorationDate:
            self.downtime = (self.restorationDate - self.refusalDate).days
        super(Reclamation, self).save(*args, **kwargs)


class Handbook(models.Model):
    handbookName = models.ForeignKey('HandbookName', on_delete=models.CASCADE, related_name='Handbook')
    name = models.TextField(unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class HandbookName(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name


class TruckEquipment(models.Model):
    truck = models.ForeignKey('DeliveryAgreement', on_delete=models.CASCADE, unique=False, verbose_name='Машина')
    equipment = models.ForeignKey('Handbook', on_delete=models.CASCADE, unique=False, verbose_name='Комплектация')

    class Meta:
        unique_together = ('truck', 'equipment')
