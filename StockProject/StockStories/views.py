from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class IndexPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

class LoginPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'login.html', context=None)

class HomePageView(TemplateView):
     def get(self, request, **kwargs):
        return render(request, 'stockstories.html', context=None)

class CryptoPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'crypto.html', context=None)

class UserPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'user.html', context=None)

class GlobalPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'global.html', context=None)

class AboutUsPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'about.html', context=None)

class ExplorePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'explore.html', context=None)

class SignOutPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'signout.html', context=None)

class SingupPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'signup.html', context=None)

