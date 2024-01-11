from django.contrib import admin
from django.contrib.auth.models import User

from .models import Truck, DeliveryAgreement, Maintenance, Reclamation, Handbook, HandbookName, TruckEquipment


@admin.register(Truck)
class TruckAdmin(admin.ModelAdmin):
    list_display = ('truckModel', 'serialNumber')

    def get_form(self, request, obj=None, **kwargs):
        form = super(TruckAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['truckModel'].queryset = Handbook.objects.filter(handbookName__name='Модель техники')
        form.base_fields['engineModel'].queryset = Handbook.objects.filter(handbookName__name='Модель двигателя')
        form.base_fields['transmissionModel'].queryset = Handbook.objects.filter(handbookName__name='Модель трансмиссии')
        form.base_fields['drivingBridgeModel'].queryset = Handbook.objects.filter(handbookName__name='Модель ведущего моста')
        form.base_fields['controlledBridgeModel'].queryset = Handbook.objects.filter(handbookName__name='Модель управляемого моста')
        return form


@admin.register(DeliveryAgreement)
class DeliveryAgreementAdmin(admin.ModelAdmin):
    list_display = ('documentNumber', 'truck', 'client', 'service')

    def get_form(self, request, obj=None, **kwargs):
        form = super(DeliveryAgreementAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['client'].queryset = User.objects.filter(groups__name='client')
        form.base_fields['service'].queryset = User.objects.filter(groups__name='service')
        return form


@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ('type', 'order', 'truck')

    def get_form(self, request, obj=None, **kwargs):
        form = super(MaintenanceAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['type'].queryset = Handbook.objects.filter(handbookName__name='Вид ТО')
        form.base_fields['contractor'].queryset = Handbook.objects.filter(handbookName__name='Сервисная компания')
        return form


@admin.register(Reclamation)
class ReclamationAdmin(admin.ModelAdmin):
    list_display = ('truck', 'refusalDate', 'restorationDate', 'downtime')

    def get_form(self, request, obj=None, **kwargs):
        form = super(ReclamationAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['failureNode'].queryset = Handbook.objects.filter(handbookName__name__contains='Узел отказа')
        form.base_fields['troubleshooting'].queryset = Handbook.objects.filter(handbookName__name='Способ восстановления')
        return form


@admin.register(HandbookName)
class HandbookNameAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Handbook)
class HandbookAdmin(admin.ModelAdmin):
    list_display = ('handbookName', 'name', 'description')


@admin.register(TruckEquipment)
class TruckEquipmentAdmin(admin.ModelAdmin):
    list_display = ('truck', 'equipment')

    def get_form(self, request, obj=None, **kwargs):
        form = super(TruckEquipmentAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['equipment'].queryset = Handbook.objects.filter(handbookName__name='Комплектация')
        return form
