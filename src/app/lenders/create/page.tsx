"use client"

import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";
import LenderCreate from "@/components/lenders/LenderCreate";

export default function NewLender() {
  return (
      <DashboardLayout>
        <LenderCreate></LenderCreate>
      </DashboardLayout>
  )
}