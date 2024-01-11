from django import forms
from django.contrib.auth.models import User

from .models import Truck, DeliveryAgreement, Maintenance, Reclamation, Handbook, HandbookName


class TruckForm(forms.ModelForm):
    truckModel = forms.ModelChoiceField(
        label='truckModel',
        queryset=Handbook.objects.all().filter(handbookName=HandbookName.objects.get(name='Модель техники').id),
    )
    engineModel = forms.ModelChoiceField(
        label='truckModel',
        queryset=Handbook.objects.all().filter(handbookName=HandbookName.objects.get(name='Модель двигателя').id),
    )
    transmissionModel = forms.ModelChoiceField(
        label='truckModel',
        queryset=Handbook.objects.all().filter(handbookName=HandbookName.objects.get(name='Модель трансмиссии').id),
    )
    drivingBridgeModel = forms.ModelChoiceField(
        label='truckModel',
        queryset=Handbook.objects.all().filter(handbookName=HandbookName.objects.get(name='Модель ведущего моста').id),
    )
    controlledBridgeModel = forms.ModelChoiceField(
        label='truckModel',
        queryset=Handbook.objects.all().filter(handbookName=HandbookName.objects.get(name='Модель управляемого моста').id),
    )

    class Meta:
        model = Truck
        fields = [
            'truckModel',
            'serialNumber',
            'engineModel',
            'engineSerialNumber',
            'transmissionModel',
            'transmissionSerialNumber',
            'drivingBridgeModel',
            'drivingBridgeSerialNumber',
            'controlledBridgeModel',
            'controlledBridgeSerialNumber'
        ]


class DeliveryAgreementForm(forms.ModelForm):
    equipment = forms.ModelMultipleChoiceField(
        label='equipment',
        queryset=Handbook.objects.all().filter(handbookName__name='Комплектация'),
        required=False
    )
    client = forms.ModelChoiceField(
        label='client',
        queryset=User.objects.all().filter(groups__name='client'),
    )
    service = forms.ModelChoiceField(
        label='service',
        queryset=User.objects.all().filter(groups__name='service'),
    )

    class Meta:
        model = DeliveryAgreement
        fields = [
           'truck',
           'documentNumber',
           'dateOfShipment',
           'consumer',
           'deliveryAddress',
           'equipment',
           'client',
           'service'
        ]


class MaintenanceForm(forms.ModelForm):
    type = forms.ModelChoiceField(
        label='type',
        queryset=Handbook.objects.all().filter(handbookName__name='Вид ТО'),
    )
    contractor = forms.ModelChoiceField(
        label='contractor',
        queryset=Handbook.objects.all().filter(handbookName__name='Сервисная компания'),
        required=False
    )

    class Meta:
        model = Maintenance
        fields = [
            'truck',
            'type',
            'maintenanceDate',
            'operatingTime',
            'order',
            'orderDate',
            'contractor'
        ]


class ReclamationForm(forms.ModelForm):
    failureNode = forms.ModelChoiceField(
        label='failureNode',
        queryset=Handbook.objects.filter(handbookName__name__contains='Узел отказа'),
        required=False
    )
    troubleshooting = forms.ModelChoiceField(
        label='troubleshooting',
        queryset=Handbook.objects.all().filter(handbookName__name='Способ восстановления'),
        required=False
    )

    class Meta:
        model = Reclamation
        fields = [
            'truck',
            'refusalDate',
            'operatingTime',
            'failureNode',
            'failureDescription',
            'troubleshooting',
            'sparePartsUsed',
            'restorationDate',
        ]


class HandbookForm(forms.ModelForm):

    class Meta:
        model = Handbook
        fields = ['name', 'description', 'handbookName']
