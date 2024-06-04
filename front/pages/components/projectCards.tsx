import React, { useMemo, useState } from 'react';
import { Container, Grid, Paper, Image, Text, Title, AspectRatio, Badge, Button, Transition } from '@mantine/core';
import { projectData, Project, techIcons } from '../../lib/projectData';
import ProjectModal from './projectModal';
import TechFilterBadges from '../../lib/smol/techFilter';
import { DiTerminal } from 'react-icons/di';
// import useIsMobile from '../../hooks/useIsMobile';
import { universalRelaxation } from '../../lib/universalRelaxation';
import { useMediaQuery } from '@mantine/hooks'

export const ProjectsGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [opened, setOpened] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  // const isMobile = useIsMobile();
	const isMobile = useMediaQuery('(max-width: 768px)') ?? true

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setOpened(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setOpened(false);
  };

  const handleTechFilter = (tech: string) => {
    setSelectedTech((prevSelectedTech) => {
      const normalizedTech = universalRelaxation(tech);
      if (prevSelectedTech.includes(normalizedTech)) {
        return prevSelectedTech.filter((t) => t !== normalizedTech);
      } else {
        return [...prevSelectedTech, normalizedTech];
      }
    });
  };

  const filteredProjects = useMemo(() => {
    return selectedTech.length > 0
      ? projectData.filter((project) =>
          selectedTech.every((tech) => {
            const normalizedTech = universalRelaxation(tech);
            return project.details.technologies.map(universalRelaxation).includes(normalizedTech);
          })
        )
      : projectData;
  }, [selectedTech]);

  const cards = filteredProjects.map((project) => (
    <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} style={{ marginBottom: '20px' }} key={project.title}>
      <Paper
        shadow="md"
        radius="md"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transformOrigin: 'center',
          minHeight: '300px',
        }}
        className="card"
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.zIndex = '2';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.zIndex = '1';
        }}
      >
        <AspectRatio ratio={14 / 9} style={{ width: '100%', position: 'relative', flexShrink: 0 }}>
          <Image
            src={project.imgUrl || 'https://via.placeholder.com/1920x1080'}
            alt={`Screenshot of ${project.title}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: isMobile ? '10%' : '65%',
              height: isMobile ? '100%' : '30%',
              width: '100%',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              padding: '1rem',
              color: 'black',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.5rem',
              justifyContent: 'center',
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <Title
              order={3}
              style={{
                margin: 0,
                fontWeight: '400',
                fontSize: '1.5rem',
                lineHeight: '1.2',
                textAlign: 'left',
                letterSpacing: '0.02em',
              }}
            >
              {project.title}
            </Title>
            <Text size="sm" style={{ margin: 0, color: '#333' }}>
              {project.description}
            </Text>
          </div>
        </AspectRatio>

        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', marginTop: '2rem' }}>
            <div style={{ width: '50%' }}>
              <Text
                size="lg"
                mb={5}
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 500,
                  color: '#333',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  marginBottom: '0.5rem',
                }}
              >
                Main Tech:
              </Text>
              {project.details.technologies.slice(0, 3).map((tech) => {
                const techInfo = techIcons[tech];
                if (!techInfo) {
                  console.warn(`No specific icon found for technology: ${tech}. Using default icon.`);
                  return (
                    <Badge
                      key={tech}
                      color="gray"
                      onMouseOver={(e) => {
                        e.currentTarget.style.filter = 'brightness(120%)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.filter = 'brightness(100%)';
                      }}
                      style={{
                        margin: '5px 10px 5px 0',
                        padding: '10px 5px',
                        borderRadius: '5px',
                        fontSize: '0.9rem',
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        transition: 'filter 0.3s ease',
                      }}
                      leftSection={<DiTerminal size={14} />}
                    >
                      {tech}
                    </Badge>
                  );
                }
                const { icon: Icon, color, docLink } = techInfo;
                return (
                  <a href={docLink} target="_blank" rel="noopener noreferrer" key={tech}>
                    <Badge
                      color={color}
                      onMouseOver={(e) => {
                        e.currentTarget.style.filter = 'brightness(120%)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.filter = 'brightness(100%)';
                      }}
                      style={{
                        margin: '5px 10px 5px 0',
                        padding: '10px 5px',
                        borderRadius: '5px',
                        fontSize: '0.9rem',
                        backgroundColor: color,
                        color: '#fff',
                        transition: 'filter 0.3s ease',
                      }}
                      leftSection={Icon && <Icon size={14} />}
                    >
                      {tech}
                    </Badge>
                  </a>
                );
              })}
            </div>
            <div style={{ width: '50%' }}>
              <Text
                size="lg"
                mb={5}
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 500,
                  color: '#333',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  marginBottom: '0.5rem',
                }}
              >
                Supporting:
              </Text>
              {project.details.technologies
                .slice(3)
                .filter((tech) => !project.details.technologies.slice(0, 3).includes(tech))
                .map((tech) => {
                  const techInfo = techIcons[tech];
                  if (!techInfo) {
                    console.warn(`No specific icon found for technology: ${tech}. Using default icon.`);
                    return (
                      <Badge
                        key={tech}
                        color="gray"
                        onMouseOver={(e) => {
                          e.currentTarget.style.filter = 'brightness(110%)';
                          e.currentTarget.style.boxShadow = '0 0 4px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.filter = 'brightness(100%)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        style={{
                          margin: '5px 10px 5px 0',
                          padding: '10px 5px',
                          borderRadius: '5px',
                          fontSize: '0.9rem',
                          backgroundColor: '#f0f0f0',
                          color: '#333',
                          transition:
                            'filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        leftSection={<DiTerminal size={14} />}
                      >
                        {tech}
                      </Badge>
                    );
                  }
                  const { icon: Icon, color, docLink } = techInfo;
                  return (
                    <a href={docLink} target="_blank" rel="noopener noreferrer" key={tech}>
                      <Badge
                        color={color}
                        onMouseOver={(e) => {
                          e.currentTarget.style.filter = 'brightness(110%)';
                          e.currentTarget.style.boxShadow = `0 0 4px ${color}`;
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.filter = 'brightness(100%)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        style={{
                          margin: '5px 10px 5px 0',
                          padding: '10px 5px',
                          borderRadius: '5px',
                          fontSize: '0.9rem',
                          opacity: 0.7,
                          transition:
                            'filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        leftSection={Icon && <Icon size={14} />}
                      >
                        {tech}
                      </Badge>
                    </a>
                  );
                })}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', flexWrap: 'nowrap' }}>
              <Button
                component="a"
                href={project.repoUrl || '#!'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  marginRight: '10px',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'black';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'black';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Repository
              </Button>
              {project.liveUrl && (
                <Button
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    marginRight: '10px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'black';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Live Demo
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => openModal(project)}
              style={{
                borderColor: 'black',
                color: 'black',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'black';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'black';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Details
            </Button>
          </div>
        </div>
      </Paper>
    </Grid.Col>
  ));

  return (
    <Container
      size="lg"
      my="xl"
      style={{
        maxWidth: '100vw',
        width: 'auto',
        minWidth: '100%',
        minHeight: '100vh',
        padding: '0 2rem',
      }}
    >
      <TechFilterBadges selectedTech={selectedTech} handleTechFilter={handleTechFilter} />
      <Grid gutter="xl" style={{ minHeight: '400px' }}>
        {cards.length > 0 ? (
          cards
        ) : (
          <Transition mounted={true} transition="fade" duration={300} timingFunction="ease-in-out">
            {(styles) => (
              <Grid.Col span={12} style={{ ...styles, textAlign: 'center', padding: '20px' }}>
                No projects found. Please try a different filter.
              </Grid.Col>
            )}
          </Transition>
        )}
      </Grid>
      {selectedProject && <ProjectModal project={selectedProject} opened={opened} onClose={closeModal} />}
    </Container>
  );
};

export default ProjectsGrid;