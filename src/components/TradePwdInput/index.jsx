import React, { useState } from "react";
import DigitalInputBox from "../DigitalInputBox";

// 交易密码设置组件
const TradingPasswordSetup = () => {
  const [step, setStep] = useState(1);
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [error, setError] = useState("");

  // 检查是否为连续数字
  const isConsecutiveNumbers = (password) => {
    if (password.length !== 6) return false;

    let isAscending = true;
    for (let i = 0; i < 5; i++) {
      if (parseInt(password[i + 1]) !== parseInt(password[i]) + 1) {
        isAscending = false;
        break;
      }
    }

    let isDescending = true;
    for (let i = 0; i < 5; i++) {
      if (parseInt(password[i + 1]) !== parseInt(password[i]) - 1) {
        isDescending = false;
        break;
      }
    }

    let isSame = true;
    for (let i = 1; i < 6; i++) {
      if (password[i] !== password[0]) {
        isSame = false;
        break;
      }
    }

    return isAscending || isDescending || isSame;
  };

  const handlePasswordComplete = (password) => {
    if (step === 1) {
      if (isConsecutiveNumbers(password)) {
        setError("密码不能为连续数字或相同数字");
        setCurrentInput("");
        return;
      }
      setFirstPassword(password);
      setCurrentInput("");
      setStep(2);
    } else if (step === 2) {
      if (password !== firstPassword) {
        setError("两次输入的密码不一致，请重新输入");
        setCurrentInput("");
        return;
      }
      setSecondPassword(password);
      setStep(3);
    }
  };

  const resetToFirstStep = () => {
    setStep(1);
    setFirstPassword("");
    setSecondPassword("");
    setCurrentInput("");
    setError("");
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setCurrentInput(firstPassword);
      setError("");
    }
  };

  const handleInputChange = (value) => {
    setCurrentInput(value);
    setError("");
  };

  if (step === 3) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            交易密码设置成功
          </h2>
          <p className="text-gray-600 mb-6">
            您的交易密码已成功设置
            {secondPassword && <span className="hidden">密码: {secondPassword}</span>}
          </p>
          <button
            onClick={resetToFirstStep}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            重新设置
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 步骤指示器 */}
      <div className="flex items-center justify-center mb-8">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          1
        </div>
        <div
          className={`w-12 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
        />
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          2
        </div>
      </div>

      <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
        {step === 1 ? "设置交易密码" : "确认交易密码"}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        {step === 1 ? "请输入6位数字作为交易密码" : "请再次输入密码进行确认"}
      </p>

      {/* 使用公共数字输入组件 */}
      <DigitalInputBox
        length={6}
        value={currentInput}
        onChange={handleInputChange}
        onComplete={handlePasswordComplete}
        isPassword={true}
        error={error}
        className={{ marginBottom: "24px" }}
      />

      {error && (
        <div className="text-red-600 text-sm text-center mb-4 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="text-center text-sm text-gray-500 mb-6">
        <p>• 密码为6位纯数字</p>
        <p>• 不能为连续或相同数字</p>
        <p>• 点击输入框区域开始输入</p>
      </div>

      <div className="space-y-3">
        {step === 2 && (
          <button
            onClick={goBack}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            返回上一步
          </button>
        )}

        <button
          onClick={() =>
            document.querySelector('input[type="number"]')?.focus()
          }
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {currentInput.length === 0
            ? "点击输入密码"
            : `已输入 ${currentInput.length}/6 位`}
        </button>
      </div>
    </div>
  );
};

export default TradingPasswordSetup;
