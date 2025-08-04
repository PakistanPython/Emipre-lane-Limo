#!/usr/bin/env python3
"""
Test script for Empire Lane Limo API endpoints
"""
import requests
import json
import time

BASE_URL = "http://localhost:5000"

def test_endpoint(method, endpoint, data=None, headers=None):
    """Test an API endpoint"""
    url = f"{BASE_URL}{endpoint}"
    try:
        if method.upper() == 'GET':
            response = requests.get(url, headers=headers, timeout=10)
        elif method.upper() == 'POST':
            response = requests.post(url, json=data, headers=headers, timeout=10)
        elif method.upper() == 'PUT':
            response = requests.put(url, json=data, headers=headers, timeout=10)
        else:
            print(f"Unsupported method: {method}")
            return False
        
        print(f"{method} {endpoint}: {response.status_code}")
        if response.status_code < 400:
            try:
                result = response.json()
                print(f"Response: {json.dumps(result, indent=2)[:200]}...")
            except:
                print(f"Response: {response.text[:200]}...")
        else:
            print(f"Error: {response.text}")
        
        return response.status_code < 400
    except Exception as e:
        print(f"Error testing {method} {endpoint}: {e}")
        return False

def main():
    """Run API tests"""
    print("Empire Lane Limo API Test Suite")
    print("=" * 40)
    
    # Wait for server to be ready
    print("Waiting for server to be ready...")
    time.sleep(2)
    
    # Test basic endpoints
    tests = [
        ("GET", "/api/vehicles"),
        ("GET", "/api/vehicles/types/list"),
        ("GET", "/api/service-areas"),
        ("GET", "/api/service-areas/cities"),
        ("GET", "/api/testimonials"),
        ("GET", "/api/testimonials/featured"),
    ]
    
    passed = 0
    total = len(tests)
    
    for method, endpoint in tests:
        print(f"\nTesting {method} {endpoint}...")
        if test_endpoint(method, endpoint):
            passed += 1
    
    # Test user registration
    print(f"\nTesting user registration...")
    user_data = {
        "email": "test@example.com",
        "password": "testpassword123",
        "firstName": "Test",
        "lastName": "User"
    }
    
    if test_endpoint("POST", "/api/auth/register", user_data):
        passed += 1
    total += 1
    
    # Test user login
    print(f"\nTesting user login...")
    login_data = {
        "email": "test@example.com",
        "password": "testpassword123"
    }
    
    if test_endpoint("POST", "/api/auth/login", login_data):
        passed += 1
    total += 1
    
    print(f"\n" + "=" * 40)
    print(f"Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("✓ All tests passed!")
        return True
    else:
        print(f"✗ {total - passed} tests failed")
        return False

if __name__ == "__main__":
    main()

