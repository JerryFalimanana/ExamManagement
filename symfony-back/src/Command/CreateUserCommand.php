<?php

namespace App\Command;

use App\Manager\UserManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:create_user',
    description: 'Create User for starting project',
)]
class CreateUserCommand extends Command
{
    public function __construct(private readonly UserManager $userManager)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('email', InputArgument::OPTIONAL, 'Email of user')
            ->addArgument('pwd', InputArgument::OPTIONAL, 'Password of user')
            ->addOption('e', null, InputOption::VALUE_NONE, 'entry for email')
            ->addOption('p', null, InputOption::VALUE_NONE, 'entry for password')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $email = $input->getArgument('email');
        $pwd = $input->getArgument('pwd');

        if ($input->getOption('e') && $input->getOption('p')) {
            $user = $this->userManager->createUser($email, $pwd);

            $io->success(sprintf('User [%s / %s] created for api', $user->getEmail(), $pwd));

            return Command::SUCCESS;
        } else {
            $io->error('options --e and --p required, Pass --help to see all options');

            return Command::FAILURE;
        }
    }
}
