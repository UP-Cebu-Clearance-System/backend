# The Clearance Guide (WIP)

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Glossary

##### Clearance

> Clearance is a list of Clearables. A student must have all the clearables signed, in an order determined by the Clearance-Flow, to be cleared.

##### Clearable

> Clearable is an entity that must be signed by an Approver

##### Clearance Flow

> The exact order signing of clearance would be followed. Clearance Flow is unique to each College and contains the order, and information about the signatory

##### Approver

> A signatory body. A user that approves or rejects a Clearable that is applied by a student.

##### Student

> An entity that needs to be cleared.

##### Admin

> A superuser that has full access and rights to the database

## Constants

#### Status

- Possible Values
  - NULL
    - when clearable hasn't been applied
  - Pending
    - when enqueued but not yet approved or rejected by approver
  - Approved
  - Rejected

#### College

`CREATE TABLE "College" ( "CollegeID" TEXT NOT NULL UNIQUE, "Name" TEXT NOT NULL );`

| CollegeID | Name                              |
| --------- | --------------------------------- |
| cosci     | College Of Science                |
| cosoc     | College of Social Science         |
| coaac     | College of Arts and Communication |
| cosom     | School of Management              |

#### Office

`CREATE TABLE "Office" ( "OfficeID" TEXT NOT NULL UNIQUE, "Name" TEXT NOT NULL, PRIMARY KEY("OfficeID") );`
| OfficeID | Name |
|----------|------------------------------------|
| osa | Office Of Student Affairs |
| our | Office of the University Registrar |
| ocosci | College Of Science |
| ocosoc | College Of Social Science |
| ocoaac | College of Arts and Communication |
| ocosom | School of Management |
| oao | Accounting Office |

\*Had to make an office for colleges to better classify approvers

#### ClearanceType

`CREATE TABLE "ClearanceType" ( "ClearanceTypeID" TEXT NOT NULL UNIQUE, "CollegeID" TEXT, PRIMARY KEY("ClearanceTypeID") );`
| ClearanceTypeID | CollegeID |
|-----------------|-----------|
| ct-cosci | cosci |
| ct-cosoc | cosoc |
| ct-cosom | cosom |
| ct-coaac | coaac |

#### Approver Titles

| TitleID              | Name                 |
| -------------------- | -------------------- |
| laboratory           | Laboratory           |
| dean                 | Dean                 |
| academic-adviser     | Academic Adviser     |
| college-secretary    | College Secretary    |
| department-chair     | Department Chair     |
| health-services-unit | Health Services Unit |
| pe-coordinator       | PE Coordinator       |
| university-registrar | University Registrar |
| osa-director         | OSA Director         |
| university-librarian | University Librarian |
| accounting-section   | Accounting Section   |
| tlrc-coordinator     | TLRC Coordinator     |
| property-custodian   | Property Custodian   |

## IDs

Some ids are derived from other IDs.

### ClearanceID

Derived from ClearanceTypeID and StudentID

### ApproverID

Derived from Office and position

### ClearanceType

Derived from CollegeID. Since ClearanceType is dependent on College

## Variable Tables

#### ClearanceFlow

`CREATE TABLE "ClearanceFlow" ( "ClearanceFlowID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, "ClearanceTypeID" TEXT NOT NULL, "ApproverID" TEXT NOT NULL, "Flow" INTEGER NOT NULL );`
| ClearanceFlowID | ClearanceTypeID | ApproverID | Flow |
|-----------------|-----------------|-------------------------|------|
| 1 | ct-cosci | ocosci-academic-adviser | 1 |
| 2 | ct-cosci | ocosci-dean | 3 |
| 3 | ct-cosci | ocosci-laboratory | 2 |

#### ClearanceQueue

`CREATE TABLE "ClearanceQueue" ( "CID" INTEGER NOT NULL UNIQUE, "ApproverID" TEXT, "StudentName" TEXT, "StudentID" TEXT, "ClearanceID" TEXT NOT NULL UNIQUE, "Note" TEXT, "Status" INTEGER, "Remarks" TEXT, PRIMARY KEY("CID","ClearanceID") );`
| CID | ApproverID | StudentName | StudentID | ClearanceID | Note | Status | Remarks |
|-----|------------------------|-------------|-----------|--------------------|------|--------|---------|
| 1 | oao-property-custodian | John Doe | 2018-2504 | ct-cosci-2018-2504 | | Rejected\* | |

#### ClearanceLog

> Like clearanceQueue but with new columns ID and timestamp

#### Approver

`CREATE TABLE "Approver" ( "ApproverID" TEXT NOT NULL UNIQUE, "Name" TEXT NOT NULL, "EmployeeID" TEXT NOT NULL, "Title" TEXT NOT NULL, "OfficeID" TEXT NOT NULL, "Password" TEXT NOT NULL, PRIMARY KEY("ApproverID") );`
| ApproverID | Name | EmployeeID | Title | OfficeID | Password |
|-------------|---------------------|------------|-------|----------|-----------|
| ocosci-dean | Ryan Ciriaco Dulaca | 2010-1231 | Dean | ocosci | p@s5w0rds |

## Student

### Registration

> To be able to use the website. The student must register.

`studentRegister(studentID, name, collegeID, password)`

- <b>Parameters </b>
  - StudentID
    - Type: String
    - Format: Four digit number followed by a ‘-’ then a 5 digit number. (xxxx-xxxxx)
    - E.g. “2016-05778”
  - Name
    - Type: String
    - Format: Surname, FirstName MiddleName
    - E.g. “De la Cruz, Juan Bob Cruz”
  - CollegeID
    - Type: String
    - Format: Strictly one of the following:
      - College Of Science - “cosci”
      - College Of Social Science - “cosoc”
      - College Of Arts and Communication - “coaac”
      - School of Management - “cosom”
    - E.g. “cosom”
  - Password
    - Type: String
    - Format: Format: 8 - 50 characters long, alphanumeric, at least 1 special character, at least 1 number
    - E.g. “p@s5w0rds”
- <b>Response</b>
  - Generic success response

The user interface will simplify inputting CollegeID through radio, choice buttons etc. Upon registering, the student's clearance will be imaged after the ClearanceFlow of specific college.

### Application of Clearable

The student manually applies a clearable to it's assigned approver. The student must ensure compliance of the requirements to prevent rejection. In the case of rejection, remarks are provided by the approver for the information of the student.

`studentApplyClearance(studentID, CID)`

- Parameters
  - StudentID
  - CID
    - This is a reference to the student's clearable in the Clearance table. (not to be confused with ClearanceID)
- Response
  - Generic success response

Again, interface simplifies this process, and may only involve clicking an apply button on a specific clearable.

### Cancelling an Application

Reverts the application of a clearable.

- Parameters
  - CID
- Response
  - Generic success response

Again, interface simplifies this process, and may only involve clicking an apply button on a specific clearable.

## Approver

### Registration

Approver details are automatically filled out by Admin. No registration happens, only login with employee number and temporary password.
`approverRegister(employeeID, password)`

- Parameters
  - employeeID
  - temporary password
- Response
  - generic success response

### Approving a Clearable

Clearables for an approver are enqueued in the ClearanceQueue.
`approverSignClearanceWithRemarks(CID, remarks)`
`approverSignClearance(CID)`

### Rejecting a Clearable

`approverRejectClearance()`

### Restoring a Clearable

Presented with ClearanceLog. In case of mistake, approver can restore a clearable. Given the ClearanceLog, approver looks for the state of the Clearable where he wants to restore, that state will then be restored.
`approverRestoreClearable(id)`

- Parameters
  - id
    - id of
- Response

### Getting Clearance of Student

An approver might want to check the clearance of student to check some requisite signatories
`approverGetClearanceOfStudent(studentID)`

- Parameters
  - StudentID
- Response
  - array of student clearables

## Admin

TO BE IMPLEMENTED

### Add Approver

`adminAddApprover(name, title, officeID, passwd)`

- Parameters

  - name
    - Surname, Given name Middle name
  - title

    - refer to ApproverTitles

  - officeID
    - refer to Office in Constants.
  - passwd
    - secure password

User interfaces will offer a selection from titles found in ApproverTitles table.

### Add Approver Title

- Parameters
  - Name
    - Words are separated by space, First letter capitalized, Acronyms e.g. OSA, PE, TLRC must be all capitalized

### Remove Approver Title

- Parameters
  - id

### Add Clearance Flow

TBI

### Remove Clearance Flow

TBI

### Remove Approver

TBI

### Add Clearance Type

TBI

## Generic Success Responses

### Success

- String message
- bool success

`{message:"Success", success:true}`

### Failure

- String message
- bool success
- String errorString

`{message:"Failure", error: "sql error unique key" , success:true}`

## Flow Overview

Admin creates ClearanceFlow, and Approvers.
Students and Approvers register.
Student gets clearance imaged from ClearanceFlow
Student applies clearable to approver.
Approver rejects/approves clearable
Student applies clearable to next approver.
Approver rejects/approves clearable
