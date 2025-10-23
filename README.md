# ExamManagement

Clone the project by : <code>git clone https://github.com/JerryFalimanana/ExamManagement.git</code>

Go into teh project : <code>cd ExamManagement</code>

Build all dependencies : <code>docker-compose build</code>

Launch docker : <code>docker-compose up -d</code>

Create user : 
    <code>cd symfony-back</code>
    <code>docker exec -it exammanagement_backend_1 bash</code>
    <code>php bin/console app:create_user --e 'email-de-user@mail.com' --p 'password'</code>
    Create students :
        <code>php bin/console app:create_student --n 'Student name'</code>

Go to : http://localhost:4200/