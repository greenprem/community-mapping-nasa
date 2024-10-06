'use client';

import { useState, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function ScrollableMapSite() {
  const [selectedMap, setSelectedMap] = useState('option1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const svgMapSources = {
    option1: '/svgs/imr.svg',
    option2: '/svgs/income.svg',
    option3: '/svgs/lifeexp.svg',
    option4: '/svgs/literacy.svg',
  };

  const handleMapClick = () => {
    setIsModalOpen(true);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    setOffset({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    setOffset((prevOffset) => ({
      x: prevOffset.x + (touch.clientX - prevOffset.x),
      y: prevOffset.y + (touch.clientY - prevOffset.y),
    }));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-gray-100">
      <ScrollArea className="flex-1 p-6 md:w-1/2">
        <div className="space-y-8 pb-16">
          <section>
            <h2 className="text-3xl font-bold mb-4">Instructions</h2>
            <p className="mb-4">
              Welcome to our interactive map and data visualization tool. Follow these steps to get started:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Use the dropdown to select the map you want to view.</li>
              <li>Scroll down to view various data visualizations related to the selected area.</li>
              <li>Click on graph images for more detailed information.</li>
              <li>Use the search function in the map to find specific locations quickly.</li>
            </ol>
          </section>
          <Separator className="bg-gray-700" />
          
          <Separator className="bg-gray-700" />
          <section>
            <h2 className="text-2xl font-bold mb-4">Data Visualizations</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Infant Mortality Rate vs Average Life Expectancy</h3>
                <img
                  src="/images/1.png"
                  alt="Population Density Graph"
                  className="rounded-lg"
                  style={{ width: '400px', height: '400px' }}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Literacy Rate vs Life Expectancy</h3>
                <img
                  src="/images/2.png"
                  alt="Economic Growth Graph"
                  className="rounded-lg"
                  style={{ width: '400px', height: '400px' }}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Income vs Average Life Expectancy</h3>
                <img
                  src="/images/3.png"
                  alt="Climate Data Graph"
                  className="rounded-lg"
                  style={{ width: '400px', height: '400px' }}
                />
              </div>
            </div>
          </section>
        </div>
        
      </ScrollArea>
      
      <div className="flex-1 md:w-1/2 h-screen flex flex-col items-center justify-center">
      <section>
            <select
              value={selectedMap}
              onChange={(e) => setSelectedMap(e.target.value)}
              className="bg-gray-800 text-gray-100 p-2 rounded-md"
            >
              <option value="option1">Infant Mortality Rate</option>
              <option value="option2">Average Income</option>
              <option value="option3">Average Life Expectancy</option>
              <option value="option4">Literacy Rate</option>
            </select>
          </section>
        <img
          src={svgMapSources[selectedMap]}
          alt={`Map Preview ${selectedMap}`}
          className="cursor-pointer rounded-lg"
          onClick={handleMapClick}
        />
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={svgMapSources[selectedMap]}
              alt={`Map Preview ${selectedMap}`}
              className="rounded-lg"
              style={{
                transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
                transformOrigin: 'top left',
                transition: 'transform 0.2s',
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setOffset({ x: 0, y: 0 })}
            />
            <button className="absolute top-4 right-4 bg-red-600 text-white rounded-md p-2" onClick={closeModal}>
              Close
            </button>
            
          </div>
        </div>
      )}
      <p>Hello world</p>
    </div>
  );
}
