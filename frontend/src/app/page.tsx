"use client";

import { useEffect, useState } from "react";
import "gridstack/dist/gridstack.min.css";
import { GlossyTopBarComponent } from "@/components/glossy-top-bar";
import { Page1 } from "@/components/page1";
import { Page2 } from "@/components/page2";
import PaginationComponent from "@/components/pagination";
import EditButton from "@/components/edit-button";
import AddButton from "@/components/add-button";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    handleResize();

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [isLargeScreen]);

  // const handleToggle = (newValue: boolean) => {
  //   setIsEditing(newValue);
  // };

  return (
    <div>
      <GlossyTopBarComponent />
      <div className="">
        {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
        <PaginationComponent
          pages={[
            () => <Page1 isEditing={isEditing} isLargeScreen={isLargeScreen} />,
            () => <Page2 isEditing={isEditing} isLargeScreen={isLargeScreen} />,
          ]}
          disableSwipe={isEditing}
        />
        {/* {isLargeScreen && (
          <>
            <div className="absolute left-12">
              <EditButton value={isEditing} onToggle={handleToggle} />
            </div>
            <div className="absolute right-12">
              <button onClick={toggleSidebar}>
                <AddButton />
              </button>
            </div>
          </>
        )} */}
      </div>
    </div>
  );
}
