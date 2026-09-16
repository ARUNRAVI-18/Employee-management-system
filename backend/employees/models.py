from django.db import models
from django.core.validators import MinValueValidator

class Employee(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    DEPARTMENT_CHOICES = [
        ('Human Resources', 'Human Resources'),
        ('Finance', 'Finance'),
        ('IT', 'IT'),
        ('Software Development', 'Software Development'),
        ('Marketing', 'Marketing'),
        ('Sales', 'Sales'),
        ('Operations', 'Operations'),
        ('Customer Support', 'Customer Support'),
        ('Administration', 'Administration'),
    ]

    EMPLOYMENT_TYPE_CHOICES = [
        ('Full Time', 'Full Time'),
        ('Part Time', 'Part Time'),
        ('Contract', 'Contract'),
        ('Intern', 'Intern'),
    ]

    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('On Leave', 'On Leave'),
    ]

    # Required fields
    employee_id = models.CharField(max_length=20, unique=True, db_index=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, db_index=True)
    phone = models.CharField(max_length=20)
    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES)
    designation = models.CharField(max_length=100)
    joining_date = models.DateField()
    employment_type = models.CharField(max_length=50, choices=EMPLOYMENT_TYPE_CHOICES, default='Full Time')
    salary = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0.01)])
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')

    # Optional / Additional fields
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default='Male', blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.employee_id})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
