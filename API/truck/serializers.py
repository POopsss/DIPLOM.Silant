from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Truck, DeliveryAgreement, Maintenance, Reclamation, Handbook, HandbookName, TruckEquipment


class TokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class UserAuthSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    groups = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = ['first_name', 'groups', 'is_superuser']


class UserUsernameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['first_name']


class HandbookSerializer(serializers.HyperlinkedModelSerializer):
    handbookName = serializers.CharField(source='handbookName.name')

    class Meta:
        model = Handbook
        fields = ['name', 'description', 'handbookName']
        lookup_field = 'name'
        extra_kwargs = {
            'url': {'lookup_field': 'name'}
        }


class HandbookNameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HandbookName
        fields = ['name']
        lookup_field = 'name'
        extra_kwargs = {
            'url': {'lookup_field': 'name'}
        }


class TruckEquipmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TruckEquipment
        fields = ['equipment']


class TruckSerializer(serializers.HyperlinkedModelSerializer):
    truckModel = serializers.CharField(source='truckModel.name')
    engineModel = serializers.CharField(source='engineModel.name')
    transmissionModel = serializers.CharField(source='transmissionModel.name')
    drivingBridgeModel = serializers.CharField(source='drivingBridgeModel.name')
    controlledBridgeModel = serializers.CharField(source='controlledBridgeModel.name')

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
        lookup_field = 'serialNumber'
        extra_kwargs = {
            'url': {'lookup_field': 'serialNumber'}
        }


class DeliveryAgreementSerializer(serializers.HyperlinkedModelSerializer):
    truck = TruckSerializer()
    equipment = serializers.StringRelatedField(many=True)
    client = UserUsernameSerializer()
    service = UserUsernameSerializer()

    class Meta:
        model = DeliveryAgreement
        fields = [
            'documentNumber',
            'truck',
            'dateOfShipment',
            'client',
            'consumer',
            'deliveryAddress',
            'equipment',
            'service',
        ]
        lookup_field = 'documentNumber'
        extra_kwargs = {
            'url': {'lookup_field': 'documentNumber'}
        }


class MaintenanceSerializer(serializers.HyperlinkedModelSerializer):
    type = serializers.CharField(source='type.name')
    contractor = serializers.SerializerMethodField()
    truck = serializers.CharField(source='truck.documentNumber')
    truck_serial_number = serializers.SerializerMethodField()

    @classmethod
    def get_contractor(self, object):
        if object.contractor:
            return object.contractor.name
        return ''

    @classmethod
    def get_truck_serial_number(self, object):
        return object.truck.truck.serialNumber

    class Meta:
        model = Maintenance
        fields = [
            'id',
            'truck',
            'truck_serial_number',
            'type',
            'maintenanceDate',
            'operatingTime',
            'order',
            'orderDate',
            'contractor'
        ]


class ReclamationSerializer(serializers.HyperlinkedModelSerializer):
    failureNode = serializers.SerializerMethodField()
    troubleshooting = serializers.SerializerMethodField()
    truck = serializers.CharField(source='truck.documentNumber')
    truck_serial_number = serializers.SerializerMethodField()

    @classmethod
    def get_failureNode(self, object):
        if object.failureNode:
            return object.failureNode.name
        return ''

    @classmethod
    def get_troubleshooting(self, object):
        if object.troubleshooting:
            return object.troubleshooting.name
        return ''

    @classmethod
    def get_truck_serial_number(self, object):
        return object.truck.truck.serialNumber

    class Meta:
        model = Reclamation
        fields = [
            'id',
            'truck',
            'truck_serial_number',
            'refusalDate',
            'operatingTime',
            'failureNode',
            'failureDescription',
            'troubleshooting',
            'sparePartsUsed',
            'restorationDate',
            'downtime'
        ]
