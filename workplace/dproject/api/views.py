# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse 
from .models import database
from django.contrib.auth.models import User
import json
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from django.contrib.auth import authenticate, login, logout



# CRUD operations   
     

@csrf_exempt
def read(request):  # read api
    if request.method == 'GET':
        if request.user.is_authenticated:
          
          queryset = database.objects.filter(user=request.user)
          data = [model_to_dict(item) for item in queryset]
          return JsonResponse(data, safe=False)
        else:
           return JsonResponse({'error': 'User not logged in.'},status=403)   #, status=status.HTTP_403_FORBIDDEN
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def check_login_status(request):
    """
    Checks if the user is logged in based on session authentication.

    Returns a JSON response indicating the login status.
    """
    if request.method=='GET':
        if request.user.is_authenticated:
            # User is logged in
            return JsonResponse({'is_logged_in': True, 'username': request.user.username})
        else:
            # User is not logged in
            return JsonResponse({'is_logged_in': False},status=403)
    return JsonResponse({'error':'Method not allowed'}, status=405)


@csrf_exempt
def create(request):   #create api
    if request.method=='POST':

        if not request.user.is_authenticated:
            return JsonResponse({'error': 'User not authenticated.'}, status=401)

        if request.content_type != 'application/json':  # if the client has not sent correct content_type header
               return JsonResponse({'error': 'Invalid Content-Type. Expected application/json.'}, status=400)
        
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        
        id = body_data.get('id')
        site = body_data.get('site')  # we can also use [] bracket but it will give error if key is not found and get will return the dafault none value
        username = body_data.get('username')
        password = body_data.get('password')

        if not all([id,site, username, password]):  # if any of the field is missing
                return JsonResponse({'error': 'Missing required fields.'}, status=400)
           
        new_entry = database(id=id,site=site,username=username,password=password,user=request.user)
        new_entry.save()

        return JsonResponse({'message': 'Entry created successfully.'}, status=201)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)  # if the method is not post
                                         
# for delete

@csrf_exempt
def delete(request,id):
     if request.method == 'DELETE':
          if not request.user.is_authenticated:
            return JsonResponse({'error': 'User not authenticated.'}, status=401)
          to_be_deleted = database.objects.get(id=id)
          to_be_deleted.delete()

          return JsonResponse({'message': 'Entry deleted successfully.'}, status=201)

     return JsonResponse({'error':'Method not allowed'}, status=405) # if the method is not DELETE      

@csrf_exempt
def login_view(request):
     if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'username': request.user.username})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
     return JsonResponse({'error':'Method not allowed'}, status=405)     
        
@csrf_exempt
def logout_view(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({'message': 'Logout successful'})   
    return JsonResponse({'error':'Method not allowed'}, status=405)   

@csrf_exempt
def signup_view(request):
    if request.method=='POST':
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)   
        username = data.get('username')
        password = data.get('password')
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({'message': 'User created successfully.'},status=201)  #status=status.HTTP_201_CREATED 
    return JsonResponse({'error':'Method not allowed'}, status=405) 


    
