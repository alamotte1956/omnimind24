#!/bin/bash

# 🚀 OMNI-MIND Deployment Verification Script
# A.I. Help Pros
# 
# This script tests all endpoints of your deployed Railway backend
# Usage: ./verify-deployment.sh <your-railway-url>
# Example: ./verify-deployment.sh https://omnimind-production-xxxx.up.railway.app

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if URL is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Please provide your Railway URL${NC}"
    echo "Usage: ./verify-deployment.sh <your-railway-url>"
    echo "Example: ./verify-deployment.sh https://omnimind-production-xxxx.up.railway.app"
    exit 1
fi

API_URL=$1
echo -e "${BLUE}🧪 Testing OMNI-MIND Backend at: ${API_URL}${NC}\n"

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    local auth_header=$5
    
    echo -e "${YELLOW}Testing: ${description}${NC}"
    
    if [ -z "$data" ]; then
        if [ -z "$auth_header" ]; then
            response=$(curl -s -w "\n%{http_code}" -X $method "${API_URL}${endpoint}")
        else
            response=$(curl -s -w "\n%{http_code}" -X $method "${API_URL}${endpoint}" -H "$auth_header")
        fi
    else
        if [ -z "$auth_header" ]; then
            response=$(curl -s -w "\n%{http_code}" -X $method "${API_URL}${endpoint}" \
                -H "Content-Type: application/json" \
                -d "$data")
        else
            response=$(curl -s -w "\n%{http_code}" -X $method "${API_URL}${endpoint}" \
                -H "Content-Type: application/json" \
                -H "$auth_header" \
                -d "$data")
        fi
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✅ Success (HTTP $http_code)${NC}"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
        echo ""
        return 0
    else
        echo -e "${RED}❌ Failed (HTTP $http_code)${NC}"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
        echo ""
        return 1
    fi
}

# Test counters
total_tests=0
passed_tests=0

# ===== TEST 1: Health Check =====
total_tests=$((total_tests + 1))
if test_endpoint "GET" "/health" "Health Check"; then
    passed_tests=$((passed_tests + 1))
fi

# ===== TEST 2: User Registration =====
total_tests=$((total_tests + 1))
random_email="test$(date +%s)@aihelpspros.com"
register_data='{
  "name": "Test User",
  "email": "'$random_email'",
  "password": "SecurePass123!"
}'

if test_endpoint "POST" "/api/auth/register" "User Registration" "$register_data"; then
    passed_tests=$((passed_tests + 1))
    
    # Extract token for subsequent tests
    TOKEN=$(echo "$body" | jq -r '.token')
    USER_ID=$(echo "$body" | jq -r '.user.id')
    
    if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
        echo -e "${GREEN}✅ Token received: ${TOKEN:0:20}...${NC}\n"
        
        # ===== TEST 3: Login =====
        total_tests=$((total_tests + 1))
        login_data='{
          "email": "'$random_email'",
          "password": "SecurePass123!"
        }'
        if test_endpoint "POST" "/api/auth/login" "User Login" "$login_data"; then
            passed_tests=$((passed_tests + 1))
        fi
        
        # ===== TEST 4: Get Profile =====
        total_tests=$((total_tests + 1))
        if test_endpoint "GET" "/api/auth/profile" "Get User Profile" "" "Authorization: Bearer $TOKEN"; then
            passed_tests=$((passed_tests + 1))
        fi
        
        # ===== TEST 5: Create Campaign =====
        total_tests=$((total_tests + 1))
        campaign_data='{
          "name": "Test Campaign - Deployment Verification",
          "type": "content",
          "brief": "Testing backend deployment for eco-friendly water bottle launch",
          "brand_voice": "Enthusiastic, eco-conscious, inspiring",
          "ai_tools": ["chatgpt", "claude"]
        }'
        if test_endpoint "POST" "/api/campaigns" "Create Campaign" "$campaign_data" "Authorization: Bearer $TOKEN"; then
            passed_tests=$((passed_tests + 1))
            
            # Extract campaign ID
            CAMPAIGN_ID=$(echo "$body" | jq -r '.campaign.id')
            
            if [ "$CAMPAIGN_ID" != "null" ] && [ ! -z "$CAMPAIGN_ID" ]; then
                echo -e "${GREEN}✅ Campaign created: $CAMPAIGN_ID${NC}\n"
                
                # ===== TEST 6: Get User Campaigns =====
                total_tests=$((total_tests + 1))
                if test_endpoint "GET" "/api/campaigns" "Get User Campaigns" "" "Authorization: Bearer $TOKEN"; then
                    passed_tests=$((passed_tests + 1))
                fi
                
                # ===== TEST 7: Get Single Campaign =====
                total_tests=$((total_tests + 1))
                if test_endpoint "GET" "/api/campaigns/$CAMPAIGN_ID" "Get Campaign Details" "" "Authorization: Bearer $TOKEN"; then
                    passed_tests=$((passed_tests + 1))
                fi
                
                # ===== TEST 8: Update Campaign =====
                total_tests=$((total_tests + 1))
                update_data='{
                  "name": "Updated Test Campaign",
                  "brief": "Updated brief for testing"
                }'
                if test_endpoint "PUT" "/api/campaigns/$CAMPAIGN_ID" "Update Campaign" "$update_data" "Authorization: Bearer $TOKEN"; then
                    passed_tests=$((passed_tests + 1))
                fi
                
                # ===== TEST 9: Process Campaign (This will take time) =====
                total_tests=$((total_tests + 1))
                echo -e "${YELLOW}⏳ Starting campaign processing (this may take 2-5 minutes)...${NC}"
                if test_endpoint "POST" "/api/campaigns/$CAMPAIGN_ID/process" "Start Campaign Processing" "" "Authorization: Bearer $TOKEN"; then
                    passed_tests=$((passed_tests + 1))
                    
                    JOB_ID=$(echo "$body" | jq -r '.jobId')
                    echo -e "${BLUE}📊 Job ID: $JOB_ID${NC}"
                    echo -e "${YELLOW}⏳ Waiting 30 seconds before checking results...${NC}\n"
                    sleep 30
                    
                    # ===== TEST 10: Get Campaign Results =====
                    total_tests=$((total_tests + 1))
                    if test_endpoint "GET" "/api/campaigns/$CAMPAIGN_ID/results" "Get Campaign Results" "" "Authorization: Bearer $TOKEN"; then
                        passed_tests=$((passed_tests + 1))
                        
                        # Show asset count
                        asset_count=$(echo "$body" | jq '.assets | length')
                        campaign_status=$(echo "$body" | jq -r '.campaign.status')
                        echo -e "${BLUE}📊 Campaign Status: $campaign_status${NC}"
                        echo -e "${BLUE}📊 Assets Generated: $asset_count${NC}\n"
                    fi
                fi
                
                # ===== TEST 11: Delete Campaign =====
                total_tests=$((total_tests + 1))
                if test_endpoint "DELETE" "/api/campaigns/$CAMPAIGN_ID" "Delete Campaign" "" "Authorization: Bearer $TOKEN"; then
                    passed_tests=$((passed_tests + 1))
                fi
            fi
        fi
    fi
fi

# ===== FINAL SUMMARY =====
echo -e "\n${BLUE}==================== TEST SUMMARY ====================${NC}"
echo -e "${BLUE}Total Tests: $total_tests${NC}"
echo -e "${GREEN}Passed: $passed_tests${NC}"
echo -e "${RED}Failed: $((total_tests - passed_tests))${NC}"

if [ $passed_tests -eq $total_tests ]; then
    echo -e "\n${GREEN}🎉 ALL TESTS PASSED! Your deployment is working perfectly!${NC}"
    echo -e "${GREEN}✅ Backend is ready for production use${NC}\n"
    exit 0
else
    echo -e "\n${YELLOW}⚠️  Some tests failed. Please check the logs above.${NC}"
    echo -e "${YELLOW}Common issues:${NC}"
    echo -e "  - Missing environment variables (check Railway dashboard)"
    echo -e "  - Database not connected (verify DATABASE_URL)"
    echo -e "  - Redis not connected (verify REDIS_URL)"
    echo -e "  - API keys invalid (check AI service keys)"
    echo -e "  - Worker not running (check worker service is deployed)\n"
    exit 1
fi
