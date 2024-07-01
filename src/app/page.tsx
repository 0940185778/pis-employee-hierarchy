import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl font-bold text-center">
            Welcome to the PIS Employment Hierarchy
          </h1>
          <p className="text-lg text-center">
            A simple web application that allows you to view the employment hierarchy of the Perago Information System Agency.
          </p>  
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">SignUp</button>
          </div>
      </div>
    </main>
  );
}