"use client";

import React from "react";

export function PacienteSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-200" />
          <div className="space-y-2.5">
            <div className="h-6 w-48 bg-slate-200 rounded-md" />
            <div className="flex gap-2">
              <div className="h-4 w-24 bg-slate-200 rounded-md" />
              <div className="h-4 w-32 bg-slate-200 rounded-md" />
              <div className="h-4 w-28 bg-slate-200 rounded-md" />
            </div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="h-9 w-32 bg-slate-200 rounded-xl" />
          <div className="h-9 w-28 bg-slate-200 rounded-xl" />
        </div>
      </div>

      {/* 4 Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs h-36 flex flex-col justify-between"
          >
            <div className="flex justify-between">
              <div className="h-3 w-24 bg-slate-200 rounded" />
              <div className="w-6 h-6 bg-slate-200 rounded" />
            </div>
            <div className="h-6 w-32 bg-slate-200 rounded" />
            <div className="h-3 w-20 bg-slate-200 rounded" />
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="h-10 w-full max-w-xl bg-slate-200 rounded-xl" />

      {/* Main Body Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs h-72" />
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs h-72" />
      </div>
    </div>
  );
}
