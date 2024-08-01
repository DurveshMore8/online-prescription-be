# Online Prescription BE (NodeJS Server)

## Module 1: user (6 APIs) '/user'
1. '/doctor' - POST - to create a new doctor
2. '/login' - POST - login for both type of users
3. '/doctor-list' - GET - to fetch doctor list for patient
4. '/doctor/:id' - GET - get doctor data by id
5. '/user-by-token' - GET - get any type of user data by auth token
6. '/patient' - POST - create new patient account

## Module 2: consultation (5 APIs) '/consultation'
1. '/' - POST - to create a new consultation entry by patient
2. '/patient' - GET - get consultation list by patient
3. '/doctor' - GET - get consultation list by doctor
4. '/:id' - GET- get consultation data by id
5. '/update' - POST - update consultation data by doctor

## Middlewares (JWT)
1. User Middleware - to authenticate user sign in on each API request
