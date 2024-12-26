'use client'

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Banner {
  id: string;
  src: string;
  alt: string;
  order: number;
}

interface BannerListProps {
  initialBanners: Banner[];
  onOrderUpdate: (newBanners: Banner[]) => void;
  onDelete: (id: string) => void;
}

export default function BannerList({ initialBanners, onOrderUpdate, onDelete }: BannerListProps) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);

  useEffect(() => {
    setBanners(initialBanners);
  }, [initialBanners]);

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(banners);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedBanners = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setBanners(updatedBanners);
    onOrderUpdate(updatedBanners);
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Current Banners</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="banners" direction="horizontal">
          {(provided, snapshot) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 min-h-[200px] transition-colors text-black ${
                snapshot.isDraggingOver ? 'bg-gray-100' : ''
              }`}
            >
              {banners.map((banner, index) => (
                <Draggable key={banner.id.toString()} draggableId={banner.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`relative flex flex-col items-center p-4 rounded-lg shadow-md transition-all ${
                        snapshot.isDragging ? 'bg-blue-100 shadow-lg scale-105' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative w-full h-40 mb-2 cursor-move">
                        <Image
                          src={banner.src}
                          alt={banner.alt}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <p className="text-center font-medium">{banner.alt}</p>
                      <p className="text-sm text-gray-500 mt-1">Order: {banner.order}</p>

                      <a href={banner.src} target="_blank" className="text-blue-500 mt-2">
                        View Image
                    </a>

                      <Button
                        className="group-hover:opacity-100 transition-opacity"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(banner.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

