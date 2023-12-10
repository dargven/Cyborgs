<?php

class ContestZone extends Game
{
    private array $zone = ["x" => 1, "y" => 1];
    private $zoneSize = 10;
    private $players;
    private $isCaptured;

    public function __construct()
    {
        $this->players = Game::getPlayers();
    }

    function compareCoordinates()
    {
        foreach ($this->players as $player) {
            $distanceToCenter = sqrt(pow($player->x - $this->zone["x"], 2) + pow($player->y - $this->zone["y"], 2));
            if ($distanceToCenter <= $this->zoneSize) {
                $this->isCaptured = true;
                return $this->isCaptured;
            }
        }
    }
}