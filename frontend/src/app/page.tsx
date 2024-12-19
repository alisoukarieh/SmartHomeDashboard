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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    handleResize();

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [isLargeScreen]);

  return (
    <div>
      <GlossyTopBarComponent />
      <div className="">
        <PaginationComponent
          pages={[
            () => <Page1 isEditing={isEditing} isLargeScreen={isLargeScreen} />,
            () => <Page2 isEditing={isEditing} isLargeScreen={isLargeScreen} />,
          ]}
          disableSwipe={isEditing}
        />
      </div>
    </div>
  );
}
