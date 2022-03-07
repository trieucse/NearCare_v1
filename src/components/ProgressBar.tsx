import { connect } from "react-redux";
import React, { Component } from "react";

export interface ProgressBarProps {
  className?: string;
  current: number;
  max: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  current,
  max,
}) => {
  let progress = Math.round((current / max) * 100);
  progress = progress >= 100 ? 100 : progress;
  const styles = {
    width: `${progress}%`,
  };
  return (
    <>
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className={`bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full ${className}`}
          style={styles}
        >
          {progress < 20 ? "　" : progress + "%"}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
