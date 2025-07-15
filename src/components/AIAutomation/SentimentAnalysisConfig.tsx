import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Chip,
  Button,
  Drawer,
  IconButton,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

interface SentimentAnalysisConfigProps {
  sentimentThreshold: number;
  onSentimentThresholdChange: (threshold: number) => void;
  drawerWidth?: number;
}

// Default drawer width constant
const DEFAULT_DRAWER_WIDTH = 480;

const SentimentAnalysisConfig: React.FC<SentimentAnalysisConfigProps> = ({
  sentimentThreshold,
  onSentimentThresholdChange,
  drawerWidth = DEFAULT_DRAWER_WIDTH
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle2">
          Sentiment Analysis
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          startIcon={<EditIcon />}
          onClick={toggleDrawer}
        >
          Configure
        </Button>
      </Box>
      
      {/* Show brief summary when drawer is closed */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">Threshold:</Typography>
          <Typography variant="body2" fontWeight="medium">{sentimentThreshold}</Typography>
          <Box sx={{ ml: 1 }}>
            <Chip 
              size="small"
              label={sentimentThreshold < 0.4 ? "Negative" : sentimentThreshold > 0.6 ? "Positive" : "Neutral"} 
              color={sentimentThreshold < 0.4 ? "error" : sentimentThreshold > 0.6 ? "success" : "primary"} 
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
      
      {/* Drawer for configuration */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="temporary"
        ModalProps={{
          BackdropProps: {
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
          }
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: drawerWidth,
            padding: 3,
            boxSizing: 'border-box',
            boxShadow: '-4px 0px 10px rgba(0, 0, 0, 0.05)',
            borderLeft: '1px solid #e0e0e0'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Configure Sentiment Analysis</Typography>
          <IconButton onClick={toggleDrawer} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Sentiment Threshold
        </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Set the threshold for determining positive or negative sentiment (0 = highly negative, 1 = highly positive)
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography>Threshold:</Typography>
        <Box sx={{ flex: 1 }}>
          <Slider
            value={sentimentThreshold}
            onChange={(_e: Event, value: number | number[]) => 
              onSentimentThresholdChange(Array.isArray(value) ? value[0] : value)
            }
            step={0.05}
            marks
            min={0}
            max={1}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ width: 80 }}>
          <TextField
            size="small"
            type="number"
            value={sentimentThreshold}
            onChange={(e) => onSentimentThresholdChange(Number(e.target.value))}
            inputProps={{ step: 0.05, min: 0, max: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Chip 
          label="Negative" 
          color={sentimentThreshold >= 0.5 ? "default" : "error"} 
          variant={sentimentThreshold >= 0.5 ? "outlined" : "filled"}
        />
        <Chip 
          label="Neutral" 
          color={Math.abs(sentimentThreshold - 0.5) <= 0.1 ? "primary" : "default"} 
          variant={Math.abs(sentimentThreshold - 0.5) <= 0.1 ? "filled" : "outlined"}
        />
        <Chip 
          label="Positive" 
          color={sentimentThreshold < 0.5 ? "default" : "success"} 
          variant={sentimentThreshold < 0.5 ? "outlined" : "filled"}
        />
      </Box>
      </Drawer>
    </Box>
  );
};

export default SentimentAnalysisConfig;
