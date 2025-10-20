<?php

namespace App\Manager;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserManager
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHash
    ) {
    }

    public function createUser(string $email, string $pwd): User
    {
        $user = (new User())
            ->setEmail((string) $email);

        $password = $this->passwordHash->hashPassword($user, (string) $pwd);
        $user->setPassword($password);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }
}
