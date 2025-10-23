# ExamManagement

Clone the project by : <code>git clone https://github.com/JerryFalimanana/ExamManagement.git</code>

Go into teh project : <code>cd ExamManagement</code>

Build all dependencies : <code>docker-compose build</code>

Launch docker : <code>docker-compose up -d</code>

Create user : 

    cd symfony-back

    docker exec -it exammanagement_backend_1 bash
    php bin/console app:create_user --e 'email-de-user@mail.com' --p 'password'
    Create students :
        php bin/console app:create_student --n 'Student name'

Go to : http://localhost:4200/