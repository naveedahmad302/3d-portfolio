"use client";

export default function SectionDivider() {
  return (
    <div className="relative h-px w-full max-w-4xl mx-auto my-0">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
