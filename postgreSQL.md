-- 1) Organization
CREATE TABLE organization (
    org_id SERIAL PRIMARY KEY,
    org_name VARCHAR(150) NOT NULL,
    contact_person VARCHAR(100),
    contact_email VARCHAR(120),
    contact_phone VARCHAR(20)
);

-- 2) Volunteer
CREATE TABLE volunteer (
    volunteer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(120) UNIQUE,
    skill VARCHAR(100),
    availability BOOLEAN DEFAULT TRUE
);

CREATE TABLE damage_report (
    id SERIAL PRIMARY KEY,
    reported_by VARCHAR(100) DEFAULT 'Anonymous',
    district VARCHAR(100) NOT NULL,
    municipality VARCHAR(100) NOT NULL,
    volunteers_required INT DEFAULT 0,
    skills_required VARCHAR(200),
    infrastructure_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recovery_task (
    task_id SERIAL PRIMARY KEY,
    report_id INT NOT NULL,
    org_id INT,
    volunteer_id INT,
    task_status VARCHAR(30) DEFAULT 'Pending',

    FOREIGN KEY (report_id) REFERENCES damage_report(id) ON DELETE CASCADE,
    FOREIGN KEY (org_id) REFERENCES organization(org_id) ON DELETE SET NULL,
    FOREIGN KEY (volunteer_id) REFERENCES volunteer(volunteer_id) ON DELETE SET NULL
);
INSERT INTO organization (org_name, contact_person, contact_email, contact_phone)
VALUES
('Rebuild Nepal', 'Aaditya Singh', 'rebuildnepal@gmail.com', '9800000001'),
('Helping Hands NGO', 'Gyanendra Silwal', 'helpinghands@gmail.com', '9800000002');

INSERT INTO volunteer (name, phone, email, skill, availability)
VALUES
('Ram Thapa', '9811111111', 'ram@gmail.com', 'First Aid', TRUE),
('Sita Sharma', '9822222222', 'sita@gmail.com', 'Rescue', TRUE),
('Hari KC', '9833333333', 'hari@gmail.com', 'Electrical', FALSE);

INSERT INTO damage_report (
  reported_by, district, municipality, volunteers_required, skills_required, infrastructure_type
)
VALUES
('Citizen', 'Kathmandu', 'KMC', 10, 'First Aid, Rescue', 'Road'),
('Ward Office', 'Lalitpur', 'Godawari', 6, 'Plumbing', 'Water Supply'),
('Police', 'Bhaktapur', 'Suryabinayak', 12, 'Rescue, Electrical', 'Bridge');


INSERT INTO recovery_task (report_id, org_id, volunteer_id, task_status)
VALUES
(1, 1, 1, 'Pending'),
(2, 2, 2, 'Assigned'),
(3, 1, 3, 'Completed');

SELECT * FROM organization;
SELECT * FROM volunteer;
SELECT * FROM damage_report;
SELECT * FROM recovery_task;

ALTER TABLE organization
ADD COLUMN password VARCHAR(255);

ALTER TABLE volunteer
ADD COLUMN password VARCHAR(255);

SELECT org_id, contact_email, password
FROM organization;

SELECT task_id, report_id, org_id, task_status
FROM recovery_task
ORDER BY task_id DESC;


CREATE TABLE task_application (
    application_id SERIAL PRIMARY KEY,
    report_id INT NOT NULL,
    volunteer_id INT NOT NULL,
    status VARCHAR(30) DEFAULT 'Applied',

    FOREIGN KEY (report_id) REFERENCES damage_report(id) ON DELETE CASCADE,
    FOREIGN KEY (volunteer_id) REFERENCES volunteer(volunteer_id) ON DELETE CASCADE,

    UNIQUE(report_id, volunteer_id)
);

SELECT volunteer_id, skill
FROM volunteer;


SELECT id, skills_required
FROM damage_report;

SELECT *
FROM damage_report
WHERE skills_required ILIKE '%Engineer%';



SELECT report_id, volunteer_id, task_status
FROM recovery_task
ORDER BY task_id DESC;