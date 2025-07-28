import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { IoMail, IoLockClosed, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../api/hooks/mutations";
const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width:'100%',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(-45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 50%, ${theme.palette.primary.main} 100%)`,
  backgroundSize: "400% 400%",
  animation: "gradient 15s ease infinite",
  "@keyframes gradient": {
    "0%": {
      backgroundPosition: "0% 50%"
    },
    "50%": {
      backgroundPosition: "100% 50%"
    },
    "100%": {
      backgroundPosition: "0% 50%"
    }
  }
}));

const LoginCard = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: theme.spacing(4),
width: "95%",
  maxWidth: 400,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
}));

const MotionBox = motion(Box);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const LoginPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate()
  const { loginUser, data } = useLogin();
  const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    
    const validatePassword = (password) => {
        return password.length >= 8;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {
            email: !validateEmail(email) ? "Please enter a valid email address" : "",
            password: !validatePassword(password) ? "Password must be at least 8 characters" : "",
        };
        
        setErrors(newErrors);
        
        if (!newErrors.email && !newErrors.password) {
            const data = await loginUser({ email, password });
            setIsLoading(true);
            if (data.token){

              setTimeout(() => {
                toast.success("Login Successfully!", {
                  style: { fontSize: "16px" },
                });
                
              }, 1000);
            }
    setTimeout(() => {
       
        navigate('/ssl')
    }, 2000);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Login successful");
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <StyledContainer>
      <LoginCard component="form" onSubmit={handleSubmit}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
                        //  fontFamily: "Open Sans, sans-serif",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1
            }}
          >
            Welcome Back
          </Typography>

          <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4,
                       fontFamily: "Open Sans, sans-serif"
           }}>
            Please sign in to continue
          </Typography>

          <Stack spacing={3}>
            <MotionBox {...fadeInUp}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoMail size={20} color={theme.palette.primary.main} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </MotionBox>

            <MotionBox {...fadeInUp}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoLockClosed size={20} color={theme.palette.primary.main} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </MotionBox>

            <MotionBox {...fadeInUp}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <FormControlLabel
  control={
    <Checkbox
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      color="primary"
    />
  }
  label="Remember me"
  sx={{ color: "black" }} 
/>

                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ 
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": { 
                      textDecoration: "underline",
                      transform: "translateY(-2px)"
                    } 
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>
            </MotionBox>

            <MotionBox {...fadeInUp}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  py: 1.5,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
                  }
                }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </MotionBox>
          </Stack>
        </MotionBox>
      </LoginCard>
      <ToastContainer />
    </StyledContainer>
  );
};

export default LoginPage;