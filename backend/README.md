# backend

## [admin sign in](http://xpectum-backend-develop-1367682842.us-east-1.elb.amazonaws.com/docs/#/admin%20auth/post_admin_auth_signin)

**API** - post {api}/admin/auth/signin

#### Parameters

```json
{
    "email": "string",
    "password": "string"
}
```

#### Responses
```json
{
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "avatar": "string",
    "roles": [
        "string"
    ],
    "userEmail": [
        {}
    ],
    "token": "string",
    "organisationId": 0
}
```


## [student courses info](http://xpectum-backend-develop-1367682842.us-east-1.elb.amazonaws.com/docs/#/my-course/get_my_course)

**API** - get {api}/my-course

#### Parameters

```No parameters```

#### Responses
```json
[
  {
    "id": 0,
    "name": "string",
    "courses": [
      {
        "id": 0,
        "title": "string",
        "version": "string",
        "contentList": "string",
        "shortDescription": "string",
        "description": "string",
        "examination": "string",
        "imageUri": "string",
        "language": "string",
        "courseCertificate": {
          "gradeText": "string",
          "dontShowExams": true,
          "signatures": "string",
          "courseName": "string",
          "content": "string",
          "url": "string",
          "originalName": "string",
          "course": [
            "string"
          ]
        },
        "isCertified": true,
        "certifiedInfo": "string",
        "isLinear": true,
        "isConsistently": true,
        "media": {
          "info": "string",
          "hasPhysical": true
        },
        "otherInfo": "string",
        "previousKnowledge": "string",
        "price": 0,
        "systemRequirements": "string",
        "targetGroup": "string",
        "length": "string",
        "isStepByStepTopics": true,
        "time": {
          "complete": 0,
          "access": 0,
          "extraInfo": "string"
        },
        "studyPlan": {
          "studentAccess": true,
          "approximatelyDays": 0
        },
        "welcomeFileUrl": "string",
        "links": [
          {
            "id": 0,
            "url": "string"
          }
        ],
        "tutors": [
          {
            "id": 0,
            "firstName": "string",
            "lastName": "string"
          }
        ],
        "categories": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "unpublished"
      }
    ]
  }
]
```


## [admin create students](http://xpectum-backend-develop-1367682842.us-east-1.elb.amazonaws.com/docs/#/admin%20student/post_admin_students)

**API** - post {api}/admin/students

#### Parameters

```json
{
  "students": [
    {
      "firstName": "string",
      "lastName": "string",
      "streetAddress": "string",
      "emails": [
        "string"
      ],
      "phones": [
        "string"
      ],
      "language": 0,
      "notifyEmail": true,
      "notifySms": true,
      "studentTaxonomy": [
        "Unknown Type: addStudentTaxonomyDto"
      ]
    }
  ],
  "taxonomies": [
    {
      "taxonomy": {},
      "value": "string"
    }
  ],
  "courses": [
    {
      "courseId": "course id",
      "dateBegin": "date begin"
    }
  ],
  "groups": [
    "string"
  ],
  "currentLmsGroupId": 0
}
```

#### Responses
```json
{
  "studentsToUpdate": [
    {
      "email": "email",
      "courses": [
        {
          "courseId": "course id",
          "dateBegin": "date begin"
        }
      ]
    }
  ]
}
```
