from django.shortcuts import render
from django.shortcuts import get_object_or_404,redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .forms import PhotoForm
from .models import Photo
from django.contrib import messages
from django.views.decorators.http import require_POST

# Create your views here.

@login_required
def photos_new(request):
    if request.method == "POST":
        form = PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            photo = form.save(commit=False)
            photo.user = request.user
            photo.save()
            messages.success(request, "投稿が完了しました！")
        return redirect('photoapp:users_detail', pk=request.user.pk)
    else:
        form = PhotoForm()
    return render(request, 'photoapp/photos_new.html', {'form': form})

#トップページの表示
def index(request):
    photos = Photo.objects.all().order_by('-created_at')
    return render(request, 'photoapp/index.html', {'photos': photos})

def users_detail(request, pk):
    user = get_object_or_404(User, pk=pk)
    photos = user.photo_set.all().order_by('-created_at')
    return render(request, 'photoapp/users_detail.html', {'user': user, 'photos': photos})

def photos_detail(request, pk):
    photo = get_object_or_404(Photo, pk=pk)
    return render(request, 'photoapp/photos_detail.html', {'photo': photo})

@require_POST
def photos_delete(request, pk):
    photo = get_object_or_404(Photo, pk=pk)
    photo.delete()
    return redirect('photoapp:users_detail', request.user.id)
