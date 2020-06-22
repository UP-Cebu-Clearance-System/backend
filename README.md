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
                "Flow": 1,
                "Approver": "John Doe",
                "Title": "Laboratory",
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
- POST /clearance/apply (*student must apply in order for their name to seen in the approvers dashboard)
    - Headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body:
        ```js
        {
            "CID": 1 //int: cid of the clearance item
        }
        ```
    - response:
        ```js
        200 OK
        ```
- POST /clearance/cancel (*if student want to cancel their application)
    - Headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body:
        ```js
        {
            "CID": 1 //int: cid of the clearance item
        }
        ```
    - response:
        ```js
        {
            message: 'Success / Error'
            success: true // boolean
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
                "CID": 122,
                "ApproverID": "ocosci-laboratory",
                "StudentName": "Juan Dela Cruz",
                "StudentID": "0000-11111",
                "ClearanceID": "ct-cosci-0000-11111",
                "Note": null,
                "Status": "Pending",
                "Remarks": null
            }
            ...
        ]
        ```
- POST /approver/sign
    - Headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body:
        ```js
        {
            "CID": 1 //int: cid of the clearance item
            "remarks": "<message>" //optional
        }
        ```
    - response:
        ```js
        {
            message: 'Success / Error'
            success: true // boolean
        }
        ```
- POST /approver/reject
    - Headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body:
        ```js
        {
            "CID": 1 //int: cid of the clearance item
            "remarks": "<message>"
        }
        ```
    - response:
        ```js
        {
            message: 'Success / Error'
            success: true // boolean
        }
        ```
## How to realtime?
- Add socketio script
    ```html
    <script type="text/javascript" src="https://clearance.herokuapp.com/socket.io/socket.io.js"></script>
    ```
- Event listeners
    - WIP