<?php

namespace App\Manager;

use App\Entity\Student;
use Doctrine\ORM\EntityManagerInterface;

class StudentManager
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {
    }

    public function createStudent(string $name): void
    {
        $student = (new Student())
            ->setName((string) $name);

        $this->entityManager->persist($student);
        $this->entityManager->flush();
    }
}
