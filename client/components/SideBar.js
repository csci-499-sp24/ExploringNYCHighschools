import Link from 'next/link';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaSchool } from 'react-icons/fa';
import { FaBalanceScale } from 'react-icons/fa';
import { FaMap } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { MdRecommend } from "react-icons/md";

function SideBar(){
    const sidebarItems = [
        { name: "Home", href: "/homepage", Icon: <FaHome />},
        { name: "Search For Schools", href: "/schools", Icon: <FaSchool /> },
        { name: "Comparing Schools", href: "/compare", Icon: <FaBalanceScale /> },
        { name: "Get Directions", href: "/NYCMap", Icon: <FaMap />},
        { name: "School Rankings", href: "/ranking", Icon: <FaChartLine />},
        { name: "Recommend School", href: "/recommendschool", Icon: <MdRecommend />},
        { name: "Contact Us", href: "/contact", Icon: <TiContacts />},
      ];
    
    return(
        <div>
            <input type="checkbox" id="check" />
        <label htmlFor="check">
            <i className="fas fa-bars" id="btn"></i>
            <i className="fas fa-times" id="cancel"></i>
        </label>
        <div className="sidebar">
            {sidebarItems.map(item =>{
                return(
                    <ul key={item.name}>
                    <li>
                        <Link href= {item.href}>
                            <i>
                                {item.Icon}
                            </i>
                            {item.name}
                        </Link>
                    </li>
                    </ul>
                )
            })}
        </div>
        </div>
    )
}

export default SideBar;
