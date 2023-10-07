<?php

class Triangle
{
    private array $pointA;
    private array $pointB;
    private array $pointC;
    private array $vectors;
    private array $length;
    private array $angles;
    private array $square;


    public function isTriangle($a1, $b1, $c1, $a2, $b2, $c2, $a3, $b3, $c3): array
    {
        $this->pointA = array($a1, $b1, $c1);
        $this->pointB = array($a2, $b2, $c2);
        $this->pointC = array($a3, $b3, $c3);
        $this->getLength();
        $lengthAB = $this->length['lengthAB'];
        $lengthBC = $this->length['lengthBC'];
        $lengthCA = $this->length['lengthCA'];
        if ($lengthAB + $lengthCA > $lengthBC && $lengthCA + $lengthBC > $lengthAB && $lengthAB + $lengthBC > $lengthCA) {
            $this->calculateAngles();
            $this->calculateSquare();
            return [
                'Length' => $this->length,
                'Angles' => $this->angles,
                'Square' => $this->square
            ];
        }
        return ['value' => null,
            'error' => 999];

    }


    private function getVector(): void
    {
        $this->vectors = array(
            'vectorAB' => array(
                $this->pointB[0] - $this->pointA[0],
                $this->pointB[1] - $this->pointA[1],
                $this->pointB[2] - $this->pointA[2]),
            'vectorBC' => array(
                $this->pointC[0] - $this->pointB[0],
                $this->pointC[1] - $this->pointB[1],
                $this->pointC[2] - $this->pointB[2]),
            'vectorCA' => array(
                $this->pointA[0] - $this->pointC[0],
                $this->pointA[1] - $this->pointC[1],
                $this->pointA[2] - $this->pointC[2]),
        );
    }

    private function calculateVectorLength($vector): float
    {
        return sqrt($vector[0] * $vector[0] + $vector[1] * $vector[1] + $vector[2] * $vector[2]);
    }

    public function getLength(): void
    {
        $this->getVector();
        $lengthAB = $this->calculateVectorLength($this->vectors['vectorAB']);
        $lengthBC = $this->calculateVectorLength($this->vectors['vectorBC']);
        $lengthCA = $this->calculateVectorLength($this->vectors['vectorCA']);
       $this->length = [
            'lengthAB' => $lengthAB,
            'lengthBC' => $lengthBC,
            'lengthCA' => $lengthCA
        ];
    }


    private function calculateSquare(): void
    {
        $this->getLength();
        $A = $this->length['lengthAB'];
        $C = $this->length['lengthCA'];
        $B = $this->length['lengthBC'];
        $halfOfPerimeter = ($A + $B + $C) / 2;
        $this->square = [
            'square' => sqrt($halfOfPerimeter * ($halfOfPerimeter - $A) *
                ($halfOfPerimeter - $B) * ($halfOfPerimeter - $C))];
    }

    public function calculateAngles(): void
    {
        $this->getLength();
        $vectorAB = $this->vectors['vectorAB'];
        $vectorBC = $this->vectors['vectorBC'];
        $vectorCA = $this->vectors['vectorCA'];
        $lengthAB = $this->length['lengthAB'];
        $lengthBC = $this->length['lengthBC'];
        $lengthCA = $this->length['lengthCA'];
        $this->angles = [
            'angleA' => (int)rad2deg(acos(($vectorBC[0] * (-$vectorCA[0]) + $vectorBC[1] * (-$vectorCA[1]) + $vectorBC[2] * (-$vectorCA[2])) / ($lengthBC * $lengthCA))),
            'angleB' => (int)rad2deg(acos(($vectorCA[0] * (-$vectorAB[0]) + $vectorCA[1] * (-$vectorAB[1]) + $vectorCA[2] * (-$vectorAB[2])) / ($lengthCA * $lengthAB))),
            'angleC' => (int)rad2deg(acos(($vectorAB[0] * (-$vectorBC[0]) + $vectorAB[1] * (-$vectorBC[1]) + $vectorAB[2] * (-$vectorBC[2])) / ($lengthAB * $lengthBC)))
        ];

    }

}