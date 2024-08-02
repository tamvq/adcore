import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import db

client = TestClient(app)

@pytest.fixture(autouse=True)
def clear_db():
    db.courses.delete_many({})

def test_create_course():
    course_data = {
        "university": "Test University",
        "city": "Test City",
        "country": "Test Country",
        "name": "Test Course",
        "description": "Test Description",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 1000.0,
        "currency": "USD"
    }
    response = client.post("/courses", json=course_data)
    assert response.status_code == 200
    assert "id" in response.json()

def test_get_courses():
    course_data = {
        "university": "Test University",
        "city": "Test City",
        "country": "Test Country",
        "name": "Test Course",
        "description": "Test Description",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 1000.0,
        "currency": "USD"
    }
    client.post("/courses", json=course_data)
    response = client.get("/courses")
    assert response.status_code == 200
    assert len(response.json()) == 1

def test_update_course():
    course_data = {
        "university": "Test University",
        "city": "Test City",
        "country": "Test Country",
        "name": "Test Course",
        "description": "Test Description",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 1000.0,
        "currency": "USD"
    }
    post_response = client.post("/courses", json=course_data)
    course_id = post_response.json()["id"]

    update_data = {
        "name": "Updated Test Course",
        "price": 1200.0
    }
    response = client.put(f"/courses/{course_id}", json=update_data)
    assert response.status_code == 200
    assert response.json()["success"] == True

    get_response = client.get(f"/courses/{course_id}")
    assert get_response.status_code == 200
    assert get_response.json()["name"] == "Updated Test Course"
    assert get_response.json()["price"] == 1200.0

def test_delete_course():
    course_data = {
        "university": "Test University",
        "city": "Test City",
        "country": "Test Country",
        "name": "Test Course",
        "description": "Test Description",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 1000.0,
        "currency": "USD"
    }
    post_response = client.post("/courses", json=course_data)
    course_id = post_response.json()["id"]

    response = client.delete(f"/courses/{course_id}")
    assert response.status_code == 200
    assert response.json()["success"] == True

    get_response = client.get(f"/courses/{course_id}")
    assert get_response.status_code == 404

def test_get_course():
    course_data = {
        "university": "Test University",
        "city": "Test City",
        "country": "Test Country",
        "name": "Test Course",
        "description": "Test Description",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 1000.0,
        "currency": "USD"
    }
    post_response = client.post("/courses", json=course_data)
    course_id = post_response.json()["id"]

    response = client.get(f"/courses/{course_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Test Course"

def test_get_universities():
    course_data_1 = {
        "university": "Test University 1",
        "city": "Test City 1",
        "country": "Test Country 1",
        "name": "Test Course 1",
        "description": "Test Description 1",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 1000.0,
        "currency": "USD"
    }
    course_data_2 = {
        "university": "Test University 2",
        "city": "Test City 2",
        "country": "Test Country 2",
        "name": "Test Course 2",
        "description": "Test Description 2",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 2000.0,
        "currency": "EUR"
    }
    client.post("/courses", json=course_data_1)
    client.post("/courses", json=course_data_2)

    response = client.get("/universities")
    assert response.status_code == 200
    assert len(response.json()["universities"]) == 2
    assert "Test University 1" in response.json()["universities"]
    assert "Test University 2" in response.json()["universities"]

def test_get_countries():
    course_data_1 = {
        "university": "Test University 1",
        "city": "Test City 1",
        "country": "Test Country 1",
        "name": "Test Course 1",
        "description": "Test Description 1",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 1000.0,
        "currency": "USD"
    }
    course_data_2 = {
        "university": "Test University 2",
        "city": "Test City 2",
        "country": "Test Country 2",
        "name": "Test Course 2",
        "description": "Test Description 2",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 2000.0,
        "currency": "EUR"
    }
    client.post("/courses", json=course_data_1)
    client.post("/courses", json=course_data_2)

    response = client.get("/countries")
    assert response.status_code == 200
    assert len(response.json()["countries"]) == 2
    assert "Test Country 1" in response.json()["countries"]
    assert "Test Country 2" in response.json()["countries"]

def test_get_cities():
    course_data_1 = {
        "university": "Test University 1",
        "city": "Test City 1",
        "country": "Test Country 1",
        "name": "Test Course 1",
        "description": "Test Description 1",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 1000.0,
        "currency": "USD"
    }
    course_data_2 = {
        "university": "Test University 2",
        "city": "Test City 2",
        "country": "Test Country 2",
        "name": "Test Course 2",
        "description": "Test Description 2",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "price": 2000.0,
        "currency": "EUR"
    }
    client.post("/courses", json=course_data_1)
    client.post("/courses", json=course_data_2)

    response = client.get("/cities")
    assert response.status_code == 200
    assert len(response.json()["cities"]) == 2
    assert "Test City 1" in response.json()["cities"]
    assert "Test City 2" in response.json()["cities"]
