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
@csrf_exempt
def create_recovery_task(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    data = json.loads(request.body)

    report_id = data.get("report_id")
    org_id = data.get("org_id")

    if not report_id or not org_id:
        return JsonResponse({"error": "Missing fields"}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO recovery_task (report_id, org_id, task_status)
                VALUES (%s, %s, 'Pending')
                RETURNING task_id;
            """, [report_id, org_id])

            task_id = cursor.fetchone()[0]

        return JsonResponse({
            "message": "Recovery task created",
            "task_id": task_id
        }, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
@csrf_exempt
def org_dashboard_data(request, org_id):
    try:
        with connection.cursor() as cursor:

            # ================= PENDING =================
            cursor.execute("""
                SELECT dr.*
                FROM damage_report dr
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM recovery_task rt
                    WHERE rt.report_id = dr.id
                )
                ORDER BY dr.id DESC;
            """)
            cols = [c[0] for c in cursor.description]
            pending = [dict(zip(cols, r)) for r in cursor.fetchall()]

            # ================= ONGOING =================
            cursor.execute("""
                SELECT rt.task_id,
                       rt.task_status,
                       dr.*
                FROM recovery_task rt
                JOIN damage_report dr
                    ON dr.id = rt.report_id
                WHERE rt.org_id = %s
                  AND rt.task_status != 'Completed'
                ORDER BY rt.task_id DESC;
            """, [org_id])
            cols = [c[0] for c in cursor.description]
            ongoing = [dict(zip(cols, r)) for r in cursor.fetchall()]

            # ================= COMPLETED =================
            cursor.execute("""
                SELECT rt.task_id,
                       rt.task_status,
                       dr.*
                FROM recovery_task rt
                JOIN damage_report dr
                    ON dr.id = rt.report_id
                WHERE rt.org_id = %s
                  AND rt.task_status = 'Completed'
                ORDER BY rt.task_id DESC;
            """, [org_id])
            cols = [c[0] for c in cursor.description]
            completed = [dict(zip(cols, r)) for r in cursor.fetchall()]

        return JsonResponse({
            "pending": pending,
            "ongoing": ongoing,
            "completed": completed
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)   
@csrf_exempt
def ongoing_damages(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT dr.*
            FROM recovery_task rt
            JOIN damage_report dr
              ON dr.id = rt.report_id
            WHERE rt.task_status != 'Completed'
            ORDER BY dr.id DESC;
        """)

        cols = [c[0] for c in cursor.description]
        data = [dict(zip(cols, r)) for r in cursor.fetchall()]

    return JsonResponse(data, safe=False)
@csrf_exempt
def apply_task(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    data = json.loads(request.body)
    report_id = data.get("report_id")
    volunteer_id = data.get("volunteer_id")

    if not report_id or not volunteer_id:
        return JsonResponse({"error": "Missing fields"}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO task_application (report_id, volunteer_id)
                VALUES (%s, %s)
                ON CONFLICT (report_id, volunteer_id) DO NOTHING;
            """, [report_id, volunteer_id])

        return JsonResponse({"message": "Applied successfully"}, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
def task_applicants(request, report_id):
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT
                    ta.application_id,
                    v.volunteer_id,
                    v.name,
                    v.email,
                    v.skill
                FROM task_application ta
                JOIN volunteer v
                    ON ta.volunteer_id = v.volunteer_id
                WHERE ta.report_id = %s
                  AND ta.status = 'Applied'
            """, [report_id])

            cols = [c[0] for c in cursor.description]
            applicants = [dict(zip(cols, r)) for r in cursor.fetchall()]

        return JsonResponse(applicants, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
@csrf_exempt
def assign_volunteer(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        report_id = data.get("report_id")
        volunteer_id = data.get("volunteer_id")

        if not report_id or not volunteer_id:
            return JsonResponse({"error": "Missing fields"}, status=400)

        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE recovery_task
                SET volunteer_id = %s,
                    task_status = 'Ongoing'
                WHERE report_id = %s
            """, [volunteer_id, report_id])

        return JsonResponse({"message": "Volunteer assigned"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@csrf_exempt
def volunteer_tasks(request):
    if request.method != "POST":
        return JsonResponse([], safe=False)

    try:
        data = json.loads(request.body)
        volunteer_id = data.get("volunteer_id")

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT rt.task_id,
                       rt.task_status,
                       dr.*
                FROM recovery_task rt
                JOIN damage_report dr
                    ON dr.id = rt.report_id
                WHERE rt.volunteer_id = %s
                ORDER BY rt.task_id DESC
            """, [volunteer_id])

            cols = [c[0] for c in cursor.description]
            rows = [dict(zip(cols, r)) for r in cursor.fetchall()]

        return JsonResponse(rows, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def recommend_damages(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        volunteer_id = data.get("volunteer_id")

        if not volunteer_id:
            return JsonResponse({"error": "volunteer_id required"}, status=400)

        with connection.cursor() as cursor:

            # ✅ get volunteer skills
            cursor.execute("""
                SELECT skill
                FROM volunteer
                WHERE volunteer_id = %s
            """, [volunteer_id])

            row = cursor.fetchone()
            if not row:
                return JsonResponse({"error": "Volunteer not found"}, status=404)

            skills = (row[0] or "").lower().split(",")
            skills = [s.strip() for s in skills if s.strip()]

            # ✅ get all damages
            cursor.execute("""
                SELECT *
                FROM damage_report
                ORDER BY id DESC
            """)
            cols = [c[0] for c in cursor.description]
            reports = [dict(zip(cols, r)) for r in cursor.fetchall()]

        # ✅ split properly
        recommended = []
        other = []

        for r in reports:
            req_skills = (r.get("skills_required") or "").lower()

            if any(skill in req_skills for skill in skills):
                recommended.append(r)
            else:
                other.append(r)

        return JsonResponse({
            "recommended": recommended,
            "others": other
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def update_task_status(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        report_id = data.get("report_id")
        status = data.get("status")

        if not report_id or not status:
            return JsonResponse({"error": "Missing fields"}, status=400)

        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE recovery_task
                SET task_status = %s
                WHERE report_id = %s
            """, [status, report_id])

        return JsonResponse({"message": "Task status updated"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
@csrf_exempt
def delete_application(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        report_id = data.get("report_id")
        volunteer_id = data.get("volunteer_id")

        with connection.cursor() as cursor:
            cursor.execute("""
                DELETE FROM task_application
                WHERE report_id = %s
                  AND volunteer_id = %s
            """, [report_id, volunteer_id])

        return JsonResponse({"message": "Application withdrawn"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
@csrf_exempt
def delete_report(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    report_id = data.get("report_id")

    if not report_id:
        return JsonResponse({"error": "report_id required"}, status=400)

    with connection.cursor() as cursor:
        cursor.execute(
            "DELETE FROM damage_report WHERE id = %s",
            [report_id]
        )

    return JsonResponse({"message": "Report deleted"})
@csrf_exempt
def update_report(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)

        report_id = data.get("report_id")
        infrastructure_type = data.get("infrastructure_type")
        district = data.get("district")

        if not report_id:
            return JsonResponse({"error": "report_id required"}, status=400)

        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE damage_report
                SET infrastructure_type = COALESCE(%s, infrastructure_type),
                    district = COALESCE(%s, district)
                WHERE id = %s
            """, [infrastructure_type, district, report_id])

        return JsonResponse({"message": "Report updated"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)