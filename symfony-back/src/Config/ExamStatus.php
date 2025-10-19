<?php

namespace App\Config;

enum ExamStatus: string
{
    case CONFIRMED = 'Confirmé';
    case TO_ORGANIZE = 'À organiser';
    case CANCELED = 'Annulé';
    case WAITING = 'En recherche de place';
}