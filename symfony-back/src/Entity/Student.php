<?php

namespace App\Entity;

use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\StudentRepository;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;

#[ORM\Entity(repositoryClass: StudentRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
    ]
)]
class Student
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?Uuid $id;

    #[ORM\Column(length: 255)]
    #[Groups(['exam:read'])]
    private ?string $name = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
}
