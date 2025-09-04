"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  styled,
  useTheme,
} from "@mui/material"
import {
  Mail,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForward,
  Security,
  CheckCircle,
  Business,
  TrendingUp,
  Shield,
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useLogin } from "../../api/hooks/mutations"

// Beautiful & Professional Styled Components
const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  margin: 0,
  padding: 0,
  background: `
    radial-gradient(circle at 10% 90%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a23 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0a0a23 100%)
  `,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
    `,
    animation: "backgroundShift 25s ease-in-out infinite alternate",
    zIndex: 1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "70px 70px",
    animation: "gridMove 35s linear infinite",
    zIndex: 2,
  },
  "@keyframes backgroundShift": {
    "0%, 100%": {
      transform: "scale(1) rotate(0deg)",
      opacity: 0.8,
    },
    "33%": {
      transform: "scale(1.05) rotate(10deg)",
      opacity: 0.9,
    },
    "66%": {
      transform: "scale(0.95) rotate(-10deg)",
      opacity: 0.7,
    },
  },
  "@keyframes gridMove": {
    "0%": {
      transform: "translate(0, 0)",
    },
    "100%": {
      transform: "translate(70px, 70px)",
    },
  },
}))

const LoginCard = styled(motion(Paper))(({ theme }) => ({
  position: "relative",
  background: `
    linear-gradient(145deg, 
      rgba(255, 255, 255, 0.18) 0%, 
      rgba(255, 255, 255, 0.08) 50%, 
      rgba(255, 255, 255, 0.03) 100%
    )
  `,
  backdropFilter: "blur(30px)",
  borderRadius: 32,
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 460,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: `
    0 40px 80px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
  `,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background:
      "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.7), rgba(59, 130, 246, 0.7), rgba(16, 185, 129, 0.7), transparent)",
    borderRadius: "32px 32px 0 0",
    animation: "borderFlow 6s ease-in-out infinite alternate",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: -2,
    background: `
      linear-gradient(135deg, 
        rgba(139, 92, 246, 0.2), 
        rgba(59, 130, 246, 0.2), 
        rgba(16, 185, 129, 0.2), 
        rgba(139, 92, 246, 0.2)
      )
    `,
    borderRadius: 32,
    zIndex: -1,
    opacity: 0,
    transition: "opacity 0.4s ease",
    filter: "blur(10px)",
  },
  "&:hover::after": {
    opacity: 0.5,
  },
  "@keyframes borderFlow": {
    "0%, 100%": {
      opacity: 0.8,
      backgroundPosition: "0% 50%",
    },
    "50%": {
      opacity: 1,
      backgroundPosition: "100% 50%",
    },
  },
}))

const ProfessionalButton = styled(motion(Button))(({ theme }) => ({
  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 25%, #06b6d4 50%, #ec4899 75%, #8b5cf6 100%)",
  backgroundSize: "300% 300%",
  borderRadius: 16,
  padding: "16px 28px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  position: "relative",
  overflow: "hidden",
  color: "white",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  animation: "buttonGradientShift 8s ease-in-out infinite",
  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    transition: "left 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "&:hover": {
    transform: "translateY(-3px) scale(1.01)",
    boxShadow: "0 15px 40px rgba(139, 92, 246, 0.5)",
    animation: "buttonGradientShift 3s ease-in-out infinite",
    "&::before": {
      left: "100%",
    },
  },
  "&:disabled": {
    opacity: 0.6,
    color: "rgba(255, 255, 255, 0.7)",
    transform: "none",
    animation: "none",
    "&:hover": {
      transform: "none",
    },
  },
  "@keyframes buttonGradientShift": {
    "0%, 100%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
  },
}))

const AnimatedTextField = styled(motion(TextField))(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))",
    borderRadius: 16,
    backdropFilter: "blur(15px)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 1.5,
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(139, 92, 246, 0.5)",
      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
    },
    "&.Mui-focused": {
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 30px rgba(139, 92, 246, 0.3)",
      "& fieldset": {
        borderColor: "#8b5cf6",
        borderWidth: 2,
        boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.15)",
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: 500,
    transition: "all 0.3s ease",
    "&.Mui-focused": {
      color: "#8b5cf6",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
    padding: "14px 12px",
    fontWeight: 500,
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.6)",
      opacity: 1,
    },
  },
}))

const FloatingElement = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.2))",
  filter: "blur(2px)",
  boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
}))

const GlowOrb = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(70px)",
  opacity: 0.3,
}))

const IconWrapper = styled(motion.div)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const LoginPage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { loginUser, isLoading, isError, error } = useLogin()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [focusedField, setFocusedField] = useState(null)
  const [particles, setParticles] = useState([])

  // Generate animated floating elements
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 6,
      duration: Math.random() * 10 + 15,
    }))
    setParticles(newParticles)
  }, [])

  // Add login-page class to body to prevent white areas
  useEffect(() => {
    document.body.classList.add('login-page')
    
    // Cleanup function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('login-page')
    }
  }, [])

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {
      email: !validateEmail(email) ? "Please enter a valid email address" : "",
      password: !validatePassword(password) ? "Password must be at least 8 characters" : "",
    }

    setErrors(newErrors)

    if (!newErrors.email && !newErrors.password) {
      try {
        const data = await loginUser({ email, password })
        console.log("Login response:", data)

        if (data && data.token) {
          toast.success(" Login successful! Welcome back.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              background: "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(139, 92, 246, 0.2))",
              color: "white",
              borderRadius: "16px",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            },
          })

          setTimeout(() => {
            navigate("/ssl")
          }, 1000)
        } else if (data && data.error) {
          // Handle error in data.error - could be string or object
          let errorMessage = "Authentication failed. Please try again."
          
          if (typeof data.error === 'string') {
            try {
              const parsedError = JSON.parse(data.error)
              errorMessage = parsedError.message || parsedError.error || errorMessage
            } catch {
              errorMessage = data.error
            }
          } else if (data.error.message) {
            errorMessage = data.error.message
          } else if (typeof data.error === 'object') {
            errorMessage = data.error.toString()
          } else {
            errorMessage = data.error
          }
          
          toast.error(`${errorMessage}`, {
            position: "top-right",
            autoClose: 4000,
            style: {
              background: "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(239, 68, 68, 0.2))",
              color: "white",
              borderRadius: "16px",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              backdropFilter: "blur(20px)",
            },
          })
        }
      } catch (error) {
        console.error("Login failed:", error)
        
        // Handle different error formats
        let errorMessage = "Authentication failed. Please check your credentials."
        
        if (error.response && error.response.data) {
          if (typeof error.response.data === 'string') {
            try {
              const parsedError = JSON.parse(error.response.data)
              errorMessage = parsedError.message || parsedError.error || errorMessage
            } catch {
              errorMessage = error.response.data
            }
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error
          } else if (typeof error.response.data === 'object') {
            errorMessage = JSON.stringify(error.response.data)
          }
        } else if (error.message) {
          errorMessage = error.message
        }
        
        toast.error(`❌ ${errorMessage}`, {
          position: "top-right",
          autoClose: 4000,
          style: {
            background: "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(239, 68, 68, 0.2))",
            color: "white",
            borderRadius: "16px",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            backdropFilter: "blur(20px)",
          },
        })
      }
    }
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 50px 100px rgba(0, 0, 0, 0.5)",
      transition: {
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, x: -30 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      boxShadow: "0 25px 50px rgba(139, 92, 246, 0.6)",
      transition: {
        duration: 0.3,
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -3,
      boxShadow: "0 15px 40px rgba(139, 92, 246, 0.5)",
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.98,
      y: 0,
    },
  }

  const floatingAnimation = {
    animate: {
      y: [-25, 25, -25],
      x: [-15, 15, -15],
      scale: [1, 1.15, 1],
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 15,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const orbVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const iconHoverVariants = {
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <StyledContainer>
      {/* Large Glowing Orbs (More Prominent) */}
      <GlowOrb
        variants={orbVariants}
        animate="animate"
        sx={{
          top: "10%",
          left: "10%",
          width: 450,
          height: 450,
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent)",
        }}
      />
      <GlowOrb
        variants={orbVariants}
        animate="animate"
        sx={{
          top: "55%",
          right: "10%",
          width: 550,
          height: 550,
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.5), transparent)",
          animationDelay: "2s",
        }}
      />
      <GlowOrb
        variants={orbVariants}
        animate="animate"
        sx={{
          bottom: "10%",
          left: "20%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)",
          animationDelay: "4s",
        }}
      />

      {/* Animated Background Elements (More Particles) */}
      {particles.map((particle) => (
        <FloatingElement
          key={particle.id}
          variants={floatingAnimation}
          animate="animate"
          sx={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          p: 3,
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%", maxWidth: 460 }}
        >
          <LoginCard variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" elevation={0}>
            {/* Beautiful Header */}
            <motion.div variants={itemVariants}>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                {/* Animated Logo */}
                <motion.div variants={logoVariants} whileHover="hover">
                  <Box sx={{ mb: 3, position: "relative" }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: "auto",
                        background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4, #ec4899)",
                        backgroundSize: "300% 300%",
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
                        position: "relative",
                        overflow: "hidden",
                        animation: "logoGradientShift 6s ease-in-out infinite",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: "-50%",
                          left: "-50%",
                          width: "200%",
                          height: "200%",
                          background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent)",
                          animation: "logoShine 4s ease-in-out infinite",
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                          borderRadius: 4,
                        },
                        "@keyframes logoShine": {
                          "0%": {
                            transform: "rotate(0deg) translate(-100%, -100%)",
                          },
                          "50%": {
                            transform: "rotate(0deg) translate(100%, 100%)",
                          },
                          "100%": {
                            transform: "rotate(0deg) translate(-100%, -100%)",
                          },
                        },
                        "@keyframes logoGradientShift": {
                          "0%, 100%": {
                            backgroundPosition: "0% 50%",
                          },
                          "50%": {
                            backgroundPosition: "100% 50%",
                          },
                        },
                      }}
                    >
                      <Security
                        sx={{
                          fontSize: 40,
                          color: "white",
                          zIndex: 1,
                          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                        }}
                      />
                    </Box>

                    {/* Floating Icons */}
                    <motion.div
                      animate={{
                        y: [-8, 8, -8],
                        rotate: [0, 8, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                      }}
                    >
                      <Shield
                        sx={{
                          fontSize: 20,
                          color: "#10b981",
                          filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.6))",
                        }}
                      />
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [8, -8, 8],
                        rotate: [0, -8, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      style={{
                        position: "absolute",
                        bottom: -8,
                        left: -8,
                      }}
                    >
                      <TrendingUp
                        sx={{
                          fontSize: 18,
                          color: "#f59e0b",
                          filter: "drop-shadow(0 0 10px rgba(245, 158, 11, 0.6))",
                        }}
                      />
                    </motion.div>
                  </Box>
                </motion.div>

                {/* Animated Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #ffffff, #8b5cf6, #3b82f6, #06b6d4, #ffffff)",
                      backgroundSize: "300% 300%",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 1,
                      letterSpacing: "-0.02em",
                      textShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
                    }}
                  >
                    Welcome Back
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontWeight: 600,
                      mb: 2,
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Sign in to your premium dashboard
                  </Typography>
                </motion.div>

                {/* Animated Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                    <motion.div whileHover={iconHoverVariants.hover}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckCircle
                          sx={{
                            fontSize: 18,
                            color: "#10b981",
                            filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))",
                          }}
                        />
                        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 600 }}>
                          Secure
                        </Typography>
                      </Box>
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "rgba(255, 255, 255, 0.6)" }} />
                    </motion.div>
                    <motion.div whileHover={iconHoverVariants.hover}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Business
                          sx={{
                            fontSize: 18,
                            color: "#3b82f6",
                            filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
                          }}
                        />
                        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 600 }}>
                          Enterprise Grade
                        </Typography>
                      </Box>
                    </motion.div>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>

            {/* Animated Form */}
            <Box component="form" onSubmit={handleSubmit}>
              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <Box sx={{ mb: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontWeight: 600,
                        mb: 1,
                        fontSize: "0.875rem",
                      }}
                    >
                      Email Address
                    </Typography>
                  </motion.div>
                  <AnimatedTextField
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileFocus={{ scale: 1.01 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconWrapper whileHover={{ scale: 1.15, rotate: 5 }} transition={{ duration: 0.3 }}>
                            <Mail
                              sx={{
                                color: focusedField === "email" ? "#8b5cf6" : "rgba(255, 255, 255, 0.7)",
                                transition: "color 0.3s ease",
                              }}
                            />
                          </IconWrapper>
                        </InputAdornment>
                      ),
                    }}
                    FormHelperTextProps={{
                      sx: {
                        color: "#ef4444",
                        fontWeight: 500,
                        mt: 1,
                      },
                    }}
                  />
                </Box>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <Box sx={{ mb: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontWeight: 600,
                        mb: 1,
                        fontSize: "0.875rem",
                      }}
                    >
                      Password
                    </Typography>
                  </motion.div>
                  <AnimatedTextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your password"
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileFocus={{ scale: 1.01 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconWrapper whileHover={{ scale: 1.15, rotate: 5 }} transition={{ duration: 0.3 }}>
                            <Lock
                              sx={{
                                color: focusedField === "password" ? "#8b5cf6" : "rgba(255, 255, 255, 0.7)",
                                transition: "color 0.3s ease",
                              }}
                            />
                          </IconWrapper>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{
                                color: "rgba(255, 255, 255, 0.7)",
                                transition: "color 0.3s ease",
                                "&:hover": {
                                  color: "#8b5cf6",
                                },
                              }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </motion.div>
                        </InputAdornment>
                      ),
                    }}
                    FormHelperTextProps={{
                      sx: {
                        color: "#ef4444",
                        fontWeight: 500,
                        mt: 1,
                      },
                    }}
                  />
                </Box>
              </motion.div>

              {/* Animated Remember Me & Forgot Password */}
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          sx={{
                            color: "rgba(255, 255, 255, 0.6)",
                            transition: "all 0.3s ease",
                            "&.Mui-checked": {
                              color: "#8b5cf6",
                              transform: "scale(1.1)",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500, fontSize: "0.875rem" }}>
                          Remember me
                        </Typography>
                      }
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Typography
                      component="button"
                      type="button"
                      variant="body2"
                      sx={{
                        color: "#8b5cf6",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "none",
                        background: "none",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        transition: "all 0.3s ease",
                        position: "relative",
                        "&:hover": {
                          color: "#a78bfa",
                          "&::after": {
                            width: "100%",
                          },
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          width: 0,
                          height: 2,
                          background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                          transition: "width 0.3s ease",
                        },
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </motion.div>
                </Box>
              </motion.div>

              {/* Beautiful Submit Button */}
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <ProfessionalButton
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  sx={{ mb: 3 }}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 16 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              border: "2px solid rgba(255, 255, 255, 0.3)",
                              borderTop: "2px solid white",
                              borderRadius: "50%",
                            }}
                          />
                        </motion.div>
                        <Typography sx={{ color: "white", fontWeight: 600 }}>Signing in...</Typography>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="signin"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          gap: 16,
                          width: "100%"
                        }}
                      >
                        <Typography sx={{ 
                          color: "white", 
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center"
                        }}>
                          Sign In Securely
                        </Typography>
                        <motion.div
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop:'3px',
                            transform: "translateY(2px)"
                          }}
                        >
                          <ArrowForward sx={{ 
                            fontSize: 20, 
                            color: "white",
                            display: "flex",
                            alignItems: "center"
                          }} />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ProfessionalButton>
              </motion.div>
            </Box>

            {/* Animated Footer */}
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Box sx={{ textAlign: "center", pt: 2, borderTop: "1px solid rgba(255, 255, 255, 0.15)" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "#10b981",
                          boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)",
                        }}
                      />
                    </motion.div>
                    <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}>
                      SSL Secured
                    </Typography>
                  </Box>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "rgba(255, 255, 255, 0.4)" }} />
                  </motion.div>
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}>
                    256-bit Encryption
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </LoginCard>
        </motion.div>
      </Box>

      {/* Enhanced Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </StyledContainer>
  )
}

export default LoginPage
