from django.urls import path, include
from rest_framework import routers
from rest_framework.schemas import get_schema_view
from .views import TruckViewSet, DeliveryAgreementViewSet, MaintenanceViewSet, ReclamationViewSet, HandbookViewSet, HandbookNameViewSet, GetTokenViewSet, UserViewSet, UsernameViewSet


router = routers.DefaultRouter()
router.register(r'token', GetTokenViewSet)
router.register(r'user', UserViewSet)
router.register(r'username', UsernameViewSet)
router.register(r'truck', TruckViewSet)
router.register(r'delivery_agreement', DeliveryAgreementViewSet)
router.register(r'maintenance', MaintenanceViewSet)
router.register(r'reclamation', ReclamationViewSet)
router.register(r'hand_book', HandbookViewSet)
router.register(r'hand_book_name', HandbookNameViewSet)


urlpatterns = [
   path('', include(router.urls)),
   path('openapi', get_schema_view(title="Силат openapi"), name='openapi-schema'),
]
