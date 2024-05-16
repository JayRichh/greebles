import React, { useRef, useState } from 'react';
import { Button, Badge, Transition } from '@mantine/core';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { DiTerminal } from 'react-icons/di';
import { useClickOutside, useMediaQuery } from '@mantine/hooks';
import { techIcons } from '../projectData';

interface TechFilterBadgesProps {
  selectedTech: string[];
  handleTechFilter: (tech: string) => void;
}

const TechFilterBadges: React.FC<TechFilterBadgesProps> = ({ selectedTech, handleTechFilter }) => {
  const mainTechnologies = [
    'Vue.js',
    'TypeScript',
    'Node.js',
    'React',
    'Next.js',
    'Three.js',
    'CSS Framework',
    'Physics Engine',
    'AI',
  ];

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(() => setIsOpen(false), null, [dropdownRef.current, buttonRef.current]);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div style={{ position: 'relative', zIndex: 12, margin: '-1.8rem 0 1rem 0', background: 'transparent' }}>
      <Button
        leftSection={<FaFilter size={14} />}
        ref={buttonRef}
        onClick={toggleDropdown}
        size="xs"
        variant="outline"
        style={{
          color: 'black',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.15s cubic-bezier(1, 0, 0, 1)',
          transformOrigin: 'center',
          fontSize: '0.87rem',
          borderRadius: '0.375rem',
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'black';
          e.currentTarget.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'black';
        }}
      >
        Filter
      </Button>

      <Transition mounted={isOpen} transition="slide-up" duration={200} timingFunction="cubic-bezier(1, 0, 0, 1)">
        {(styles) => (
          <div
            ref={dropdownRef}
            style={{
              ...styles,
              position: 'absolute',
              top: isMobile ? '2.5rem' : '-55%',
              left: isMobile ? '-5rem' : '1.5rem',
              margin: '0 -5rem 0 5rem',
              maxWidth: isMobile ? '100%' : '70%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              padding: '5px',
              zIndex: 1000,
              background: isMobile ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {mainTechnologies.map((tech) => {
              const isSelected = selectedTech.includes(tech);
              const techInfo = techIcons[tech] || { icon: DiTerminal, color: 'gray' }; // Provide default icon and color if not found
              const { icon: Icon, color } = techInfo;
              return (
                <Badge
                  key={tech}
                  color={isSelected ? 'blue' : color}
                  style={{
                    margin: '2px',
                    padding: isMobile ? '15px 20px' : '10px',
                    borderRadius: '5px',
                    fontSize: isMobile ? '1.2rem' : '0.9rem',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: isSelected ? '0 4px 6px rgba(0, 0, 0, 0.3)' : 'none',
                    transform: isSelected ? 'translateY(-4px)' : 'none',
                    transition: 'all 0.15s cubic-bezier(1, 0, 0, 1)',
                    backgroundColor: isSelected ? color : '#e2e8f0',
                    color: isSelected ? '#fff' : '#1a202c',
                  }}
                  leftSection={Icon && <Icon size={isMobile ? 20 : 14} />}
                  rightSection={isSelected && <FaTimes size={isMobile ? 18 : 12} style={{ marginLeft: '5px' }} />}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTechFilter(tech);
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = isSelected ? color : color;
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = isSelected ? color : '#e2e8f0';
                    e.currentTarget.style.color = isSelected ? '#fff' : '#1a202c';
                  }}
                >
                  {tech}
                </Badge>
              );
            })}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default TechFilterBadges;