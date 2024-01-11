# Generated by Django 4.2.6 on 2024-01-09 22:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DeliveryAgreement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('documentNumber', models.CharField(max_length=64, unique=True, verbose_name='Договор поставки №, дата')),
                ('dateOfShipment', models.DateField(verbose_name='Дата отгрузки с завода')),
                ('consumer', models.CharField(max_length=64, verbose_name='Грузополучатель (конечный потребитель)')),
                ('deliveryAddress', models.CharField(max_length=64, verbose_name='Адрес поставки (эксплуатации)')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client', to=settings.AUTH_USER_MODEL, verbose_name='Клиент')),
            ],
        ),
        migrations.CreateModel(
            name='Handbook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(unique=True)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='HandbookName',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TruckEquipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('equipment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='truck.handbook', verbose_name='Комплектация')),
                ('truck', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='truck.deliveryagreement', verbose_name='Машина')),
            ],
            options={
                'unique_together': {('truck', 'equipment')},
            },
        ),
        migrations.CreateModel(
            name='Truck',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serialNumber', models.CharField(max_length=64, unique=True, verbose_name='Зав. № машины')),
                ('engineSerialNumber', models.CharField(max_length=64, unique=True, verbose_name='Зав. № двигателя')),
                ('transmissionSerialNumber', models.CharField(max_length=64, unique=True, verbose_name='Зав. № трансмиссии')),
                ('drivingBridgeSerialNumber', models.CharField(max_length=64, unique=True, verbose_name='Зав. № ведущего моста')),
                ('controlledBridgeSerialNumber', models.CharField(max_length=64, unique=True, verbose_name='Зав. № управляемого моста')),
                ('controlledBridgeModel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='controlledBridgeModel', to='truck.handbook', verbose_name='Модель управляемого моста')),
                ('drivingBridgeModel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='drivingBridgeModel', to='truck.handbook', verbose_name='Модель ведущего моста')),
                ('engineModel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='engineModel', to='truck.handbook', verbose_name='Модель двигателя')),
                ('transmissionModel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transmissionModel', to='truck.handbook', verbose_name='Модель трансмиссии')),
                ('truckModel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='truckModel', to='truck.handbook', verbose_name='Модель техники')),
            ],
        ),
        migrations.CreateModel(
            name='Reclamation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('refusalDate', models.DateField(verbose_name='Дата отказа')),
                ('operatingTime', models.IntegerField(verbose_name='Наработка, м/час')),
                ('failureDescription', models.TextField(verbose_name='Описание отказа')),
                ('sparePartsUsed', models.CharField(blank=True, max_length=64, null=True, verbose_name='Используемые запасные части')),
                ('restorationDate', models.DateField(blank=True, null=True, verbose_name='Дата восстановления')),
                ('downtime', models.IntegerField(blank=True, editable=False, null=True, verbose_name='Время простоя техники')),
                ('failureNode', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='failureNode', to='truck.handbook', verbose_name='Узел отказа')),
                ('troubleshooting', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='troubleshootingMethod', to='truck.handbook', verbose_name='Способ восстановления')),
                ('truck', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='truck.deliveryagreement', verbose_name='Mашина')),
            ],
        ),
        migrations.CreateModel(
            name='Maintenance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('maintenanceDate', models.DateField(blank=True, null=True, verbose_name='Дата проведения ТО')),
                ('operatingTime', models.IntegerField(verbose_name='Наработка, м/час')),
                ('order', models.CharField(max_length=64, verbose_name='№ заказ-наряда')),
                ('orderDate', models.DateField(verbose_name='Дата заказ-наряда')),
                ('contractor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='contractor', to='truck.handbook', verbose_name='Организация, проводившая ТО')),
                ('truck', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='truck.deliveryagreement', verbose_name='Машина')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='type', to='truck.handbook', verbose_name='Вид ТО')),
            ],
        ),
        migrations.AddField(
            model_name='handbook',
            name='handbookName',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Handbook', to='truck.handbookname'),
        ),
        migrations.AddField(
            model_name='deliveryagreement',
            name='equipment',
            field=models.ManyToManyField(related_name='TruckEquipment', through='truck.TruckEquipment', to='truck.handbook'),
        ),
        migrations.AddField(
            model_name='deliveryagreement',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service', to=settings.AUTH_USER_MODEL, verbose_name='Сервисная компания'),
        ),
        migrations.AddField(
            model_name='deliveryagreement',
            name='truck',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='truck', to='truck.truck', verbose_name='Машина'),
        ),
    ]