from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
import os

def index_view(request, path=""):
    """
    Serves the compiled React Single Page Application (SPA) index.html
    for all frontend routes (Dashboard, EmployeeList, Details, Add, Edit, etc.).
    """
    index_file_path = os.path.join(settings.BASE_DIR.parent, 'frontend', 'dist', 'index.html')
    if os.path.exists(index_file_path):
        with open(index_file_path, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')
    return HttpResponse("Frontend build not found. Run 'npm run build' in frontend directory.", status=404)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('employees.urls')),
]

# Serve media files (uploaded profile pictures)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve compiled Vite frontend static assets
frontend_assets_dir = os.path.join(settings.BASE_DIR.parent, 'frontend', 'dist', 'assets')
if os.path.exists(frontend_assets_dir):
    urlpatterns += static('/assets/', document_root=frontend_assets_dir)

# Catch-all pattern to render React SPA index.html for all non-API and non-admin routes
urlpatterns += [
    re_path(r'^(?!api/|admin/|media/|assets/).*', index_view),
]

