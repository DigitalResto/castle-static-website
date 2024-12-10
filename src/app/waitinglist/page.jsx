import React from 'react';

export default function WaitList() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 p-6 overflow-auto">
        <h1 className="text-4xl md:text-5xl">Waiting List</h1>
        {[
          { time: '08:00 AM', name: 'Muhammed Anas', number: '03', mobile: '123-456-7890' },
          { time: '08:00 AM', name: 'Muhammed Anas', number: '03', mobile: '123-456-7890' },
          { time: '08:00 AM', name: 'Muhammed Anas', number: '03', mobile: '123-456-7890' },
          { time: '08:00 AM', name: 'Muhammed Anas', number: '03', mobile: '123-456-7890' },
          { time: '08:00 AM', name: 'Muhammed Anas', number: '03', mobile: '123-456-7890' },
          { time: '08:00 AM', name: 'Muhammed Anas', number: '03', mobile: '123-456-7890' },
          { time: '08:00 AM', name: 'Muhammed Anas', number: '03', mobile: '123-456-7890' },
          { time: '08:00 AM', name: 'Muhammed Anas', number: '03', mobile: '123-456-7890' }
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row w-full max-w-lg justify-between rounded-lg bg-white p-4 md:p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 md:gap-10">
                <div className="font-medium text-gray-800">{item.time}</div>
                <div className="text-gray-600 font-medium">{item.name}</div>
                <div className="text-gray-500 text-sm">{item.number}</div>
              </div>
              <div className="text-gray-500 text-sm">{item.mobile}</div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="rounded border px-2">✅</button>
              <button className="rounded border px-2">❌</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}