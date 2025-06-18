My application is elearning plateform.

**The users**
I have 3 types of users: Teacher, Student and Admin

- Teacher that create courses
- Student that browser the courses available a subscribe to a course by paying
- Admin that have access to all the data available inside the application.

Notes: A Teacher maybe an invididual or an organisation. So we need to track informations about anything related to the teacher. Information like: website, youtube channel, social media profiles...

**Courses modules**

- A Teacher can create many courses.
- A course is structured into module and each module have many lessons
- At the end of a lesson we may have one or many quizes
- At the end of a module we may have one or many quizes
- At the end of a course we have an evaluation that is made of many quizes
- A quiz is a set of question
- A question is resuable by many differents quizes
- A lesson can be link to a video as a content part
- A module can be link to a video as a presentation video
- A course can be link to a video as a presentation video
- A Teacher can be link to a video as a presentation video

Notes: We can consider the quiz and evaluation system like this: We have a bank of question and when we want to create a quiz we just pick many questions amont this quizes and define the score for each question. The same we have a bank of quizes and for each evaluation we just pick a set of quizes and define a score for each quiz.

**Messaging Module**

- For a course we have many Chat Room ( abbr as Chat)
- For a course we have many Live Session ( abbr as Live)
- A User can participate to one of many chat room
- A user can participate to one or many lives
- A User can send message and reply into a chat
- A User can send message and reply into live

**Subcription and finance**

- A student subscribe to access to a course by paying
- We manage the payment make by a user ( payin into the system) from a mobile money
- An admin can widthdraw money from the system ( payout from the system) to a mobile money

## Database Design

**User**

- id
- name
- email
- type

**Company**

- id
- user_id
- company_name

**Course**

- id
- title
- description
- status - DRAFT, PUBLISHED, TRASH
- published_at
- created_at
- update_at
- price

**Payment**

- id
- user_id
- amount
- method
- phone_number

**Payout**

- id
- user_id
- amount
- method
- phone_number

**Subscription**

- id
- course_id
- user_id
- payment_id
- progress

**Chat**

- id
- course_id
- title
- description

**Live**

- id
- course_id
- title
- description
- date

**ChatUser**

- id
- chat_id
- user_id
- role

**LiveUser**

- id
- live_id
- user_id
- role

**Message**

- id
- user_id
- content
- messagable
- messagable_id

**Module**

- id
- title
- course_id

**Lesson**

- id
- title
- description
- content

**Video**

- id
- title
- description
- purpose (presantation, description - do not use enum)
- host - YOUTUBE, VIDEO (do not use enum)
- url
- size
- duration
- format
- videoable
- videoable_id

**File**

- id
- file_type
- file_url
- filable
- filable_id

**Question**

- id
- title
- description
- type - YES or NO, MULTIPLE CHOICE, OPEN ANSWER
- propositions
- answers

**Exercice**

- id
- title
- description
- lesson_id
- module_id

**ExerciceQuestion**

- id
- question_id
- exercice_id
- mark

**Evaluation**

- id
- course_id
- name
- mark_limit

**ExerciceEvaluation**

- id
- evaluation_id
- exervice_id

**Assignement**

- id
- user_id
- course_id
- due_date

**AssignementExercice**

- id
- assignement_id
- exercice_id

**Notes:**
filable: cours, lesson, message
videoable: cours, lesson, message
messagable: chat, live

## Design assets

Dashboard
https://dribbble.com/shots/24207822-SaaS-E-learning-Dashboard
https://dribbble.com/shots/23586726-Educlass-Education-Dashboard-Saas-UI-Design
https://dribbble.com/shots/25220931-Learnify-Learning-Management-Web-App-Dashboard
https://dribbble.com/shots/25752589-E-learning-Educational-Dashboard-Design-Web-App
Course Details
https://dribbble.com/shots/18136986-E-learning-Platform-Design
https://dribbble.com/shots/24117892-E-learning-Dashboard-Course-Detail-Page
https://dribbble.com/shots/25433585-Eduler-Course-Detail-UI-Design
Website Home Page
https://dribbble.com/shots/22362236-EduLearn-E-Learning-Landing-Page-Education-Homepage-Learn
https://dribbble.com/shots/19357494-E-Learning-Platform-Landing-Page
Live Streaming
https://dribbble.com/shots/17555847-GoCamp-Elearning-Platform
https://dribbble.com/shots/8155223-Edukated-Live-Education-Course-Details
Course creation process
https://dribbble.com/shots/21864885-Creation-of-Recorded-Course
https://dribbble.com/shots/21945737-Recorded-course-Empty-state
Look At this profile
https://dribbble.com/iamrahulrao
Create course
https://dribbble.com/shots/24040224-Create-New-Course-Setup-Schedule-Online-Course-Platform
https://dribbble.com/shots/24080912-Create-New-Course-Pricing-Plan-Online-Course-Platform
https://dribbble.com/shots/24119599-Create-Course-Create-Quiz-Online-Course-Platform
https://dribbble.com/shots/24080912-Create-New-Course-Pricing-Plan-Online-Course-Platform
https://dribbble.com/shots/24191970-Create-New-Course-Admin-Create-Course-Dashboard-Design
https://dribbble.com/shots/24040224-Create-New-Course-Setup-Schedule-Online-Course-Platform

https://dribbble.com/shots/21575333-eLearn-Admin-Create-Course
Mobile Strategy
https://dribbble.com/shots/24612146-Coriusee-Online-Learning-Mobile-App-UI-Kit

Teacher Dashboard
https://dribbble.com/shots/23540576-Omoskillo-Teacher-dashboard
https://dribbble.com/shots/8516948-CITICO-Teachers-Dashboard

Courses Listing
https://dribbble.com/shots/21672220-Edworking-com-Services
