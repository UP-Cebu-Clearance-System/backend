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
        ```json
        {
            "id": "0000-00000", // student id: string
            "name": "John Doe", // name: string
            "collegeID": "aaa", // collegeID: string
            "password": "password" // password: string
        }
        ```
    - response
        ```json
        {
            "message": "Error/Success", // error or success message
            "success": true // success: boolean
        }
        ```
- POST /signup/approver
    - request body:
        ```json
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
        ```json
        {
            "message": "Error/Success", // error or success message
            "success": true // success: boolean
        }
        ```
- POST /login/student
    - request body:
        ```json
        {
            "id": "0000-00000", // id: string
            "password": "password" // password: string
        }
        ```
    - response
        ```json
        {
            "accessToken": "Token"
        }
        ```
- POST /login/approver
    - request body:
        ```json
        {
            "id": "0000-00000", // id: string
            "password": "password" // password: string
        }
        ```
    - response
        ```json
        {
            "accessToken": "Token"
        }
        ```
- GET /clearance
    - Headers
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
        ```json
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
        ```json
        {
            "message": "Invalid token."
        }
        ```
