# clearance-api

## Getting started
Install dependencies
```bash
npm install
```

Run server
```bash
npm start 
# or
npm run dev # run as a development server
```
default local link: http://localhost:3000/
or at https://clearance.herokuapp.com

## Endpoints
- POST  /signup/student
    - request body: 
        ```js
        {
            "id": "0000-00000", // student id: string
            "name": "John Doe", // name: string
            "collegeID": "aaa", // collegeID: string, [cosci (for College of Science), cosoc (Social Science), coaac (Arts and Communication), cosom (Management)]
            "password": "password" // password: string
        }
        ```
    - response
        ```js
        {
            "message": "Error/Success", // error or success message
            "success": true // success: boolean
        }
        ```
- POST /signup/approver
    - request body:
        ```js
        {
            "id": "abcd-efgh", // aprrover id: string
            "name": "Jane Doe", // name: string
            "employeeID": "0000-00000", // id: string
            "title": "Cashier", // job title: string
            "officeID": "cosci", // offfice id: string
            "password": "password" // password: string 
        }
        ```
    - response
        ```js
        {
            "message": "Error/Success", // error or success message
            "success": true // success: boolean
        }
        ```
- POST /login/student
    - request body:
        ```js
        {
            "id": "0000-00000", // id: string
            "password": "password" // password: string
        }
        ```
    - response
        ```js
        {
            "accessToken": "Token"
        }
        ```
- POST /login/approver
    - request body:
        ```js
        {
            "id": "0000-00000", // id: string
            "password": "password" // password: string
        }
        ```
    - response
        ```js
        {
            "accessToken": "Token"
        }
        ```
- GET /clearance
    - Headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
        ```js
        [
           {
                "CID": 0000,
                "ClearanceID": "abcd",
                "ClearanceTypeID": "ct-cosci",
                "ApproverID": "ocosci-academic-adviser",
                "Flow": 2,
                "Status": null,
                "Remarks": null
            }, 
            ...
        ]
        ```
        or
        ```js
        {
            "message": "Invalid token."
        }
        ```
- GET /approver
    - Headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
        ```js
        [
            {

            },
            ...
        ]
        ```