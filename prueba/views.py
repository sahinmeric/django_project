from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Empresa, Cliente, Producto, MaeFactura, DetFactura
from .serializers import EmpresaSerializer, ClienteSerializer, ProductoSerializer, MaeFacturaSerializer, DetFacturaSerializer

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class MaeFacturaViewSet(viewsets.ModelViewSet):
    queryset = MaeFactura.objects.all()
    serializer_class = MaeFacturaSerializer

class DetFacturaViewSet(viewsets.ModelViewSet):
    queryset = DetFactura.objects.all()
    serializer_class = DetFacturaSerializer
