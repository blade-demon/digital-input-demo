import React, { useState } from "react";
import DigitalInputBox from "../DigitalInputBox";

// 短信验证码组件示例
const SMSVerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 模拟发送验证码
  const sendSMSCode = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 验证码输入完成处理
  const handleVerificationComplete = async (code) => {
    setIsLoading(true);
    setError("");

    // 模拟验证过程
    setTimeout(() => {
      if (code === "123456") {
        // 模拟正确的验证码
        alert("验证成功！");
      } else {
        setError("验证码错误，请重新输入");
        setVerificationCode("");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (value) => {
    setVerificationCode(value);
    setError("");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
        短信验证111
      </h2>
      <p className="text-center text-gray-600 mb-8">
        验证码已发送至 138****8888
        <br />
        请输入6位验证码
      </p>

      {/* 使用公共数字输入组件 */}
      <DigitalInputBox
        length={6}
        value={verificationCode}
        onChange={handleInputChange}
        onComplete={handleVerificationComplete}
        isPassword={false}
        error={error}
        disabled={isLoading}
        className={{ marginBottom: "24px" }}
      />

      {error && (
        <div className="text-red-600 text-sm text-center mb-4 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="text-center mb-6">
        <button
          onClick={sendSMSCode}
          disabled={countdown > 0 || isLoading}
          className={`text-sm ${
            countdown > 0
              ? "text-gray-400"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          {countdown > 0 ? `${countdown}s后重新发送` : "重新发送验证码"}
        </button>
      </div>

      <div className="text-center text-xs text-gray-500">
        <p>提示：演示验证码为 123456</p>
        {isLoading && <p>验证中...</p>}
      </div>
    </div>
  );
};

export default SMSVerificationCode;
