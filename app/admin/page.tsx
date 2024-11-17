// pages/admin/index.js
"use client";


export default function AdminPage() {

  const databaseOption = ["Processor", "Motherboard", "Ram", "Gpu", "Storage", "Psu", "Casing"];


  return (
    <div>
      <section className='p-10'>
        <h1 className='text-rakitin-orange text-4xl font-extrabold'>Database</h1>
        <div className='flex justify-center gap-4'>
          {databaseOption.map((option) => (
            <a className='bg-rakitin-orange text-white py-2 px-4 rounded-md w-30 h-30' href={`/admin/database/${option.toLowerCase()}`}>{option}</a>
          ))}
        </div>
      </section>
    </div>
  );
}

