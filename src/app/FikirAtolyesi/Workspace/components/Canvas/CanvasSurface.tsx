'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Shape {
  id: string;
  type: 'rectangle' | 'circle' | 'arrow' | 'text' | 'line';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  text?: string;
  color: string;
}

interface CanvasProps {
  gridType: string;
  activeTool: string;
}

export const CanvasSurface: React.FC<CanvasProps> = ({ gridType, activeTool }) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectionBox, setSelectionBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteSelectedShapes();
      }
      if (e.key === 'Escape') {
        setSelectedShapes([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedShapes]);

  const getGridStyle = () => {
    switch (gridType) {
      case 'white':
        return {
          background: '#ffffff',
        };
      case 'dots':
        return {
          background: `
            radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0px),
            radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        };
      case 'lines':
        return {
          background: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        };
      case 'grid':
        return {
          background: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px),
            linear-gradient(to right, #d1d5db 1px, transparent 1px),
            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
        };
      default:
        return {
          background: `
            radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0px),
            radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStartPos({ x, y });

    // Check if clicking on a shape
    const clickedShape = shapes.find(shape => {
      return x >= shape.x && x <= shape.x + shape.width &&
             y >= shape.y && y <= shape.y + shape.height;
    });

    if (clickedShape && activeTool === 'select') {
      // Check if Ctrl/Cmd is pressed for multi-select
      if (e.ctrlKey || e.metaKey) {
        setSelectedShapes(prev => 
          prev.includes(clickedShape.id) 
            ? prev.filter(id => id !== clickedShape.id)
            : [...prev, clickedShape.id]
        );
      } else {
        setSelectedShapes([clickedShape.id]);
      }
      
      // Only start dragging if the clicked shape is selected
      if (selectedShapes.includes(clickedShape.id) || !e.ctrlKey && !e.metaKey) {
        setIsDragging(true);
        setDragOffset({
          x: x - clickedShape.x,
          y: y - clickedShape.y
        });
      }
      return;
    }

    if (activeTool === 'select') {
      // Start selection box
      setIsSelecting(true);
      setSelectionBox({ x, y, width: 0, height: 0 });
      
      // Clear selection if not Ctrl/Cmd pressed
      if (!e.ctrlKey && !e.metaKey) {
        setSelectedShapes([]);
      }
      return;
    }

    if (activeTool !== 'select') {
      setIsDrawing(true);
    }

    if (activeTool === 'text') {
      const text = prompt('Metin girin:');
      if (text) {
        const newShape: Shape = {
          id: Date.now().toString(),
          type: 'text',
          x,
          y,
          width: text.length * 8,
          height: 20,
          text,
          color: '#000000',
        };
        setShapes(prev => [...prev, newShape]);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Handle dragging selected shapes
    if (isDragging && selectedShapes.length > 0) {
      setShapes(prev => prev.map(shape => 
        selectedShapes.includes(shape.id)
          ? { ...shape, x: x - dragOffset.x, y: y - dragOffset.y }
          : shape
      ));
      return;
    }

    // Handle selection box
    if (isSelecting && activeTool === 'select') {
      const width = Math.abs(x - startPos.x);
      const height = Math.abs(y - startPos.y);
      
      setSelectionBox({
        x: Math.min(startPos.x, x),
        y: Math.min(startPos.y, y),
        width,
        height
      });

      // Check which shapes are in selection box
      const shapesInBox = shapes.filter(shape => {
        return shape.x >= Math.min(startPos.x, x) &&
               shape.x + shape.width <= Math.max(startPos.x, x) &&
               shape.y >= Math.min(startPos.y, y) &&
               shape.y + shape.height <= Math.max(startPos.y, y);
      });

      setSelectedShapes(shapesInBox.map(shape => shape.id));
      return;
    }

    // Handle drawing
    if (!isDrawing || activeTool === 'select' || activeTool === 'text') return;

    const width = Math.abs(x - startPos.x);
    const height = Math.abs(y - startPos.y);

    // Update the last shape or create a new one
    setShapes(prev => {
      const newShapes = [...prev];
      const lastShape = newShapes[newShapes.length - 1];
      
      if (lastShape && lastShape.id === 'temp') {
        lastShape.width = width;
        lastShape.height = height;
        lastShape.x = Math.min(startPos.x, x);
        lastShape.y = Math.min(startPos.y, y);
      } else {
        const newShape: Shape = {
          id: 'temp',
          type: activeTool as Shape['type'],
          x: Math.min(startPos.x, x),
          y: Math.min(startPos.y, y),
          width,
          height,
          color: '#3b82f6',
        };
        newShapes.push(newShape);
      }
      
      return newShapes;
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      return;
    }
    
    if (isSelecting) {
      setIsSelecting(false);
      setSelectionBox({ x: 0, y: 0, width: 0, height: 0 });
      return;
    }
    
    if (!isDrawing) return;
    
    setIsDrawing(false);
    
    // Finalize the temporary shape
    setShapes(prev => {
      const newShapes = [...prev];
      const lastShape = newShapes[newShapes.length - 1];
      
      if (lastShape && lastShape.id === 'temp') {
        lastShape.id = Date.now().toString();
      }
      
      return newShapes;
    });
  };

  const handleShapeClick = (shapeId: string) => {
    if (activeTool === 'select') {
      setSelectedShapes(prev => 
        prev.includes(shapeId) 
          ? prev.filter(id => id !== shapeId)
          : [...prev, shapeId]
      );
    }
  };

  const handleShapeDoubleClick = (shape: Shape) => {
    if (shape.type === 'text') {
      const newText = prompt('Metni düzenle:', shape.text);
      if (newText !== null) {
        setShapes(prev => prev.map(s => 
          s.id === shape.id ? { ...s, text: newText, width: newText.length * 8 } : s
        ));
      }
    }
  };

  const deleteShape = (shapeId: string) => {
    setShapes(prev => prev.filter(s => s.id !== shapeId));
    setSelectedShapes(prev => prev.filter(id => id !== shapeId));
  };

  const deleteSelectedShapes = () => {
    if (selectedShapes.length === 0) return;
    
    setShapes(prev => prev.filter(s => !selectedShapes.includes(s.id)));
    setSelectedShapes([]);
  };

  const renderShape = (shape: Shape) => {
    const isSelected = selectedShapes.includes(shape.id);
    
    const baseStyle = {
      position: 'absolute' as const,
      left: shape.x,
      top: shape.y,
      width: shape.width,
      height: shape.height,
      border: isSelected ? '2px solid #3b82f6' : 'none',
      cursor: activeTool === 'select' ? 'pointer' : 'default',
      zIndex: isSelected ? 10 : 1,
    };

    switch (shape.type) {
      case 'rectangle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              backgroundColor: 'transparent',
              border: `2px solid ${shape.color}`,
            }}
            onClick={() => handleShapeClick(shape.id)}
            onDoubleClick={() => handleShapeDoubleClick(shape)}
          />
        );
      
      case 'circle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: `2px solid ${shape.color}`,
            }}
            onClick={() => handleShapeClick(shape.id)}
            onDoubleClick={() => handleShapeDoubleClick(shape)}
          />
        );
      
      case 'arrow':
        return (
          <div
            key={shape.id}
            className="arrow-shape"
            style={{
              ...baseStyle,
              background: `linear-gradient(45deg, ${shape.color} 0%, ${shape.color} 70%, transparent 70%, transparent 100%)`,
              clipPath: 'polygon(0% 40%, 80% 40%, 80% 20%, 100% 50%, 80% 80%, 80% 60%, 0% 60%)',
              animation: 'arrowPulse 2s ease-in-out infinite',
            }}
            onClick={() => handleShapeClick(shape.id)}
            onDoubleClick={() => handleShapeDoubleClick(shape)}
          />
        );
      
      case 'text':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              color: shape.color,
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => handleShapeClick(shape.id)}
            onDoubleClick={() => handleShapeDoubleClick(shape)}
          >
            {shape.text}
          </div>
        );
      
      case 'line':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              backgroundColor: shape.color,
              height: '2px',
              transform: `rotate(${Math.atan2(shape.height, shape.width) * 180 / Math.PI}deg)`,
              transformOrigin: '0 0',
            }}
            onClick={() => handleShapeClick(shape.id)}
            onDoubleClick={() => handleShapeDoubleClick(shape)}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative h-[calc(100vh-64px)] pt-16">
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes arrowPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        
        .arrow-shape {
          animation: arrowPulse 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Dynamic grid background */}
      <div
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          ...getGridStyle(),
          cursor: activeTool === 'select' ? 'default' : 'crosshair'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Render all shapes */}
        {shapes.map(renderShape)}
        
        {/* Selection box */}
        {isSelecting && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-20 pointer-events-none"
            style={{
              left: selectionBox.x,
              top: selectionBox.y,
              width: selectionBox.width,
              height: selectionBox.height,
            }}
          />
        )}
        
        {/* Selection controls */}
        {selectedShapes.length > 0 && (
          <div className="fixed top-20 right-4 z-40">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {selectedShapes.length} şekil seçili
                </span>
                <button
                  onClick={deleteSelectedShapes}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                  title="Seçili şekilleri sil (Delete tuşu)"
                >
                  Sil
                </button>
                <div className="text-xs text-gray-400">
                  Delete
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};