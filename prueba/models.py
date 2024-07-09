from django.db import models

class Empresa(models.Model):
    empresa = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=255)
    estado = models.CharField(max_length=1, choices=[('A', 'Activo'), ('I', 'Inactivo')])

    class Meta:
        db_table = 'EMPRESA'  # Use the actual table name

    def __str__(self):
        return self.nombre

class Cliente(models.Model):
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, db_column='empresa')
    cliente = models.IntegerField(primary_key=True)
    tipo = models.CharField(max_length=1, choices=[('C', 'Cedula'), ('N', 'NIT'), ('E', 'Extranjero')])
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=50)
    correo = models.EmailField()
    direccion = models.CharField(max_length=255)
    paginaweb = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField()
    estado = models.CharField(max_length=1, choices=[('A', 'Activo'), ('I', 'Inactivo')])

    class Meta:
        db_table = 'CLIENTES'  # Use the actual table name
        unique_together = (('empresa', 'cliente'),)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, db_column='empresa')
    producto = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=255)
    tipo = models.CharField(max_length=1, choices=[('M', 'Materia Prima'), ('T', 'Terminado'), ('D', 'Evolutivo'), ('C', 'Consumo')])
    fotoproducto = models.ImageField(upload_to='products/')
    fecha_creacion = models.DateTimeField()
    estado = models.CharField(max_length=1, choices=[('A', 'Activo'), ('I', 'Inactivo')])

    class Meta:
        db_table = 'PRODUCTOS'  # Use the actual table name
        unique_together = (('empresa', 'producto'),)

    def __str__(self):
        return self.nombre

class MaeFactura(models.Model):
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, db_column='EMPRESA')
    id_factura = models.CharField(max_length=50, primary_key=True, db_column='ID_FACTURA')
    numero = models.CharField(max_length=50, db_column='NUMERO')
    fecha_factura = models.DateTimeField(db_column='FECHA_FACTURA')
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='ID_CLIENTE')
    observaciones = models.TextField(db_column='OBSERVACIONES', blank=True, null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, db_column='TOTAL')
    fecha_auditoria = models.DateTimeField(db_column='FECHA_AUDITORIA')

    class Meta:
        db_table = 'MAE_FACTURA'
        unique_together = (('empresa', 'id_factura'),)

    def __str__(self):
        return self.id_factura

class DetFactura(models.Model):
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, db_column='EMPRESA')  # Adjusted for actual column name
    factura = models.ForeignKey(MaeFactura, on_delete=models.CASCADE, db_column='ID_FACTURA')  # Adjusted for actual column name
    consecutivo = models.IntegerField(primary_key=True)  # Assuming 'consecutivo' is the primary key
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='ID_PRODUCTO')  # Adjusted for actual column name
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    sub_total = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'DET_FACTURA'  # Ensure this matches the actual table name in SQL Server

    def __str__(self):
        return f'{self.factura} - {self.producto}'
