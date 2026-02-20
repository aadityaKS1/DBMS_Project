import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection

@csrf_exempt
def create_report(request):
    if request.method == "POST":
        data = json.loads(request.body)

        reported_by = data.get("reported_by", "Anonymous")
        district = data.get("district")
        municipality = data.get("municipality")
        volunteers_required = data.get("volunteers_required", 0)
        skills_required = data.get("skills_required", "")
        infrastructure_type = data.get("infrastructure_type")

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO damage_report
                (reported_by, district, municipality, volunteers_required, skills_required, infrastructure_type)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id;
            """, [reported_by, district, municipality, volunteers_required, skills_required, infrastructure_type])

            new_id = cursor.fetchone()[0]

        return JsonResponse({"message": "Report created", "id": new_id}, status=201)

    return JsonResponse({"error": "Only POST allowed"}, status=405)
@csrf_exempt
def vol_register(request):
    if request.method=="POST":
        data=json.loads(request.body)
        
        # volunteer_id=data.get("volunteer_id",1234)  volunteer di autogenarated
        name=data.get("name")
        phone=data.get("phone")
        email=data.get("email")
        skill=data.get("skill")
        availability=data.get("availability",True) 
        password=data.get("password")       
        with connection.cursor() as cursor:
            cursor.execute("""
                           INSERT INTO volunteer
                           (name,phone,email,skill,availability,password)
                           VALUES(%s,%s,%s,%s,%s,%s)
                           RETURNING volunteer_id;
                           """,
                           [
                               name,phone,email,skill,availability,password
                           ]
                           )
            new_id=cursor.fetchone()[0]
        return JsonResponse({"message": "Volunteer Created","id":new_id},status=201)
    return JsonResponse({"error":"Only post allowed"})
               
def get_reports(request):
    if request.method!="GET":
        return JsonResponse({"error":"Only GET allowed"},status=405)
    
    with connection.cursor() as cursor:
        cursor.execute("""
                        SELECT id, reported_by, district, municipality,
                        volunteers_required, skills_required,
                        infrastructure_type, created_at
                        FROM damage_report
                        ORDER BY id DESC;
                       """)
        columns=[col[0] for col in cursor.description]
        rows=cursor.fetchall()
        
        #convert to list of dicts
        reports=[dict(zip(columns,row)) for row in rows]
        
    return JsonResponse(reports,safe=False)

@csrf_exempt
def vol_login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT volunteer_id, name
            FROM volunteer
            WHERE email = %s AND password = %s;
        """, [email, password])

        user = cursor.fetchone()

    # ✅ CRITICAL CHECK
    if user is None:
        return JsonResponse({"error": "Invalid credentials"}, status=401)

    # ✅ safe access
    return JsonResponse({
        "message": "Login successful",
        "volunteer_id": user[0],
        "name": user[1],
    })



@csrf_exempt
def volunteer_dashboard(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        volunteer_id = data.get("volunteer_id")

        if not volunteer_id:
            return JsonResponse({"error": "volunteer_id required"}, status=400)

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT volunteer_id, name, email,skill
                FROM volunteer
                WHERE volunteer_id = %s;
            """, [volunteer_id])

            user = cursor.fetchone()

        if user:
            return JsonResponse({
                "volunteer_id": user[0],
                "name": user[1],
                "email": user[2],
                "skills": user[3].split(",") if user[3] else []
            })
        else:
            return JsonResponse({"error": "Volunteer not found"}, status=404)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
@csrf_exempt
def org_register(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    data = json.loads(request.body)

    org_name = data.get("org_name")
    contact_person = data.get("contact_person")
    contact_email = data.get("contact_email")
    contact_phone = data.get("contact_phone")
    password = data.get("password")

    # basic validation
    if not org_name or not contact_email or not password:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO organization
                (org_name, contact_person, contact_email, contact_phone, password)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING org_id;
            """, [
                org_name,
                contact_person,
                contact_email,
                contact_phone,
                password
            ])

            new_id = cursor.fetchone()[0]

        return JsonResponse({
            "message": "Organization registered",
            "org_id": new_id
        }, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
 
   
@csrf_exempt
def org_login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    data = json.loads(request.body)

    email = data.get("contact_email")
    password = data.get("password")

    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT org_id, org_name
            FROM organization
            WHERE contact_email = %s AND password = %s;
        """, [email, password])

        org = cursor.fetchone()

    # ✅ VERY IMPORTANT check
    if org is None:
        return JsonResponse({"error": "Invalid credentials"}, status=401)

    return JsonResponse({
        "message": "Login successful",
        "org_id": org[0],
        "org_name": org[1],
        "role": "organization"
    })
   