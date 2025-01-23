import React, { useState, useEffect } from "react";
import "./BMICalculator.css";
import UnderWeight from "../images/underweighted.png";
import NormalWeight from "../images/normalweight.png";
import OverWeight from "../images/overweight.png";
import Obesity from "../images/obesity.png";

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");

  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    }
  }, [height, weight, weightUnit, heightUnit]);

  const calculateBMI = () => {
    let weightInKg = weight;
    let heightInCm = height;

    if (weightUnit === "lbs") {
      weightInKg = weight * 0.453592;
    }

    if (heightUnit === "m") {
      heightInCm = height * 100;
    } else if (heightUnit === "ft") {
      heightInCm = height * 30.48;
    }

    const heightInMeters = heightInCm / 100;
    const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(
      2
    );
    setBMI(bmiValue);

    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setCategory("Overweight");
    } else if (bmiValue >= 30 && bmiValue <= 34.9) {
      setCategory("Obesity Class 1");
    } else if (bmiValue >= 35 && bmiValue <= 39.9) {
      setCategory("Obesity Class 2");
    } else {
      setCategory("Obesity Class 3");
    }
  };

  const getImage = (category) => {
    if (category === "Underweight") {
      return UnderWeight;
    } else if (category === "Normal weight") {
      return NormalWeight;
    } else if (category === "Overweight") {
      return OverWeight;
    } else {
      return Obesity;
    }
  };

  return (
    <div className="bmi-card">
      <h2>RisingSun BMI Calculator</h2>
      <div className="input-group">
        <label htmlFor="weight">Weight</label>
        <div className="valueAndUnit">
          <input
            type="number"
            placeholder="Enter your weight"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <div className="unit">
            <select
              name="weightUnit"
              id="weightUnit"
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="height">Height</label>
        <div className="valueAndUnit">
          <input
            type="number"
            placeholder="Enter your height"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            step={
              heightUnit === "ft" ? "0.1" : heightUnit === "cm" ? "0.01" : "1"
            }
          />
          <div className="unit">
            <select
              name="heightUnit"
              id="heightUnit"
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
            >
              <option value="cm">cm</option>
              <option value="m">m</option>
              <option value="ft">ft</option>
            </select>
          </div>
        </div>
      </div>

      {bmi && (
        <div className="result">
          <h3>Your BMI: {bmi}</h3>
          <img src={getImage(category)} alt={category} />
          <h4>{category}</h4>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
