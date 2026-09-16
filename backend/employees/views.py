from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, Count
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        queryset = Employee.objects.all()
        
        # Search functionality across employee_id, first_name, last_name, email, designation
        search_query = self.request.query_params.get('search', None)
        if search_query:
            search_query = search_query.strip()
            queryset = queryset.filter(
                Q(employee_id__icontains=search_query) |
                Q(first_name__icontains=search_query) |
                Q(last_name__icontains=search_query) |
                Q(email__icontains=search_query) |
                Q(designation__icontains=search_query)
            )

        # Filters
        department = self.request.query_params.get('department', None)
        if department:
            queryset = queryset.filter(department__iexact=department)

        emp_status = self.request.query_params.get('status', None)
        if emp_status:
            queryset = queryset.filter(status__iexact=emp_status)

        employment_type = self.request.query_params.get('employment_type', None)
        if employment_type:
            queryset = queryset.filter(employment_type__iexact=employment_type)

        return queryset

    @action(detail=False, methods=['get'], url_path='dashboard-stats')
    def dashboard_stats(self, request):
        """
        Custom API endpoint to return dynamic dashboard statistics
        """
        total = Employee.objects.count()
        active = Employee.objects.filter(status='Active').count()
        inactive = Employee.objects.filter(status='Inactive').count()
        on_leave = Employee.objects.filter(status='On Leave').count()

        # Department distribution
        dept_counts = (
            Employee.objects.values('department')
            .annotate(count=Count('id'))
            .order_by('-count')
        )

        # Employment type breakdown
        type_counts = (
            Employee.objects.values('employment_type')
            .annotate(count=Count('id'))
            .order_by('-count')
        )

        # Recent 5 employees
        recent_employees = Employee.objects.all().order_by('-created_at')[:5]
        recent_serialized = EmployeeSerializer(recent_employees, many=True, context={'request': request}).data

        data = {
            'total_employees': total,
            'active_employees': active,
            'inactive_employees': inactive,
            'on_leave_employees': on_leave,
            'department_distribution': list(dept_counts),
            'employment_type_distribution': list(type_counts),
            'recent_employees': recent_serialized,
        }
        return Response(data, status=status.HTTP_200_OK)
