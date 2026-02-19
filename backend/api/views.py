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

def vol_register(request):
    if request.method=="POST":
        data=json.loads(request.body)
        
        # volunteer_id=data.get("volunteer_id",1234)  volunteer di autogenarated
        name=data.get("name")
        phone=data.get("phone")
        email=data.get("email")
        skill=data.get("skill")
        availability=data.get("availability",True)        
        with connection.cursor() as cursor:
            cursor.execute("""
                           INSERT INTO volunteer
                           (name,phone,email,skill,availability)
                           VALUES(%s,%s,%s,%s,%s)
                           RETURNING volunteer_id;
                           """,
                           [
                               name,phone,email,skill,availability
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