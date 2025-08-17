import React, { useRef, useEffect } from "react";
import "./index.css";
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

  // 处理点击事件 - 确保输入框获得焦点
  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
      // 对于移动设备，可能需要触发点击事件
      inputRef.current.click();
    }
  };

  // 自动聚焦
  useEffect(() => {
    if (autoFocus && inputRef.current && !disabled) {
      // 延迟聚焦以确保DOM完全渲染
      setTimeout(() => {
        alert("focus!!!!");
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus, disabled]);

  // 渲染输入框
  const renderInputBoxes = () => {
    const boxes = [];
    for (let i = 0; i < length; i++) {
      const hasValue = i < value.length;
      const isActive = i === value.length && !disabled;

      // 构建CSS类名
      const boxClasses = [
        "digital-input-box",
        error && "digital-input-box--error",
        hasValue && "digital-input-box--has-value",
        disabled && "digital-input-box--disabled",
        isActive && "digital-input-box--active",
      ]
        .filter(Boolean)
        .join(" ");

      boxes.push(
        <div key={i} className={boxClasses}>
          {hasValue &&
            (isPassword ? (
              <div className="digital-input-password-dot" />
            ) : (
              <span className="digital-input-number">{value[i]}</span>
            ))}
        </div>
      );
    }
    return boxes;
  };

  return (
    <div className={`digital-input-container ${className}`}>
      {/* 可视化输入框 */}
      <div
        className={`digital-input-boxes ${
          disabled
            ? "digital-input-boxes--disabled"
            : "digital-input-boxes--enabled"
        }`}
        onClick={handleClick}
      >
        {renderInputBoxes()}
      </div>

      {/* 隐藏的实际输入框 - 用于触发移动端数字键盘 */}
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="digital-input-hidden"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        maxLength={length}
      />
    </div>
  );
};

export default DigitalInputBox;
