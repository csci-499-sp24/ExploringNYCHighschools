import Link from 'next/link';
import React from 'react';

function SideBar(){
    const sidebarItems = [
        {
          name: "Home",
          href: "/homepage",
        },
        {
          name: "Search For Schools",
          href: "/schools",
        },
        {
          name: "Comparing Schools",
          href: "/compare",
        },
        {
          name: "Get Directions",
          href: "/NYCMap",
        },
      ];
    
    return(
        <div>
            <input type="checkbox" id="check" />
        <label htmlFor="check">
            <i className="fas fa-bars" id="btn"></i>
            <i className="fas fa-times" id="cancel"></i>
        </label>
        <div className="sidebar">
            {sidebarItems.map((item, index) => (
                <React.Fragment key={index}>
                    <ul>
                    <li>
                        <Link href= {item.href}>
                            {item.name}
                        </Link>
                    </li>
                    </ul>
                </React.Fragment>
            ))}
        </div>
        </div>
    )
}

export default SideBar;