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
default local link: http://localhost:3000/ or
production link: https://clearance.herokuapp.com

## Endpoints
#### SIGNUP
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
#### LOGIN
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
#### CLEARANCE
- GET /clearance (*list of clearance items)
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
#### APPROVER
- GET /approver (*list of students to be approved)
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
#### ACCOUNT
- GET /account/info (* public info of account holder)
    - Headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response:
        ```js
        // if student
        {
            "StudentID": "0000-11111",
            "Name": "Juan Dela Cruz",
            "ClearanceID": "ct-cosci-0000-11111",
            "Status": null,
            "CollegeID": "cosci"
        }
        // if approver
        {
            "ApproverID": "ocosci-laboratory",
            "Name": "Joe Mama",
            "Title": "Laboratory"
        }
        ```
- POST /account/password (*change current password)
    - Headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body:
        ```js
        {
            "password": "password" // string: current password of the account
            "newPassword": "newPassword" // string
        }
        ```
    - response:
        ```js
        {
            message: 'Success / Error'
            success: true // boolean
        }
        ```
## Dummy Accounts
- Student
    - id: "0000-11111"
    - password: "password"
- Approver
    - id: "ocosci-laboratory"
    - password: "password"
## How to realtime?
- Add socketio script
    ```html
    <script type="text/javascript" src="https://clearance.herokuapp.com/socket.io/socket.io.js"></script>
    ```
- Event listeners
    - WIP