from rest_framework import serializers
from .models import Empresa, Cliente, Producto, MaeFactura, DetFactura

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class MaeFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaeFactura
        fields = '__all__'

class DetFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetFactura
        fields = '__all__'
