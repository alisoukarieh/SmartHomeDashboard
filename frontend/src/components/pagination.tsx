import React, { useState, useRef, useEffect } from "react";

interface PaginationProps {
  pages: React.ComponentType[];
  disableSwipe?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  disableSwipe = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setTranslateX(-currentIndex * containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [currentIndex]);

  interface HandleStartProps {
    clientX: number;
  }

  const handleStart = ({ clientX }: HandleStartProps) => {
    if (disableSwipe) return;
    setStartX(clientX);
    setIsDragging(true);
  };

  interface HandleMoveProps {
    clientX: number;
  }

  const handleMove = ({ clientX }: HandleMoveProps) => {
    if (disableSwipe || !isDragging) return;
    const deltaX = clientX - startX;
    setTranslateX(-currentIndex * containerWidth + deltaX);
  };

  interface HandleEndProps {
    clientX: number;
  }

  const handleEnd = ({ clientX }: HandleEndProps) => {
    if (disableSwipe || !isDragging) return;
    const deltaX = clientX - startX;
    if (deltaX < -50 && currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (deltaX > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setTranslateX(-currentIndex * containerWidth);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) {
      setTranslateX(-currentIndex * containerWidth);
    }
  }, [currentIndex, containerWidth, isDragging]);

  return (
    <div
      className="pagination-container h-full w-full"
      ref={containerRef}
      onTouchStart={(e) => handleStart({ clientX: e.touches[0].clientX })}
      onTouchMove={(e) => handleMove({ clientX: e.touches[0].clientX })}
      onTouchEnd={(e) => handleEnd({ clientX: e.changedTouches[0].clientX })}
      onMouseDown={(e) => handleStart({ clientX: e.clientX })}
      onMouseMove={(e) => handleMove({ clientX: e.clientX })}
      onMouseUp={(e) => handleEnd({ clientX: e.clientX })}
      onMouseLeave={(e) => handleEnd({ clientX: e.clientX })}
    >
      <div
        className="pages-wrapper"
        style={{
          transform: `translateX(${translateX}px)`,
          display: "flex",
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
      >
        {pages.map((PageComponent, index) => (
          <div key={index} className="page">
            <PageComponent />
          </div>
        ))}
      </div>
      <div className="pagination-dots">
        {pages.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
          ></span>
        ))}
      </div>
      <style jsx>{`
        .pagination-container {
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        .pages-wrapper {
          display: flex;
        }
        .page {
          flex-shrink: 0;
          width: 100%;
        }
        .pagination-dots {
          position: relative;
          bottom: 0px;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .dot {
          height: 8px;
          width: 8px;
          margin: 0 4px;
          background-color: #bbb;
          border-radius: 50%;
          display: inline-block;
        }
        .dot.active {
          background-color: #717171;
        }
      `}</style>
    </div>
  );
};

export default Pagination;
