import React, { useRef, useEffect } from "react";
// 公共数字输入框组件
const DigitalInputBox = ({
  length = 6,
  value = "",
  onChange,
  onComplete,
  placeholder = "请输入",
  isPassword = false,
  autoFocus = true,
  error = "",
  disabled = false,
  className = "",
}) => {
  const inputRef = useRef(null);

  // 处理输入变化
  const handleInputChange = (inputValue) => {
    const numericValue = inputValue.replace(/[^0-9]/g, "").slice(0, length);
    onChange?.(numericValue);

    // 输入完成时触发回调
    if (numericValue.length === length && onComplete) {
      setTimeout(() => {
        onComplete(numericValue);
      }, 100);
    }
  };

  // 自动聚焦
  useEffect(() => {
    if (autoFocus && inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [autoFocus, disabled]);

  // 渲染输入框
  const renderInputBoxes = () => {
    const boxes = [];
    for (let i = 0; i < length; i++) {
      const hasValue = i < value.length;
      const isActive = i === value.length && !disabled;

      boxes.push(
        <div
          key={i}
          style={{
            width: "48px",
            height: "48px",
            border: error
              ? "2px solid #ef4444"
              : hasValue
              ? "2px solid #3b82f6"
              : "2px solid #d1d5db",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
            transition: "all 0.2s",
            backgroundColor: disabled
              ? "#f3f4f6"
              : hasValue
              ? "#eff6ff"
              : "#ffffff",
            boxShadow: isActive
              ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(59, 130, 246, 0.2)"
              : "none",
          }}
        >
          {hasValue &&
            (isPassword ? (
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#1f2937",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <span style={{ color: "#1f2937" }}>{value[i]}</span>
            ))}
        </div>
      );
    }
    return boxes;
  };

  return (
    <div style={{ position: "relative", ...className }}>
      {/* 可视化输入框 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {renderInputBoxes()}
      </div>

      {/* 隐藏的实际输入框 - 用于触发移动端数字键盘 */}
      <input
        ref={inputRef}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        style={{
          opacity: 0,
          position: "absolute",
          zIndex: -10,
          pointerEvents: "none",
        }}
        autoComplete="off"
        maxLength={length}
      />
    </div>
  );
};

export default DigitalInputBox;
