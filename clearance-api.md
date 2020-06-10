# Clearance-Api
## Public Queries
>Queries that can be called by anyone
### Get all students public info
`fetchAllStudentsPublicInfo()`
- Parameters
    - None
- Response
    - Array of all Student Infos (StudentID, Name, ClearanceID, Status, CollegeID)

```
https://xxxxxx
```

### Fetch specific student public info based on id
`fetchStudentInfo()`
- Parameters
    - StudentID
- Response
    - Student Info Object (StudentID, Name, ClearanceID, Status, CollegeID)

```
https://xxxxxx
```
 ### Check if student is registered
`isStudentRegistered()`
- Parameters
    - StudentID
- Response
    - Bool

```
https://xxxxxx
```
 
 ### fetch All Clearances
`fetchAllClearancesfetchAllClearances()`
- Parameters
    - None
- Response
    - Array of all Clearance Objects

```
https://xxxxxx
```
  
 ### fetch specific clearance based on ClearanceID
`fetchClearance()`
- Parameters
    - ClearanceID
- Response
    - Clearance Object

```
https://xxxxxx
```
   
 ### fetch approver info 
`fetchApproverInfo()`
- Parameters
    - ApproverID
- Response
    - Approver Info object

```
https://xxxxxx
```
 
    
## Student Queries
>Queries that can be called by students only
### Register student
`studentRegister()`
- Parameters
    - StudentID, Name, CollegeID, Password
- Response
    - Success of Query

```
https://xxxxxx
```
### Populate clearance for student (called on register)
`populateClearanceForStudentID()`
- Parameters
    - StudentID 
- Response
    - Success of Query

```
https://xxxxxx
```
### Update password
`studentUpdatePassword()`
- Parameters
    - StudentID, Password
- Response
    - Success of Query

```
https://xxxxxx
```
### Apply clearable and enqueue to approver
`studentApplyClearance()`
- Parameters
    - StudentID, cid
- Response
    - Success of Query

```
https://xxxxxx
```

    
## Approver Queries
>Queries that can be called by approvers only
### Register approver
##### Approver details are already pre-filled. Approver only needs to register with employee id, and given password. Approver must update password upon login.
`approverRegister()`
- Parameters
    - EmployeeID, Password
- Response
    - Success of Query

```
https://xxxxxx
```

### Update password
`approverUpdatePassword()`
- Parameters
    - EmployeeID, Password
- Response
    - Success of Query

```
https://xxxxxx
```