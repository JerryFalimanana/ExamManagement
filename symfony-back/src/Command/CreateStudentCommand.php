<?php

namespace App\Command;

use App\Manager\StudentManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:create_student',
    description: 'Create Student for starting project',
)]
class CreateStudentCommand extends Command
{
    public function __construct(private readonly StudentManager $studentManager)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('name', InputArgument::REQUIRED, 'Name of student')
            ->addOption('n', null, InputOption::VALUE_NONE, 'entry for name')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $name = $input->getArgument('name');

        if ($name) {
            $this->studentManager->createStudent((string) $name);
        }

        $io->success(sprintf('Student : %s created successfully !', $name));

        return Command::SUCCESS;
    }
}
