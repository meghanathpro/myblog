from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Post

# Create your views here.


def post_home(request):
    posts = Post.objects.order_by('-timestamp')
    paginator = Paginator(posts, 9)  # Display 9 posts per page

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {'page_obj': page_obj}
    if page_obj.number != 1:
        context['page_number'] = page_number
     # Process the tags for each post
    for post in page_obj:
        post.tags = post.tags.split(',')

    return render(request, 'blogpost/home.html', context)


def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    # Increment the view count
    post.view_count += 1
    post.save()
    return render(request, 'blogpost/post_detail.html', {'post': post})


def search(request):
    query = request.GET.get('query')
    if query:
        posts = Post.objects.filter(
            title__icontains=query) | Post.objects.filter(tags__icontains=query)
    else:
        posts = []
    return render(request, 'blogpost/search.html', {'posts': posts, 'query': query})
