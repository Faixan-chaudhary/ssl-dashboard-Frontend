import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
  Chip,
  Fade,
  Slide,
  Grow,
  Zoom,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Construction as ConstructionIcon,
  Notifications as NotificationsIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';

const ComingSoon = ({ feature = 'Profile & Settings' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [animate, setAnimate] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { icon: PersonIcon, color: '#667eea', label: 'Profile' },
    { icon: SettingsIcon, color: '#764ba2', label: 'Settings' },
    { icon: SecurityIcon, color: '#f093fb', label: 'Security' },
    { icon: PaletteIcon, color: '#4facfe', label: 'Customization' },
    { icon: LanguageIcon, color: '#43e97b', label: 'Localization' },
    { icon: SpeedIcon, color: '#fa709a', label: 'Performance' }
  ];

  useEffect(() => {
    setAnimate(true);
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: PersonIcon,
      title: 'Advanced Profile Management',
      description: 'Customize your profile with rich media, preferences, and personal branding options.',
      color: '#667eea'
    },
    {
      icon: SettingsIcon,
      title: 'Comprehensive Settings',
      description: 'Fine-tune your experience with granular control over all application features.',
      color: '#764ba2'
    },
    // {
    //   icon: SecurityIcon,
    //   title: 'Enhanced Security',
    //   description: 'Two-factor authentication, session management, and advanced privacy controls.',
    //   color: '#f093fb'
    // },
    {
      icon: NotificationsIcon,
      title: 'Smart Notifications',
      description: 'Personalized notification preferences and intelligent alert management.',
      color: '#4facfe'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={animate} timeout={1000}>
        <Box
          sx={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: 200,
              height: 200,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-20px) rotate(180deg)' }
              }
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              width: 150,
              height: 150,
              background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(79, 172, 254, 0.1))',
              borderRadius: '50%',
              filter: 'blur(30px)',
              animation: 'float 8s ease-in-out infinite reverse',
            }}
          />

          {/* Main content */}
          <Slide direction="up" in={animate} timeout={800}>
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              {/* Icon animation */}
              <Box sx={{ mb: 4, position: 'relative' }}>
                <Zoom in={animate} timeout={1200}>
                  <Paper
                    elevation={0}
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${icons[currentIcon].color}, ${icons[(currentIcon + 1) % icons.length].color})`,
                      boxShadow: `0 8px 32px ${icons[currentIcon].color}40`,
                      transition: 'all 0.5s ease',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <Box
                      component={icons[currentIcon].icon}
                      sx={{
                        fontSize: 48,
                        color: 'white',
                        transition: 'all 0.5s ease'
                      }}
                    />
                  </Paper>
                </Zoom>
                
                <Grow in={animate} timeout={1500}>
                  <Chip
                    label={icons[currentIcon].label}
                    sx={{
                      background: `linear-gradient(135deg, ${icons[currentIcon].color}, ${icons[(currentIcon + 1) % icons.length].color})`,
                      color: 'white',
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                      fontSize: '0.9rem'
                    }}
                  />
                </Grow>
              </Box>

              {/* Title */}
              <Typography
                variant={isMobile ? 'h4' : 'h2'}
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                Coming Soon
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  fontWeight: 400,
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                We're working hard to bring you new features. 
                Stay tuned for updates!
              </Typography>

              {/* Progress indicator */}
              <Box sx={{ mb: 6 }}>
                <Box
                  sx={{
                    width: 200,
                    height: 4,
                    background: 'rgba(102, 126, 234, 0.2)',
                    borderRadius: 2,
                    mx: 'auto',
                    mb: 2,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      width: '75%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: 2,
                      animation: 'progress 2s ease-in-out infinite',
                      '@keyframes progress': {
                        '0%, 100%': { transform: 'translateX(-100%)' },
                        '50%': { transform: 'translateX(0%)' }
                      }
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  75% Complete
                </Typography>
              </Box>
            </Box>
          </Slide>

          {/* Features grid */}
          <Slide direction="up" in={animate} timeout={1000}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 3,
                width: '100%',
                maxWidth: 1200,
                mt: 6
              }}
            >
              {features.map((feature, index) => (
                <Grow in={animate} timeout={1200 + index * 200} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 40px ${feature.color}20`,
                        border: `1px solid ${feature.color}30`
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '12px',
                          background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}
                      >
                        <Box
                          component={feature.icon}
                          sx={{ color: 'white', fontSize: 24 }}
                        />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grow>
              ))}
            </Box>
          </Slide>

          {/* Bottom CTA */}
          <Slide direction="up" in={animate} timeout={1400}>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  maxWidth: 500,
                  mx: 'auto'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <StarIcon sx={{ color: '#667eea', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Get Notified
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Be the first to know when these features are available. 
                  We'll notify you as soon as they're ready!
                </Typography>
                <Chip
                  label="Coming in September 2025"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    fontWeight: 600
                  }}
                />
              </Paper>
            </Box>
          </Slide>
        </Box>
      </Fade>
    </Container>
  );
};

export default ComingSoon;
