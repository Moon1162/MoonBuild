import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
      </div>
    </BrowserRouter>
  );
}
