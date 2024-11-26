"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type Task = "walls" | "flooring";

interface MaterialData {
  [key: string]: {
    formula: (area: number, tileLength?: number, tileWidth?: number) => Record<string, number>;
  };
}

const materialData: MaterialData = {
  walls: {
    formula: (area: number) => ({
      bricks: Math.ceil(area * 7),
      cement: Math.ceil((area * 0.75 * 0.2) / 7),
    }),
  },
  flooring: {
    formula: (area: number, tileLength: number = 12, tileWidth: number = 12) => {
      const tileArea = (tileLength * tileWidth) / 144;
      return {
        tiles: Math.ceil(area / tileArea),
        grout: Math.ceil(area * 0.02),
      };
    },
  },
};

const MaterialEstimator: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [area, setArea] = useState<string>("");
  const [tileLength, setTileLength] = useState<string>("");
  const [tileWidth, setTileWidth] = useState<string>("");
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const handleEstimate = () => {
    if (task === "walls" && area) {
      const areaNumber = parseFloat(area);
      const calculation = materialData[task]?.formula(areaNumber);
      setResult(calculation);
    } else if (task === "flooring" && area && tileLength && tileWidth) {
      const areaNumber = parseFloat(area);
      const lengthNumber = parseFloat(tileLength);
      const widthNumber = parseFloat(tileWidth);
      const calculation = materialData[task]?.formula(areaNumber, lengthNumber, widthNumber);
      setResult(calculation);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Material Estimator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          Use this app to estimate the materials needed for walls and flooring. Data is based on
          construction standards: {" "}
          <a href="https://www.inchcalculator.com/brick-calculator/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Brick Data
          </a>, {" "}
          <a href="https://www.omnicalculator.com/construction/cement" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Cement Data
          </a>, and {" "}
          <a href="https://www.calculator.net/concrete-calculator.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Tile Data
          </a>.
        </p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="task">Select Task:</Label>
            <Select value={task || undefined} onValueChange={(value) => setTask(value as Task)}>
              <SelectTrigger id="task">
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="walls">Walls</SelectItem>
                <SelectItem value="flooring">Flooring</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="area">Enter Area (sq ft):</Label>
            <Input
              id="area"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g., 100"
            />
          </div>
          {task === "flooring" && (
            <>
              <div>
                <Label htmlFor="tileLength">Enter Tile Length (in):</Label>
                <Input
                  id="tileLength"
                  type="number"
                  value={tileLength}
                  onChange={(e) => setTileLength(e.target.value)}
                  placeholder="e.g., 12"
                />
              </div>
              <div>
                <Label htmlFor="tileWidth">Enter Tile Width (in):</Label>
                <Input
                  id="tileWidth"
                  type="number"
                  value={tileWidth}
                  onChange={(e) => setTileWidth(e.target.value)}
                  placeholder="e.g., 12"
                />
              </div>
            </>
          )}
          <Button onClick={handleEstimate} className="w-full">Estimate</Button>
        </div>
        {result && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Estimated Materials:</h2>
            <ul className="space-y-2">
              {Object.entries(result).map(([material, qty]) => (
                <li key={material} className="flex justify-between">
                  <span className="capitalize">{material}:</span>
                  <span className="font-medium">{qty}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialEstimator;

