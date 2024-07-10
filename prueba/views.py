from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.views import APIView
from django.shortcuts import get_list_or_404
from rest_framework.response import Response
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

class ClientesPorEmpresa(APIView):
    def get(self, request, empresa_id):
        clientes = get_list_or_404(Cliente, empresa=empresa_id)
        serializer = ClienteSerializer(clientes, many=True)
        return Response(serializer.data)