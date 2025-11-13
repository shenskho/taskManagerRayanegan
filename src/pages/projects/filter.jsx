// import React from "react";
// export default function FilterProjects() {
    
//   return( <div>
//     <button className="btn btn-primary" onClick={handleCreateProject}>
//           <i className="fas fa-plus"></i> پروژه جدید
//         </button>
//             <span className="mx-3">فیلترها:</span>
//             <span className="btn-group" role="group">
//               {[
//                 { value: "all", label: "همه پروژهها" },
//                 { value: "active", label: "فعال" },
//                 { value: "completed", label: "تکمیل شده" },
//               ].map((filterOption) => (
//                 <button
//                   key={filterOption.value}
//                   className={`btn btn-outline-primary ${
//                     filter === filterOption.value ? "active" : ""
//                   }`}
//                   onClick={() => setFilter(filterOption.value)}
//                 >
//                   {filterOption.label}
//                 </button>
//               ))}
//             </span>
//   </div>);
// }