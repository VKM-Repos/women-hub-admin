
import { useState, useRef, useEffect } from 'react';

export default function AuditLog() {
  const [checkedIds, setCheckedIds] = useState(new Set<number>());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const totalCheckboxes = 10;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = checkedIds.size > 0 && checkedIds.size < totalCheckboxes;
    }
  }, [checkedIds]);

  const handleSelectAll = () => {
    if (checkedIds.size === totalCheckboxes) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(Array.from({ length: totalCheckboxes }, (_, i) => i + 1)));
    }
  };

  const handleCheckboxChange = (id: number) => {
    setCheckedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  return (
    <div className="audit-log">
      <div className="audit-container">AuditLog</div>

      <div className="p-6 bg-gray-100 min-h-screen md:px-[40px] px-[20px]">
        <div className="flex justify-between items-center mb-6">

        <div className="flex items-center md:gap-3 gap-2">
          <div className="flex items-center bg-white rounded-lg pl-[10px] gap-1">
            <img src="/src/assets/search-icon.png" alt="" className="w-[15px]" />
            <input
              type="text"
              placeholder="Search keyword"
              className="py-2 bg-white rounded-r-lg md:text-sm text-[13.5px] focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex justify-between md:gap-205 gap-2">
            <button id="filterBtn" className="flex items-center md:px-4 px-2 md:py-2 py-1 bg-white rounded-lg md:text-sm text-[13.5px] hover:bg-gray-300 gap-1" onClick={handleOpenModal}>
              <img src="/src/assets/filter-icon.png" alt="" className="w-[16px] h-[16px]" />Filter
            </button>
          </div>




</div>
          <div>
            <button className="flex items-center md:px-4 px-2 md:py-2 py-1 bg-white rounded-lg md:text-sm text-[13.5px] hover:bg-gray-300 gap-1">
              <img src="/src/assets/file-export-icon.png" alt="" className="w-[16px] h-[16px]" />Export
            </button> 

        </div>
        </div>

      <div className="bg-gray-100 shadow-sm overflow-hidden">
        {/* First Row */}
        <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-bold text-[#106840] leading-[100%]">
            
              <div> <input type="checkbox" id="selectAll" checked={checkedIds.size === totalCheckboxes} onChange={handleSelectAll} ref={selectAllRef} /></div>  
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

        <div className="md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-gray-300 hover:bg-gray-200">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="1" checked={checkedIds.has(1)} onChange={() => handleCheckboxChange(1)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt="" /></div>

      

      </div>
    </div>

      {/* Second Row */}
          <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:hidden md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-medium text-[#106840] leading-[100%]">
            
              <div> <input type="checkbox" id="selectAll" /></div>  
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

          <div className=" md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-white hover:bg-gray-100">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="2" checked={checkedIds.has(2)} onChange={() => handleCheckboxChange(2)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt="" /></div>

          </div>
          
        </div>

        {/* Third Row */}
          <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:hidden md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-medium text-[#106840] leading-[100%]">
            
              <div> <input type="checkbox" id="selectAll" /></div>  
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

          <div className=" md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-gray-300 hover:bg-gray-100">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="3" checked={checkedIds.has(3)} onChange={() => handleCheckboxChange(3)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt="" /></div>

          </div>
          
        </div>

        {/* Fourth Row */}
          <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:hidden md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-medium text-[#106840] leading-[100%]">
            
              <div> <input type="checkbox" id="selectAll" /></div>  
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

          <div className=" md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-white hover:bg-gray-100">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="4" checked={checkedIds.has(4)} onChange={() => handleCheckboxChange(4)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt="" /></div>

          </div>
          
        </div>

        {/* Fifth Row */}
          <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:hidden md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-medium text-[#106840] leading-[100%]">
            
              <div> <input type="checkbox" id="selectAll" /></div>  
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

          <div className=" md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-gray-300 hover:bg-gray-100">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="5" checked={checkedIds.has(5)} onChange={() => handleCheckboxChange(5)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt="" /></div>

          </div>
          
        </div>

         {/* Sixth Row */}
          <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:hidden md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-medium text-[#106840] leading-[100%]">
            
              <div> <input type="checkbox" id="selectAll" /></div>  
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

          <div className=" md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-white hover:bg-gray-100">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="6" checked={checkedIds.has(6)} onChange={() => handleCheckboxChange(6)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt="" /></div>

          </div>
          
        </div>

        {/* Seventh Row */}
          <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:hidden md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-medium text-[#106840] leading-[100%]">
            
              <div> <input type="checkbox" id="selectAll" /></div>
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

          <div className=" md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-gray-300 hover:bg-gray-100">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="7" checked={checkedIds.has(7)} onChange={() => handleCheckboxChange(7)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt=""  /></div>

          </div>
          
        </div>

        {/* Eighth Row */}
          <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:hidden md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-medium text-[#106840] leading-[100%]">
            
              <div> <input type="checkbox" id="selectAll" /></div>  
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

          <div className=" md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-white hover:bg-gray-100">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="8" checked={checkedIds.has(8)} onChange={() => handleCheckboxChange(8)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt="" /></div>

          </div>
          
        </div>

        {/* Ninth Row */}
          <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:hidden md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-medium text-[#106840] leading-[100%]">
            
              <div> <input type="checkbox" id="selectAll" /></div>
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

          <div className=" md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-gray-300 hover:bg-gray-100">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="9" checked={checkedIds.has(9)} onChange={() => handleCheckboxChange(9)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt="" /></div>

          </div>
          
        </div>

        {/* Tenth Row */}
          <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="md:hidden md:h-[61px] md:gap-0 gap-[12px] grid grid-rows-8 md:justify-items-center md:grid-cols-8 px-5 py-5 bg-white text-sm font-medium text-[#106840] leading-[100%] mb-[12px]">
            
              <div> <input type="checkbox" id="selectAll" /></div>
                <div>Timestamp</div>
                <div>Action Type</div>
                <div>Email</div>
                <div>Performed By</div>
                <div>Object</div>
                <div>Object ID</div>
                </div>

          <div className=" md:h-[61px] gap-[12px] md:gap-0 grid grid-rows-8 md:grid-cols-8 md:justify-items-center px-5 py-5 text-[13px] font-normal text-[#106840] leading-[100%] bg-white hover:bg-gray-100 mb-[12px]">
              <div className="flex justify-between md:flex-none">
              <div> <input type="checkbox" data-id="10" checked={checkedIds.has(10)} onChange={() => handleCheckboxChange(10)} /> 
                </div>
                <img className="md:hidden h-[12px]" src="/src/assets/option-but2.png" alt="" />
                </div>  
              <div>21/03/24, 7:00 AM</div>
              <div className="font-medium">User Created</div>
              <div>example@gmail.com</div>
              <div>admin</div>
              <div>User</div>
              <div>User567</div>
              <div className="hidden md:block mt-[5px]"><img src="/src/assets/option-but2.png" alt="" /></div>

          </div>
          
      </div>



    
        <div className="flex items-center justify-between font-[Nunito Sans, sans-serif] font-semibold text-sm text-[#202224] leading-[100%] mb-[12px]">
      <p>Showing 1-10 of 50</p>
        <div className="flex">
          <button className="flex items-center justify-center w-[43px] h-[30px] bg-[#FAFBFD] rounded-l-lg border border-[#D5D5D5]"><img src="/src/assets/btn-left-arrow.png" alt="" className="w-[7px] h-[11px]" /></button>
          <a href="#">
            <button className="flex items-center justify-center w-[43px] h-[30px] bg-[#FAFBFD] rounded-r-lg border border-[#D5D5D5] hover:bg-gray-500"><img src="/src/assets/btn-right-arrow.png" alt="" className="w-[7px] h-[11px]" /></button>
          </a>
        </div>
    </div>
    </div>

      {/* FILTER MODAL */}
<div id="overlay" className={isModalOpen ? "fixed inset-0 bg-black/30 z-50 flex items-center justify-center" : "hidden fixed inset-0 bg-black/30 z-50 flex items-center justify-center"} onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal() }}>

  <div className="w-[408px] bg-white rounded-2xl shadow-xl">

    {/* Header */}
    <div className="flex justify-between items-center mb-4 h-[60px] bg-gray-100 rounded-t-2xl px-4">
      <h2 className="text-lg font-[inter] font-semibold text-base leading-[24px] color-[#1B1B1B]">Filter</h2>
      <button id="closeFilter" className="text-xl" onClick={handleCloseModal}>&times;</button>
    </div>

    {/* Date */}
    <div className="mb-3 px-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-sm text-gray-600">Select Date</span>
        <span className="text-blue-500 cursor-pointer">Clear</span>
      </div>
      <div className="flex gap-16">
        <input type="date" className="border border-gray-300 rounded-lg px-[8px] py-[5px] mb-[20px]" />
        <input type="date" className="border border-gray-300 rounded-lg px-[8px] py-[5px] mb-[20px]" />
        
      </div>
    </div>

    {/* Action Type */}
    <div className="mb-3 px-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">Action Type</span>
        <span className="text-sm text-[#0080FF]">Clear</span>
      </div>
      <select className="border border-gray-300 rounded-lg px-[8px] py-[5px] text-sm] h-[50px] gap-[8px] mb-[20px] font-[inter] font-normal text-base leading-[100%] color-[#000000] shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 w-[380px] relative z-10 pointer-events-auto hover:bg-blue-200">
        <option>Authentication</option>
        <option>Engagement</option>
        <option>Activism</option>
        <option>Law & Politics</option>
        <option>Women in tech</option>
        <option>Education</option>
        </select>
    </div>

    {/* Action Type */}
    <div className="mb-4 px-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-sm text-gray-600">Action Type</span>
        <span className="text-sm text-[#0080FF]">Clear</span>
      </div>
      <input type="text" placeholder="Search keyword" className="border border-gray-300 py-2 bg-white rounded-lg md:text-sm text-[13.5px] focus:outline-none focus:ring-2 focus:ring-gray-300 mb-[20px] w-[380px] pl-[8px]" />
    </div>

    {/* Buttons */}
    <div className="flex items-center justify-between border-t border-gray-300 w-full px-[24px] py-[24px]">
      <button className="border border-gray-300 rounded-xl bg-[#FCFCFC] w-[82px] h-[48px] px-[14px] py-[12px] font-bold text-base leading-[24px] color-[#FCFCFC]">Reset</button>
      <button className="rounded-xl bg-[#FF7400] w-[82px] h-[48px] px-[14px] py-[12px] font-bold text-base leading-[24px] text-white">Apply</button>
    </div>

  </div>
</div>
</div>
</div>
  );
}
