import React, { Suspense } from 'react';
import LandingPage from "./landing-page/LandingPage";
import './globals.css'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPage />
    </Suspense>
  );
}
