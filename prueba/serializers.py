from rest_framework import serializers
from .models import Empresa, Cliente, Producto, MaeFactura, DetFactura
from datetime import datetime
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
        extra_kwargs = {
            'fecha_auditoria': {'required': False},
            'id_factura': {'required': False},
            'numero': {'required': False, 'read_only': True}  # Make it read-only
        }

    def create(self, validated_data):
        validated_data['fecha_auditoria'] = datetime.now()
        return super().create(validated_data)

class DetFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetFactura
        fields = '__all__'
