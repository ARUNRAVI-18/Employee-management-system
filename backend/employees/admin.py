from django.contrib import admin
from .models import Employee

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('employee_id', 'first_name', 'last_name', 'email', 'department', 'designation', 'employment_type', 'status', 'joining_date')
    list_filter = ('department', 'status', 'employment_type', 'gender')
    search_fields = ('employee_id', 'first_name', 'last_name', 'email', 'designation')
    ordering = ('-created_at',)
