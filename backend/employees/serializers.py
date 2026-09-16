from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.SerializerMethodField(read_only=True)
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Employee
        fields = [
            'id',
            'employee_id',
            'first_name',
            'last_name',
            'full_name',
            'email',
            'phone',
            'gender',
            'date_of_birth',
            'department',
            'designation',
            'joining_date',
            'employment_type',
            'salary',
            'address',
            'city',
            'state',
            'status',
            'profile_image',
            'profile_image_url',
            'created_at',
            'updated_at',
        ]
        extra_kwargs = {
            'first_name': {'error_messages': {'blank': 'First name is required.', 'required': 'First name is required.'}},
            'last_name': {'error_messages': {'blank': 'Last name is required.', 'required': 'Last name is required.'}},
            'employee_id': {'error_messages': {'blank': 'Employee ID is required.', 'required': 'Employee ID is required.'}},
            'email': {'error_messages': {'blank': 'Email is required.', 'required': 'Email is required.', 'invalid': 'Enter a valid email address.'}},
            'phone': {'error_messages': {'blank': 'Phone number is required.', 'required': 'Phone number is required.'}},
            'department': {'error_messages': {'blank': 'Department is required.', 'required': 'Department is required.'}},
            'designation': {'error_messages': {'blank': 'Designation is required.', 'required': 'Designation is required.'}},
            'joining_date': {'error_messages': {'invalid': 'Enter a valid joining date (YYYY-MM-DD).'}},
        }

    def get_profile_image_url(self, obj):
        request = self.context.get('request')
        if obj.profile_image:
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None

    def validate_salary(self, value):
        if value is None or value <= 0:
            raise serializers.ValidationError("Salary must be a positive number greater than 0.")
        return value

    def validate_first_name(self, value):
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError("First name must be at least 2 characters long.")
        return value.strip()

    def validate_employee_id(self, value):
        val = value.strip().upper()
        if not val:
            raise serializers.ValidationError("Employee ID cannot be empty.")
        
        # Check uniqueness during creation / update
        instance = getattr(self, 'instance', None)
        query = Employee.objects.filter(employee_id__iexact=val)
        if instance:
            query = query.exclude(pk=instance.pk)
        if query.exists():
            raise serializers.ValidationError(f"An employee with ID '{val}' already exists.")
        return val

    def validate_email(self, value):
        val = value.strip().lower()
        instance = getattr(self, 'instance', None)
        query = Employee.objects.filter(email__iexact=val)
        if instance:
            query = query.exclude(pk=instance.pk)
        if query.exists():
            raise serializers.ValidationError(f"An employee with email '{val}' already exists.")
        return val
