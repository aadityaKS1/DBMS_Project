import React from 'react';

const SidebarSection = ({ title, items = [], color = "blue" }) => {
  // Theme color definitions
  const themeColors = {
    red: { dot: "bg-red-500", text: "text-red-700" },
    blue: { dot: "bg-blue-600", text: "text-[#0A365F]" }
  };

  const theme = themeColors[color] || themeColors.blue;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
      
      {/* Section Header */}
      <div className="mb-6">
        <h3 className="text-xl font-extrabold uppercase tracking-tight" style={{ color: theme.text.replace("text-", "#") }}>
          {title}
        </h3>
        <div className={`h-1.5 w-1/2 rounded-full mt-1 ${theme.dot}`}></div>
      </div>

      {/* Items List */}
      <ul className="space-y-6">
        {items.map((item, idx) => (
          <li key={idx} className="group cursor-pointer">
            <div className="flex items-start gap-4">
              {/* Dot */}
              <span className={`w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 ${theme.dot} group-hover:scale-150 transition-transform duration-300`}></span>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className={`font-bold text-[15px] leading-tight ${theme.text} group-hover:underline decoration-2 underline-offset-4`}>
                  {item.text}
                </span>
                {item.date && (
                  <span className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">
                    {item.date}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarSection;
