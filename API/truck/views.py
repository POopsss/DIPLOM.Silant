from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import IntegrityError

from .serializers import TruckSerializer, DeliveryAgreementSerializer, MaintenanceSerializer, ReclamationSerializer, HandbookNameSerializer, UserAuthSerializer, UserSerializer, HandbookSerializer, UserUsernameSerializer
from .models import Truck, DeliveryAgreement, Maintenance, Reclamation, Handbook, HandbookName
from .forms import TruckForm, DeliveryAgreementForm, MaintenanceForm, ReclamationForm, HandbookForm


truck_field = [
    'serialNumber',
    'engineSerialNumber',
    'engineSerialNumber',
    'transmissionSerialNumber',
    'drivingBridgeSerialNumber',
    'controlledBridgeSerialNumber'
]
delivery_agreement_field = [
    'documentNumber',
    'dateOfShipment__gte',
    'dateOfShipment__lte',
    'consumer',
    'deliveryAddress',
    'equipment',
]
maintenance_field = [
    'maintenanceDate__gte',
    'maintenanceDate__lte',
    'operatingTime__gte',
    'operatingTime__lte',
    'order',
    'orderDate__gte',
    'orderDate__lte',
]
reclamation_field = [
    'refusalDate',
    'operatingTime__gte',
    'operatingTime__lte',
    'failureDescription',
    'sparePartsUsed',
    'restorationDate__gte',
    'restorationDate__lte',
    'downtime__gte',
    'downtime__lte',
]
handbook_reclamation_field = [
    'failureNode',
    'troubleshooting',
]
user_field = [
    'client',
    'service',
]
handbook_truck_field = [
    'truckModel',
    'engineModel',
    'transmissionModel',
    'drivingBridgeModel',
    'controlledBridgeModel'
]
handbook_maintenance_field = {
    'type',
    'contractor'
}


class GetTokenViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserAuthSerializer
    http_method_names = ['post', ]

    def create(self, request, *args, **kwargs):
        username = request.data['username']
        password = request.data['password']
        try:
            user = User.objects.get(username__iexact=username)
            token = Token.objects.get_or_create(user=authenticate(username=user, password=password))
            return Response({
                'token': token[0].key
            })
        except:
            return Response('false')


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissions]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ['get', ]

    def get_queryset(self):
        return self.queryset.filter(id=self.request.user.id)


class UsernameViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissions]
    queryset = User.objects.all()
    serializer_class = UserUsernameSerializer
    http_method_names = ['get', ]

    def get_queryset(self):
        return self.queryset.filter(groups__name=self.request.query_params.get('group'))


class TruckViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer
    lookup_field = 'serialNumber'

    def get_queryset(self):
        if self.request.query_params:
            order_by = self.request.query_params.get('order_by')
            filter_param = {}
            for i in self.request.query_params.dict().items():
                if i[0] in truck_field:
                    filter_param[f'{i[0]}__icontains'] = i[1]
                if i[0] in handbook_truck_field:
                    filter_param[(f'{i[0]}__name__icontains'
                                  f'')] = i[1]
            self.queryset = self.queryset.filter(
                **filter_param
            )
            if order_by:
                self.queryset = self.queryset.order_by(order_by)
            else:
                self.queryset = self.queryset.order_by('serialNumber')
            if self.request.query_params.get('limit'):
                limit = int(self.request.query_params.get('limit'))
                return self.queryset[:limit]
        return self.queryset

    def create(self, request, *args, **kwargs):
        param = {}
        for key in request.data.keys():
            param[key] = request.data[key]
        param['truckModel'] = Handbook.objects.get(name=request.data['truckModel'])
        param['engineModel'] = Handbook.objects.get(name=request.data['engineModel'])
        param['transmissionModel'] = Handbook.objects.get(name=request.data['transmissionModel'])
        param['drivingBridgeModel'] = Handbook.objects.get(name=request.data['drivingBridgeModel'])
        param['controlledBridgeModel'] = Handbook.objects.get(name=request.data['controlledBridgeModel'])
        if TruckForm(param).is_valid():
            TruckForm(param).save()
            return Response('create')
        return Response(TruckForm(param).errors)

    def update(self, request, *args, **kwargs):
        obj = Truck.objects.filter(serialNumber=kwargs['serialNumber'])
        param = {
            'truckModel': Handbook.objects.filter(name=request.data['truckModel'])[0],
            'serialNumber': request.data['serialNumber'],
            'engineModel': Handbook.objects.filter(name=request.data['engineModel'])[0],
            'engineSerialNumber': request.data['engineSerialNumber'],
            'transmissionModel': Handbook.objects.filter(name=request.data['transmissionModel'])[0],
            'transmissionSerialNumber': request.data['transmissionSerialNumber'],
            'drivingBridgeModel': Handbook.objects.filter(name=request.data['drivingBridgeModel'])[0],
            'drivingBridgeSerialNumber': request.data['drivingBridgeSerialNumber'],
            'controlledBridgeModel': Handbook.objects.filter(name=request.data['controlledBridgeModel'])[0],
            'controlledBridgeSerialNumber': request.data['controlledBridgeSerialNumber']
        }
        if TruckForm(param).is_valid():
            obj.update(**param)
            return Response('update')
        return Response(TruckForm(param).errors)


class DeliveryAgreementViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissions]
    queryset = DeliveryAgreement.objects.all()
    serializer_class = DeliveryAgreementSerializer
    lookup_field = 'documentNumber'

    def get_queryset(self):
        if self.request.user.is_staff or self.request.user.is_superuser or self.request.user.groups.filter(name='managers'):
            self.queryset = DeliveryAgreement.objects.all()
        else:
            self.queryset = DeliveryAgreement.objects.filter(client=self.request.user) | DeliveryAgreement.objects.filter(service=self.request.user)
        if self.request.query_params:
            order_by = self.request.query_params.get('order_by')
            direction_order = ''
            filter_param = {}

            for i in self.request.query_params.dict().items():
                if i[0] in delivery_agreement_field:
                    if 'date' in i[0]:
                        filter_param[i[0]] = i[1]
                    else:
                        filter_param[f'{i[0]}__icontains'] = i[1]
                if i[0] in truck_field:
                    filter_param[f'truck__{i[0]}__icontains'] = i[1]
                if i[0] in handbook_truck_field:
                    filter_param[f'truck__{i[0]}__name__icontains'] = i[1]
                if i[0] in user_field:
                    filter_param[f'{i[0]}__first_name__icontains'] = i[1]
            self.queryset = self.queryset.filter(
                **filter_param
            )

            if order_by:
                if order_by[0] == '-':
                    order_by = order_by[1:]
                    direction_order = '-'
                if order_by in truck_field or order_by in handbook_truck_field:
                    order_by = f'truck__{order_by}'
                order_by = f'{direction_order}{order_by}'
                self.queryset = self.queryset.order_by(order_by)
            else:
                self.queryset = self.queryset.order_by('dateOfShipment')
            if self.request.query_params.get('limit'):
                limit = int(self.request.query_params.get('limit'))
                return self.queryset[:limit]
        return self.queryset

    def create(self, request, *args, **kwargs):
        param = {}
        for key in request.data.keys():
            param[key] = request.data[key]
        del param['equipment']
        param['truck'] = Truck.objects.get(serialNumber=request.data['truck'])
        param['client'] = User.objects.get(first_name=request.data['client'])
        param['service'] = User.objects.get(first_name=request.data['service'])
        if DeliveryAgreementForm(param).is_valid():
            DeliveryAgreementForm(param).save()
            for equipment in request.data['equipment']:
                equipment = Handbook.objects.get(name=equipment)
                if equipment.handbookName.name == 'Комплектация':
                    DeliveryAgreement.objects.get(documentNumber=request.data['documentNumber']).equipment.add(equipment.id)
            return Response('create')
        return Response(DeliveryAgreementForm(param).errors)

    def update(self, request, *args, **kwargs):
        obj = DeliveryAgreement.objects.filter(documentNumber=kwargs['documentNumber'])
        param = {}
        for key in request.data.keys():
            param[key] = request.data[key]
        del param['equipment']
        if param.get('truck'):
            param['truck'] = Truck.objects.filter(serialNumber=request.data['truck'])[0]
        if param.get('client'):
            param['client'] = User.objects.filter(first_name=request.data['client'])[0]
        if param.get('service'):
            param['service'] = User.objects.filter(first_name=request.data['service'])[0]
        if request.data['equipment']:
            obj[0].equipment.clear()
            for equipment in request.data['equipment']:
                equipment = Handbook.objects.get(name=equipment)
                if equipment.handbookName.name == 'Комплектация':
                    obj[0].equipment.add(equipment.id)
        for key in param:
            p = {key: param[key]}
            try:
                obj.update(**p)
            except IntegrityError:
                return Response([key])
        return Response('update')


class MaintenanceViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissions]
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer

    def get_queryset(self):
        if self.request.user.is_staff or self.request.user.is_superuser or self.request.user.groups.filter(name='managers'):
            self.queryset = Maintenance.objects.all()
        else:
            self.queryset = Maintenance.objects.filter(truck__client=self.request.user) | Maintenance.objects.filter(truck__service=self.request.user)
        if self.request.query_params:
            order_by = self.request.query_params.get('order_by')
            direction_order = ''
            filter_param = {}

            for i in self.request.query_params.dict().items():
                if i[0] in maintenance_field:
                    if 'Date' in i[0] or 'Time' in i[0]:
                        filter_param[i[0]] = i[1]
                    else:
                        filter_param[f'{i[0]}__icontains'] = i[1]
                if i[0] in delivery_agreement_field:
                    if 'date' in i[0]:
                        filter_param[f'truck__{i[0]}'] = i[1]
                    else:
                        filter_param[f'truck__{i[0]}__icontains'] = i[1]
                if i[0] in handbook_maintenance_field:
                    filter_param[f'{i[0]}__name__icontains'] = i[1]
                if i[0] in truck_field:
                    filter_param[f'truck__truck__{i[0]}__icontains'] = i[1]
                if i[0] in handbook_truck_field:
                    filter_param[f'truck__truck__{i[0]}__name__icontains'] = i[1]
                if i[0] in user_field:
                    filter_param[f'truck__{i[0]}__first_name__icontains'] = i[1]
            self.queryset = self.queryset.filter(
                **filter_param
            )
            if order_by:
                if order_by[0] == '-':
                    order_by = order_by[1:]
                    direction_order = '-'
                if order_by in truck_field or order_by in handbook_truck_field:
                    order_by = f'truck__truck__{order_by}'
                if order_by == 'truck_serial_number':
                    order_by = 'truck__truck__serialNumber'
                order_by = f'{direction_order}{order_by}'
                self.queryset = self.queryset.order_by(order_by)
            else:
                order_by = 'orderDate'
                self.queryset = self.queryset.order_by(order_by)
            if self.request.query_params.get('limit'):
                limit = int(self.request.query_params.get('limit'))
                return self.queryset[:limit]
        return self.queryset

    def create(self, request, *args, **kwargs):
        param = {}
        for key in request.data.keys():
            param[key] = request.data[key]
        if param.get('truck'):
            param['truck'] = DeliveryAgreement.objects.get(documentNumber=request.data['truck']).id
        if param.get('type'):
            param['type'] = Handbook.objects.get(name=request.data['type']).id
        if param.get('contractor'):
            param['contractor'] = Handbook.objects.get(name=request.data['contractor']).id
        if MaintenanceForm(param).is_valid():
            MaintenanceForm(param).save()
            return Response('create')
        return Response(MaintenanceForm(param).errors)

    def update(self, request, *args, **kwargs):
        obj = Maintenance.objects.filter(id=kwargs['pk'])
        param = {}
        for key in request.data.keys():
            param[key] = request.data[key]
        if param.get('truck'):
            param['truck'] = DeliveryAgreement.objects.get(documentNumber=request.data['truck']).id
        if param.get('type'):
            param['type'] = Handbook.objects.get(name=request.data['type']).id
        if param.get('contractor'):
            param['contractor'] = Handbook.objects.get(name=request.data['contractor']).id
        for key in param:
            p = {key: param[key]}
            try:
                obj.update(**p)
            except IntegrityError:
                return Response([key])
        return Response('update')


class ReclamationViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissions]
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer

    def get_queryset(self):
        if self.request.user.is_staff or self.request.user.is_superuser or self.request.user.groups.filter(name='managers'):
            self.queryset = Reclamation.objects.all()
        else:
            self.queryset = Reclamation.objects.filter(truck__client=self.request.user) | Reclamation.objects.filter(truck__service=self.request.user)
        if self.request.query_params:
            order_by = self.request.query_params.get('order_by')
            direction_order = ''
            filter_param = {}

            for i in self.request.query_params.dict().items():
                if i[0] in reclamation_field:
                    if '__gte' in i[0] or '__lte' in i[0]:
                        filter_param[i[0]] = i[1]
                    else:
                        filter_param[f'{i[0]}__icontains'] = i[1]
                if i[0] in delivery_agreement_field:
                    if 'date' in i[0]:
                        filter_param[f'truck__{i[0]}'] = i[1]
                    else:
                        filter_param[f'truck__{i[0]}__icontains'] = i[1]
                if i[0] in handbook_reclamation_field:
                    filter_param[f'{i[0]}__name__icontains'] = i[1]
                if i[0] in truck_field:
                    filter_param[f'truck__truck__{i[0]}__icontains'] = i[1]
                if i[0] in handbook_truck_field:
                    filter_param[f'truck__truck__{i[0]}__name__icontains'] = i[1]
                if i[0] in user_field:
                    filter_param[f'truck__{i[0]}__first_name__icontains'] = i[1]
            self.queryset = self.queryset.filter(**filter_param)

            if order_by:
                if order_by[0] == '-':
                    order_by = order_by[1:]
                    direction_order = '-'
                if order_by in truck_field or order_by in handbook_truck_field:
                    order_by = f'truck__truck__{order_by}'
                order_by = f'{direction_order}{order_by}'
                self.queryset = self.queryset.order_by(order_by)
            if self.request.query_params.get('limit'):
                limit = int(self.request.query_params.get('limit'))
                return self.queryset[:limit]
        return self.queryset

    def create(self, request, *args, **kwargs):
        param = {}
        for key in request.data.keys():
            param[key] = request.data[key]
        if param.get('truck'):
            param['truck'] = DeliveryAgreement.objects.get(documentNumber=request.data['truck']).id
        if param.get('failureNode'):
            param['failureNode'] = Handbook.objects.get(name=request.data['failureNode']).id
        if param.get('troubleshooting'):
            param['troubleshooting'] = Handbook.objects.get(name=request.data['troubleshooting']).id
        if ReclamationForm(param).is_valid():
            ReclamationForm(param).save()
            return Response('create')
        return Response(ReclamationForm(param).errors)

    def update(self, request, *args, **kwargs):
        obj = Reclamation.objects.filter(id=kwargs['pk'])
        param = {}
        for key in request.data.keys():
            param[key] = request.data[key]
        if param.get('truck'):
            param['truck'] = DeliveryAgreement.objects.get(documentNumber=request.data['truck']).id
        if param.get('failureNode'):
            param['failureNode'] = Handbook.objects.get(name=request.data['failureNode']).id
        if param.get('troubleshooting'):
            param['troubleshooting'] = Handbook.objects.get(name=request.data['troubleshooting']).id
        for key in param:
            p = {key: param[key]}
            try:
                obj.update(**p)
            except IntegrityError:
                return Response([key])
        obj[0].save()
        return Response('update')


class HandbookViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Handbook.objects.all()
    serializer_class = HandbookSerializer
    lookup_field = 'name'

    def get_queryset(self):
        handbookName = self.request.query_params.get('handbookName')
        if handbookName:
            self.queryset = self.queryset.filter(handbookName__name__contains=handbookName).order_by("name")
        return self.queryset

    def create(self, request, *args, **kwargs):
        param = {}
        for key in request.data.keys():
            param[key] = request.data[key]
        if param.get('handbookName'):
            param['handbookName'] = HandbookName.objects.get(name=request.data['handbookName']).id
        if HandbookForm(param).is_valid():
            HandbookForm(param).save()
            return Response('create')
        return Response(HandbookForm(param).errors)

    def update(self, request, *args, **kwargs):
        obj = Handbook.objects.filter(name=kwargs['name'])
        if not obj:
            return Response('update')
        param = {}
        for key in request.data.keys():
            param[key] = request.data[key]
        if param.get('handbookName'):
            param['handbookName'] = HandbookName.objects.get(name=request.data['handbookName']).id
        for key in param:
            p = {key: param[key]}
            try:
                obj.update(**p)
            except IntegrityError:
                return Response([key])
        return Response('update')


class HandbookNameViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = HandbookName.objects.all()
    serializer_class = HandbookNameSerializer
    lookup_field = 'name'
