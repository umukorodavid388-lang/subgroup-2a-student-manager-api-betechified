# Student Manager API

A REST API for managing student records, with full CRUD operations (Create, Read, Update, Delete) built as a group project.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo.git

# Move into the project folder
cd your-repo

# Install dependencies
npm install

# Start the server
npm run dev
```

The API runs at `http://localhost:3000` by default.

## API Endpoints

| Method | Endpoint | Description | Owner |
|--------|----------|-------------|-------|
| GET | `/api/students` | List all students | Eirene |
| GET | `/api/students/:id` | Get one student by ID | Eirene |
| POST | `/api/students` | Create a student | Crown Aluka |
| PUT | `/api/students/:id` | Update a student's details | Mike |
| PATCH | `/api/students/:id` | Partially update a student | Mike |
| DELETE | `/api/students/:id` | Delete a student | Crown Aluka |

> PATCH and DELETE requests will only work after those endpoints are implemented and merged.

## Testing with Postman

A Postman collection is included for testing every endpoint.

1. Open Postman and click **Import**.
2. Select `Student_Manager_API.postman_collection.json` from this repo.
3. Open the collection's **Variables** tab and set:

| Variable | Default | Description |
|----------|---------|-------------|
| `baseUrl` | `http://localhost:3000` | Address where the API is running |
| `studentId` | `1` | ID of the student used in single-record requests |

4. Start the server, then send the requests.

## Request Examples

### Get all students

```http
GET {{baseUrl}}/api/students
```

### Get a student by ID

```http
GET {{baseUrl}}/api/students/1
```

### Create a student

```http
POST {{baseUrl}}/api/students
Content-Type: application/json
```

```json
{
  "name": "Ada Okafor",
  "email": "ada.okafor@example.com",
  "age": 20,
  "course": "Computer Science"
}
```

Use a unique email address for each test.

### Update a student (PUT)

```http
PUT {{baseUrl}}/api/students/1
Content-Type: application/json
```

```json
{
  "name": "Ada Okafor",
  "email": "ada.okafor@example.com",
  "age": 21,
  "course": "Environmental Health"
}
```

### Edit a student (PATCH)

```http
PATCH {{baseUrl}}/api/students/1
Content-Type: application/json
```

```json
{
  "course": "Public Health"
}
```

### Delete a student

```http
DELETE {{baseUrl}}/api/students/1
```

## Using cURL

```bash
# Get all students
curl http://localhost:3000/api/students

# Create a student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada Okafor","email":"ada.okafor@example.com","age":20,"course":"Computer Science"}'

# Delete a student
curl -X DELETE http://localhost:3000/api/students/1
```


## Contributors

| Name | Role / Responsibility |
|------|-----------------------|
| Umukoro David | Project setup, GitHub repo, merging of branches (Group Leader) |
| Crown Aluka | Create Operation and Delete Operation |
| Eirene | View Operation |
| Mike | Update Operation |
| Olayiminka Jewels | Postman Collection and Testing |
