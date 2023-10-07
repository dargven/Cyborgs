<?php

class Polygon
{
    private array $points = array();

    public function addPoint($x, $y, $z): void
    {
        $this->points[] = array('x' => $x, 'y' => $y, 'z' => $z);
    }
    private function isItPolygon():bool{
        $countOfPoints = count($this->points);
        if($countOfPoints< 3) {
            return false;
        }
        return true;
        }

    private function calculateSideLengths(): array
    {
        $sideLengths = array();
        $numPoints = count($this->points);
        for ($i = 0; $i < $numPoints; $i++) {
            $x1 = $this->points[$i]['x'];
            $y1 = $this->points[$i]['y'];
            $z1 = $this->points[$i]['z'];
            $x2 = $this->points[($i + 1) % $numPoints]['x'];
            $y2 = $this->points[($i + 1) % $numPoints]['y'];
            $z2 = $this->points[($i + 1) % $numPoints]['z'];
            $sideLengths[] = sqrt(pow($x2 - $x1, 2) + pow($y2 - $y1, 2) + pow($z2 - $z1, 2));
        }
        return $sideLengths;
    }

    private function calculateArea(): float|int|null|array
    {
        $numPoints = count($this->points);

        $totalArea = 0;
        for ($i = 1; $i < $numPoints - 1; $i++) {
            $v1 = $this->points[0];
            $v2 = $this->points[$i];
            $v3 = $this->points[$i + 1];

            // Вычисляем векторные разности
            $a = array(
                'x' => $v2['x'] - $v1['x'],
                'y' => $v2['y'] - $v1['y'],
                'z' => $v2['z'] - $v1['z'],
            );
            $b = array(
                'x' => $v3['x'] - $v1['x'],
                'y' => $v3['y'] - $v1['y'],
                'z' => $v3['z'] - $v1['z'],
            );

            $crossProduct = array(
                'x' => $a['y'] * $b['z'] - $a['z'] * $b['y'],
                'y' => $a['z'] * $b['x'] - $a['x'] * $b['z'],
                'z' => $a['x'] * $b['y'] - $a['y'] * $b['x'],
            );

            $triangleArea = 0.5 * sqrt(
                    pow($crossProduct['x'], 2) +
                    pow($crossProduct['y'], 2) +
                    pow($crossProduct['z'], 2)
                );

            $totalArea += $triangleArea;
        }

        return $totalArea;
    }

    private function calculateSumOfAngles(): float|int|null|array
    {
        $numPoints = count($this->points);


        // Сумма углов многоугольника в трехмерном пространстве равна (n-2) * 180 градусов,
        // где n - количество вершин многоугольника.
        return ($numPoints - 2) * 180;
    }

    public function getResultOfAllPolygon(): array
    {
        if($this->isItPolygon()){
            return [
                'Length' => $this->calculateSideLengths(),
                'Area' => $this->calculateArea(),
                'SumOfAngles' => $this->calculateSumOfAngles()

            ];
        }

        return [
            'value' => null,
            'error'=> 555
        ];
    }
}


