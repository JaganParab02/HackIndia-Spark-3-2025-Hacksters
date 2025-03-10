from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from .models import Department
from django.views.decorators.csrf import csrf_exempt
import json
# from .serializers import ItemSerializer
from django.utils import timezone

# Create your views here.

def login(request):
    return render(request, 'login.html')


# def items(request):
#     if request.method == 'POST':      
#         item_id = request.POST.get('itemId_')
#         item_qty = request.POST.get('itemQuantity')
#         item = Item.objects.get(id = item_id)
#         p_item = Production.objects.create(
#                     item_id = item.id,
#                     name = item.name,
#                     desc = item.desc,
#                     qty = item_qty
#                 )
#         p_item.p_id = item.name[:4].upper()+ '-' +str(p_item.id)
#         item.qty = item.qty - int(item_qty)
#         item.save()
#         p_item.save()
#         return redirect('item')
    
#     # items = Item.objects.filter('deleted' == False)
#     items = Item.objects.all()

#     context = {
#         'items':items.filter(deleted = False),
#         'pageTitle' : "Items"
#     }
#     return render(request, 'items.html', context)

# @csrf_exempt
# def get_item(request):
#     id = request.POST['id']
#     item = Item.objects.get(id=id)
#     serializer  = ItemSerializer(item)
#     json_data = json.dumps(serializer.data)
#     print(json_data)
#     return HttpResponse(json_data)

# def insertItems(request):
#     if request.method == 'POST':  
#             itemName = request.POST.get('itemName')
#             itemDesc = request.POST.get('itemDesc')
#             itemQty = request.POST.get('itemQuantityInsert')
            
#             item = Item.objects.create(
#                         name = itemName,
#                         desc = itemDesc,
#                         qty = itemQty
#                     )
#             item.save()
#             return redirect('item')
        
# def updateItem(request):
#     if request.method == 'POST':  
#         itemId = request.POST.get('editId')
#         itemName = request.POST.get('editItemName')
#         itemDesc = request.POST.get('editItemDesc')
#         itemQty = request.POST.get('editItemQuantityInsert')

#         item = Item.objects.get(id=itemId)
#         item.name = itemName
#         item.desc = itemDesc
#         item.qty = itemQty
#         item.save()

#         return redirect('item')
    

@csrf_exempt  # Temporarily disable CSRF for debugging (not recommended in production)
def insertDepartment(request):
    if request.method == 'POST':  
        departmentName = request.POST.get('departmentName')
        
        if not departmentName:  # Ensure department name is not empty
            return HttpResponse("Department name is required.", status=400)

        item = Department.objects.create(department=departmentName)
        item.save()
        
        return redirect('department')  # Redirect to department page
    
    # Handle GET requests
    return HttpResponse("This endpoint only accepts POST requests.", status=400)

# def deleteItem(request) : 
#     if request.method == 'POST': 
#         itemId = request.POST.get('itemId')
#         item = Item.objects.get(id = itemId)
#         item.name = item.name
#         item.desc = item.desc 
#         item.qty = item.qty
#         item.deleted = True
#         item.save()
#         data = {
#         'flag': 1
#         }
#         return JsonResponse(data)
    

def dashboard(request):
    # completed_items = QA.objects.filter(status=True)
    # tot_items = Item.objects.filter(deleted=False).count()
    # prod_items = Production.objects.filter(status=False).count()
    # qa_items = QA.objects.filter(status=False).count()
    
    completed_items = 0
    tot_items = 0
    prod_items = 0
    qa_items = 0

    context = {
        'tot_items':tot_items,
        'prod_items':prod_items,
        'qa_items':qa_items,
        'completed_items':completed_items,
        'pageTitle' : "Dashboard"

    }
    return render(request, 'dashboard.html', context)


def department(request):
    context = {
        'productionData':[],                
        'pageTitle' : "Production"
    }
    return render(request, 'department.html')


# def production(request):
#     # items = Item.objects.filter('deleted' == False)
#     productionData = Production.objects.all()

#     context = {
#         'productionData':productionData.filter(status=False),                
#         'pageTitle' : "Production"

#     }
#     return render(request, 'production.html', context)

# @csrf_exempt
# def add_to_QA(request):
#     if request.method == 'POST':
#         prod_item = Production.objects.get(id=request.POST['id'])
#         prod_item.status = True
#         QA.objects.create(
#             p_id = prod_item.p_id,
#             name = prod_item.name,
#             qty = prod_item.qty,
#         )
#         prod_item.save()
#     data = {
#         'flag': 1
#         }
#     return JsonResponse(data)


# def qualityAssuarance(request):
#     if request.method == 'POST':
#         id = request.POST['qaID']
#         app_qty = request.POST['approvedQuantityInsert']
#         rej_qty = request.POST['rejectedQuantityInsert']
#         qa_item = QA.objects.get(id = id)
#         qa_item.approved_qty = app_qty
#         qa_item.rejected_qty = rej_qty
#         qa_item.status = True
#         qa_item.save()
#         return redirect('qualityAssuarance')
#     qa_data = QA.objects.all()
#     context = {
#         'qa_data':qa_data.filter(status=False),
#         'pageTitle' : "Quality Assuarance"

#     }
#     return render(request, 'quality.html', context)