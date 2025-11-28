#!/bin/bash

# 🔑 API Keys Testing Script
# OMNI-MIND by A.I. Help Pros
#
# This script tests all your API keys before deployment
# Usage: ./test-api-keys.sh
# Make sure to set environment variables first

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔑 Testing API Keys for OMNI-MIND${NC}\n"

# Test counter
total_tests=0
passed_tests=0

# ===== TEST OPENAI =====
echo -e "${YELLOW}1. Testing OpenAI API Key...${NC}"
total_tests=$((total_tests + 1))

if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${RED}❌ OPENAI_API_KEY not set${NC}\n"
else
    response=$(curl -s -w "\n%{http_code}" https://api.openai.com/v1/models \
        -H "Authorization: Bearer $OPENAI_API_KEY")
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✅ OpenAI API Key is VALID${NC}"
        echo -e "${GREEN}   Available models: $(echo "$response" | head -n-1 | jq -r '.data | length') models found${NC}\n"
        passed_tests=$((passed_tests + 1))
    else
        echo -e "${RED}❌ OpenAI API Key is INVALID (HTTP $http_code)${NC}"
        echo "$response" | head -n-1 | jq '.' 2>/dev/null || echo "$response" | head -n-1
        echo ""
    fi
fi

# ===== TEST ANTHROPIC =====
echo -e "${YELLOW}2. Testing Anthropic (Claude) API Key...${NC}"
total_tests=$((total_tests + 1))

if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo -e "${RED}❌ ANTHROPIC_API_KEY not set${NC}\n"
else
    response=$(curl -s -w "\n%{http_code}" https://api.anthropic.com/v1/messages \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "Content-Type: application/json" \
        -d '{
            "model": "claude-3-5-sonnet-20241022",
            "max_tokens": 10,
            "messages": [{"role": "user", "content": "Hi"}]
        }')
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✅ Anthropic API Key is VALID${NC}"
        echo -e "${GREEN}   Model: claude-3-5-sonnet-20241022 accessible${NC}\n"
        passed_tests=$((passed_tests + 1))
    else
        echo -e "${RED}❌ Anthropic API Key is INVALID (HTTP $http_code)${NC}"
        echo "$response" | head -n-1 | jq '.' 2>/dev/null || echo "$response" | head -n-1
        echo ""
    fi
fi

# ===== TEST GOOGLE (GEMINI) =====
echo -e "${YELLOW}3. Testing Google (Gemini) API Key...${NC}"
total_tests=$((total_tests + 1))

if [ -z "$GOOGLE_API_KEY" ]; then
    echo -e "${RED}❌ GOOGLE_API_KEY not set${NC}\n"
else
    response=$(curl -s -w "\n%{http_code}" \
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=$GOOGLE_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
            "contents": [{
                "parts": [{"text": "Hi"}]
            }]
        }')
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✅ Google API Key is VALID${NC}"
        echo -e "${GREEN}   Model: gemini-1.5-pro accessible${NC}\n"
        passed_tests=$((passed_tests + 1))
    else
        echo -e "${RED}❌ Google API Key is INVALID (HTTP $http_code)${NC}"
        echo "$response" | head -n-1 | jq '.' 2>/dev/null || echo "$response" | head -n-1
        echo ""
    fi
fi

# ===== TEST ELEVENLABS =====
echo -e "${YELLOW}4. Testing ElevenLabs API Key...${NC}"
total_tests=$((total_tests + 1))

if [ -z "$ELEVENLABS_API_KEY" ]; then
    echo -e "${RED}❌ ELEVENLABS_API_KEY not set${NC}\n"
else
    response=$(curl -s -w "\n%{http_code}" https://api.elevenlabs.io/v1/voices \
        -H "xi-api-key: $ELEVENLABS_API_KEY")
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" -eq 200 ]; then
        voice_count=$(echo "$response" | head -n-1 | jq '.voices | length')
        echo -e "${GREEN}✅ ElevenLabs API Key is VALID${NC}"
        echo -e "${GREEN}   Available voices: $voice_count voices found${NC}\n"
        passed_tests=$((passed_tests + 1))
    else
        echo -e "${RED}❌ ElevenLabs API Key is INVALID (HTTP $http_code)${NC}"
        echo "$response" | head -n-1 | jq '.' 2>/dev/null || echo "$response" | head -n-1
        echo ""
    fi
fi

# ===== TEST AWS S3 =====
echo -e "${YELLOW}5. Testing AWS S3 Access...${NC}"
total_tests=$((total_tests + 1))

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ] || [ -z "$AWS_S3_BUCKET" ]; then
    echo -e "${RED}❌ AWS credentials or bucket name not set${NC}\n"
else
    # Check if AWS CLI is installed
    if command -v aws &> /dev/null; then
        export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
        export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
        export AWS_REGION=${AWS_REGION:-us-east-1}
        
        # Try to list bucket contents
        if aws s3 ls "s3://$AWS_S3_BUCKET" --region "$AWS_REGION" &> /dev/null; then
            echo -e "${GREEN}✅ AWS S3 Access is VALID${NC}"
            echo -e "${GREEN}   Bucket: $AWS_S3_BUCKET (Region: $AWS_REGION)${NC}\n"
            passed_tests=$((passed_tests + 1))
        else
            echo -e "${RED}❌ AWS S3 Access FAILED${NC}"
            echo -e "${RED}   Check: Credentials, bucket name, and region${NC}\n"
        fi
    else
        echo -e "${YELLOW}⚠️  AWS CLI not installed, skipping S3 test${NC}"
        echo -e "${YELLOW}   Install: https://aws.amazon.com/cli/${NC}\n"
        total_tests=$((total_tests - 1))  # Don't count this test
    fi
fi

# ===== TEST DATABASE CONNECTION =====
echo -e "${YELLOW}6. Testing Database Connection...${NC}"
total_tests=$((total_tests + 1))

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ DATABASE_URL not set${NC}\n"
else
    # Extract components from DATABASE_URL
    # Format: postgresql://user:pass@host:port/db
    
    if command -v psql &> /dev/null; then
        if psql "$DATABASE_URL" -c "SELECT 1;" &> /dev/null; then
            echo -e "${GREEN}✅ Database Connection is VALID${NC}"
            echo -e "${GREEN}   PostgreSQL is accessible${NC}\n"
            passed_tests=$((passed_tests + 1))
        else
            echo -e "${RED}❌ Database Connection FAILED${NC}"
            echo -e "${RED}   Check: DATABASE_URL and PostgreSQL availability${NC}\n"
        fi
    else
        echo -e "${YELLOW}⚠️  psql not installed, skipping database test${NC}"
        echo -e "${YELLOW}   Install PostgreSQL client to test connection${NC}\n"
        total_tests=$((total_tests - 1))  # Don't count this test
    fi
fi

# ===== TEST REDIS CONNECTION =====
echo -e "${YELLOW}7. Testing Redis Connection...${NC}"
total_tests=$((total_tests + 1))

if [ -z "$REDIS_URL" ]; then
    echo -e "${RED}❌ REDIS_URL not set${NC}\n"
else
    if command -v redis-cli &> /dev/null; then
        # Extract host and port from REDIS_URL
        # Simple test: Try to ping
        if echo "PING" | redis-cli -u "$REDIS_URL" &> /dev/null; then
            echo -e "${GREEN}✅ Redis Connection is VALID${NC}"
            echo -e "${GREEN}   Redis is accessible${NC}\n"
            passed_tests=$((passed_tests + 1))
        else
            echo -e "${RED}❌ Redis Connection FAILED${NC}"
            echo -e "${RED}   Check: REDIS_URL and Redis availability${NC}\n"
        fi
    else
        echo -e "${YELLOW}⚠️  redis-cli not installed, skipping Redis test${NC}"
        echo -e "${YELLOW}   Install Redis client to test connection${NC}\n"
        total_tests=$((total_tests - 1))  # Don't count this test
    fi
fi

# ===== SUMMARY =====
echo -e "\n${BLUE}==================== TEST SUMMARY ====================${NC}"
echo -e "${BLUE}Total API Keys Tested: $total_tests${NC}"
echo -e "${GREEN}Valid: $passed_tests${NC}"
echo -e "${RED}Invalid: $((total_tests - passed_tests))${NC}"

if [ $passed_tests -eq $total_tests ]; then
    echo -e "\n${GREEN}🎉 ALL API KEYS ARE VALID!${NC}"
    echo -e "${GREEN}✅ You're ready to deploy to Railway${NC}\n"
    exit 0
else
    echo -e "\n${YELLOW}⚠️  Some API keys are invalid or not set${NC}"
    echo -e "${YELLOW}Please fix the issues above before deploying${NC}\n"
    
    echo -e "${BLUE}How to set environment variables:${NC}"
    echo -e "  1. Create backend/.env file"
    echo -e "  2. Add each variable: KEY=value"
    echo -e "  3. Run: source backend/.env"
    echo -e "  4. Or set them in Railway dashboard\n"
    
    echo -e "${BLUE}How to get API keys:${NC}"
    echo -e "  - OpenAI: https://platform.openai.com/api-keys"
    echo -e "  - Anthropic: https://console.anthropic.com/settings/keys"
    echo -e "  - Google: https://makersuite.google.com/app/apikey"
    echo -e "  - ElevenLabs: https://elevenlabs.io/app/settings/api-keys"
    echo -e "  - AWS: https://console.aws.amazon.com/iam\n"
    
    exit 1
fi
