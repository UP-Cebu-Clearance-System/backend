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
    - request body 
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
    - request body
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
    - request body
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
    - request body
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
- POST /login/admin
    - request body
        ```js
        {
            "username": "admin", // username: string
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
    - headers
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
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
        ```js
        200 OK
        ```
- POST /clearance/cancel (*if student want to cancel their application)
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
        ```js
        {
            message: 'Success / Error'
            success: true // boolean
        }
        ```
#### APPROVER
- GET /approver (*list of students to be approved)
    - headers
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
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body
        ```js
        {
            "CID": 1 //int: cid of the clearance item
            "remarks": "<message>" //optional
        }
        ```
    - response
        ```js
        {
            message: 'Success / Error'
            success: true // boolean
        }
        ```
- POST /approver/reject
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body
        ```js
        {
            "CID": 1 //int: cid of the clearance item
            "remarks": "<message>"
        }
        ```
    - response
        ```js
        {
            message: 'Success / Error'
            success: true // boolean
        }
        ```
- GET /approver/logs (*show logs of approver's actions)
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
        ```js
        [
            {
                "ID": 57, // logID: int
                "CID": 121,
                "ApproverID": "ocosci-laboratory",
                "StudentName": "Juan Dela Cruz",
                "StudentID": "0000-11111",
                "ClearanceID": "ct-cosci-0000-11111",
                "Note": null,
                "Status": "Signed",
                "Remarks": null,
                "Modification": "APPROVER_RESTORE",
                "Timestamp": "2020-07-05T04:48:42.115Z"
            },
            ...
        ]
        
        ```
- POST /approver/restore
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body
        ```js
        {
            "logID": 1 // the ID from the /logs endpoint: int
        }
        ```
    - response
        ```js
        200 OK
        {}
        ```
#### ADMIN
- GET /admin/download/backup (*download db backup)
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
        ```
        *start db backup file download
        ```
- GET admin/download/log/:file
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
        ```
        *start log file download
        ```
- GET admin/logs (*show list of logs)
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
        ```js
        [
            {
                filename: 'example.log',
                url: 'admin/download/log/example.log'
            },
            ...
        ]
        ```
- POST admin/query (*do manual query)
- headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body
        ```js
        {
            query: "SELECT * from Student" // manual query: string
        }
        ```
    - response
        ```js
        [
            {
                message: 'Success / Error',
                result: []
            },
            ...
        ]
        ```
#### ACCOUNT
- GET /account/info (* public info of account holder)
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - response
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
    - headers
        ```js
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - request body
        ```js
        {
            "password": "password" // string: current password of the account
            "newPassword": "newPassword" // string
        }
        ```
    - response
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