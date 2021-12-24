/* eslint-disable no-eval */
import React, { useState } from "react";
import Header from "../Header";
import "./style.css";

function Caculator() {
  // Hiển thị phép tính
  const [calc, setCalc] = useState("");
  // Hiển thị kết quả
  const [result, setResult] = useState("");

  const ops = ["+", "-", "*", "/", "."];

  // Tạo ra các button từ 1 đến 9
  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>
          {i}
        </button>
      );
    }
    return digits;
  };

  // Cập nhật phép tính
  const updateCalc = (value) => {
    // Kiểm tra: Nhập số rồi mới cho nhập dấu. Không cho phép nhập 2 dấu liên tiếp. Nếu trước đó là dấu thì phía sau phải là số chứ không được phép là dấu
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc === "") {
      return;
    } else {
      const value = calc.slice(0, -1); // Xoá kí tự cuối
      setCalc(value);
    }
  };

  return (
    <>
      <Header />
      <div className="CaculatorApp">
        <div className="calculator">
          <div className="display">
            {result ? <span>({result})</span> : ""}
            &nbsp;
            {calc || "0"}
          </div>

          <div className="operators">
            <button onClick={() => updateCalc("/")}>/</button>
            <button onClick={() => updateCalc("*")}>*</button>
            <button onClick={() => updateCalc("+")}>+</button>
            <button onClick={() => updateCalc("-")}>-</button>

            <button onClick={deleteLast}>DEL</button>
          </div>

          <div className="digits">
            {createDigits()}
            <button onClick={() => updateCalc("0")}>0</button>
            <button onClick={() => updateCalc(".")}>.</button>

            <button onClick={calculate}>=</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Caculator;
