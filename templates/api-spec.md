# API Specification: {{FEATURE_NAME}}

**Feature Name:** {{FEATURE_NAME}}
**Feature Number:** {{FEATURE_NUMBER}}
**API Version:** v1.0
**Base URL:** `https://api.wellwave.com/v1`
**Authentication:** Bearer Token (JWT)
**Date:** {{DATE}}

## Overview

This document describes the REST API endpoints for the {{FEATURE_NAME}} feature.

### General Information

- **Protocol:** HTTPS only
- **Content-Type:** application/json
- **Character Set:** UTF-8
- **Rate Limiting:** 1000 requests per hour per user
- **Pagination:** Cursor-based for all list endpoints

### Authentication

All API endpoints require authentication except where explicitly noted.

```
Authorization: Bearer <JWT_TOKEN>
```

### Response Format

#### Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2025-12-25T00:00:00Z",
    "requestId": "uuid"
  }
}
```

#### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": [ ... ]
  },
  "meta": {
    "timestamp": "2025-12-25T00:00:00Z",
    "requestId": "uuid"
  }
}
```

### Error Codes

| Code | Message | HTTP Status | Description |
|------|----------|-------------|-------------|
| UNAUTHORIZED | Authentication required | 401 | Invalid or missing JWT token |
| FORBIDDEN | Access denied | 403 | User lacks permission |
| NOT_FOUND | Resource not found | 404 | Requested resource doesn't exist |
| VALIDATION_ERROR | Invalid input | 400 | Request body validation failed |
| RATE_LIMIT_EXCEEDED | Rate limit exceeded | 429 | Too many requests |
| INTERNAL_ERROR | Internal server error | 500 | Unexpected server error |

## Endpoints

### 1. Create {{FEATURE_NAME}}

Create a new {{FEATURE_NAME}} resource.

**Endpoint:** `POST /{{FEATURE_NAME}}`

**Authentication:** Required

**Request Body:**

```json
{
  "field1": "string",
  "field2": 123,
  "field3": {
    "nested": "value"
  }
}
```

**Request Schema:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| field1 | string | Yes | Description of field1 |
| field2 | number | Yes | Description of field2 |
| field3 | object | No | Nested object description |

**Validation Rules:**

- `field1`: Must be 1-100 characters
- `field2`: Must be positive number
- `field3`: Optional, must be valid JSON object

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "field1": "string",
    "field2": 123,
    "field3": {
      "nested": "value"
    },
    "createdAt": "2025-12-25T00:00:00Z",
    "updatedAt": "2025-12-25T00:00:00Z"
  }
}
```

**Error Responses:**

- `400 VALIDATION_ERROR` - Invalid request body
- `401 UNAUTHORIZED` - Not authenticated
- `403 FORBIDDEN` - Insufficient permissions

### 2. Get {{FEATURE_NAME}}

Retrieve a {{FEATURE_NAME}} by ID.

**Endpoint:** `GET /{{FEATURE_NAME}}/:id`

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | {{FEATURE_NAME}} ID |

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "field1": "string",
    "field2": 123,
    "createdAt": "2025-12-25T00:00:00Z",
    "updatedAt": "2025-12-25T00:00:00Z"
  }
}
```

**Error Responses:**

- `401 UNAUTHORIZED` - Not authenticated
- `403 FORBIDDEN` - Insufficient permissions
- `404 NOT_FOUND` - {{FEATURE_NAME}} not found

### 3. List {{FEATURE_NAME}}

List {{FEATURE_NAME}} resources with pagination.

**Endpoint:** `GET /{{FEATURE_NAME}}`

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|-----------|-------------|
| cursor | string | No | Pagination cursor |
| limit | number | No | 20 | Maximum items per page (max: 100) |
| sort | string | No | createdAt | Sort field |
| order | string | No | desc | Sort order (asc/desc) |
| filter1 | string | No | Filter by field1 |

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "field1": "string",
      "field2": 123,
      "createdAt": "2025-12-25T00:00:00Z"
    }
  ],
  "pagination": {
    "cursor": "next-cursor",
    "hasMore": true,
    "total": 100
  }
}
```

**Error Responses:**

- `401 UNAUTHORIZED` - Not authenticated
- `400 VALIDATION_ERROR` - Invalid query parameters

### 4. Update {{FEATURE_NAME}}

Update an existing {{FEATURE_NAME}}.

**Endpoint:** `PATCH /{{FEATURE_NAME}}/:id`

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | {{FEATURE_NAME}} ID |

**Request Body:** (All fields optional)

```json
{
  "field1": "updated string",
  "field2": 456
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "field1": "updated string",
    "field2": 456,
    "updatedAt": "2025-12-25T00:00:00Z"
  }
}
```

**Error Responses:**

- `400 VALIDATION_ERROR` - Invalid request body
- `401 UNAUTHORIZED` - Not authenticated
- `403 FORBIDDEN` - Insufficient permissions
- `404 NOT_FOUND` - {{FEATURE_NAME}} not found

### 5. Delete {{FEATURE_NAME}}

Delete a {{FEATURE_NAME}}.

**Endpoint:** `DELETE /{{FEATURE_NAME}}/:id`

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | {{FEATURE_NAME}} ID |

**Response (204 No Content):**

Empty response body.

**Error Responses:**

- `401 UNAUTHORIZED` - Not authenticated
- `403 FORBIDDEN` - Insufficient permissions
- `404 NOT_FOUND` - {{FEATURE_NAME}} not found

## Data Models

### {{FEATURE_NAME}} Model

```typescript
interface {{FEATURE_NAME_CAMEL_CASE}} {
  id: string;
  field1: string;
  field2: number;
  field3?: object;
  createdAt: string; // ISO 8601 datetime
  updatedAt: string; // ISO 8601 datetime
}
```

### Create{{FEATURE_NAME_CAMEL_CASE}} Request

```typescript
interface Create{{FEATURE_NAME_CAMEL_CASE}}Request {
  field1: string;
  field2: number;
  field3?: object;
}
```

### Update{{FEATURE_NAME_CAMEL_CASE}} Request

```typescript
interface Update{{FEATURE_NAME_CAMEL_CASE}}Request {
  field1?: string;
  field2?: number;
  field3?: object;
}
```

## Rate Limiting

All API endpoints are subject to rate limiting.

| Limit Type | Value | Description |
|-------------|--------|-------------|
| Requests per hour | 1000 | Per authenticated user |
| Requests per minute | 100 | Per authenticated user |
| Concurrent connections | 10 | Per authenticated user |

**Rate Limit Headers:**

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1703510400
```

**Rate Limit Exceeded Response (429):**

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please wait before making more requests.",
    "retryAfter": 60
  }
}
```

## Pagination

All list endpoints use cursor-based pagination.

### Request

```
GET /{{FEATURE_NAME}}?cursor=abc123&limit=50
```

### Response

```json
{
  "data": [ ... ],
  "pagination": {
    "cursor": "next-cursor-token",
    "hasMore": true,
    "total": 1000
  }
}
```

### Pagination Logic

1. First request: Omit `cursor` parameter
2. Next page: Use `pagination.cursor` from previous response
3. End of data: `pagination.hasMore` will be `false`

## Security

### Headers

All authenticated requests must include:

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### CORS

Allowed origins:
- `https://wellwave.com`
- `https://app.wellwave.com`

Allowed methods:
- GET, POST, PUT, PATCH, DELETE

Allowed headers:
- Authorization, Content-Type, X-Request-ID

### Input Validation

All inputs are validated using Zod schemas. See specific endpoints for validation rules.

### SQL Injection Prevention

- All queries use parameterized queries (Prisma ORM)
- No raw SQL queries
- Input sanitization enforced

## Testing

### Test Endpoints

Use the following base URLs for testing:

- **Production:** https://api.wellwave.com/v1
- **Staging:** https://staging-api.wellwave.com/v1
- **Development:** http://localhost:3000/api/v1

### Example Requests

#### cURL

```bash
# Create resource
curl -X POST https://api.wellwave.com/v1/{{FEATURE_NAME}} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"field1": "value", "field2": 123}'

# Get resource
curl https://api.wellwave.com/v1/{{FEATURE_NAME}}/uuid \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# List resources
curl "https://api.wellwave.com/v1/{{FEATURE_NAME}}?limit=50" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### JavaScript/Fetch

```typescript
const response = await fetch('https://api.wellwave.com/v1/{{FEATURE_NAME}}', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    field1: 'value',
    field2: 123,
  }),
});

const data = await response.json();
```

## Versioning

API versioning follows URL-based versioning:

```
https://api.wellwave.com/v1/{{FEATURE_NAME}}
```

### Version Lifecycle

| Version | Status | Release Date | End of Life |
|---------|--------|--------------|-------------|
| v1 | Current | 2025-01-01 | 2026-01-01 |

### Changelog

See [CHANGELOG.md](../../CHANGELOG.md) for API changes.

## Support

### Documentation

- [API Documentation](../../docs/api/README.md)
- [Integration Guide](../../docs/deployment/github-actions-setup.md)
- [Troubleshooting](../../docs/TROUBLESHOOTING.md)

### Contact

- **Email:** api-support@wellwave.com
- **Slack:** #api-support
- **Issues:** [GitHub Issues](https://github.com/Wesley-codeDr/Oficial/issues)

---

**Document Version:** 1.0.0
**Last Updated:** {{DATE}}
**Maintained By:** WellWave API Team

