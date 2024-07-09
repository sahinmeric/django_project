from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmpresaViewSet, ClienteViewSet, ProductoViewSet, MaeFacturaViewSet, DetFacturaViewSet

router = DefaultRouter()
router.register(r'empresas', EmpresaViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'facturas', MaeFacturaViewSet)
router.register(r'detalle-facturas', DetFacturaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

